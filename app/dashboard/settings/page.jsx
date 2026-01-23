"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    const data = await res.json();
    if (data.loggedIn) setUser(data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-foreground/60 mt-1">
            Manage your account, resume, and preferences
          </p>
        </div>

        {/* RESUME */}
        <Section title="Resume">
          <ResumeUpload
            currentResume={user?.resume}
            onUploaded={loadUser}
          />
        </Section>

        {/* ACCOUNT */}
        <Section title="Account">
          <div className="grid sm:grid-cols-2 gap-6">
            <Input label="Name" value={user?.name || ""} disabled />
            <Input label="Email" value={user?.email || ""} disabled />
          </div>

          <Divider />

          <div className="grid sm:grid-cols-2 gap-6">
            <PasswordInput label="Current Password" />
            <PasswordInput label="New Password" />
            <PasswordInput label="Confirm New Password" />
          </div>

          <PrimaryButton label="Update Password" />
        </Section>

        {/* JOB PREFS */}
        <Section title="Job Preferences">
          <div className="grid sm:grid-cols-2 gap-6">
            <Select
              label="Preferred Job Type"
              options={["Full-time", "Internship", "Remote"]}
            />
            <Input label="Preferred Location" placeholder="Remote, Bangalore" />
          </div>

          <Input label="Skills" placeholder="React, Node.js, MongoDB" />

          <PrimaryButton label="Save Preferences" />
        </Section>

        {/* NOTIFICATIONS */}
        <Section title="Notifications">
          <Toggle label="Email Job Alerts" />
          <Toggle label="Application Status Updates" />
          <Toggle label="Recruiter Messages" />
        </Section>

        {/* PRIVACY */}
        <Section title="Privacy">
          <Toggle label="Make Profile Visible to Recruiters" />
          <Toggle label="Allow Recruiter Contact" />
        </Section>

      </div>
    </div>
  );
}

/* ================= UI BUILDING BLOCKS ================= */

function Section({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-card border border-border rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-xl font-medium tracking-tight">{title}</h2>
      {children}
    </motion.section>
  );
}

function Input({ label, value, placeholder, disabled }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-foreground/60">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={disabled}
        className="
          px-4 py-2 rounded-xl
          border border-border
          bg-background
          focus:outline-none focus:ring-2 focus:ring-primary/40
          disabled:opacity-60
        "
      />
    </div>
  );
}

function PasswordInput({ label }) {
  return <Input label={label} placeholder="••••••••" />;
}

function Select({ label, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-foreground/60">{label}</label>
      <select
        className="
          px-4 py-2 rounded-xl
          border border-border
          bg-background
          focus:outline-none focus:ring-2 focus:ring-primary/40
        "
      >
        {options.map(opt => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Toggle({ label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm">{label}</span>
      <input
        type="checkbox"
        className="h-5 w-5 accent-primary cursor-pointer"
      />
    </label>
  );
}

function Divider() {
  return <hr className="border-border" />;
}

function PrimaryButton({ label }) {
  return (
    <button
      className="
        w-fit px-6 py-2 rounded-xl
        bg-primary text-white font-medium
        hover:bg-accent transition
      "
    >
      {label}
    </button>
  );
}

/* ================= RESUME UPLOAD ================= */

function ResumeUpload({ currentResume, onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch("/api/resume/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      await onUploaded();
      setFile(null);
      alert("Resume uploaded successfully");
    } else {
      alert("Resume upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
  {currentResume && (
    <a
      href={currentResume}
      target="_blank"
      className="text-sm text-primary hover:underline"
    >
      View current resume
    </a>
  )}

  <div>
    <label className="text-xs text-muted">Resume (PDF)</label>

    <label
      className="
        mt-2 flex items-center justify-center gap-3
        cursor-pointer rounded-xl
        border border-dashed border-border
        bg-surface px-4 py-6
        text-sm text-muted
        hover:bg-border transition
      "
    >
      <span>
        {file ? "Change resume" : "Click to upload resume"}
      </span>

      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />
    </label>

    {file && (
      <p className="mt-2 text-xs text-muted">
        Selected: {file.name}
      </p>
    )}
  </div>

  <button
    onClick={uploadResume}
    disabled={loading || !file}
    className="
      px-6 py-2 rounded-xl
      bg-primary text-white font-medium
      hover:bg-accent transition
      disabled:opacity-60 disabled:cursor-not-allowed
    "
  >
    {loading
      ? "Uploading…"
      : currentResume
      ? "Replace Resume"
      : "Upload Resume"}
  </button>
</div>

  );
}
