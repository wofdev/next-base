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

export default function Mango ({data}) {
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
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 dark:from-gray-900 dark:via-red-950 dark:to-orange-950 rounded-2xl p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-orange-600 to-rose-700 dark:from-orange-700 dark:to-red-700 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  {data.title?.profile_photo && (
                    <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                      <img
                        src={"http://localhost:8000" + data.title.profile_photo}
                        alt="Profile"
                        className="object-cover rounded-full"
                      />
                    </Avatar>
                  )}
                  <div className="text-center sm:text-left">
                    <h1 className="text-3xl sm:text-5xl font-black mb-3">
                      {data.title.display_name}
                    </h1>
                    <p className="text-xl sm:text-2xl font-light text-red-100">
                      {data.title.title}
                    </p>
                    <p className="mt-4 text-red-50 max-w-2xl">
                      {data.title.about}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Contact
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    {" "}
                    {data.contact.phone && (
                      <div className="flex gap-2">
                        <Phone className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.phone}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {" "}
                    {data.contact.email && (
                      <div className="flex gap-2">
                        <Mail className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.email}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {" "}
                    {data.contact.website && (
                      <div className="flex gap-2">
                        <Globe className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.website.replace(/^https?:\/\//, "")}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {" "}
                    {data.contact.github && (
                      <div className="flex gap-2">
                        <Github className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.github}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {" "}
                    {data.contact.linkedin && (
                      <div className="flex gap-2">
                        <Linkedin className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.linkedin}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {" "}
                    {data.contact.twitter && (
                      <div className="flex gap-2">
                        <Twitter className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.twitter}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {" "}
                    {data.contact.instagram && (
                      <div className="flex gap-2">
                        <Instagram className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <div className="text-gray-700 dark:text-gray-300">
                          {data.contact.instagram}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Skills
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {hasSkills ? (
                    Object.entries(data.skills).map(([cat, arr]) => (
                      <div key={cat}>
                        <h4 className="text-xs uppercase font-bold text-red-600 dark:text-red-400 mb-2">
                          {cat}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {arr.map((s, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium"
                            >
                              {s}
                            </span>
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
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Education
                  </h3>
                </div>
                <div className="space-y-4">
                  {hasEducations ? (
                    data.educations.map((ed, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {ed.title}
                        </h4>
                        <p className="text-xs text-red-600 dark:text-red-400 mb-2">
                          {fmt(ed.from_date)} - {fmt(ed.to_date)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {ed.description}
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
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Work Experience
                  </h3>
                </div>
                <div className="space-y-4">
                  {hasWorks ? (
                    data.works.map((w, idx) => (
                      <div key={idx} className="border-l-4 border-red-500 pl-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {w.title}
                          </h4>
                          <span className="text-xs text-red-600 dark:text-red-400 font-semibold">
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
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Projects
                  </h3>
                </div>
                <div className="space-y-4">
                  {hasProjects ? (
                    data.projects.map((w, idx) => (
                      <div key={idx} className="border-l-4 border-red-500 pl-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {w.title}
                          </h4>
                          <span className="text-xs text-red-600 dark:text-red-400 font-semibold">
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
                      No project added yet
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Paperclip className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Certifications
                  </h3>
                </div>
                <div className="space-y-4">
                  {hasCertifications ? (
                    data.certifications.map((ed, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {ed.title}
                        </h4>
                        <p className="text-xs text-red-600 dark:text-red-400 mb-2">
                          {fmt(ed.from_date)} - {fmt(ed.to_date)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {ed.description}
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
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Smile className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Interests & Hobbies
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex flex-wrap gap-2">
                    {hasHobbies ? (
                      data.hobbies.map((s, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium"
                        >
                          {s.title}
                        </span>
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


