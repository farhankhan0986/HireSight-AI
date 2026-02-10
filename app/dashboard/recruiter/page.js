"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RecruiterDashboard() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    applied: 0,
    underReview: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // AUTH
        const meRes = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const me = await meRes.json();

        if (!me.loggedIn || me.role !== "recruiter") {
          setLoading(false);
          return;
        }
        setUser(me);

        // JOBS
        const jobsRes = await fetch("/api/jobs?mine=true", {
          credentials: "include",
        });
        const jobsData = await jobsRes.json();
        setJobs(jobsData.jobs || []);

        // APPLICATIONS
        const appsRes = await fetch("/api/applications", {
          credentials: "include",
        });
        const appsData = await appsRes.json();
        setApplications(appsData || []);

        recalcStats(jobsData.jobs || [], appsData || []);
      } catch (err) {
        console.error("Recruiter dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const recalcStats = (jobsList, appsList) => {
    const next = {
      activeJobs: jobsList.length,
      totalApplications: appsList.length,
      applied: 0,
      underReview: 0,
      rejected: 0,
    };

    appsList.forEach((a) => {
      if (a.status === "Applied") next.applied++;
      if (a.status === "Under Review") next.underReview++;
      if (a.status === "Rejected") next.rejected++;
    });

    setStats(next);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-10 w-80 bg-foreground/10 rounded-lg animate-pulse" />
              <div className="h-5 w-64 bg-foreground/10 rounded-lg animate-pulse" />
            </div>
            <div className="h-12 w-32 bg-primary/20 rounded-xl animate-pulse" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-foreground/10 rounded-lg" />
                </div>
                <div className="h-8 w-16 bg-primary/20 rounded mb-2" />
                <div className="h-4 w-24 bg-foreground/10 rounded" />
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-border/50 last:border-0">
                <div className="h-12 w-12 bg-foreground/10 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-48 bg-foreground/10 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-foreground/10 rounded animate-pulse" />
                </div>
                <div className="h-6 w-24 bg-foreground/10 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const acceptedCount = applications.filter(a => a.status === "Accepted").length;

  /* ---------------- PAGE ---------------- */
  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {user?.name}
              </span>
              👋
            </h1>
            <p className="text-base text-foreground/60">
              Manage your job postings and applications
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard/recruiter/post-job"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post New Job
            </Link>
            <Link
              href="/dashboard/recruiter/settings"
              className="px-5 py-2.5 rounded-lg border-2 border-border hover:border-primary/30 bg-background text-foreground font-semibold hover:bg-foreground/5 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <StatCard title="Active Jobs" value={stats.activeJobs} index={0} />
          <StatCard title="Applications" value={stats.totalApplications} index={1} />
          <StatCard title="Applied" value={stats.applied} index={2} />
          <StatCard title="Under Review" value={stats.underReview} index={3} />
          <StatCard title="Accepted" value={acceptedCount} index={4} />
        </div>

        {/* JOBS */}
        <Section title="My Job Postings" icon="💼" index={5}>
          {jobs.length === 0 ? (
            <EmptyState 
              icon="💼"
              title="No Jobs Posted Yet"
              description="Start attracting top talent by posting your first job"
              actionLabel="Post Your First Job"
              actionHref="/dashboard/recruiter/post-job"
            />
          ) : (
            <div className="bg-card/70 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-foreground/5 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Job Title</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Location</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Applicants</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Posted</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, index) => (
                      <motion.tr
                        key={job._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border last:border-0 hover:bg-foreground/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-foreground">{job.title}</p>
                            <p className="text-xs text-foreground/60 mt-0.5">{job.company}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-foreground/70">
                            <svg className="w-4 h-4 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">
                                {applications.filter(a => a.job?._id === job._id).length}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusDropdown 
                            jobId={job._id}
                            currentStatus={job.status || "Open"} 
                          />
                        </td>
                        <td className="px-6 py-4 text-foreground/70">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(job.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/jobs/details/${job._id}`}
                              className="p-2 rounded-lg hover:bg-foreground/10 transition-colors group"
                              title="View Job"
                            >
                              <svg className="w-5 h-5 text-foreground/60 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </Link>
                            <button
                              className="p-2 rounded-lg hover:bg-foreground/10 transition-colors group"
                              title="Edit Job"
                            >
                              <svg className="w-5 h-5 text-foreground/60 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Section>

        {/* APPLICATIONS */}
        <Section title="Recent Applications" icon="📥" index={6}>
          {applications.length === 0 ? (
            <EmptyState 
              icon="📥"
              title="No Applications Yet"
              description="Applications will appear here once candidates start applying"
              actionLabel="View All Jobs"
              actionHref="/jobs"
            />
          ) : (
            <div className="bg-card/70 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-foreground/5 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Candidate</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Job</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Resume</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.slice(0, 10).map((app, index) => (
                      <motion.tr
                        key={app._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border last:border-0 hover:bg-foreground/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">
                                {app.applicantEmail?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{app.applicantEmail}</p>
                              <p className="text-xs text-foreground/60">Candidate</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-foreground">{app.job?.title || "—"}</p>
                          <p className="text-xs text-foreground/60">{app.job?.company || ""}</p>
                        </td>
                        <td className="px-6 py-4">
                          {app.resumeLink ? (
                            <a
                              href={app.resumeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold transition-all"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Resume
                            </a>
                          ) : (
                            <span className="text-xs text-foreground/50">Not uploaded</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={app.status}
                            onChange={async (e) => {
                              const newStatus = e.target.value;

                              await fetch(`/api/applications/${app._id}`, {
                                method: "PATCH",
                                credentials: "include",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ status: newStatus }),
                              });

                              const updated = applications.map((a) =>
                                a._id === app._id ? { ...a, status: newStatus } : a
                              );

                              setApplications(updated);
                              recalcStats(jobs, updated);
                            }}
                            className={`px-3 py-2 rounded-lg border text-sm font-semibold cursor-pointer transition-all ${
                              app.status === "Applied"
                                ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                : app.status === "Under Review"
                                ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                : app.status === "Accepted"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }`}
                          >
                            <option value="Applied">Applied</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-foreground/70">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(app.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {applications.length > 10 && (
                <div className="p-4 border-t border-border text-center">
                  <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    View All {applications.length} Applications →
                  </button>
                </div>
              )}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, icon, children, index = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="mb-10"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function StatCard({ title, value, index = 0 }) {
  const config = {
    "Active Jobs": {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    "Applications": {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    "Applied": {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    "Under Review": {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    "Accepted": {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
  };

  const cfg = config[title] || config["Applications"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.2 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative bg-card/70 backdrop-blur-sm border ${cfg.border} rounded-xl p-6 overflow-hidden group transition-all duration-300`}
    >
      <div className={`absolute inset-0 ${cfg.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center ${cfg.color} group-hover:scale-110 transition-transform duration-300`}>
            {cfg.icon}
          </div>
        </div>

        <div className={`text-4xl font-bold ${cfg.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
          {value}
        </div>

        <p className="text-sm text-foreground/60 font-medium">{title}</p>
      </div>

      <div className={`absolute bottom-0 right-0 w-20 h-20 ${cfg.bg} rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </motion.div>
  );
}

function StatusDropdown({ jobId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);

  return (
    <select
      value={status}
      onChange={(e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        console.log("Job status changed to:", newStatus, "for job:", jobId);
      }}
      className={`px-3 py-2 pr-8 rounded-lg text-sm font-semibold cursor-pointer border transition-all ${
        status === "Open"
          ? "text-green-500 bg-green-500/10 border-green-500/20"
          : "text-red-500 bg-red-500/10 border-red-500/20"
      }`}
    >
      <option value="Open">Open</option>
      <option value="Closed">Closed</option>
    </select>
  );
}

function EmptyState({ icon, title, description, actionLabel, actionHref }) {
  return (
    <div className="text-center py-20 px-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-foreground/60 mb-6 max-w-md mx-auto">{description}</p>
      <Link
        href={actionHref}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all"
      >
        {actionLabel}
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  );
}