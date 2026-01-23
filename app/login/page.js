"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    router.refresh();
    router.push(
      data.role === "recruiter" ? "/dashboard/recruiter" : "/dashboard"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-primary mb-2">
          HireSight<span className="text-accent">AI</span>
        </h2>
        <p className="text-center text-foreground/70 mb-6">
          Sign in to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg">
              {error}
            </p>
          )}

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

          {/* Remember */}
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <input
              type="checkbox"
              id="rememberMe"
              className="accent-primary cursor-pointer"
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary cursor-pointer text-white font-semibold hover:bg-accent transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-foreground/60">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
