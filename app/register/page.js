"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-primary mb-2">
          Create your account
        </h2>
        <p className="text-center text-foreground/70 mb-6">
          Join <span className="text-accent">HireSight-AI</span> today
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 p-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-border bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-border bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Register as
            </label>

            <div className="grid grid-cols-2 gap-4">
              {/* Candidate */}
              <label
                className={`
        flex items-center gap-3 cursor-pointer rounded-xl border p-4 transition
        ${
          form.role === "candidate"
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-surface hover:bg-border"
        }
      `}
              >
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={form.role === "candidate"}
                  onChange={handleChange}
                  className="hidden"
                />

                {/* Icon */}
                <span className="text-xl">👤</span>

                <div>
                  <p className="font-medium">Candidate</p>
                  <p className="text-xs text-foreground/60">Apply for jobs</p>
                </div>
              </label>

              {/* Recruiter */}
              <label
                className={`
        flex items-center gap-3 cursor-pointer rounded-xl border p-4 transition
        ${
          form.role === "recruiter"
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-surface hover:bg-border"
        }
      `}
              >
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={form.role === "recruiter"}
                  onChange={handleChange}
                  className="hidden"
                />

                {/* Icon */}
                <span className="text-xl">🧑‍💼</span>

                <div>
                  <p className="font-medium">Recruiter</p>
                  <p className="text-xs text-foreground/60">
                    Post & manage jobs
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-border bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-border bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Resume */}
          {/* <div>
            <button
            type="submit"
            className="w-30 py-2 relative left-0.5 text-sm rounded-lg cursor-pointer bg-primary text-white font-semibold hover:bg-accent transition"
          >
            Upload Resume
          </button>
          </div> */}

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <input
              type="checkbox"
              required
              className="accent-primary cursor-pointer"
            />
            <span>I agree to the Terms and Conditions</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary cursor-pointer text-white font-semibold hover:bg-accent transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
