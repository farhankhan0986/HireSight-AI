"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RecruiterApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/applications", {
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          setError("Failed to load applications");
          return;
        }

        setApplications(data);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const updateApplicationStatus = async (appId, newStatus) => {
    try {
      await fetch(`/api/applications/${appId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setApplications(applications.map((a) =>
        a._id === appId ? { ...a, status: newStatus } : a
      ));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch = 
      app.applicantEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "Applied").length,
    underReview: applications.filter((a) => a.status === "Under Review").length,
    accepted: applications.filter((a) => a.status === "Accepted").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-3">
              <div className="h-10 w-80 bg-foreground/10 rounded-lg animate-pulse" />
              <div className="h-5 w-64 bg-foreground/10 rounded-lg animate-pulse" />
            </div>
            <div className="h-12 w-32 bg-primary/20 rounded-xl animate-pulse" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-card/50 border border-border/50 rounded-xl p-4 animate-pulse">
                <div className="h-8 w-16 bg-primary/20 rounded mb-2" />
                <div className="h-4 w-24 bg-foreground/10 rounded" />
              </div>
            ))}
          </div>

          {/* Cards Skeleton */}
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-card/50 border border-border/50 rounded-xl p-6 animate-pulse">
                <div className="h-6 w-64 bg-foreground/10 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-48 bg-foreground/10 rounded" />
                  <div className="h-4 w-32 bg-foreground/10 rounded" />
                </div>
              </div>
            ))}
          </div>
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
          <h2 className="text-xl font-bold text-foreground mb-2">Something went wrong</h2>
          <p className="text-foreground/60 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Applications
              </span>
            </h1>
            <p className="text-foreground/60">
              Manage and review candidate applications
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard/recruiter"
              className="px-5 py-2.5 rounded-lg border-2 border-border hover:border-primary/30 bg-background text-foreground font-semibold hover:bg-foreground/5 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/dashboard/recruiter/post-job"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post Job
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <StatCard title="Total" value={stats.total} color="primary" />
          <StatCard title="Applied" value={stats.applied} color="blue" />
          <StatCard title="Under Review" value={stats.underReview} color="yellow" />
          <StatCard title="Accepted" value={stats.accepted} color="green" />
          <StatCard title="Rejected" value={stats.rejected} color="red" />
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by candidate or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {["all", "Applied", "Under Review", "Accepted", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  filter === status
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-card border border-border hover:border-primary/30 text-foreground/70"
                }`}
              >
                {status === "all" ? "All" : status}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Applications */}
        {filteredApplications.length === 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="text-center py-20 px-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {searchTerm || filter !== "all" ? "No matches found" : "No applications yet"}
            </h3>
            <p className="text-foreground/60 mb-6 max-w-md mx-auto">
              {searchTerm || filter !== "all" 
                ? "Try adjusting your filters or search term"
                : "Applications will appear here once candidates start applying to your jobs"}
            </p>
            {!searchTerm && filter === "all" && (
              <Link
                href="/dashboard/recruiter/post-job"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Post Your First Job
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card/70 backdrop-blur-sm border border-border hover:border-primary/30 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left: Application Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">
                          {app.applicantEmail?.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1 truncate">
                          {app.job?.title || "Job removed"}
                        </h2>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60 mb-3">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                            </svg>
                            {app.job?.company || "N/A"}
                          </div>
                          <span className="text-foreground/30">•</span>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {app.applicantEmail}
                          </div>
                          <span className="text-foreground/30">•</span>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(app.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>

                        {/* Resume Link */}
                        {app.resumeLink && (
                          <a
                            href={app.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Resume
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Status */}
                  <div className="flex items-center gap-3">
                    <select
                      value={app.status}
                      onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                      className={`px-4 py-2.5 rounded-lg border text-sm font-semibold cursor-pointer transition-all ${
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Results count */}
        {filteredApplications.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-sm text-foreground/60 mt-6"
          >
            Showing {filteredApplications.length} of {applications.length} applications
          </motion.p>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, color }) {
  const colors = {
    primary: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/20",
    },
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      border: "border-blue-500/20",
    },
    yellow: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
      border: "border-yellow-500/20",
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-500",
      border: "border-green-500/20",
    },
    red: {
      bg: "bg-red-500/10",
      text: "text-red-500",
      border: "border-red-500/20",
    },
  };

  const cfg = colors[color] || colors.primary;

  return (
    <div className={`${cfg.bg} border ${cfg.border} rounded-xl p-4 hover:scale-105 transition-transform duration-300`}>
      <div className={`text-3xl font-bold ${cfg.text} mb-1`}>{value}</div>
      <div className="text-sm text-foreground/60 font-medium">{title}</div>
    </div>
  );
}