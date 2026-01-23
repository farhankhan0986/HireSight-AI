"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-12 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="h-8 w-64 bg-foreground/10 rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 space-y-3"
              >
                <div className="h-4 w-24 bg-foreground/10 rounded" />
                <div className="h-8 w-12 bg-primary/20 rounded" />
              </div>
            ))}
          </div>
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
              <span className="ml-2 text-primary">{user?.name}</span>
            </h1>
            <p className="text-sm text-foreground/60 mt-1">
              Recruiter dashboard overview
            </p>
          </div>

          <Link
            href="/dashboard/recruiter/settings"
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition w-fit"
          >
            Settings
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-14">
          <StatCard title="Active Jobs" value={stats.activeJobs} icon="📌" />
          <StatCard
            title="Applications"
            value={stats.totalApplications}
            icon="📥"
          />
          <StatCard title="Applied" value={stats.applied} icon="📝" />
          <StatCard title="Under Review" value={stats.underReview} icon="⏳" />
          <StatCard title="Rejected" value={stats.rejected} icon="❌" />
        </div>

        {/* JOBS */}
        <Section title="My Job Postings">
          <Table headers={["Title", "Location", "Status", "Created"]}>
            {jobs.length === 0 ? (
              <EmptyRow text="No jobs posted yet" />
            ) : (
              jobs.map((job) => (
                <Row key={job._id}>
                  <Cell bold>{job.title}</Cell>
                  <Cell>{job.location}</Cell>
                  {/* <Cell>
                    <StatusPill status={job.status || "Open"} />
                  </Cell> */}
                  <Cell>
                    <StatusDropdown status={job.status || "Open"} />
                  </Cell>

                  <Cell>{new Date(job.createdAt).toLocaleDateString()}</Cell>
                </Row>
              ))
            )}
          </Table>
        </Section>

        {/* APPLICATIONS */}
        <Section title="Recent Applications">
          <Table
            headers={["Candidate", "Job", "Resume", "Status", "Applied On"]}
          >
            {applications.length === 0 ? (
              <EmptyRow text="No applications yet" />
            ) : (
              applications.map((app) => (
                <Row key={app._id}>
                  {/* Candidate */}
                  <Cell>{app.applicantEmail}</Cell>

                  {/* Job */}
                  <Cell>{app.job?.title || "—"}</Cell>

                  {/* Resume */}
                  <Cell>
                    {app.resumeLink ? (
                      <a
                        href={app.resumeLink}
                        target="_blank"
                        className="px-3 py-1 text-sm font-medium bg-primary rounded-lg text-white hover:bg-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-foreground/50 relative -right-3 text-sm">
                        Not uploaded
                      </span>
                    )}
                  </Cell>

                  {/* Status */}
                  <Cell>
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
                      className="px-3 py-1 rounded-lg border border-border bg-background text-sm focus:outline-none"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </Cell>

                  {/* Date */}
                  <Cell>{new Date(app.createdAt).toLocaleDateString()}</Cell>
                </Row>
              ))
            )}
          </Table>
        </Section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-center items-center gap-4">
      {/* <span className="text-2xl">{icon}</span> */}
      <p className="text-lg text-foreground/60">{title}</p>
      <div>
        <p className="text-3xl font-bold text-primary">{value}</p>
      </div>
    </div>
  );
}

function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto bg-card border border-border rounded-2xl mb-14">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-foreground/5 text-left">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-6 py-4 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Row({ children }) {
  return (
    <tr className="border-t border-border hover:bg-foreground/5 transition">
      {children}
    </tr>
  );
}

function EmptyRow({ text }) {
  return (
    <tr>
      <td colSpan="4" className="px-6 py-12 text-center text-foreground/60">
        {text}
      </td>
    </tr>
  );
}

function Cell({ children, bold }) {
  return (
    <td className={`px-6 py-4 ${bold ? "font-medium text-primary" : ""}`}>
      {children}
    </td>
  );
}

function StatusPill({ status }) {
  const styles = {
    Open: "bg-blue-500/10 text-blue-500",
    Applied: "bg-white/10 text-white",
    "Under Review": "bg-yellow-500/10 text-yellow-500",
    Accepted: "bg-green-500/10 text-green-500",
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

function StatusDropdown({ status }) {
  const isOpen = status === "Open";

  return (
    <div className="relative inline-block">
      <select
        defaultValue={status}
        className={`
          px-3 py-1.5 pr-8 rounded-lg text-xs font-medium cursor-pointer
          border border-border bg-background
          focus:outline-none
          ${
            isOpen
              ? "text-blue-500 bg-blue-500/10"
              : "text-gray-400 bg-gray-400/10"
          }
        `}
        onChange={(e) => {
          const newStatus = e.target.value;
          console.log("Job status changed to:", newStatus);
        }}
      >
        <option className="bg-background text-white" value="Open">Open</option>
        <option className="bg-background text-white" value="Closed">Closed</option>
      </select>
    </div>
  );
}
