"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Hammer } from "lucide-react";

function downloadCSV(data, filename = "chart-data.csv") {
  const header = Object.keys(data[0] || {}).join(",");
  const rows = data.map((r) => Object.values(r).join(","));
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function ShadcnPieChart({ data, title = "Data Overview", colors, donut = true, height = 280 }) {
  const total = data.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl"
    >
      <Card className=" rounded-2xl overflow-hidden bg-white text-black dark:bg-black dark:text-white border-none shadow-none">
        <CardHeader className="flex items-center justify-between py-4 px-4">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">Total: {total}</p>
          </div>
          <Button
            size="sm"
            onClick={() => downloadCSV(data, `${title.replace(/\s+/g, "_")}.csv`)}
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </CardHeader>

        <CardContent className="px-2 pb-4 pt-0">
          <div style={{ width: "100%", height }} className="mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={donut ? "55%" : 0}
                  outerRadius="80%"
                  paddingAngle={4}
                  label={({ percent, name }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Dashboard() {
  const [resumeData, setResumeData] = useState({
    titleData: {
      about:
        "I am a passionate full-stack developer with 5+ years of experience in building scalable web applications and RESTful APIs.",
      profilePhoto: null,
      title: "Full Stack Developer",
    },
    skills: {
      frontend: ["Next.js", "React", "JavaScript", "Hooks"],
      backend: ["Python", "Django", "Celery", "REST API"],
      devops: ["Docker", "AWS", "CI/CD"],
    },
    educations: [
      {
        from: "2018-09-01",
        to: "2022-06-30",
        title: "B.Sc. in Computer Science - University of California",
        description:
          "Graduated with honors, focused on software engineering and web development.",
      },
      {
        from: "2023-01-01",
        to: "2023-06-30",
        title: "React Advanced Bootcamp",
        description: "Completed an intensive React & Next.js course.",
      },
    ],
    works: [
      {
        from: "2022-07-01",
        to: "2024-09-01",
        title: "Software Engineer at Google",
        description:
          "Developed scalable microservices for Google Cloud Platform. Led a team of 5 engineers.",
      },
      {
        from: "2020-01-01",
        to: "2022-06-30",
        title: "Frontend Developer at StartupX",
        description:
          "Built React and Next.js apps with real-time features and WebSocket integration.",
      },
    ],
    projects: [
      {
        from: "2023-03-01",
        to: "2023-08-01",
        title: "E-commerce Platform",
        description:
          "Developed a full-stack e-commerce platform with Next.js, Django and Stripe payments integration.",
      },
      {
        from: "2024-01-01",
        to: "2024-03-01",
        title: "AI Chatbot",
        description:
          "Created a chatbot powered by OpenAI GPT API to automate customer support.",
      },
    ],
    certifications: [
      {
        from: "2021-05-01",
        to: "2021-05-01",
        title: "AWS Certified Solutions Architect",
        description:
          "Earned AWS certification for designing and deploying scalable systems on AWS.",
      },
      {
        from: "2022-08-15",
        to: "2022-08-15",
        title: "Google Cloud Professional",
        description:
          "Google Cloud Platform Professional Cloud Architect Certification.",
      },
    ],
    hobbies: [
      {
        title: "Photography",
        description: "I enjoy landscape and street photography on weekends.",
      },
      {
        title: "Traveling",
        description: "Love exploring new cultures and cities.",
      },
    ],
    contactdetails: {
      phone: "+1 234 567 890",
      email: "john.doe@example.com",
      website: "https://johndoe.dev",
      github: "https://github.com/johndoe",
      linkedIn: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  });

  const skillsData = Object.entries(resumeData.skills).map(([key, values]) => ({
    name: key,
    value: values.length,
  }));

  return (
    <div className="w-3/4 p-6 space-y-6">
      <ShadcnPieChart
        data={skillsData}
        title="Skills Distribution"
        colors={["#60A5FA", "#7C3AED", "#F59E0B"]}
      />
    </div>
  );
}