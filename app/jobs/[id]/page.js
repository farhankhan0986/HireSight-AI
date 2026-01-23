"use client";
import { useEffect, useState, use as useReact } from "react";

export default function JobDetailsPage({ params }) {
  // ✅ unwrap params promise (future-proof)
  const { id } = useReact(params);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [applyMsg, setApplyMsg] = useState("");

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
    setApplyMsg("");

    if (!email) {
      setApplyMsg("Please enter your email");
      return;
    }

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: id,
        applicantEmail: email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setApplyMsg(data.error || "Failed to apply");
      return;
    }

    setApplyMsg("Application submitted successfully!");
    setEmail("");
  };

  if (loading) return <p className="p-6 text-foreground/70">Loading…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen px-6 py-8 bg-background">
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-primary">{job.title}</h1>
        <p className="text-foreground/70">{job.company}</p>
        <p className="text-sm text-foreground/50">{job.location}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills?.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs rounded-lg bg-primary/10 text-primary"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Job Description</h2>
          <p className="text-sm whitespace-pre-line">{job.description}</p>
        </div>

        {job.salaryRange && (
          <p className="mt-4 font-medium">Salary: ₹{job.salaryRange}</p>
        )}

        <div className="mt-8 border-t pt-6">
          <h3 className="font-semibold mb-3">Apply for this job</h3>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full p-3 rounded-xl border mb-3"
          />

          <button
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-primary text-white"
          >
            Apply
          </button>

          {applyMsg && <p className="mt-3 text-sm">{applyMsg}</p>}
        </div>
      </div>
    </div>
  );
}
