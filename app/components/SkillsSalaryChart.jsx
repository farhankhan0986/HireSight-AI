"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { skill: "HTML/CSS", salary: 6 },
  { skill: "React", salary: 10 },
  { skill: "Node.js", salary: 12 },
  { skill: "Full Stack", salary: 15 },
  { skill: "Data Science", salary: 18 },
  { skill: "AI / ML", salary: 25 },
];

export default function SkillsSalaryChart() {
  return (
    <section className="w-full max-w-7xl mt-44 px-4">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Skills vs Salary Insight
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Understand how in-demand skills directly impact compensation in
          today’s job market.
        </p>
      </div>

      {/* Chart Card */}
      <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="skill" />
            <YAxis
              label={{
                value: "Average Salary (LPA)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              formatter={(value) => [`₹${value} LPA`, "Salary"]}
              contentStyle={{
                backgroundColor: "#0f172a", // dark background
                borderRadius: "12px",
                border: "none",
                color: "#ffffff", // main text color
                fontWeight: "600",
              }}
              labelStyle={{
                color: "#38bdf8", // skill name color (blue)
                fontWeight: "700",
              }}
              itemStyle={{
                color: "#ffffff", // salary text color
              }}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />
            <Bar
              dataKey="salary"
              radius={[12, 12, 0, 0]}
              fill="#38bdf8" // Tailwind blue-400
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Note */}
      <p className="text-center text-sm text-foreground/60 mt-6">
        Salaries are indicative averages based on current hiring trends.
      </p>
    </section>
  );
}
