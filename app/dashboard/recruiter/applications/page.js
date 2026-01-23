"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/applications");
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

  if (loading) {
    return <p className="p-6 text-foreground/70">Loading applications…</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">
          Recruiter Dashboard
        </h1>

        <Link
          href="/dashboard/recruiter/post-job"
          className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition"
        >
          + Post Job
        </Link>
      </div>

      {/* Applications */}
      {applications.length === 0 ? (
        <p className="text-foreground/70">No applications yet.</p>
      ) : (
        <div className="grid gap-5 max-w-5xl">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-card border border-border rounded-2xl p-5 shadow-sm"
            >
              {/* Job Title */}
              <h2 className="text-lg font-semibold text-foreground">
                {app.job?.title || "Job removed"}
              </h2>

              {/* Company */}
              <p className="text-sm text-foreground/60 mt-1">
                Company: {app.job?.company || "N/A"}
              </p>

              {/* Applicant */}
              <p className="text-sm mt-2">
                <span className="text-foreground/60">Applicant:</span>{" "}
                <span className="font-medium text-primary">
                  {app.applicantEmail}
                </span>
              </p>

              {/* Status */}
              <p className="text-sm mt-1">
                <span className="text-foreground/60">Status:</span>{" "}
                <span className="font-medium text-accent">
                  {app.status}
                </span>
              </p>

              {/* Date */}
              <p className="text-xs text-foreground/50 mt-3">
                Applied on:{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
