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

export default function Garden ({data}) {
  const hasEducations = data.educations && data.educations.length;
  const hasWorks = data.works && data.works.length;
  const hasProjects = data.projects && data.projects.length;
  const hasCertifications = data.certifications && data.certifications.length;
  const hasHobbies = data.hobbies && data.hobbies.length;
  const hasSkills = Object.keys(data.skills || {}).length > 0;
  const fmt = (d) => {
    if (!d) return "Present"
    const date = new Date(d)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }
    return (
        <div className="min-h-screen bg-green-50 dark:bg-slate-900 rounded-2xl">
          <div className="container mx-auto p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 w-full gap-6 md:gap-0">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-9 items-center sm:items-start w-full">
                {data.title && data.title.profile_photo && (
                  <div className="flex-shrink-0">
                    <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                      <img
                        src={"http://localhost:8000" + data.title.profile_photo}
                        alt="Profile"
                        className="object-cover rounded-full"
                      />
                    </Avatar>
                  </div>
                )}
                <div className="text-center sm:text-left w-full mt-2 sm:mt-0">
                  <h1 className="text-3xl sm:text-5xl font-bold text-green-900 dark:text-green-100 mb-2 break-words">
                    {data.title.display_name}
                  </h1>
                  <p className="text-lg sm:text-xl text-green-700 dark:text-green-300 break-words">
                    {data.title.title}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-bold mb-4 text-green-900 dark:text-green-100">
                    Contact
                  </h3>
                  <div className="space-y-3 text-sm">
                    {data.contact.phone && (
                      <div className="flex gap-2">
                        {" "}
                        <Phone className="w-4 h-4 text-green-800 dark:text-green-400" />{" "}
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.phone}
                        </div>
                      </div>
                    )}
                    {data.contact.email && (
                      <div className="flex gap-2">
                        {" "}
                        <Mail className="w-4 h-4 text-green-800 dark:text-green-400" />{" "}
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.email}
                        </div>
                      </div>
                    )}
                    {data.contact.website && (
                      <div className="flex gap-2">
                        {" "}
                        <Globe className="w-4 h-4 text-green-800 dark:text-green-400" />{" "}
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.website.replace(/^https?:\/\//, "")}
                        </div>
                      </div>
                    )}
                    {data.contact.github && (
                      <div className="flex gap-2">
                        {" "}
                        <Github className="w-4 h-4 text-green-800 dark:text-green-400" />{" "}
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.github}
                        </div>
                      </div>
                    )}
                    {data.contact.linkedin && (
                      <div className="flex gap-2">
                        {" "}
                        <Linkedin className="w-4 h-4 text-green-800 dark:text-green-400" />{" "}
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.linkedin}
                        </div>
                      </div>
                    )}
                    {data.contact.twitter && (
                      <div className="flex gap-2">
                        {" "}
                        <Twitter className="w-4 h-4 text-green-800 dark:text-green-400" />{" "}
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.twitter}
                        </div>
                      </div>
                    )}
                    {data.contact.instagram && (
                      <div className="flex gap-2">
                        {" "}
                        <Instagram className="w-4 h-4 text-green-800 dark:text-green-400" />{" "}
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.instagram}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-bold mb-4 text-green-900 dark:text-green-100">
                    Skills
                  </h3>
                  {hasSkills ? (
                    Object.entries(data.skills).map(([cat, arr]) => (
                      <div key={cat} className="mb-4">
                        <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-2 font-semibold">
                          {cat}
                        </h4>
                        <div className="space-y-1">
                          {arr.map((s, i) => (
                            <div
                              key={i}
                              className="text-sm text-gray-700 dark:text-gray-300"
                            >
                              • {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                      No skill added yet
                    </p>
                  )}
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-bold mb-4 text-green-900 dark:text-green-100">
                    Interests & Hobbies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {hasHobbies ? (
                      data.hobbies.map((h, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full"
                        >
                          {h.title}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                        No hobby added yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-green-900 dark:text-green-100">
                    About
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {data.title.about}
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-green-300 dark:bg-green-700"></div>
                  <div className="space-y-8 pl-8">
                    <div>
                      <div className="absolute left-0 w-4 h-4 bg-green-500 rounded-full -ml-[7px]"></div>
                      <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100">
                        Education
                      </h3>
                      {hasEducations ? (
                        data.educations.map((ed, idx) => (
                          <div
                            key={idx}
                            className="mb-6 bg-white dark:bg-slate-800 p-4 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                {ed.title}
                              </h4>
                              <span className="text-xs text-teal-600 dark:text-teal-400">
                                {fmt(ed.from_date)} - {fmt(ed.to_date)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {ed.description}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                          No education added yet
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="absolute left-0 w-4 h-4 bg-green-500 rounded-full -ml-[7px]"></div>
                      <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100">
                        Work Experience
                      </h3>
                      {hasWorks ? (
                        data.works.map((w, idx) => (
                          <div
                            key={idx}
                            className="mb-6 bg-white dark:bg-slate-800 p-4 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                {w.title}
                              </h4>
                              <span className="text-xs text-green-600 dark:text-green-400">
                                {fmt(w.from_date)} - {fmt(w.to_date)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
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
                    <div>
                      <div className="absolute left-0 w-4 h-4 bg-green-500 rounded-full -ml-[7px]"></div>
                      <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100">
                        Projects
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {hasProjects ? (
                          data.projects.map((p, idx) => (
                            <div
                              key={idx}
                              className="bg-white dark:bg-slate-800 p-4 rounded-lg"
                            >
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {p.title}
                              </h4>
                              <p className="text-xs text-green-600 dark:text-green-400 mb-2">
                                {fmt(p.from_date)} - {fmt(p.to_date)}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {p.description}
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
                    <div>
                      <div className="absolute left-0 w-4 h-4 bg-green-500 rounded-full -ml-[7px]"></div>
                      <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100">
                        Certifications
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {hasCertifications ? (
                          data.certifications.map((p, idx) => (
                            <div
                              key={idx}
                              className="bg-white dark:bg-slate-800 p-4 rounded-lg"
                            >
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {p.title}
                              </h4>
                              <p className="text-xs text-green-600 dark:text-green-400 mb-2">
                                {fmt(p.from_date)} - {fmt(p.to_date)}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {p.description}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}


