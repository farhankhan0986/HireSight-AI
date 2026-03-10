import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Application from "../../../../../models/Application";
import Job from "../../../../../models/Job";
import User from "../../../../../models/User";
import jwt from "jsonwebtoken";
import { rankCandidatesForJob } from "../../../../../lib/ai/analyzeResume";
import { fetchPdfBuffer } from "../../../../../lib/ai/fetchPdfBuffer";
import { extractResumeText } from "../../../../../lib/ai/extractResumeText";

export const runtime = "nodejs";

export async function POST(req, { params }) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (payload.role !== "recruiter") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { jobId } = await params;
  if (!jobId) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.createdBy.toString() !== payload.userId) {
       return NextResponse.json({ error: "You do not own this job posting." }, { status: 403 });
    }

    // Get all applicants for this job
    const applications = await Application.find({ job: jobId });
    
    if (applications.length === 0) {
        return NextResponse.json({ message: "No applications found to rank." }, { status: 200 });
    }

    // Ensure all applicants have resume text extracted
    for (let app of applications) {
        if ((!app.resumeText || app.resumeText.length < 50) && app.resumeLink) {
            try {
                const buffer = await fetchPdfBuffer(app.resumeLink);
                const text = await extractResumeText(buffer);
                if (text && text.length > 50) {
                    app.resumeText = text;
                    await Application.findByIdAndUpdate(app._id, {
                        resumeText: text,
                        aiParsingStatus: "parsed"
                    });
                }
            } catch (err) {
                console.error(`Fallback parsing failed for application ${app._id}:`, err);
            }
        }
    }

    const candidateTexts = applications.map(app => ({
        applicationId: app._id.toString(),
        applicantEmail: app.applicantEmail,
        resumeText: app.resumeText || ""
    }));

    // Rank candidates using Groq
    const rankedResults = await rankCandidatesForJob(candidateTexts, job);

    // Update applications in DB with ranks and scores
    for (let i = 0; i < rankedResults.length; i++) {
        const result = rankedResults[i];
        await Application.findByIdAndUpdate(result.applicationId, {
            ai_score: result.score,
            ai_analysis: result.analysis,
            rank: i + 1
        });
    }

    return NextResponse.json({
        success: true,
        message: `Successfully ranked ${rankedResults.length} candidates.`,
        rankedResults
    });

  } catch (error) {
    console.error("Error ranking candidates:", error);
    return NextResponse.json(
      { error: "Failed to rank candidates" },
      { status: 500 }
    );
  }
}
