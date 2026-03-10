import Groq from "groq-sdk";

export async function scoreCandidateForDomain(resumeText, targetDomain) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing from environment variables.");
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const prompt = `You are an expert technical recruiter and AI resume analyzer. You need to analyze a candidate's resume text and score it against a specific target domain or job role.
  
Target Domain/Role: ${targetDomain}

Resume Text:
${resumeText}

Analyze the resume and return ONLY a valid JSON object matching the following structure. Do not include markdown formatting like \`\`\`json. Output nothing but the raw JSON.
{
  "score": number, // A percentage match score from 0 to 100 representing how suitable the candidate is for the ${targetDomain} role.
  "extracted_skills": string[], // A comprehensive list of all technical skills, tools, and languages found in the resume. Keep them concise (e.g., "React", "Node.js"). Make sure to extract at least 5-10 skills if present.
  "strengths": string[], // 3-4 key technical strengths or matching skills the candidate possesses for this specific role. Format as short phrases with bullet points removed.
  "missing_skills": string[], // 3-4 critical skills expected for a ${targetDomain} that are noticeably absent from the resume. Format as short phrases.
  "suggestions": string // A 1-2 sentence constructive suggestion on what the candidate should learn or improve to be a better fit for this role.
}`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", 
      temperature: 0.2, // Low temperature for consistent JSON
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || "{}";
    
    try {
      const result = JSON.parse(responseContent);
      return {
        score: typeof result.score === 'number' ? result.score : parseInt(result.score) || 0,
        extracted_skills: Array.isArray(result.extracted_skills) ? result.extracted_skills : [],
        strengths: Array.isArray(result.strengths) ? result.strengths : [],
        missing_skills: Array.isArray(result.missing_skills) ? result.missing_skills : [],
        suggestions: result.suggestions || "Focus on building more projects in this domain.",
      };
    } catch (parseError) {
       console.error("Failed to parse Groq JSON response:", responseContent);
       throw new Error("AI returned malformed JSON.");
    }
    
  } catch (error) {
    console.error("Error analyzing resume with Groq:", error);
    throw error;
  }
}

export async function rankCandidatesForJob(candidateTexts, job) {
    // candidateTexts is an array of objects: { applicationId, applicantEmail, resumeText }
    if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is missing from environment variables.");
    }
    
    if (!candidateTexts || candidateTexts.length === 0) return [];
    
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
    
    const jobDescription = `
Title: ${job.title}
Skills Required: ${job.skills.join(", ")}
Description: ${job.description}
    `;

    // Process each candidate one by one or in parallel batches
    const rankedCandidates = await Promise.all(
        candidateTexts.map(async (candidate) => {
            if (!candidate.resumeText || candidate.resumeText.length < 50) {
                 return {
                    applicationId: candidate.applicationId,
                    score: 0,
                    analysis: { strengths: [], missing_skills: ["No resume provided"], suggestions: "Upload a valid resume." }
                };
            }

            const prompt = `You are evaluating a candidate for a job opening. Compare the candidate's resume against the job description and return ONLY a valid JSON object.

Job Description:
${jobDescription}

Candidate Resume:
${candidate.resumeText}

Output strictly as raw JSON (no markdown):
{
  "score": number, // Match percentage (0-100)
  "strengths": string[], // 3-4 matching skills or experiences from the resume that fit the job.
  "missing_skills": string[] // 2-3 required job skills missing from the resume.
}`;

            try {
                const chatCompletion = await groq.chat.completions.create({
                  messages: [{ role: "user", content: prompt }],
                  model: "llama-3.3-70b-versatile",
                  temperature: 0.1,
                  response_format: { type: "json_object" },
                });
                
                const responseContent = chatCompletion.choices[0]?.message?.content || "{}";
                const result = JSON.parse(responseContent);
                
                return {
                    applicationId: candidate.applicationId,
                    score: typeof result.score === 'number' ? result.score : parseInt(result.score) || 0,
                    analysis: {
                        strengths: Array.isArray(result.strengths) ? result.strengths : [],
                        missing_skills: Array.isArray(result.missing_skills) ? result.missing_skills : [],
                        suggestions: result.suggestions || "",
                    }
                };
            } catch (error) {
                console.error(`Error ranking candidate ${candidate.applicationId}:`, error);
                return {
                    applicationId: candidate.applicationId,
                    score: 0,
                    analysis: { strengths: [], missing_skills: ["AI Analysis failed"], suggestions: "" }
                };
            }
        })
    );
    
    // Sort descending by score
    return rankedCandidates.sort((a, b) => b.score - a.score);
}
