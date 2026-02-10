"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        setLoggedIn(data.loggedIn);
      } catch {
        setLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/jobs?page=${page}&limit=10`);
      const data = await res.json();

      if (!res.ok) {
        setError("Failed to load jobs");
        return;
      }

      setJobs(data.jobs);
      setTotalPages(data.totalPages);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId) => {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ jobId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
    } else {
      alert("Application submitted successfully! 🎉");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-8 bg-background">
        {/* Header Skeleton */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="h-10 w-64 bg-foreground/10 rounded-lg mb-3 animate-pulse" />
          <div className="h-5 w-96 bg-foreground/10 rounded-lg animate-pulse" />
        </div>

        {/* Job Cards Skeleton */}
        <div className="grid gap-5 max-w-6xl mx-auto">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-pulse"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="h-6 w-64 bg-foreground/10 rounded-md mb-2" />
                  <div className="h-4 w-48 bg-foreground/10 rounded-md" />
                </div>
                <div className="h-8 w-24 bg-primary/10 rounded-full" />
              </div>

              {/* Skills */}
              <div className="flex gap-2 mb-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-20 bg-foreground/10 rounded-lg"
                  />
                ))}
              </div>

              {/* Description */}
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-foreground/10 rounded-md" />
                <div className="h-4 w-5/6 bg-foreground/10 rounded-md" />
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-border/50">
                <div className="h-4 w-32 bg-foreground/10 rounded-md" />
                <div className="flex gap-2">
                  <div className="h-9 w-28 bg-foreground/10 rounded-lg" />
                  <div className="h-9 w-28 bg-primary/20 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-6 py-8 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Oops! Something went wrong</h2>
          <p className="text-foreground/60 mb-6">{error}</p>
          <button
            onClick={fetchJobs}
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Job <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Openings</span>
              </h1>
              <p className="text-foreground/60">
                Discover your next career opportunity • {jobs.length > 0 && `${jobs.length} positions available`}
              </p>
            </div>

            {/* Filter/Sort (placeholder) */}
            <div className="hidden md:flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg border border-border hover:border-primary/30 bg-background text-sm font-medium transition-all flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>
            </div>
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No Jobs Available</h3>
            <p className="text-foreground/60 mb-6">Check back later for new opportunities</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Home
            </Link>
          </div>
        ) : (
          <>
            {/* JOB LIST */}
            <div className="grid gap-5 mb-10">
              {jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-card/70 backdrop-blur-sm border border-border hover:border-primary/30 rounded-xl p-6 transition-all duration-300 hover:shadow-lg overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <Link href={`/jobs/details/${job._id}`}>
                          <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                            {job.title}
                          </h2>
                        </Link>

                        {/* Company + Location */}
                        <div className="flex flex-wrap gap-3 items-center text-sm text-foreground/60">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                            </svg>
                            {job.company}
                          </div>
                          <span className="text-foreground/30">•</span>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                          </div>
                          <span className="text-foreground/30">•</span>
                          <div className="flex items-center gap-1.5 text-foreground/50">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Posted {Math.ceil((Date.now() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24))}d ago
                          </div>
                        </div>
                      </div>

                      {/* Salary Badge */}
                      {job.salaryRange && (
                        <div className="flex-shrink-0 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/15 to-primary/10 border border-primary/20">
                          <p className="text-xs text-foreground/60 mb-0.5">Salary</p>
                          <p className="text-sm font-bold text-primary">₹{job.salaryRange}</p>
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 6).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium rounded-lg bg-foreground/5 text-foreground/80 border border-border/50 hover:border-primary/30 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 6 && (
                          <span className="px-3 py-1 text-xs font-medium text-foreground/60">
                            +{job.skills.length - 6} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-foreground/70 leading-relaxed mb-5 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Footer with Actions */}
                    <div className="flex flex-wrap gap-3 items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-xs text-foreground/50">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Actively hiring</span>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/jobs/details/${job._id}`}
                          className="px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:border-primary/30 hover:bg-foreground/5 transition-all flex items-center gap-1.5"
                        >
                          View Details
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>

                        {!user ? (
                          <Link
                            href="/login"
                            className="px-5 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-primary to-primary/90 text-white hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-1.5"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login to Apply
                          </Link>
                        ) : !user.resume ? (
                          <Link
                            href="/dashboard/settings"
                            className="px-5 py-2 rounded-lg text-sm font-bold bg-yellow-500 text-white hover:bg-yellow-600 transition-all flex items-center gap-1.5"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Upload Resume
                          </Link>
                        ) : (
                          <button
                            onClick={() => applyToJob(job._id)}
                            className="px-5 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-primary to-primary/90 text-white hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-1.5"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Apply Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {/* First */}
                <button
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className="px-3 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 hover:border-primary/30 transition-all flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                  First
                </button>

                {/* Previous */}
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 hover:border-primary/30 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show current page, first, last, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                          ${
                            page === pageNum
                              ? "bg-primary text-white shadow-lg shadow-primary/25"
                              : "border border-border hover:bg-primary/10 hover:border-primary/30"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return <span key={pageNum} className="px-2 text-foreground/40">...</span>;
                  }
                  return null;
                })}

                {/* Next */}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 hover:border-primary/30 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Last */}
                <button
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 hover:border-primary/30 transition-all flex items-center gap-1"
                >
                  Last
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}