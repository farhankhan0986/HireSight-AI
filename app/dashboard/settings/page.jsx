"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
    preferredJobType: "Full-time",
    experienceLevel: "Mid Level",
    preferredLocation: "",
    expectedSalary: "",
    skills: "",
  });

  const loadUser = async () => {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    const data = await res.json();
    if (data.loggedIn) {
      setUser(data);
      // Initialize form data with user data
      setFormData({
        name: data.name || "",
        phone: data.phone || "",
        location: data.location || "",
        bio: data.bio || "",
        preferredJobType: data.preferredJobType || "Full-time",
        experienceLevel: data.experienceLevel || "Mid Level",
        preferredLocation: data.preferredLocation || "",
        expectedSalary: data.expectedSalary || "",
        skills: data.skills || "",
      });
    }
  };

  useEffect(() => {
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
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "privacy", label: "Privacy", icon: "🛡️" },
  ];

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
              href="/dashboard"
              className="w-10 h-10 rounded-lg border border-border hover:border-primary/30 hover:bg-foreground/5 transition-all flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Settings
              </h1>
              <p className="text-foreground/60 mt-1">
                Manage your account, resume, and preferences
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
          {activeTab === "profile" && (
            <>
              <Section title="Resume" icon="📄" index={0}>
                <ResumeUpload currentResume={user?.resume} onUploaded={loadUser} />
              </Section>

              <Section title="Personal Information" icon="👤" index={1}>
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
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input 
                    label="Phone Number" 
                    value={formData.phone}
                    onChange={handleInputChange("phone")}
                    placeholder="+91 98765 43210" 
                    icon="phone" 
                  />
                  <Input 
                    label="Location" 
                    value={formData.location}
                    onChange={handleInputChange("location")}
                    placeholder="Bangalore, India" 
                    icon="location" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground/80 mb-2 block">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={handleInputChange("bio")}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none h-32"
                  />
                </div>
                <div className="flex gap-3">
                  <PrimaryButton label="Save Changes" />
                  <SecondaryButton label="Cancel" />
                </div>
              </Section>
            </>
          )}

          {activeTab === "security" && (
            <Section title="Change Password" icon="🔒" index={0}>
              <div className="space-y-6">
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
                    <li>Include at least one special character</li>
                  </ul>
                </div>
                <PrimaryButton label="Update Password" />
              </div>
            </Section>
          )}

          {activeTab === "preferences" && (
            <>
              <Section title="Job Preferences" icon="💼" index={0}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Select
                    label="Preferred Job Type"
                    value={formData.preferredJobType}
                    onChange={handleInputChange("preferredJobType")}
                    options={["Full-time", "Part-time", "Contract", "Internship", "Remote"]}
                  />
                  <Select
                    label="Experience Level"
                    value={formData.experienceLevel}
                    onChange={handleInputChange("experienceLevel")}
                    options={["Entry Level", "Mid Level", "Senior Level", "Lead"]}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input 
                    label="Preferred Location" 
                    value={formData.preferredLocation}
                    onChange={handleInputChange("preferredLocation")}
                    placeholder="Remote, Bangalore, Mumbai" 
                    icon="location" 
                  />
                  <Input 
                    label="Expected Salary (LPA)" 
                    value={formData.expectedSalary}
                    onChange={handleInputChange("expectedSalary")}
                    placeholder="10-15" 
                    icon="currency" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground/80 mb-2 block">Skills</label>
                  <input
                    value={formData.skills}
                    onChange={handleInputChange("skills")}
                    placeholder="React, Node.js, MongoDB, TypeScript..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <p className="text-xs text-foreground/50 mt-2">Separate skills with commas</p>
                </div>
                <PrimaryButton label="Save Preferences" />
              </Section>

              <Section title="Job Alerts" icon="🔍" index={1}>
                <div className="space-y-4">
                  <Toggle label="Email me when new jobs match my preferences" defaultChecked />
                  <Toggle label="Weekly job recommendations digest" defaultChecked />
                  <Toggle label="Similar jobs from applied companies" />
                  <div className="pt-4 border-t border-border">
                    <Select
                      label="Alert Frequency"
                      value="Daily"
                      onChange={() => {}}
                      options={["Immediately", "Daily", "Weekly", "Monthly"]}
                    />
                  </div>
                </div>
              </Section>
            </>
          )}

          {activeTab === "notifications" && (
            <Section title="Notification Preferences" icon="🔔" index={0}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Application Updates</h3>
                  <div className="space-y-4">
                    <Toggle label="Application Status Updates" defaultChecked />
                    <Toggle label="Interview Invitations" defaultChecked />
                    <Toggle label="Application Deadline Reminders" defaultChecked />
                  </div>
                </div>
                <Divider />
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Communication</h3>
                  <div className="space-y-4">
                    <Toggle label="Recruiter Messages" defaultChecked />
                    <Toggle label="Company Updates" />
                    <Toggle label="New Connection Requests" />
                  </div>
                </div>
                <Divider />
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Marketing</h3>
                  <div className="space-y-4">
                    <Toggle label="Product Updates & News" />
                    <Toggle label="Tips & Best Practices" defaultChecked />
                    <Toggle label="Partner Offers" />
                  </div>
                </div>
              </div>
            </Section>
          )}

          {activeTab === "privacy" && (
            <>
              <Section title="Profile Visibility" icon="👁️" index={0}>
                <div className="space-y-4">
                  <Toggle label="Make Profile Visible to Recruiters" defaultChecked />
                  <Toggle label="Show Profile in Search Results" defaultChecked />
                  <Toggle label="Display Application History" />
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-600">
                    ⚠️ Disabling profile visibility may reduce job opportunities from recruiters
                  </div>
                </div>
              </Section>

              <Section title="Contact Preferences" icon="📧" index={1}>
                <div className="space-y-4">
                  <Toggle label="Allow Recruiter Contact" defaultChecked />
                  <Toggle label="Allow Contact from Verified Companies Only" defaultChecked />
                  <Toggle label="Show Email Address on Profile" />
                  <Toggle label="Show Phone Number on Profile" />
                </div>
              </Section>

              <Section title="Data & Privacy" icon="🔐" index={2}>
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

/* ================= UI BUILDING BLOCKS ================= */

function Section({ title, icon, children, index = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-card/70 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8 space-y-6"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
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
    phone: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    location: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    currency: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Toggle({ label, defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
        {label}
      </span>
      <button
        type="button"
        onClick={() => setChecked(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-foreground/20"
        }`}
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

function PrimaryButton({ label, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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

/* ================= RESUME UPLOAD ================= */

function ResumeUpload({ currentResume, onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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
      alert("Resume uploaded successfully! ✅");
    } else {
      alert("Resume upload failed. Please try again.");
    }

    setLoading(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {currentResume && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-600">Resume Uploaded</p>
              <p className="text-xs text-green-600/70">Your resume is active and visible to recruiters</p>
            </div>
          </div>
          <a
            href={currentResume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-600 text-sm font-semibold transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Resume
          </a>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-foreground/80 mb-3 block">
          {currentResume ? "Replace Resume" : "Upload Resume"} (PDF only)
        </label>

        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center gap-4 cursor-pointer rounded-xl border-2 border-dashed px-6 py-12 transition-all ${
            dragActive
              ? "border-primary bg-primary/5"
              : file
              ? "border-green-500 bg-green-500/5"
              : "border-border bg-foreground/5 hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            file ? "bg-green-500/20" : "bg-primary/10"
          }`}>
            <svg className={`w-8 h-8 ${file ? "text-green-500" : "text-primary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-foreground mb-1">
              {file ? "Resume Selected" : dragActive ? "Drop here" : "Drop your resume here or click to browse"}
            </p>
            <p className="text-xs text-foreground/60">
              PDF format • Max 5MB
            </p>
          </div>

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
          <div className="mt-4 flex items-center justify-between p-4 rounded-lg bg-foreground/5 border border-border">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-foreground">{file.name}</p>
                <p className="text-xs text-foreground/60">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setFile(null);
              }}
              className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
            >
              <svg className="w-5 h-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={uploadResume}
          disabled={loading || !file}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {currentResume ? "Replace Resume" : "Upload Resume"}
            </>
          )}
        </button>
        {file && (
          <button
            type="button"
            onClick={() => setFile(null)}
            className="px-6 py-3 rounded-xl border-2 border-border hover:border-primary/30 hover:bg-foreground/5 transition-all font-semibold"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}