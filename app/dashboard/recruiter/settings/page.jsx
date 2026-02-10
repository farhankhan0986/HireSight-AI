"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RecruiterSettingsPage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    hiringLocations: "",
    defaultJobType: "Full-time",
    autoCloseDays: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();

        if (!data.loggedIn || data.role !== "recruiter") {
          setLoading(false);
          return;
        }

        setUser(data);
        setFormData({
          name: data.name || "",
          companyName: data.companyName || "",
          companyWebsite: data.companyWebsite || "",
          companyDescription: data.companyDescription || "",
          hiringLocations: data.hiringLocations || "",
          defaultJobType: data.defaultJobType || "Full-time",
          autoCloseDays: data.autoCloseDays || "",
        });
      } catch (err) {
        console.error("Settings load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const tabs = [
    { id: "account", label: "Account", icon: "👤" },
    { id: "company", label: "Company", icon: "🏢" },
    { id: "hiring", label: "Hiring", icon: "💼" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "privacy", label: "Privacy", icon: "🛡️" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 w-80 bg-foreground/10 rounded-lg mb-8 animate-pulse" />
          <div className="flex gap-2 border-b border-border mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 w-32 bg-foreground/10 rounded-t-lg animate-pulse" />
            ))}
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card/50 border border-border/50 rounded-xl p-8 animate-pulse">
                <div className="h-6 w-48 bg-foreground/10 rounded mb-4" />
                <div className="space-y-4">
                  <div className="h-10 w-full bg-foreground/10 rounded" />
                  <div className="h-10 w-full bg-foreground/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <Link
              href="/dashboard/recruiter"
              className="w-10 h-10 rounded-lg border border-border hover:border-primary/30 hover:bg-foreground/5 transition-all flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Recruiter Settings
              </h1>
              <p className="text-foreground/60 mt-1">
                Manage your account, company profile, and hiring preferences
              </p>
            </div>
          </div>
        </motion.div>

        {/* TABS */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="mb-8 overflow-x-auto"
        >
          <div className="flex gap-2 border-b border-border min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/60 hover:text-foreground hover:border-border"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* CONTENT */}
        <div className="space-y-6">
          {activeTab === "account" && (
            <Section
              title="Account Settings"
              icon="👤"
              description="Basic account information and password management"
              index={0}
            >
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input 
                    label="Full Name" 
                    value={formData.name}
                    onChange={handleInputChange("name")}
                    icon="user"
                  />
                  <Input 
                    label="Email Address" 
                    value={user?.email || ""} 
                    icon="mail"
                    disabled 
                  />
                </div>

                <Divider />

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
                  <PasswordInput label="Current Password" />
                  <div className="grid sm:grid-cols-2 gap-6">
                    <PasswordInput label="New Password" />
                    <PasswordInput label="Confirm New Password" />
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-600">
                    <p className="font-semibold mb-1">Password Requirements:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>At least 8 characters long</li>
                      <li>Include uppercase and lowercase letters</li>
                      <li>Include at least one number</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <PrimaryButton label="Update Password" />
                  <SecondaryButton label="Cancel" />
                </div>
              </div>
            </Section>
          )}

          {activeTab === "company" && (
            <Section
              title="Company Profile"
              icon="🏢"
              description="Information visible to candidates"
              index={0}
            >
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input 
                    label="Company Name" 
                    value={formData.companyName}
                    onChange={handleInputChange("companyName")}
                    placeholder="e.g. HireSight AI" 
                    icon="building"
                  />
                  <Input 
                    label="Company Website" 
                    value={formData.companyWebsite}
                    onChange={handleInputChange("companyWebsite")}
                    placeholder="https://company.com" 
                    icon="globe"
                  />
                </div>

                <Textarea
                  label="Company Description"
                  value={formData.companyDescription}
                  onChange={handleInputChange("companyDescription")}
                  placeholder="Brief description about your company, culture, and mission"
                />

                <Input
                  label="Hiring Locations"
                  value={formData.hiringLocations}
                  onChange={handleInputChange("hiringLocations")}
                  placeholder="Remote, Bangalore, Delhi"
                  icon="location"
                />

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1">Company Branding</p>
                      <p className="text-xs text-foreground/70">A complete company profile helps attract better candidates and builds trust</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <PrimaryButton label="Save Company Profile" />
                  <SecondaryButton label="Cancel" />
                </div>
              </div>
            </Section>
          )}

          {activeTab === "hiring" && (
            <>
              <Section
                title="Hiring Preferences"
                icon="💼"
                description="Default job and screening preferences"
                index={0}
              >
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Select
                      label="Default Job Type"
                      value={formData.defaultJobType}
                      onChange={handleInputChange("defaultJobType")}
                      options={["Full-time", "Part-time", "Contract", "Internship", "Remote"]}
                    />
                    <Input 
                      label="Auto-close Job After (days)" 
                      value={formData.autoCloseDays}
                      onChange={handleInputChange("autoCloseDays")}
                      placeholder="e.g. 30" 
                      icon="calendar"
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <Toggle 
                      label="Enable AI Resume Screening" 
                      disabled={true}
                      badge="Coming Soon"
                    />
                    <p className="text-xs text-foreground/60 mt-2 ml-6">
                      Automatically screen and rank candidates based on job requirements
                    </p>
                  </div>

                  <PrimaryButton label="Save Preferences" />
                </div>
              </Section>

              <Section
                title="Application Settings"
                icon="⚙️"
                description="Configure how you receive and manage applications"
                index={1}
              >
                <div className="space-y-4">
                  <Toggle label="Require resume for all applications" defaultChecked />
                  <Toggle label="Allow candidates to apply multiple times" />
                  <Toggle label="Auto-acknowledge applications" defaultChecked />
                </div>
              </Section>
            </>
          )}

          {activeTab === "notifications" && (
            <Section
              title="Notification Preferences"
              icon="🔔"
              description="Control how you receive updates"
              index={0}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Application Updates</h3>
                  <div className="space-y-4">
                    <Toggle label="New Application Alerts" defaultChecked />
                    <Toggle label="Application Status Changes" defaultChecked />
                    <Toggle label="Daily Application Summary" />
                  </div>
                </div>

                <Divider />

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Candidate Interactions</h3>
                  <div className="space-y-4">
                    <Toggle label="Shortlisted Candidate Alerts" defaultChecked />
                    <Toggle label="Interview Reminders" defaultChecked />
                    <Toggle label="Candidate Messages" defaultChecked />
                  </div>
                </div>

                <Divider />

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Job Postings</h3>
                  <div className="space-y-4">
                    <Toggle label="Job Expiration Reminders" defaultChecked />
                    <Toggle label="Job Performance Insights" />
                    <Toggle label="Weekly Analytics Report" />
                  </div>
                </div>
              </div>
            </Section>
          )}

          {activeTab === "privacy" && (
            <>
              <Section
                title="Privacy & Visibility"
                icon="👁️"
                description="Control company visibility and contact"
                index={0}
              >
                <div className="space-y-4">
                  <Toggle label="Show Company Profile Publicly" defaultChecked />
                  <Toggle label="Allow Candidates to Message" defaultChecked />
                  <Toggle label="Display Company Name in Job Listings" defaultChecked />
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-600">
                    ⚠️ Disabling public profile may reduce visibility to potential candidates
                  </div>
                </div>
              </Section>

              <Section
                title="Data & Privacy"
                icon="🔐"
                description="Manage your data and account"
                index={1}
              >
                <div className="space-y-4">
                  <button className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-border hover:border-primary/30 hover:bg-foreground/5 transition-all text-sm font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download My Data
                  </button>
                  <button className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all text-sm font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Account
                  </button>
                </div>
              </Section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Section({ title, icon, description, children, index = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-card/70 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8 space-y-6"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <span className="text-2xl">{icon}</span>
        <div>
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-foreground/60 mt-1">{description}</p>
          )}
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function Input({ label, value, placeholder, disabled, icon, onChange }) {
  const icons = {
    user: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    mail: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    building: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    globe: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    location: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    calendar: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
            {icons[icon]}
          </div>
        )}
        <input
          value={value || ""}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={disabled}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
            icon ? "pl-11" : ""
          }`}
        />
      </div>
    </div>
  );
}

function Textarea({ label, value, placeholder, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <textarea
        value={value || ""}
        placeholder={placeholder}
        onChange={onChange}
        rows={4}
        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
      />
    </div>
  );
}

function PasswordInput({ label }) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 pr-11 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
        >
          {show ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <select
        value={value || options[0]}
        onChange={onChange}
        className="px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({ label, defaultChecked = false, disabled = false, badge }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className={`flex items-center justify-between ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"}`}>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
          {label}
        </span>
        {badge && (
          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-600 text-[10px] font-bold border border-yellow-500/30">
            {badge}
          </span>
        )}
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setChecked(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-foreground/20"
        } ${disabled ? "cursor-not-allowed" : ""}`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

function Divider() {
  return <hr className="border-border/50" />;
}

function PrimaryButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {label}
    </button>
  );
}

function SecondaryButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-3 rounded-xl border-2 border-border hover:border-primary/30 hover:bg-foreground/5 transition-all font-semibold"
    >
      {label}
    </button>
  );
}