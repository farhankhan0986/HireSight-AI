import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Application from "../../../models/Application";
import Job from "../../../models/Job";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
// import { fetchPdfBuffer } from "../../../lib/ai/fetchPdfBuffer";
// import { extractResumeText } from "../../../lib/ai/extractResumeText";

export const runtime = "nodejs";
/* =======================
   APPLY TO JOB (CANDIDATE)
   ======================= */
export async function POST(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  // 1. Fetch resume PDF
  
  // 2. Extract text
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  
  const { jobId } = await req.json();
  if (!jobId) {
    return NextResponse.json({ error: "Job ID required" }, { status: 400 });
  }
  
  const user = await User.findById(payload.userId);
  if (!user || !user.resume) {
    return NextResponse.json(
      { error: "Please upload resume before applying" },
      { status: 400 },
    );
  }
  // console.log("User resume object:", user.resume);

  
  // const resumeBuffer = await fetchPdfBuffer(user.resume);
  // const resumeText = await extractResumeText(resumeBuffer);
  const exists = await Application.findOne({
    job: jobId,
    applicantEmail: user.email,
  });

  if (exists) {
    return NextResponse.json(
      { error: "You have already applied" },
      { status: 400 },
    );
  }

  const application = await Application.create({
    job: jobId,
    applicantEmail: user.email,
    resumeLink: user.resume, // ✅ stored ONCE
    // resumeText, // ✅ NEW: extracted text stored
    // aiParsingStatus: resumeText ? "parsed" : "failed",
    status: "Applied",
  });

  return NextResponse.json(application, { status: 201 });
}

/* =======================
   GET APPLICATIONS
   ======================= */
export async function GET(req) {
  await connectDB();

  const email = req.nextUrl.searchParams.get("email");
  const token = req.cookies.get("token")?.value;

  // 🔹 Candidate: own applications
  if (email) {
    const apps = await Application.find({
      applicantEmail: email,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    return NextResponse.json(apps);
  }

  // 🔹 Recruiter: applications for their jobs
  if (token) {
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json([]);
    }

    if (payload.role === "recruiter") {
      const jobs = await Job.find({
        createdBy: payload.userId,
      }).select("_id");

      const jobIds = jobs.map((j) => j._id);

      const apps = await Application.find({
        job: { $in: jobIds },
      })
        .populate("job")
        .sort({ createdAt: -1 });

      return NextResponse.json(apps);
    }
  }

  return NextResponse.json([]);
}
