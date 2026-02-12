"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../components/theme-toggle";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        setLoggedIn(data.loggedIn);
        setRole(data.role || null);
        setUserName(data.name || "");
      } catch {
        setLoggedIn(false);
        setRole(null);
        setUserName("");
      }
    };

    checkAuth();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname !== lastPath) {
  setLastPath(pathname);
  setMobileMenuOpen(false);
}


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
    setUserName("");
    router.push("/login");
  };

  // Build navigation links based on role
  const navLinks = [
    {
      href: role === "recruiter" ? "/dashboard/recruiter" : "/dashboard",
      label: "Dashboard",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
  ];

  // Add recruiter-specific links
  if (loggedIn && role === "recruiter") {
    navLinks.push({
      href: "/dashboard/recruiter/applications",
      label: "Applications",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
    });
  }

  // Add Jobs link only for non-recruiters or non-logged-in users
  if (!loggedIn || role !== "recruiter") {
    navLinks.push({
      href: "/jobs",
      label: "Jobs",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    });
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/95 border-b border-border shadow-lg"
          : "backdrop-blur-md bg-background/80 border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                HireSight
              </span>
              <span className="text-foreground">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            <ThemeToggle />

            {loggedIn ? (
              <div className="flex items-center gap-2 ml-2">
                {/* User Info */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {userName?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-foreground truncate max-w-[100px]">
                      {userName || "User"}
                    </p>
                    <p className="text-[10px] text-foreground/60 capitalize">
                      {role || "user"}
                    </p>
                  </div>
                </div>

                

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all font-semibold text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg border-2 border-border hover:border-primary/30 hover:bg-foreground/5 transition-all font-semibold text-sm"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-white hover:shadow-lg hover:shadow-primary/25 transition-all font-semibold text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-foreground/5 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
        </div>
        

        {/* Mobile Menu */}
        <AnimatePresence>
          
          {mobileMenuOpen && (
            
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              

              <div className="py-4 space-y-2">
                {/* User Info Mobile */}
                
                {loggedIn && userName && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-foreground/5 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-base font-bold text-primary">
                        {userName?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {userName}
                      </p>
                      <p className="text-xs text-foreground/60 capitalize">
                        {role || "user"}
                      </p>
                    </div>
                    
                  </div>
                )}
                 {/* Theme Toggle Section */}
        <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-foreground/5 mb-4">
          <span className="text-sm font-semibold text-foreground">Theme</span>
          <ThemeToggle />
        </div>

                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-foreground/5"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}

                {/* Auth Buttons Mobile */}
                <div className="pt-4 border-t border-border space-y-2">
                  {loggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all font-semibold"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/register"
                        className="w-full block px-4 py-3 rounded-lg border-2 border-border hover:border-primary/30 hover:bg-foreground/5 transition-all font-semibold text-center"
                      >
                        Sign Up
                      </Link>
                      <Link
                        href="/login"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-white hover:shadow-lg hover:shadow-primary/25 transition-all font-semibold"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}