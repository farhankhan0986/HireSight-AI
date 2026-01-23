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

      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        {/* background glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-125 w-125 bg-primary/20 blur-[140px]" />

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight"
        >
          Welcome to <span className="text-primary">HireSight-AI</span>
          
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="mt-6 text-lg text-foreground/70 max-w-xl"
        >
          <span className="font-semibold text-foreground">HireSight-AI</span>{" "}
          <span className="hover:text-foreground transition ease-in">
            connects the right talent with the right opportunities using
            intelligent job matching, skill analysis, and real-time insights —
            all powered by AI.
          </span>
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="mt-10 flex gap-6"
        >
          <Link
            href="/jobs"
            className="px-8 py-4 rounded-2xl bg-primary text-white text-xl font-semibold hover:scale-105 transition"
          >
            Find Jobs
          </Link>

          <Link
            href="/dashboard/recruiter/post-job"
            className="px-8 py-4 rounded-2xl border border-border text-primary text-xl font-semibold hover:bg-primary/10 transition"
          >
            Post Jobs
          </Link>
        </motion.div>
          <p className="mt-12 text-sm text-muted">
            No ads • No clutter • Future-first
          </p>
      </section>

      {/* ================= MARQUEE ================= */}
      <section className="border-t border-border py-8 overflow-hidden">
        <div className="whitespace-nowrap animate-scroll text-xl font-semibold text-foreground/60 tracking-widest">
          THE FUTURE OF SMART HIRING • AI-POWERED MATCHING • REMOTE-FIRST JOBS •
          SKILL-BASED RECRUITMENT • THE FUTURE OF SMART HIRING •
        </div>
      </section>

      {/* ================= IN-DEMAND SKILLS ================= */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl font-bold text-center mb-4"
        >
          Most In-Demand Skills
        </motion.h2>

        <p className="text-center text-foreground/70 mb-12">
          Based on real-time job market demand
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "Generative AI", icon: "🤖" },
            { name: "React", icon: "⚛️" },
            { name: "Node.js", icon: "🟢" },
            { name: "Python", icon: "🐍" },
            { name: "SQL", icon: "🗄️" },
            { name: "AWS", icon: "☁️" },
            { name: "DevOps", icon: "🔁" },
            { name: "AI / ML", icon: "🧠" },
            { name: "Next.js", icon: "▲" },
          ].map((skill, i) => (
            <motion.div
              key={skill.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group relative bg-card border border-border rounded-2xl p-6 text-center transition-all duration-300"
            >
              {/* glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 blur-xl group-hover:opacity-100 transition" />

              {/* icon */}
              <div className="relative text-3xl mb-4">{skill.icon}</div>

              {/* title */}
              <p className="relative text-base font-medium tracking-tight">
                {skill.name}
              </p>

              {/* meta */}
              <p className="relative text-xs text-foreground/55 mt-1">
                High demand
              </p>

              {/* accent */}
              <div className="mt-4 h-[2px] w-8 mx-auto bg-primary/40 scale-x-0 group-hover:scale-x-100 transition-transform" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= JOB DOMAINS ================= */}
      <section className="py-3 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Popular Job Domains
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Full Stack Development", icon: "🧩" },
              { title: "Data Scientist", icon: "📊" },
              { title: "Backend Engineering", icon: "⚙️" },
              { title: "Cloud & DevOps", icon: "☁️" },
              { title: "Cybersecurity", icon: "🛡️" },
              { title: "AI / ML", icon: "🧠" },
              { title: "Blockchain", icon: "🔗" },
              { title: "Mobile Development", icon: "📱" },
              { title: "UI / UX Design", icon: "🎨" },
            ].map((domain, i) => (
              <motion.div
                key={domain.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group relative bg-card border border-border rounded-3xl p-8 transition-all duration-300"
              >
                {/* subtle hover ring */}
                <div className="absolute inset-0 rounded-3xl border border-primary/0 group-hover:border-primary/30 transition" />

                {/* icon */}
                <div className="text-3xl mb-5">{domain.icon}</div>

                {/* title */}
                <h3 className="text-lg font-medium tracking-tight">
                  {domain.title}
                </h3>

                {/* description */}
                <p className="text-sm text-foreground/60 mt-2">
                  High demand · Remote friendly
                </p>

                {/* hover hint */}
                <div className="mt-6 text-xs text-primary/70 opacity-0 group-hover:opacity-100 transition"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SALARY CHART ================= */}
      <section className="py-32">
        <SkillsSalaryChart />
      </section>

      {/* ================= INSIGHTS ================= */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative mb-20">
  {/* background glow */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl" />

  <motion.h2
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-20"
  >
    Hiring Intelligence at a Glance
  </motion.h2>

  <div className="grid md:grid-cols-3 gap-10">
    {[
      ["2.3×", "Growth in Full-Stack Roles"],
      ["40%", "Rise in Remote Hiring"],
      ["AI-Driven", "Recruitment Is Evolving"],
    ].map(([value, title], i) => (
      <motion.div
        key={title}
        custom={i}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        whileHover={{ y: -8 }}
        className="group relative bg-card border border-border rounded-3xl p-10 transition-all duration-300"
      >
        {/* card glow */}
        <div className="absolute inset-0 rounded-3xl bg-primary/15 opacity-0 blur-2xl group-hover:opacity-100 transition" />

        {/* value */}
        <div className="relative text-4xl md:text-5xl font-semibold text-primary mb-4">
          {value}
        </div>

        {/* title */}
        <h3 className="relative text-lg md:text-xl font-medium tracking-tight mb-2">
          {title}
        </h3>

        {/* description */}
        <p className="relative text-sm text-foreground/65 leading-relaxed max-w-sm">
          Real market signals and hiring trends that help teams make confident,
          data-driven recruitment decisions.
        </p>
      </motion.div>
    ))}
  </div>
</section>


      {/* ================= AI FEATURES ================= */}
      <section className="py-32 px-6 bg-primary/5 text-center rounded-2xl mb-20">
        <h2 className="text-4xl font-bold mb-4">
          AI-Powered Hiring (Coming Soon)
        </h2>

        <p className="text-foreground/70 mb-10">
          Built to eliminate guesswork from recruitment.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            "Resume Scoring",
            "Skill Gap Analysis",
            "Smart Matching",
            "Candidate Ranking",
          ].map((feature) => (
            <span
              key={feature}
              className="px-6 py-3 rounded-full border border-border bg-background text-primary font-medium"
            >
              {feature}
            </span>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-40 text-center mb-20">
        <h2 className="text-5xl font-bold mb-6">
          Your Career. Backed by Intelligence.
        </h2>

        <div className="flex justify-center gap-6">
          <Link
            href="/jobs"
            className="px-8 py-4 rounded-2xl bg-primary text-white text-xl font-semibold hover:scale-105 transition"
          >
            Start Applying
          </Link>

          <Link
            href="/register"
            className="px-8 py-4 rounded-2xl border border-border text-primary text-xl font-semibold hover:bg-primary/10 transition"
          >
            Join HireSight-AI
          </Link>
        </div>
      </section>
    </main>
  );
}
