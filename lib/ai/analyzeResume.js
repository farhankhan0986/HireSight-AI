import Groq from "groq-sdk";

export async function scoreCandidateForDomain(resumeText, targetDomain) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing from environment variables.");
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const systemPrompt = `You are a senior technical recruiter with 15+ years of experience across software engineering, data science, and product roles. You have deep knowledge of what hiring managers look for in top-tier candidates at both startups and large tech companies. Your evaluations are precise, fair, and grounded in current industry standards (2023-2025).`;

  const userPrompt = `Analyze the following resume against the target role and return a detailed, calibrated JSON evaluation.

## Target Role
${targetDomain}

## Resume Text
${resumeText}

## Scoring Guidelines
When determining the score (0–100), consider:
- **Core skill match** (40%): Does the candidate have the must-have technologies and tools for this role?
- **Experience depth** (25%): Do their projects/jobs demonstrate meaningful, hands-on experience — not just listed buzzwords?
- **Complementary skills** (20%): Do they have supporting skills (e.g., testing, CI/CD, system design) that strong candidates typically possess?
- **Seniority signals** (15%): Is there evidence of leadership, impact (scale, performance improvements), or ownership?

Score calibration:
- 85–100: Exceptional match — ready to interview immediately
- 70–84: Strong match — minor skill gaps, highly competitive candidate
- 50–69: Moderate match — qualified but would need upskilling in key areas
- 30–49: Weak match — foundational knowledge present but critical gaps exist
- 0–29: Poor match — significant mismatch with role requirements

## Output Format
You MUST return ONLY a valid JSON object. Every field must be strictly typed. Here is the exact structure with a filled example:

{
  "score": 74,
  "extracted_skills": ["React", "Node.js", "PostgreSQL", "Docker", "REST APIs"],
  "strengths": [
    "Strong proficiency in Node.js and Express with hands-on API development experience.",
    "Demonstrated experience with PostgreSQL and database design in multiple projects.",
    "Familiarity with Docker and cloud deployment on AWS EC2."
  ],
  "missing_skills": [
    "TypeScript",
    "Kubernetes",
    "CI/CD pipelines (GitHub Actions / Jenkins)"
  ],
  "suggestions": "Focus on learning TypeScript to meet modern full-stack standards. Adding a CI/CD pipeline to one of your existing projects would significantly strengthen your profile for this role."
}

IMPORTANT FORMATTING RULES:
1. "strengths" and "missing_skills" MUST be tight JSON arrays of quoted strings. Do NOT write plain unquoted paragraphs.
2. DO NOT just copy the "74" score from the boilerplate example. You MUST dynamically calculate a real, fresh score based purely on how well the candidate matches the ${targetDomain} role.

## Field Instructions
- **score**: Integer 0–100. Be accurate and fair — avoid inflating or deflating scores.
- **extracted_skills**: All technical skills, frameworks, tools, languages, platforms, and methodologies found in the resume. Extract 8–15+ skills where present.
- **strengths**: Exactly 3–4 items as a valid JSON string array. Each item is one sentence referencing specific things from the resume that align with the ${targetDomain} role.
- **missing_skills**: Exactly 3–4 items as a valid JSON string array. Each item is a specific, actionable skill gap (e.g., "TypeScript", "Kubernetes", "A/B testing frameworks").
- **suggestions**: A single JSON string (not an array). 1–2 sentences of actionable advice for this candidate's specific gap profile.

CRITICAL DOMAIN MATCHING: 
The score MUST be highly sensitive to the specific Target Role (${targetDomain}). If the resume shows strong experience in a completely different domain but lacks specific evidence for ${targetDomain}, you MUST severely penalize the score (e.g., score below 50). Do NOT give a high score just because they are a good engineer in general.
`;


  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.15,
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

      const rankSystemPrompt = `You are a senior technical recruiter evaluating candidates for a specific job. You have deep expertise in assessing engineering resumes and matching candidates to job requirements. You are calibrated, fair, and decisive.`;

      const rankUserPrompt = `Evaluate this candidate's resume against the job opening below and return a calibrated match score with supporting analysis.

## Job Details
Title: ${job.title}
Required Skills: ${job.skills.join(", ")}
Description: ${job.description}

## Candidate Resume
${candidate.resumeText}

## Scoring Rubric (0–100)
- **Skill alignment** (45%): How many required skills are present and demonstrated (not just listed)?  
- **Experience quality** (30%): Are there real deliverables, measurable impact, relevant domains?  
- **Role seniority match** (15%): Does the experience level fit the role's expected seniority?  
- **Cultural/domain fit** (10%): Industry experience, company size fit, domain familiarity?

Score calibration:
- 85–100: Strong hire recommendation — meets nearly all requirements
- 70–84: Good candidate — meets most core requirements, minor gaps
- 50–69: Possible candidate — meets some requirements, notable gaps
- 30–49: Weak candidate — significant mismatches
- 0–29: Not a fit — major requirement mismatches

## Output Format
Return ONLY a raw JSON object (no markdown):
{
  "score": number,
  "strengths": string[],
  "missing_skills": string[],
  "suggestions": string
}

## Field Instructions
- **score**: Integer 0–100. Be accurate — do not inflate scores for weak candidates.
- **strengths**: 3–4 specific, concrete strengths from this candidate's resume that directly match the job requirements. Name actual skills, tools, or experiences.
- **missing_skills**: 2–3 required or strongly preferred skills for this role that are clearly absent from the resume. Be precise.
- **suggestions**: One actionable recommendation the candidate could pursue to meaningfully improve their fit for this specific role.`;

      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: "system", content: rankSystemPrompt },
            { role: "user", content: rankUserPrompt },
          ],
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
