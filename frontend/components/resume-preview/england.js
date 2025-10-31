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

export default function England ({data}) {
  const hasEducations = data.educations && data.educations.length;
  const hasWorks = data.works && data.works.length;
  const hasProjects = data.projects && data.projects.length;
  const hasCertifications = data.certifications && data.certifications.length;
  const hasHobbies = data.hobbies && data.hobbies.length;
  const hasSkills = Object.keys(data.skills || {}).length > 0;
    return (
        <div className="min-h-screen bg-amber-50 dark:bg-stone-900 rounded-2xl p-8">
          <div className="max-w-5xl mx-auto">

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12 pb-8 border-b-2 border-amber-800 dark:border-amber-200">
              {/* پروفایل */}
              {data.title?.profile_photo && (
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full flex-shrink-0">
                  <Avatar className="w-full h-full">
                    <img
                      src={"http://localhost:8000" + data.title.profile_photo}
                      alt="Profile"
                      className="object-cover rounded-full"
                    />
                  </Avatar>
                </div>
              )}

              {/* اطلاعات سمت راست */}
              <div className="flex flex-col md:flex-row justify-between w-full text-center md:text-left gap-6  dark:bg-transparent p-4 md:p-0">
                {/* بخش نام و عنوان */}
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-2 break-words">
                    {data.title.display_name}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-amber-700 dark:text-amber-300 font-serif italic mb-4">
                    {data.title.title}
                  </p>
                </div>
                {/* بخش اطلاعات تماس */}
                <div className="overflow-x-auto w-full md:w-auto">
                  <table className="min-w-full border-collapse dark:border-amber-200 rounded-lg text-sm sm:text-base">
                    <tbody className="divide-y divide-amber-700 dark:divide-amber-300">
                      {data.contact.phone && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Phone className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">
                              {data.contact.phone}
                            </span>
                          </td>
                        </tr>
                      )}
                      {data.contact.email && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Mail className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">
                              {data.contact.email}
                            </span>
                          </td>
                        </tr>
                      )}
                      {data.contact.website && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Globe className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">
                              {data.contact.website.replace(/^https?:\/\//, "")}
                            </span>
                          </td>
                        </tr>
                      )}
                      {data.contact.github && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Github className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">
                              {data.contact.github}
                            </span>
                          </td>
                        </tr>
                      )}
                      {data.contact.linkedin && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Linkedin className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">
                              {data.contact.linkedin}
                            </span>
                          </td>
                        </tr>
                      )}
                      {data.contact.twitter && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Twitter className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">
                              {data.contact.twitter}
                            </span>
                          </td>
                        </tr>
                      )}
                      {data.contact.instagram && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Instagram className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">
                              {data.contact.instagram}
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                About me
              </h2>
              <p className="text-amber-800 dark:text-amber-200 leading-relaxed font-serif text-lg pl-0">
                {data.title.about}
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Education
              </h2>
              <div className="pl-0 space-y-4">
                {hasEducations ? (
                  data.educations.map((ed, idx) => (
                    <div key={idx} className="border-l-2 border-amber-300 pl-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-lg font-serif font-bold text-amber-900 dark:text-amber-100">
                          {ed.title}
                        </h3>
                        <span className="text-sm text-amber-700 dark:text-amber-300 font-sans">
                          {fmt(ed.from_date)} – {fmt(ed.to_date)}
                        </span>
                      </div>
                      <p className="text-amber-800 dark:text-amber-200 font-serif">
                        {ed.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-serif">
                    No education added yet
                  </p>
                )}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Work Experience
              </h2>
              <div className="pl-0 space-y-6">
                {hasWorks ? (
                  data.works.map((w, idx) => (
                    <div key={idx} className="border-l-2 border-amber-300 pl-4">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-xl font-serif font-bold text-amber-900 dark:text-amber-100">
                          {w.title}
                        </h3>
                        <span className="text-sm text-amber-700 dark:text-amber-300 font-sans">
                          {fmt(w.from_date)} – {fmt(w.to_date)}
                        </span>
                      </div>
                      <p className="text-amber-800 dark:text-amber-200 font-serif leading-relaxed">
                        {w.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-serif">
                    No work experience added yet
                  </p>
                )}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Projects
              </h2>
              <div className="pl-0 space-y-4">
                {hasProjects ? (
                  data.projects.map((p, idx) => (
                    <div
                      key={idx}
                      className="border-l-2 border-amber-300 dark:border-amber-700 pl-4"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-lg font-serif font-bold text-amber-900 dark:text-amber-100">
                          {p.title}
                        </h3>
                        <span className="text-sm text-amber-700 dark:text-amber-300 font-sans">
                          {fmt(p.from_date)} – {fmt(p.to_date)}
                        </span>
                      </div>
                      <p className="text-amber-800 dark:text-amber-200 font-serif">
                        {p.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-serif">
                    No project added yet
                  </p>
                )}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Certifications
              </h2>
              <div className="pl-0 space-y-4">
                {hasEducations ? (
                  data.certifications.map((p, idx) => (
                    <div
                      key={idx}
                      className="border-l-2 border-amber-300 dark:border-amber-700 pl-4"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-lg font-serif font-bold text-amber-900 dark:text-amber-100">
                          {p.title}
                        </h3>
                        <span className="text-sm text-amber-700 dark:text-amber-300 font-sans">
                          {fmt(p.from_date)} – {fmt(p.to_date)}
                        </span>
                      </div>
                      <p className="text-amber-800 dark:text-amber-200 font-serif">
                        {p.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-serif">
                    No certification added yet
                  </p>
                )}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Skills
              </h2>
              <div className="pl-0 grid md:grid-cols-3 gap-6">
                {hasSkills ? (
                  Object.entries(data.skills).map(([cat, arr]) => (
                    <div key={cat}>
                      <h3 className="text-sm uppercase tracking-wider text-amber-700 dark:text-amber-300 font-semibold mb-2 font-sans">
                        {cat}
                      </h3>
                      <ul className="space-y-1">
                        {arr.map((s, i) => (
                          <li
                            key={i}
                            className="text-amber-800 dark:text-amber-200 font-serif"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-serif">
                    No skill added yet
                  </p>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-8 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Interests & Hobbies
              </h2>
              <div className="pl-0">
                <p className="text-amber-800 dark:text-amber-200 font-serif">
                  {hasHobbies ? (
                    data.hobbies.map((h) => h.title).join(" • ")
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No hobby added yet
                    </p>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
    )
}


