"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    Applied: 0,
    Accepted: 0,
    "Under Review": 0,
    Rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const meRes = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const me = await meRes.json();

        if (!me.loggedIn) {
          setLoading(false);
          return;
        }

        setUser(me);

        const appRes = await fetch(
          `/api/applications?email=${me.email}`,
          { credentials: "include" }
        );
        const data = await appRes.json();
        setApplications(data);

        const counts = {
          Applied: 0,
          Accepted: 0,
          "Under Review": 0,
          Rejected: 0,
        };

        data.forEach((a) => {
          if (counts[a.status] !== undefined) {
            counts[a.status]++;
          }
        });

        setStats(counts);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  /* ---------------- LOADING SKELETON ---------------- */
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-foreground/10 rounded-lg" />
                  <div className="h-6 w-16 bg-foreground/10 rounded" />
                </div>
                <div className="h-8 w-16 bg-primary/20 rounded mb-2" />
                <div className="h-4 w-24 bg-foreground/10 rounded" />
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div>
            <div className="h-8 w-48 bg-foreground/10 rounded-lg mb-6 animate-pulse" />
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
      </div>
    );
  }

  const totalApplications = Object.values(stats).reduce((a, b) => a + b, 0);
  const successRate = totalApplications > 0 ? Math.round((stats.Accepted / totalApplications) * 100) : 0;

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
                {user?.name || "User"}
              </span>
              👋
            </h1>
            <p className="text-base text-foreground/60">
              Track your job applications and career progress
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/jobs"
              className="px-5 py-2.5 rounded-lg border-2 border-border hover:border-primary/30 bg-background text-foreground font-semibold hover:bg-foreground/5 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Jobs
            </Link>
            <Link
              href="/dashboard/settings"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </div>
        </motion.div>

        {/* QUICK STATS BANNER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6 mb-10 overflow-hidden border border-primary/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-foreground">{totalApplications}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-green-500">{successRate}%</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-sm text-foreground/60 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-yellow-500">{stats["Under Review"]}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Applied" value={stats.Applied} index={0} />
          <StatCard title="Accepted" value={stats.Accepted} index={1} />
          <StatCard title="Under Review" value={stats["Under Review"]} index={2} />
          <StatCard title="Rejected" value={stats.Rejected} index={3} />
        </div>

        {/* APPLICATIONS */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={5}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              My Applications
            </h2>
            {applications.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                {applications.length} total
              </span>
            )}
          </div>

          <div className="bg-card/70 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
            {applications.length === 0 ? (
              <div className="text-center py-20 px-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Applications Yet</h3>
                <p className="text-foreground/60 mb-6 max-w-md mx-auto">
                  Start your job search journey by exploring opportunities and applying to positions that match your skills
                </p>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-foreground/5 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Job Details</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Company</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Applied</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, index) => (
                      <motion.tr
                        key={app._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border last:border-0 hover:bg-foreground/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-foreground hover:text-primary transition-colors">
                              {app.job?.title || "—"}
                            </p>
                            <p className="text-xs text-foreground/60 mt-0.5">
                              {app.job?.location || "Location not specified"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-foreground font-medium">{app.job?.company || "—"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusPill status={app.status} />
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
                        <td className="px-6 py-4">
                          <Link
                            href={`/jobs/details/${app.job?._id}`}
                            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
                          >
                            View Job
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, index }) {
  const config = {
    Applied: {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      trend: "+2 this week"
    },
    Accepted: {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      trend: "Great job!"
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
      trend: "In progress"
    },
    Rejected: {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      trend: "Keep trying"
    },
  };

  const cfg = config[title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.2 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative bg-card/70 backdrop-blur-sm border ${cfg.border} rounded-xl p-6 overflow-hidden group transition-all duration-300`}
    >
      {/* Hover gradient */}
      <div className={`absolute inset-0 ${cfg.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative">
        {/* Icon and Trend */}
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center ${cfg.color} group-hover:scale-110 transition-transform duration-300`}>
            {cfg.icon}
          </div>
          <span className="text-xs text-foreground/50">{cfg.trend}</span>
        </div>

        {/* Value */}
        <div className={`text-4xl font-bold ${cfg.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
          {value}
        </div>

        {/* Title */}
        <p className="text-sm text-foreground/60 font-medium">{title}</p>
      </div>

      {/* Corner accent */}
      <div className={`absolute bottom-0 right-0 w-20 h-20 ${cfg.bg} rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </motion.div>
  );
}

function StatusPill({ status }) {
  const config = {
    Applied: {
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      border: "border-blue-500/20",
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
    },
    Accepted: {
      bg: "bg-green-500/10",
      text: "text-green-500",
      border: "border-green-500/20",
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
    },
    "Under Review": {
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
      border: "border-yellow-500/20",
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
    },
    Rejected: {
      bg: "bg-red-500/10",
      text: "text-red-500",
      border: "border-red-500/20",
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
    },
  };

  const cfg = config[status] || config.Applied;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
      {cfg.icon}
      {status}
    </span>
  );
}