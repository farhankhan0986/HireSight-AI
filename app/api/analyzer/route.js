import { NextResponse } from "next/server";
import { fetchPdfBuffer } from "@/lib/ai/fetchPdfBuffer";
import { extractResumeText } from "@/lib/ai/extractResumeText";
import { scoreCandidateForDomain } from "@/lib/ai/analyzeResume";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { domain, resumeUrl } = await req.json();

    if (!domain) {
      return NextResponse.json({ error: "Target domain is required" }, { status: 400 });
    }

    if (!resumeUrl) {
      return NextResponse.json({ error: "Please upload a resume first." }, { status: 400 });
    }

    // 1. Fetch PDF from Cloudinary
    const resumeBuffer = await fetchPdfBuffer(resumeUrl);
    
    // 2. Extract Text
    let resumeText = await extractResumeText(resumeBuffer);
    resumeText = resumeText.slice(0, 12000);
    
    if (!resumeText || resumeText.length < 50) {
       return NextResponse.json({ error: "Failed to extract readable text from your resume. Ensure it is a standard text PDF." }, { status: 400 });
    }

    // 3. Analyze against Domain
    const analysis = await scoreCandidateForDomain(resumeText, domain);

    return NextResponse.json({
        success: true,
        analysis,
        extracted_skills: analysis.extracted_skills
    });
    
  } catch (error) {
    console.error("Public Resume Analysis Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze resume." }, { status: 500 });
  }
}
