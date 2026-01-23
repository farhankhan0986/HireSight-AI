"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";

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
      alert("Application submitted");
    }
  };

  if (loading) {
  return (
    <div className="min-h-screen px-6 py-8 bg-background animate-pulse">
      <h1 className="mb-6 text-3xl font-bold text-primary">
        Job Openings
      </h1>

      <div className="grid gap-5 max-w-6xl">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-2xl p-5"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div className="h-5 w-56 bg-foreground/10 rounded-md" />
              <div className="h-5 w-20 bg-primary/10 rounded-full" />
            </div>

            {/* Company + Location */}
            <div className="mt-3 flex gap-3">
              <div className="h-4 w-32 bg-foreground/10 rounded-md" />
              <div className="h-4 w-24 bg-foreground/10 rounded-md" />
            </div>

            {/* Skills */}
            <div className="flex gap-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-16 bg-foreground/10 rounded-lg"
                />
              ))}
            </div>

            {/* Description */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full bg-foreground/10 rounded-md" />
              <div className="h-4 w-5/6 bg-foreground/10 rounded-md" />
              <div className="h-4 w-4/6 bg-foreground/10 rounded-md" />
            </div>

            {/* Buttons */}
            <div className="mt-5 flex gap-3 justify-end">
              <div className="h-9 w-28 bg-foreground/10 rounded-xl" />
              <div className="h-9 w-32 bg-primary/20 rounded-xl" />
            </div>

            {/* Footer */}
            <div className="mt-4 h-3 w-24 bg-foreground/10 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}


  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-background">
      <h1 className="mb-6 text-3xl font-bold text-primary">Job Openings</h1>

      {jobs.length === 0 ? (
        <p className="text-foreground/70">No jobs available right now.</p>
      ) : (
        <>
          {/* JOB LIST */}
          <div className="grid gap-5 max-w-6xl">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-foreground hover:text-primary">
                    {job.title}
                  </h2>

                  {job.salaryRange && (
                    <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                      ₹{job.salaryRange}
                    </span>
                  )}
                </div>

                {/* Company + Location */}
                <div className="flex gap-2 items-center mt-1 text-sm text-foreground/60">
                  <span>{job.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CiLocationOn />
                    {job.location}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-lg bg-foreground/5 text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Description + Buttons */}
                <div className="mt-4 flex justify-between items-end gap-4">
                  <p className="text-sm text-foreground/80 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex gap-2 shrink-0">
                    <Link
                      href={`/jobs/details/${job._id}`}
                      className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-foreground/5 transition"
                    >
                      View Details
                    </Link>

                    {!user ? (
                      <Link
                        href="/login"
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-white hover:bg-accent transition"
                      >
                        Login to Apply
                      </Link>
                    ) : !user.resume ? (
                      <Link
                        href="/dashboard/settings"
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition"
                      >
                        Upload Resume
                      </Link>
                    ) : (
                      <button
                        onClick={() => applyToJob(job._id)}
                        className="px-4 py-2 rounded-xl bg-primary cursor-pointer text-white hover:bg-accent"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 text-xs text-foreground/50">
                  Posted{" "}
                  {Math.ceil(
                    (Date.now() - new Date(job.createdAt)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days ago
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex gap-2 mt-10 flex-wrap items-center">
            {/* FIRST */}
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg border text-sm disabled:opacity-50 hover:bg-primary/10 border-border cursor-pointer text-foreground"
            >
              « First
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg border text-sm transition
                    ${
                      page === pageNum
                        ? "bg-primary text-white border-primary"
                        : "bg-background hover:bg-primary/10 border-border cursor-pointer text-foreground"
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* LAST */}
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg border text-sm disabled:opacity-50 hover:bg-primary/10 border-border cursor-pointer text-foreground"
            >
              Last »
            </button>
          </div>
        </>
      )}
    </div>
  );
}
