"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  Globe,
  Github,
  Instagram,
  Twitter,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Code,
  Info,
  Sun,
  Moon,
  MapPin,
  Calendar,
  Sparkles,
  Zap,
  Star,
  Rocket,
  Target,
  TrendingUp,
  Linkedin,
  Paperclip,
  PhilippinePeso,
  PhoneCall,
  Smile,
} from "lucide-react";

export default function Cyberpunk ({data}) {
  const hasEducations = data.educations && data.educations.length;
  const hasWorks = data.works && data.works.length;
  const hasProjects = data.projects && data.projects.length;
  const hasCertifications = data.certifications && data.certifications.length;
  const hasHobbies = data.hobbies && data.hobbies.length;
  const hasSkills = Object.keys(data.skills || {}).length > 0;
    return (
        <div className="min-h-screen bg-black rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-12 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30"></div>
              <div className="relative bg-black border border-cyan-500/50 rounded-lg p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-6xl font-black mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {data.title.display_name}
                    </h1>
                    <p className="text-2xl text-cyan-300 font-mono">
                      &gt; {data.title.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr] gap-6">
              <div className="space-y-4">
                <div className="border border-purple-500/50 rounded-lg p-4 bg-purple-950/20">
                  {data.title?.profile_photo && (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-purple-500 p-1">
                      <Avatar className="w-full h-full">
                        <img
                          src={
                            "http://localhost:8000" + data.title.profile_photo
                          }
                          alt="Profile"
                          className="object-cover rounded-full"
                        />
                      </Avatar>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-cyan-400 text-xs font-mono mb-2">
                      [PROFILE_ACTIVE]
                    </div>
                  </div>
                </div>
                <div className="border border-cyan-500/50 rounded-lg p-4 bg-cyan-950/20">
                  <h3 className="text-cyan-400 font-mono text-sm mb-3 flex items-center gap-2">
                    <span className="text-pink-500">&gt;</span> CONTACT.SYS
                  </h3>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex gap-2">
                      {" "}
                      {data.contact.phone && (
                        <div className="flex gap-2">
                          <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <div className="text-gray-50 dark:text-gray-50">
                            {data.contact.phone}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {" "}
                      {data.contact.email && (
                        <div className="flex gap-2">
                          <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <div className="text-gray-50 dark:text-gray-50">
                            {data.contact.email}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {" "}
                      {data.contact.website && (
                        <div className="flex gap-2">
                          <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <div className="text-gray-50 dark:text-gray-50">
                            {data.contact.website.replace(/^https?:\/\//, "")}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {" "}
                      {data.contact.github && (
                        <div className="flex gap-2">
                          <Github className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <div className="text-gray-50 dark:text-gray-50">
                            {data.contact.github}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {" "}
                      {data.contact.linkedin && (
                        <div className="flex gap-2">
                          <Linkedin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <div className="text-gray-50 dark:text-gray-50">
                            {data.contact.linkedin}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {" "}
                      {data.contact.twitter && (
                        <div className="flex gap-2">
                          <Twitter className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <div className="text-gray-50 dark:text-gray-50">
                            {data.contact.twitter}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {" "}
                      {data.contact.instagram && (
                        <div className="flex gap-2">
                          <Instagram className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <div className="text-gray-50 dark:text-gray-50">
                            {data.contact.instagram}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border border-pink-500/50 rounded-lg p-4 bg-pink-950/20">
                  <h3 className="text-pink-400 font-mono text-sm mb-3 flex items-center gap-2">
                    <span className="text-cyan-500">&gt;</span> SKILLS.EXE
                  </h3>
                  {hasSkills ? (
                    Object.entries(data.skills).map(([cat, arr]) => (
                      <div key={cat} className="mb-3">
                        <div className="text-xs text-purple-400 font-mono mb-1">
                          [{cat.toUpperCase()}]
                        </div>
                        <div className="space-y-1">
                          {arr.map((s, i) => (
                            <div
                              key={i}
                              className="text-xs text-gray-300 font-mono"
                            >
                              <span className="text-cyan-500">▸</span> {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No skill added yet
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="border border-cyan-500/50 rounded-lg p-6 bg-gradient-to-br from-cyan-950/20 to-purple-950/20">
                  <h3 className="text-cyan-400 font-mono text-lg mb-3 flex items-center gap-2">
                    <span className="text-pink-500">&gt;&gt;</span> ABOUT.TXT
                  </h3>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">
                    {data.title.about}
                  </p>
                </div>
                <div className="border border-purple-500/50 rounded-lg p-6 bg-gradient-to-br from-purple-950/20 to-pink-950/20">
                  <h3 className="text-purple-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <span className="text-cyan-500">&gt;&gt;</span>{" "}
                    EDUCATION.LOG
                  </h3>
                  <div className="space-y-4">
                    {hasEducations ? (
                      data.educations.map((w, idx) => (
                        <div
                          key={idx}
                          className="border-l-2 border-purple-500 pl-4"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-cyan-300 font-mono text-sm font-bold">
                              {w.title}
                            </h4>
                            <span className="text-xs text-pink-400 font-mono">
                              [{fmt(w.from_date)} - {fmt(w.to_date)}]
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs font-mono">
                            {w.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No education added yet
                      </p>
                    )}
                  </div>
                </div>
                <div className="border border-purple-500/50 rounded-lg p-6 bg-gradient-to-br from-purple-950/20 to-pink-950/20">
                  <h3 className="text-purple-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <span className="text-cyan-500">&gt;&gt;</span>{" "}
                    WORK_EXPERIENCE.LOG
                  </h3>
                  <div className="space-y-4">
                    {hasWorks ? (
                      data.works.map((w, idx) => (
                        <div
                          key={idx}
                          className="border-l-2 border-purple-500 pl-4"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-cyan-300 font-mono text-sm font-bold">
                              {w.title}
                            </h4>
                            <span className="text-xs text-pink-400 font-mono">
                              [{fmt(w.from_date)} - {fmt(w.to_date)}]
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs font-mono">
                            {w.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No work experience added yet
                      </p>
                    )}
                  </div>
                </div>
                <div className="border border-purple-500/50 rounded-lg p-6 bg-gradient-to-br from-purple-950/20 to-pink-950/20">
                  <h3 className="text-purple-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <span className="text-cyan-500">&gt;&gt;</span> PROJECTS.LOG
                  </h3>
                  <div className="space-y-4">
                    {hasProjects ? (
                      data.projects.map((w, idx) => (
                        <div
                          key={idx}
                          className="border-l-2 border-purple-500 pl-4"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-cyan-300 font-mono text-sm font-bold">
                              {w.title}
                            </h4>
                            <span className="text-xs text-pink-400 font-mono">
                              [{fmt(w.from_date)} - {fmt(w.to_date)}]
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs font-mono">
                            {w.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No project added yet
                      </p>
                    )}
                  </div>
                </div>
                <div className="border border-purple-500/50 rounded-lg p-6 bg-gradient-to-br from-purple-950/20 to-pink-950/20">
                  <h3 className="text-purple-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <span className="text-cyan-500">&gt;&gt;</span>{" "}
                    CERTIFICATIOS.SAVED
                  </h3>
                  <div className="space-y-4">
                    {hasCertifications ? (
                      data.certifications.map((w, idx) => (
                        <div
                          key={idx}
                          className="border-l-2 border-purple-500 pl-4"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-cyan-300 font-mono text-sm font-bold">
                              {w.title}
                            </h4>
                            <span className="text-xs text-pink-400 font-mono">
                              [{fmt(w.from_date)} - {fmt(w.to_date)}]
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs font-mono">
                            {w.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No certification added yet
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-cyan-500/50 rounded-lg p-4 bg-cyan-950/20">
                    <h3 className="text-cyan-400 font-mono text-sm mb-3 flex items-center gap-2">
                      <span className="text-purple-500">&gt;</span> HOBBIES.FUN
                    </h3>
                    {hasHobbies ? (
                      data.hobbies.map((ed, idx) => (
                        <div key={idx} className="mb-3">
                          <h4 className="text-gray-300 font-mono text-xs font-bold">
                            {ed.title}
                          </h4>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No hobby added yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}


