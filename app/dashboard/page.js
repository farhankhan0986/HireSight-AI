"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  /* ---------------- LOADING SKELETON ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-10 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-10">

          <div className="h-8 w-64 bg-foreground/10 rounded-lg" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 space-y-3"
              >
                <div className="h-4 w-20 bg-foreground/10 rounded" />
                <div className="h-8 w-12 bg-primary/20 rounded" />
              </div>
            ))}
          </div>

          <div className="h-6 w-48 bg-foreground/10 rounded" />

          <div className="bg-card border border-border rounded-2xl h-64" />
        </div>
      </div>
    );
  }

  /* ---------------- PAGE ---------------- */

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back,
              <span className="ml-2 text-primary">
                {user?.name || "User"}
              </span>
            </h1>
            <p className="text-sm text-foreground/60 mt-1">
              Track your job applications and progress
            </p>
          </div>

          <Link
            href="/dashboard/settings"
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition w-fit"
          >
            Settings
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard title="Applied" value={stats.Applied} />
          <StatCard title="Accepted" value={stats.Accepted} />
          <StatCard title="Under Review" value={stats["Under Review"]} />
          <StatCard title="Rejected" value={stats.Rejected} />
        </div>

        {/* APPLICATIONS */}
        <h2 className="text-2xl font-semibold mb-4">
          My Applications
        </h2>

        <div className="overflow-x-auto bg-card border border-border rounded-2xl">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-foreground/5 text-left">
              <tr>
                <th className="px-6 py-4">Job Title</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Applied On</th>
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <p className="text-foreground/60 mb-3">
                      You haven’t applied to any jobs yet
                    </p>
                    <Link
                      href="/jobs"
                      className="inline-block px-5 py-2 rounded-xl bg-primary text-white font-medium hover:bg-accent transition"
                    >
                      Browse Jobs
                    </Link>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-t border-border hover:bg-foreground/5 transition"
                  >
                    <td className="px-6 py-4 font-medium text-primary">
                      {app.job?.title || "—"}
                    </td>

                    <td className="px-6 py-4">
                      {app.job?.company || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <StatusPill status={app.status} />
                    </td>

                    <td className="px-6 py-4">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value }) {
  // const icons = {
  //   Applied: "📝",
  //   Accepted: "✅",
  //   "Under Review": "⏳",
  //   Rejected: "❌",
  // };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex justify-center flex-col items-center gap-4">
      {/* <span className="text-2xl">{icons[title]}</span> */}
        <p className="text-lg text-foreground/60">{title}</p>
      <div>
        <p className="text-3xl font-bold text-primary">{value}</p>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const styles = {
    Applied: "bg-white/10 text-white",
    Accepted: "bg-green-500/10 text-green-500",
    "Under Review": "bg-yellow-500/10 text-yellow-500",
    Rejected: "bg-red-500/10 text-red-500",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
