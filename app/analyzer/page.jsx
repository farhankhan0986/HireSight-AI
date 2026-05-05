"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const ResumeViewer = dynamic(() => import("@/app/components/ResumeViewer"), { ssr: false });

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
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState(null);

  useEffect(() => {
    setAnalysis(null);
    setError("");
  }, [selectedDomain]);

  const handleAnalyze = async () => {
    if (!selectedDomain) {
      setError("Please select a target domain/role.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const res = await fetch("/api/analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: selectedDomain, resumeUrl: uploadedResumeUrl })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysis(data.analysis);
      setGlobalSkills(data.extracted_skills);

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
            {/* <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Upload Resume
            </h3>

            <div>
              
              <input type="file" name="resume" id="resume" className="hidden"/>
              <label htmlFor="resume" 
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2">
                <Upload className="w-5 h-5 text-black font-bold" />
                Upload</label>
            </div> */}

            <ResumeUpload currentResume={uploadedResumeUrl} onUploaded={(url) => setUploadedResumeUrl(url)} />

            {/* <div className="space-y-4">
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
            </div> */}
          </div>
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

              {!uploadedResumeUrl && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500 flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p>Please upload a resume first.</p>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading || !selectedDomain || !uploadedResumeUrl}
                className="w-full py-3 px-4 bg-primary cursor-pointer text-primary-foreground rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
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

function ResumeUpload({ currentResume, onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [viewingResume, setViewingResume] = useState(false);

  const uploadResume = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch("/api/resume/public", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      if (onUploaded) onUploaded(data.resume);
      setFile(null);
      toast.success("Resume uploaded successfully!");
    } else {
      toast.error("Resume upload failed. Please try again.");
    }

    setLoading(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {currentResume && (
        <div className="flex flex-col gap-4 items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-600">Resume Uploaded</p>
              {/* <p className="text-xs text-green-600/70">Your resume is uploaded successfully!</p> */}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setViewingResume(true)}
            className="px-4 py-2 rounded-lg bg-green-500/20 cursor-pointer hover:bg-green-500/30 text-green-600 text-sm font-semibold transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Resume
          </button>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-foreground/80 mb-3 block">
          {currentResume ? "Replace Resume" : "Upload Resume"} (PDF only)
        </label>

        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center gap-4 cursor-pointer rounded-xl border-2 border-dashed px-6 py-12 transition-all ${
            dragActive
              ? "border-primary bg-primary/5"
              : file
              ? "border-green-500 bg-green-500/5"
              : "border-border bg-foreground/5 hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            file ? "bg-green-500/20" : "bg-primary/10"
          }`}>
            <svg className={`w-8 h-8 ${file ? "text-green-500" : "text-primary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-foreground mb-1">
              {file ? "Resume Selected" : dragActive ? "Drop here" : "Drop your resume here or click to browse (PDF only — no scanned/image files)"}
            </p>
            <p className="text-xs text-foreground/60">
              PDF format • Max 5MB
            </p>
          </div>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </label>

        {file && (
          <div className="mt-4 flex items-center justify-between p-4 rounded-lg bg-foreground/5 border border-border">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-foreground">{file.name}</p>
                <p className="text-xs text-foreground/60">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setFile(null);
              }}
              className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
            >
              <svg className="w-5 h-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={uploadResume}
          disabled={loading || !file}
          className="w-full py-3 px-4 bg-primary cursor-pointer text-primary-foreground rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {currentResume ? "Replace" : "Upload"}
            </>
          )}
        </button>
        {file && (
          <button
            type="button"
            onClick={() => setFile(null)}
            className="px-6 py-3 rounded-xl border-2 border-border hover:border-primary/30 hover:bg-foreground/5 transition-all font-semibold"
          >
            Cancel
          </button>
        )}
      </div>

      {viewingResume && currentResume && (
        <ResumeViewer url={currentResume} onClose={() => setViewingResume(false)} />
      )}
    </div>
  );
}
