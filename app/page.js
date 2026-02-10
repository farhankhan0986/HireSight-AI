"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SkillsSalaryChart from "./components/SkillsSalaryChart";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Home() {
  return (
    <main className="bg-background text-foreground overflow-hidden relative -top-10">
      {/* ================= HERO ================= */}

      <section className="relative min-h-screen flex items-center px-6 md:px-12 py-20">
        {/* Background layers */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute -top-32 left-1/4 h-96 w-96 bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 bg-primary/5 blur-[100px]" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 -z-10 opacity-[0.015]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                       linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "4rem 4rem",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="text-xs font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent uppercase tracking-wide">
                AI-powered hiring intelligence
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              Hire with clarity.{" "}
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Decide with confidence.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-xl mb-8"
            >
              <span className="font-semibold text-foreground">
                HireSight-AI
              </span>{" "}
              helps teams verify talent, analyze skills, and make faster hiring
              decisions using real-time intelligence — not guesswork.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Link
                href="/dashboard/recruiter/post-job"
                className="group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Hiring
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                href="/jobs"
                className="group px-7 py-3.5 rounded-xl border-2 border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm text-foreground text-base font-semibold hover:bg-foreground/5 transition-all duration-300 flex items-center gap-2"
              >
                Explore Jobs
                <svg
                  className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-6 text-xs text-foreground/60"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Built for recruiters
              </div>
              <span className="text-foreground/30">•</span>
              <div className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Trusted by modern teams
              </div>
              <span className="text-foreground/30">•</span>
              <div className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                AI-first platform
              </div>
            </motion.div>
          </div>

          {/* RIGHT VISUAL – HIRING INTELLIGENCE DASHBOARD */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block order-1 lg:order-2"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl blur-2xl opacity-60" />

            <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                      <p className="text-xs text-foreground/60 font-medium uppercase tracking-wide">
                        Candidate Overview
                      </p>
                    </div>
                    <h4 className="text-base font-bold text-foreground">
                      AI Hiring Signals
                    </h4>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-bold border border-primary/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                    </span>
                    Live
                  </span>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-3 mb-5">
                  {[
                    {
                      name: "Aman Verma",
                      score: "92",
                      status: "Verified",
                      avatar: "AV",
                    },
                    {
                      name: "Sara Khan",
                      score: "87",
                      status: "In Review",
                      avatar: "SK",
                    },
                    {
                      name: "Rahul Mehta",
                      score: "81",
                      status: "Verified",
                      avatar: "RM",
                    },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="group flex items-center justify-between rounded-xl border border-border/60 bg-background/60 hover:bg-background/80 px-4 py-3 transition-all duration-300 hover:border-primary/30"
                    >
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">
                            {c.avatar}
                          </span>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {c.name}
                          </p>
                          <p className="text-[11px] text-foreground/60">
                            Full-Stack Developer
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Score */}
                        <div className="text-center">
                          <p className="text-xs text-foreground/60 mb-0.5">
                            Match
                          </p>
                          <p className="text-sm font-bold text-primary">
                            {c.score}%
                          </p>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`px-2.5 py-1 text-[10px] rounded-lg font-semibold border ${
                            c.status === "Verified"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          }`}
                        >
                          {c.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insight Bar */}
                <div className="relative rounded-xl bg-gradient-to-r from-primary/15 via-primary/10 to-transparent p-4 border border-primary/20 overflow-hidden group hover:border-primary/30 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-primary/20 border border-primary/30 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-bold text-primary">
                          💡 AI Insight
                        </p>
                        <span className="text-[9px] text-foreground/50">
                          Just now
                        </span>
                      </div>
                      <p className="text-xs text-foreground/70 leading-relaxed">
                        Top candidates meet{" "}
                        <span className="font-semibold text-primary">85%+</span>{" "}
                        skill match with verified signals.
                      </p>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-3 h-1 bg-foreground/5 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                  </div>
                </div>

                {/* Quick stats */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Reviewed", value: "124", color: "text-blue-500" },
                    {
                      label: "Shortlisted",
                      value: "18",
                      color: "text-green-500",
                    },
                    { label: "Pending", value: "42", color: "text-yellow-500" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-2 rounded-lg bg-foreground/5 border border-border/50"
                    >
                      <p className={`text-sm font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-foreground/60 mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= IN-DEMAND SKILLS ================= */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 -z-10 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                       linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "4rem 4rem",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 backdrop-blur-sm"
            >
              <svg
                className="w-3.5 h-3.5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                Market Intelligence
              </span>
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
            >
              Most{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                In-Demand
              </span>{" "}
              Skills
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto"
            >
              Based on{" "}
              <span className="font-semibold text-foreground">
                real-time job market demand
              </span>{" "}
              and hiring trends
            </motion.p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                name: "Generative AI",
                icon: "🤖",
                demand: "Very High",
                growth: "+145%",
                color: "from-violet-500/20 to-purple-500/20",
              },
              {
                name: "React",
                icon: "⚛️",
                demand: "Very High",
                growth: "+89%",
                color: "from-cyan-500/20 to-blue-500/20",
              },
              {
                name: "Node.js",
                icon: "🟢",
                demand: "High",
                growth: "+76%",
                color: "from-green-500/20 to-emerald-500/20",
              },
              {
                name: "Python",
                icon: "🐍",
                demand: "Very High",
                growth: "+112%",
                color: "from-yellow-500/20 to-orange-500/20",
              },
              {
                name: "SQL",
                icon: "🗄️",
                demand: "High",
                growth: "+54%",
                color: "from-blue-500/20 to-indigo-500/20",
              },
              {
                name: "AWS",
                icon: "☁️",
                demand: "Very High",
                growth: "+98%",
                color: "from-orange-500/20 to-red-500/20",
              },
              {
                name: "DevOps",
                icon: "🔁",
                demand: "High",
                growth: "+82%",
                color: "from-teal-500/20 to-cyan-500/20",
              },
              {
                name: "AI / ML",
                icon: "🧠",
                demand: "Very High",
                growth: "+156%",
                color: "from-pink-500/20 to-rose-500/20",
              },
              {
                name: "Next.js",
                icon: "▲",
                demand: "High",
                growth: "+127%",
                color: "from-gray-500/20 to-slate-500/20",
              },
            ].map((skill, i) => (
              <motion.div
                key={skill.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-card/50 backdrop-blur-sm border border-border hover:border-primary/40 rounded-xl p-5 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Animated gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 rounded-xl bg-primary/20 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  {/* Icon with animation - REFINED SIZE */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl">{skill.icon}</span>
                    </div>

                    {/* Growth indicator - moved to header */}
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs font-bold text-green-500">
                        {skill.growth}
                      </span>
                    </div>
                  </div>

                  {/* Skill name - REFINED SIZE */}
                  <h3 className="text-sm md:text-base font-bold mb-2 group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>

                  {/* Demand badge - REFINED SIZE */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                        skill.demand === "Very High"
                          ? "bg-primary/15 text-primary border border-primary/20"
                          : "bg-foreground/10 text-foreground/70 border border-foreground/20"
                      }`}
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                            skill.demand === "Very High"
                              ? "bg-primary"
                              : "bg-foreground/50"
                          } opacity-75`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                            skill.demand === "Very High"
                              ? "bg-primary"
                              : "bg-foreground/50"
                          }`}
                        />
                      </span>
                      {skill.demand}
                    </span>
                  </div>

                  {/* Progress bar - REFINED SIZE */}
                  <div className="relative h-1 bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: skill.demand === "Very High" ? "90%" : "70%",
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                    />
                  </div>

                  {/* Accent line - REFINED */}
                  <div className="mt-3 h-[2px] w-10 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>

                {/* Corner accent - REFINED SIZE */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA - REFINED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-5 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">
                    Want to learn these skills?
                  </p>
                  <p className="text-xs text-foreground/60">
                    Get personalized learning paths
                  </p>
                </div>
              </div>
              <button className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-primary/25">
                Explore Courses
              </button>
            </div>
          </motion.div>

          {/* Stats footer - REFINED */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs md:text-sm">
                Updated daily from{" "}
                <strong className="text-foreground">50K+</strong> job postings
              </span>
            </div>
            <span className="hidden sm:inline text-foreground/30">•</span>
            <div className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs md:text-sm">
                Verified by industry experts
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= JOB DOMAINS ================= */}
      <section className="relative py-14 px-6 bg-gradient-to-b from-background via-surface/30 to-background overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 backdrop-blur-sm"
            >
              <svg
                className="w-4 h-4 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <span className="text-sm font-semibold text-primary">
                Career Paths
              </span>
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Popular{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Job Domains
              </span>
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="text-lg text-foreground/70 max-w-2xl mx-auto"
            >
              Explore high-demand career opportunities across top industries
            </motion.p>
          </div>

          {/* Domains Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Full Stack Development",
                icon: "🧩",
                openings: "2.4k+",
                avgSalary: "$95k",
                remote: true,
                growth: "High",
              },
              {
                title: "Data Scientist",
                icon: "📊",
                openings: "1.8k+",
                avgSalary: "$110k",
                remote: true,
                growth: "Very High",
              },
              {
                title: "Backend Engineering",
                icon: "⚙️",
                openings: "3.2k+",
                avgSalary: "$105k",
                remote: true,
                growth: "High",
              },
              {
                title: "Cloud & DevOps",
                icon: "☁️",
                openings: "1.5k+",
                avgSalary: "$115k",
                remote: true,
                growth: "Very High",
              },
              {
                title: "Cybersecurity",
                icon: "🛡️",
                openings: "1.1k+",
                avgSalary: "$120k",
                remote: true,
                growth: "Very High",
              },
              {
                title: "AI / ML",
                icon: "🧠",
                openings: "2.1k+",
                avgSalary: "$130k",
                remote: true,
                growth: "Very High",
              },
              {
                title: "Blockchain",
                icon: "🔗",
                openings: "890+",
                avgSalary: "$125k",
                remote: true,
                growth: "High",
              },
              {
                title: "Mobile Development",
                icon: "📱",
                openings: "1.9k+",
                avgSalary: "$100k",
                remote: true,
                growth: "High",
              },
              {
                title: "UI / UX Design",
                icon: "🎨",
                openings: "1.3k+",
                avgSalary: "$90k",
                remote: true,
                growth: "High",
              },
            ].map((domain, i) => (
              <motion.div
                key={domain.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-card/70 backdrop-blur-sm border border-border hover:border-primary/40 rounded-2xl p-6 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow effect */}
                <div className="absolute -inset-1 rounded-2xl bg-primary/10 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  {/* Header with icon and badge */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Icon container with decent size */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{domain.icon}</span>
                    </div>

                    {/* Growth badge */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        domain.growth === "Very High"
                          ? "bg-green-500/15 text-green-600 border border-green-500/20"
                          : "bg-blue-500/15 text-blue-600 border border-blue-500/20"
                      }`}
                    >
                      {domain.growth}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {domain.title}
                  </h3>

                  {/* Stats Grid */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/60">Open positions</span>
                      <span className="font-semibold text-foreground">
                        {domain.openings}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/60">Avg. salary</span>
                      <span className="font-semibold text-primary">
                        {domain.avgSalary}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                    {domain.remote && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-foreground/5 text-foreground/70 text-xs font-medium">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Remote
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-foreground/5 text-foreground/70 text-xs font-medium">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Hiring now
                    </span>
                  </div>

                  {/* Hover CTA */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore roles</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">
                    Can't find your domain?
                  </p>
                  <p className="text-xs text-foreground/60">
                    Browse all 50+ job categories
                  </p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-primary/25">
                View All Categories
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SALARY CHART ================= */}
      <section className="py-20">
        <SkillsSalaryChart />
      </section>

      {/* ================= INSIGHTS ================= */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto mb-20 overflow-hidden">
  {/* Background decorations */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
  </div>

  {/* Subtle grid pattern */}
  <div className="absolute inset-0 -z-10 opacity-[0.015]">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                       linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
      backgroundSize: '4rem 4rem'
    }} />
  </div>

  {/* Header */}
  <div className="text-center mb-16">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="inline-flex items-center gap-2 mb-5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 backdrop-blur-sm"
    >
      <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
      </svg>
      <span className="text-xs font-semibold text-primary uppercase tracking-wide">
        Market Insights
      </span>
    </motion.div>

    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
    >
      Hiring Intelligence at a{" "}
      <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Glance
      </span>
    </motion.h2>

    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={1}
      className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto"
    >
      Real-time market signals powering smarter recruitment decisions
    </motion.p>
  </div>

  {/* Stats Grid */}
  <div className="grid md:grid-cols-3 gap-6 md:gap-8">
    {[
      {
        value: "2.3×",
        title: "Growth in Full-Stack Roles",
        description: "Demand for full-stack developers has more than doubled in the past year",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        ),
        trend: "+130%",
        color: "from-blue-500/20 to-cyan-500/20"
      },
      {
        value: "40%",
        title: "Rise in Remote Hiring",
        description: "Companies are increasingly embracing remote-first hiring strategies",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        ),
        trend: "+40%",
        color: "from-green-500/20 to-emerald-500/20"
      },
      {
        value: "AI-Driven",
        title: "Recruitment Is Evolving",
        description: "Smart automation is transforming how top companies find talent",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
        ),
        trend: "New",
        color: "from-purple-500/20 to-pink-500/20"
      },
    ].map((stat, i) => (
      <motion.div
        key={stat.title}
        custom={i}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        whileHover={{ y: -6, scale: 1.02 }}
        className="group relative bg-card/70 backdrop-blur-sm border border-border hover:border-primary/40 rounded-2xl p-8 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-1 rounded-2xl bg-primary/20 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative">
          {/* Header with icon and trend */}
          <div className="flex items-start justify-between mb-6">
            {/* Icon */}
            <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>

            {/* Trend Badge */}
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
              stat.trend === "New" 
                ? "bg-purple-500/15 text-purple-500 border border-purple-500/20"
                : "bg-green-500/15 text-green-500 border border-green-500/20"
            }`}>
              {stat.trend}
            </span>
          </div>

          {/* Value */}
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform duration-300">
            {stat.value}
          </div>

          {/* Title */}
          <h3 className="text-base md:text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {stat.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-foreground/60 leading-relaxed mb-4">
            {stat.description}
          </p>

          {/* Divider */}
          <div className="h-[2px] w-12 bg-gradient-to-r from-primary via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    ))}
  </div>

  {/* Bottom CTA */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.5 }}
    className="mt-12 text-center"
  >
    <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-5 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-foreground">Want detailed market insights?</p>
          <p className="text-xs text-foreground/60">Access comprehensive hiring analytics</p>
        </div>
      </div>
      <button className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-primary/25">
        View Full Report
      </button>
    </div>
  </motion.div>

  {/* Stats Footer */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.7 }}
    className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-foreground/60"
  >
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      <span>Real-time data from <strong className="text-foreground">100K+</strong> companies</span>
    </div>
    <span className="hidden sm:inline text-foreground/30">•</span>
    <div className="flex items-center gap-2">
      <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
      <span>Updated hourly</span>
    </div>
  </motion.div>
</section>

      {/* ================= AI FEATURES ================= */}
      <section className="relative py-20 px-6 mx-auto max-w-7xl mb-20 overflow-hidden">
  {/* Background with gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl" />
  
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden rounded-3xl">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
  </div>

  {/* Grid pattern overlay */}
  <div className="absolute inset-0 opacity-[0.02] rounded-3xl">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                       linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
      backgroundSize: '3rem 3rem'
    }} />
  </div>

  <div className="relative text-center">
    {/* Badge */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <span className="text-xs font-bold text-primary uppercase tracking-wider">
        Coming Soon
      </span>
    </motion.div>

    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
    >
      <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        AI-Powered Hiring
      </span>
    </motion.h2>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-base md:text-lg text-foreground/70 mb-12 max-w-2xl mx-auto"
    >
      Built to eliminate guesswork from recruitment with intelligent automation and data-driven insights
    </motion.p>

    {/* Feature Grid */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
    >
      {[
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          title: "Resume Scoring",
          description: "Instant AI evaluation"
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          title: "Skill Gap Analysis",
          description: "Identify missing skills"
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          ),
          title: "Smart Matching",
          description: "Perfect job-candidate fit"
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
          ),
          title: "Candidate Ranking",
          description: "Auto-prioritize top talent"
        },
      ].map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="group relative bg-background/80 backdrop-blur-sm border border-border hover:border-primary/40 rounded-xl p-5 transition-all duration-300 overflow-hidden"
        >
          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Glow */}
          <div className="absolute -inset-1 rounded-xl bg-primary/10 opacity-0 blur-lg group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-foreground/60">
              {feature.description}
            </p>

            {/* Lock icon overlay */}
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* CTA Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <button className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 overflow-hidden hover:scale-105">
        <span className="relative z-10 flex items-center gap-2">
          Get Early Access
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      <button className="px-6 py-3 rounded-xl border-2 border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm text-foreground text-sm font-semibold hover:bg-foreground/5 transition-all duration-300 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Notify Me
      </button>
    </motion.div>

    {/* Timeline indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1 }}
      className="mt-8 flex items-center justify-center gap-2 text-xs text-foreground/60"
    >
      <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
      <span>Expected launch: <strong className="text-foreground">Q2 2026</strong></span>
    </motion.div>
  </div>
</section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative py-24 px-6 mb-20 overflow-hidden">
  {/* Background elements */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
  </div>

  {/* Animated grid pattern */}
  <div className="absolute inset-0 -z-10 opacity-[0.02]">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                       linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
      backgroundSize: '4rem 4rem'
    }} />
  </div>

  <div className="max-w-5xl mx-auto text-center">
    {/* Badge */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 backdrop-blur-sm"
    >
      <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
      <span className="text-xs font-semibold text-primary uppercase tracking-wide">
        Ready to Transform Your Career?
      </span>
    </motion.div>

    {/* Main Heading */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
    >
      Your Career.{" "}
      <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Backed by Intelligence.
      </span>
    </motion.h2>

    {/* Subheading */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-base md:text-lg text-foreground/70 mb-10 max-w-2xl mx-auto"
    >
      Join thousands of professionals who&apos;ve found their dream roles through AI-powered matching and verified opportunities
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
    >
      <Link
        href="/jobs"
        className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white text-base font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 overflow-hidden hover:scale-105"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Start Applying
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
        <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <Link
        href="/register"
        className="group w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm text-foreground text-base font-bold hover:bg-foreground/5 transition-all duration-300 flex items-center justify-center gap-2"
      >
        Join HireSight-AI
        <svg
          className="w-5 h-5 group-hover:rotate-12 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      </Link>
    </motion.div>

    {/* Stats Grid */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
    >
      {[
        { value: "10K+", label: "Active Jobs", icon: "💼" },
        { value: "50K+", label: "Users", icon: "👥" },
        { value: "98%", label: "Success Rate", icon: "✨" },
        { value: "24/7", label: "Support", icon: "🚀" },
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="relative group"
        >
          <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-foreground/60 font-medium">
              {stat.label}
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-1 rounded-xl bg-primary/20 opacity-0 blur-lg group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </motion.div>
      ))}
    </motion.div>

    {/* Trust Indicators */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8 }}
      className="flex flex-wrap items-center justify-center gap-6 text-xs text-foreground/60"
    >
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>No credit card required</span>
      </div>
      <span className="hidden sm:inline text-foreground/30">•</span>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>100% secure & verified</span>
      </div>
      <span className="hidden sm:inline text-foreground/30">•</span>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        <span>Free to get started</span>
      </div>
    </motion.div>

    {/* Social Proof */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.9 }}
      className="mt-12 pt-8 border-t border-border/50"
    >
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-background flex items-center justify-center text-white text-xs font-bold"
            >
              {i}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="text-sm text-foreground/70">
        <strong className="text-foreground">5,000+</strong> professionals have landed their dream jobs this month
      </p>
    </motion.div>
  </div>
</section>
    </main>
  );
}
