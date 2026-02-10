"use client";
import { useEffect, useState, use as useReact } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function JobDetailsPage({ params }) {
  const { id } = useReact(params);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applyMsg, setApplyMsg] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.loggedIn) setUser(data);
      } catch {}
    };

    loadUser();
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load job");
          return;
        }

        setJob(data);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    setApplyMsg("");

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ jobId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApplyMsg(data.error || "Failed to apply");
        return;
      }

      setApplyMsg("Application submitted successfully! 🎉");
    } catch {
      setApplyMsg("Something went wrong. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-8 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb Skeleton */}
          <div className="h-4 w-48 bg-foreground/10 rounded-lg mb-8 animate-pulse" />

          {/* Header Skeleton */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 mb-6 animate-pulse">
            <div className="h-8 w-3/4 bg-foreground/10 rounded-lg mb-4" />
            <div className="h-5 w-1/2 bg-foreground/10 rounded-lg mb-2" />
            <div className="h-5 w-1/3 bg-foreground/10 rounded-lg mb-6" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 w-20 bg-foreground/10 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-pulse">
                <div className="h-6 w-48 bg-foreground/10 rounded-lg mb-4" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-full bg-foreground/10 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-fit animate-pulse">
              <div className="h-12 w-full bg-primary/20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-6 py-8 bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Job Not Found</h2>
          <p className="text-foreground/60 mb-6">{error}</p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const daysAgo = Math.ceil((Date.now() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen px-6 py-8 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-foreground/60 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-foreground font-medium truncate">{job.title}</span>
        </nav>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card/70 backdrop-blur-sm border border-border rounded-xl p-8 mb-6 overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

          <div className="relative">
            {/* Company Logo Placeholder */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Job Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {job.title}
            </h1>

            {/* Company Info */}
            <div className="flex flex-wrap gap-4 items-center mb-4 text-foreground/70">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-foreground">{job.company}</span>
              </div>
              <span className="text-foreground/30">•</span>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location}</span>
              </div>
              <span className="text-foreground/30">•</span>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Posted {daysAgo} day{daysAgo !== 1 ? 's' : ''} ago</span>
              </div>
            </div>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Job Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Job Description */}
            <div className="bg-card/70 backdrop-blur-sm border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Job Description
              </h2>
              <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-card/70 backdrop-blur-sm border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Requirements
                </h2>
                <div className="text-foreground/80 leading-relaxed whitespace-pre-line">
                  {job.requirements}
                </div>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && (
              <div className="bg-card/70 backdrop-blur-sm border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Responsibilities
                </h2>
                <div className="text-foreground/80 leading-relaxed whitespace-pre-line">
                  {job.responsibilities}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Apply Card */}
            <div className="bg-card/70 backdrop-blur-sm border border-border rounded-xl p-6 sticky top-6">
              {/* Salary */}
              {job.salaryRange && (
                <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-primary/15 to-primary/10 border border-primary/20">
                  <p className="text-xs text-foreground/60 mb-1">Salary Range</p>
                  <p className="text-2xl font-bold text-primary">₹{job.salaryRange}</p>
                  <p className="text-xs text-foreground/60 mt-1">Per annum</p>
                </div>
              )}

              {/* Apply Button */}
              {!user ? (
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all mb-3"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login to Apply
                </Link>
              ) : !user.resume ? (
                <Link
                  href="/dashboard/settings"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition-all mb-3"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Resume First
                </Link>
              ) : (
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                >
                  {applying ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Applying...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Apply Now
                    </>
                  )}
                </button>
              )}

              {/* Application Message */}
              {applyMsg && (
                <div className={`p-3 rounded-lg text-sm ${
                  applyMsg.includes('success') 
                    ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-600 border border-red-500/20'
                }`}>
                  {applyMsg}
                </div>
              )}

              {/* Share Button */}
              <button className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border-2 border-border hover:border-primary/30 hover:bg-foreground/5 transition-all text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Job
              </button>

              {/* Job Stats */}
              <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/60">Job Type</span>
                  <span className="font-semibold text-foreground">{job.jobType || 'Full-time'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/60">Experience</span>
                  <span className="font-semibold text-foreground">{job.experience || '2-5 years'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/60">Applicants</span>
                  <span className="font-semibold text-primary">{job.applicants || '0'} applied</span>
                </div>
              </div>
            </div>

            {/* Report */}
            <button className="w-full text-sm text-foreground/60 hover:text-red-500 transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Report this job
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}