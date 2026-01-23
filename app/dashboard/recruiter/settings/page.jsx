"use client";

import { useEffect, useState } from "react";

export default function RecruiterSettingsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      const data = await res.json();

      if (!data.loggedIn || data.role !== "recruiter") return;
      setUser(data);
    };

    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-primary">
            Recruiter Settings
          </h1>
          <p className="text-sm text-foreground/60 mt-1">
            Manage your account, company profile, and hiring preferences
          </p>
        </div>

        {/* ACCOUNT */}
        <Section
          title="Account Settings"
          description="Basic account information and password management"
        >
          <Input label="Name" value={user?.name || ""} />
          <Input label="Email" value={user?.email || ""} disabled />

          <Divider />

          <PasswordInput label="Current Password" />
          <PasswordInput label="New Password" />
          <PasswordInput label="Confirm New Password" />

          <PrimaryButton label="Update Password" />
        </Section>

        {/* COMPANY */}
        <Section
          title="Company Profile"
          description="Information visible to candidates"
        >
          <Input label="Company Name" placeholder="e.g. HireSight AI" />
          <Input label="Company Website" placeholder="https://company.com" />
          <Textarea
            label="Company Description"
            placeholder="Brief description about your company, culture, and mission"
          />
          <Input
            label="Hiring Locations"
            placeholder="Remote, Bangalore, Delhi"
          />

          <PrimaryButton label="Save Company Profile" />
        </Section>

        {/* HIRING PREFS */}
        <Section
          title="Hiring Preferences"
          description="Default job and screening preferences"
        >
          <Select
            label="Default Job Type"
            options={["Full-time", "Internship", "Contract"]}
          />
          <Input label="Auto-close Job After (days)" placeholder="e.g. 30" />
          <Toggle label="Enable AI Resume Screening (Coming Soon)" />
        </Section>

        {/* NOTIFICATIONS */}
        <Section
          title="Notifications"
          description="Control how you receive updates"
        >
          <Toggle label="New Application Alerts" />
          <Toggle label="Shortlisted Candidate Alerts" />
          <Toggle label="Interview Reminders" />
        </Section>

        {/* PRIVACY */}
        <Section
          title="Privacy & Visibility"
          description="Control company visibility and contact"
        >
          <Toggle label="Show Company Profile Publicly" />
          <Toggle label="Allow Candidates to Message" />
        </Section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, description, children }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-foreground/60 mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function Input({ label, value = "", placeholder, disabled }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-foreground/70">{label}</label>
      <input
        suppressHydrationWarning
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={disabled}
        autoComplete="off"
        onChange={() => {}}
        className="
          px-4 py-2 rounded-xl
          border border-border
          bg-background text-foreground
          focus:outline-none focus:ring-2 focus:ring-primary/40
          disabled:opacity-60
        "
      />
    </div>
  );
}

function Textarea({ label, value = "", placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-foreground/70">{label}</label>
      <textarea
        suppressHydrationWarning
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={() => {}}
        rows={4}
        className="
          px-4 py-2 rounded-xl
          border border-border
          bg-background text-foreground
          resize-none
          focus:outline-none focus:ring-2 focus:ring-primary/40
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
      <label className="text-sm text-foreground/70">{label}</label>
      <select
        suppressHydrationWarning
        autoComplete="off"
        className="
          px-4 py-2 rounded-xl
          border border-border
          bg-background text-foreground
          focus:outline-none focus:ring-2 focus:ring-primary/40
        "
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Toggle({ label }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-foreground">{label}</span>
      <input
        type="checkbox"
        className="h-5 w-5 accent-primary cursor-pointer"
      />
    </div>
  );
}

function Divider() {
  return <hr className="border-border" />;
}

function PrimaryButton({ label }) {
  return (
    <button
      type="button"
      suppressHydrationWarning
      autoComplete="off"
      className="
        mt-2 w-fit
        px-6 py-2 rounded-xl
        bg-primary text-white font-semibold
        hover:bg-accent transition
        cursor-pointer
      "
    >
      {label}
    </button>
  );
}
