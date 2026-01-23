"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        setLoggedIn(data.loggedIn);
        setRole(data.role || null);
      } catch {
        setLoggedIn(false);
        setRole(null);
      }
    };

    checkAuth();
  }, [pathname]);

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/dashboard/recruiter/post-job"
  ) {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setLoggedIn(false);
    setRole(null);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary hover:text-accent transition"
        >
          HireSight<span className="text-accent">AI</span>
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center text-sm font-medium">
          <Link
            href={role === "recruiter" ? "/dashboard/recruiter" : "/dashboard"}
            className="text-foreground/70 hover:text-primary transition"
          >
            Dashboard
          </Link>

          {loggedIn && role === "recruiter" && (
            <Link
              href="/dashboard/recruiter/applications"
              className="text-foreground/70 hover:text-primary transition"
            >
              Recruiter
            </Link>
          )}

          <Link
            href="/jobs"
            className="text-foreground/70 hover:text-primary transition"
          >
            Jobs
          </Link>
          

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-border text-red-500 hover:bg-red-500/10 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-accent transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
