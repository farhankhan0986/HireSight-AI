import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { fetchPdfBuffer } from "@/lib/ai/fetchPdfBuffer";
import { extractResumeText } from "@/lib/ai/extractResumeText";
import { scoreCandidateForDomain } from "@/lib/ai/analyzeResume";

export const runtime = "nodejs";

export async function POST(req) {
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

  const { domain } = await req.json();
  if (!domain) {
    return NextResponse.json({ error: "Target domain is required" }, { status: 400 });
  }

  const user = await User.findById(payload.userId);
  if (!user || user.role !== "candidate") {
    return NextResponse.json({ error: "Unauthorized candidate access" }, { status: 401 });
  }

  if (!user.resume) {
    return NextResponse.json({ error: "Please upload a resume first." }, { status: 400 });
  }

  try {
    // 1. Fetch PDF from Cloudinary
    const resumeBuffer = await fetchPdfBuffer(user.resume);
    
    // 2. Extract Text via pdftotext or equivalent existing script
    const resumeText = await extractResumeText(resumeBuffer);
    
    if (!resumeText || resumeText.length < 50) {
       return NextResponse.json({ error: "Failed to extract readable text from your resume. Ensure it is a standard text PDF." }, { status: 400 });
    }

    // 3. Analyze against Domain using Groq
    const analysis = await scoreCandidateForDomain(resumeText, domain);

    // 4. Save to User Document
    // Initialize map if missing
    if (!user.domain_scores) {
      user.domain_scores = new Map();
    }
    
    user.domain_scores.set(domain, analysis);
    
    // Merge new extracted skills into set
    const currentSkills = new Set(user.extracted_skills || []);
    analysis.extracted_skills.forEach(skill => currentSkills.add(skill));
    user.extracted_skills = Array.from(currentSkills);

    await user.save();

    return NextResponse.json({
        success: true,
        analysis,
        extracted_skills: user.extracted_skills
    });
    
  } catch (error) {
    console.error("Resume Analysis Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze resume." }, { status: 500 });
  }
}
