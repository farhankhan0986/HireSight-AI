"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const JOB_DOMAINS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Product Manager",
  "UX/UI Designer",
  "Mobile Developer",
  "Cloud Architect"
];

export default function ResumeAnalyzerPage() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [globalSkills, setGlobalSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Try to load any previously saved analysis for the selected domain
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        if (res.ok && data.loggedIn !== false) {
          setUserProfile(data);
          if (data.extracted_skills) {
            setGlobalSkills(data.extracted_skills);
          }
        }
      } else {
        console.error("Profile API did not return JSON");
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
      toast.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    // Check if we have cached analysis for this domain
    if (selectedDomain && userProfile?.domain_scores && userProfile.domain_scores[selectedDomain]) {
      setAnalysis(userProfile.domain_scores[selectedDomain]);
      setError("");
    } else {
      setAnalysis(null);
    }
  }, [selectedDomain, userProfile]);

  const handleAnalyze = async () => {
    if (!selectedDomain) {
      setError("Please select a target domain/role.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const res = await fetch("/api/candidate/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: selectedDomain })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysis(data.analysis);
      setGlobalSkills(data.extracted_skills);
      
      // Update local cache
      setUserProfile(prev => ({
        ...prev,
        domain_scores: {
          ...prev?.domain_scores,
          [selectedDomain]: data.analysis
        }
      }));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-500/10 border-green-500/30";
    if (score >= 60) return "bg-yellow-500/10 border-yellow-500/30";
    return "bg-red-500/10 border-red-500/30";
  };

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-8 bg-background max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
          AI Resume Analysis
        </h1>
        <p className="text-foreground/60 max-w-2xl">
          Find out how well your resume matches different job domains. Our AI will analyze your skills and provide actionable feedback.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        {/* Controls Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="bg-card/50 border border-border p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Target Domain
            </h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground/70">
                What role are you applying for?
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
              >
                <option value="">Select a domain...</option>
                {JOB_DOMAINS.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>

              {!userProfile?.resume && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500 flex items-start gap-2">
                   <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p>You must upload a resume in Settings first.</p>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading || !selectedDomain || !userProfile?.resume}
                className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-primary-foreground " fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Analyze Suitability
                  </>
                )}
              </button>

              {error && (
                <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
              )}
            </div>
          </div>

          {globalSkills.length > 0 && (
            <div className="bg-card/50 border border-border p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  All Extracted Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                    {globalSkills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 text-xs font-semibold bg-background border border-border rounded-md text-foreground/80">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
          )}
        </motion.div>

        {/* Results Column */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
        >
          {analysis ? (
             <div className="space-y-6">
                <div className={`p-8 rounded-3xl border ${getScoreBg(analysis.score)} backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6`}>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Suitability Match</h2>
                        <p className="text-foreground/70">Your resume's alignment with <strong className="text-foreground">{selectedDomain}</strong> roles.</p>
                    </div>
                    <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center bg-background rounded-full shadow-inner border border-border/50">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-border/50"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={58 * 2 * Math.PI}
                                strokeDashoffset={58 * 2 * Math.PI * (1 - analysis.score / 100)}
                                className={getScoreColor(analysis.score)}
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className={`text-4xl font-extrabold ${getScoreColor(analysis.score)}`}>
                            {analysis.score}
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-card/50 border border-green-500/20 p-6 rounded-2xl shadow-sm">
                      <h3 className="text-lg font-bold text-green-500 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Key Strengths
                      </h3>
                      <ul className="space-y-3">
                        {analysis.strengths.map((strength, i) => (
                           <li key={i} className="flex gap-2 text-sm text-foreground/80 leading-relaxed">
                               <span className="text-green-500 font-bold">•</span>
                               {strength}
                           </li>
                        ))}
                      </ul>
                   </div>

                   <div className="bg-card/50 border border-red-500/20 p-6 rounded-2xl shadow-sm">
                      <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Missing Skills
                      </h3>
                      <ul className="space-y-3">
                         {analysis.missing_skills.length > 0 ? (
                            analysis.missing_skills.map((skill, i) => (
                                <li key={i} className="flex gap-2 text-sm text-foreground/80 leading-relaxed">
                                    <span className="text-red-500 font-bold">•</span>
                                    {skill}
                                </li>
                             ))
                         ) : (
                             <li className="text-sm text-foreground/60 italic">No critical missing skills identified!</li>
                         )}
                      </ul>
                   </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        AI Suggestion
                    </h3>
                    <p className="text-foreground/80 leading-relaxed font-medium">
                        {analysis.suggestions}
                    </p>
                </div>
             </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10 bg-card/30 border border-dashed border-border rounded-3xl">
                <div className="w-20 h-20 bg-background rounded-full shadow-sm border border-border flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Ready to Analyze?</h3>
                <p className="text-foreground/60 max-w-sm">
                    Select a target domain and click analyze to see how well your resume matches the industry standard requirements.
                </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
