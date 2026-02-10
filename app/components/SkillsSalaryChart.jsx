"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { skill: "HTML/CSS", salary: 6, color: "#60a5fa", trend: "+12%" },
  { skill: "React", salary: 10, color: "#3b82f6", trend: "+18%" },
  { skill: "Node.js", salary: 12, color: "#2563eb", trend: "+15%" },
  { skill: "Full Stack", salary: 15, color: "#1d4ed8", trend: "+22%" },
  { skill: "Data Science", salary: 18, color: "#1e40af", trend: "+28%" },
  { skill: "AI / ML", salary: 25, color: "#1e3a8a", trend: "+45%" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function SkillsSalaryChart() {
  return (
    <section className="relative w-full max-w-7xl mx-auto mt-24 px-4 md:px-6 py-16">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="inline-flex items-center gap-2 mb-5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            Salary Analytics
          </span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3"
        >
          Skills vs <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Salary</span> Insight
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
          className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto"
        >
          Understand how in-demand skills directly impact compensation in today's job market
        </motion.p>
      </div>

      {/* Main Chart Card */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={2}
        className="relative"
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-3xl blur-2xl opacity-60" />
        
        <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative">
            {/* Chart Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
              <div>
                <h3 className="text-base font-bold text-foreground mb-1">Average Compensation by Skill</h3>
                <p className="text-xs text-foreground/60">Based on 50,000+ job postings • Updated daily</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-primary">Live Data</span>
              </div>
            </div>

            {/* Chart */}
            <div className="relative">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    opacity={0.1}
                    stroke="currentColor"
                  />
                  <XAxis 
                    dataKey="skill"
                    tick={{ fill: 'currentColor', fontSize: 12 }}
                    tickLine={{ stroke: 'currentColor', opacity: 0.2 }}
                    axisLine={{ stroke: 'currentColor', opacity: 0.2 }}
                  />
                  <YAxis
                    label={{
                      value: "Average Salary (LPA)",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: 'currentColor', fontSize: 12 }
                    }}
                    tick={{ fill: 'currentColor', fontSize: 12 }}
                    tickLine={{ stroke: 'currentColor', opacity: 0.2 }}
                    axisLine={{ stroke: 'currentColor', opacity: 0.2 }}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value} LPA`, "Salary"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                      fontWeight: "600",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                    }}
                    labelStyle={{
                      color: "hsl(var(--primary))",
                      fontWeight: "700",
                      marginBottom: "4px",
                    }}
                    itemStyle={{
                      color: "hsl(var(--foreground))",
                    }}
                    cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                  />
                  <Bar
                    dataKey="salary"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1000}
                    animationBegin={300}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        opacity={0.9}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Skill Tags Below Chart */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {data.map((item, i) => (
                  <motion.div
                    key={item.skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/5 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-semibold text-foreground">{item.skill}</span>
                    <span className="text-[10px] text-green-500 font-bold">{item.trend}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={3}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            ),
            label: "Highest Growth",
            value: "AI / ML",
            subtext: "+45% YoY",
            color: "text-green-500"
          },
          {
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            ),
            label: "Most Hired",
            value: "Full Stack",
            subtext: "3.2k openings",
            color: "text-blue-500"
          },
          {
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            ),
            label: "Top Salary",
            value: "₹25 LPA",
            subtext: "AI / ML avg",
            color: "text-primary"
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className={`flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-foreground/60 mb-0.5">{stat.label}</p>
              <p className="text-base font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-foreground/50">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Bottom Note */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={4}
        className="mt-8 flex items-center justify-center gap-2 text-xs text-foreground/60"
      >
        <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span>Salaries are indicative averages based on current hiring trends • Updated every 24 hours</span>
      </motion.div>
    </section>
  );
}