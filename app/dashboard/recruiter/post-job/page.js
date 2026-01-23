"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    skills: "",
    description: "",
    salaryRange: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
    };

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to post job");
      return;
    }

    router.push("/jobs");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-xl bg-card border border-border rounded-2xl p-8 shadow-lg">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-primary mb-2">
          Post a Job
        </h1>
        <p className="text-foreground/70 mb-6">
          Create a new job opening on <span className="text-accent">HireSight-AI</span>
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-500 bg-red-500/10 p-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <input
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Company */}
          <input
            name="company"
            placeholder="Company Name"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Location */}
          <input
            name="location"
            placeholder="Location (e.g. Remote)"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Skills */}
          <input
            name="skills"
            placeholder="Skills (comma separated)"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Job Description"
            rows="4"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Salary */}
          <input
            name="salaryRange"
            placeholder="Salary Range (optional)"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
