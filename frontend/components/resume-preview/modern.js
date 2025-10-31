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

export default function Modern ({data}) {
  const hasEducations = data.educations && data.educations.length;
  const hasWorks = data.works && data.works.length;
  const hasProjects = data.projects && data.projects.length;
  const hasCertifications = data.certifications && data.certifications.length;
  const hasHobbies = data.hobbies && data.hobbies.length;
  const hasSkills = Object.keys(data.skills || {}).length > 0;
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-float"></div>
            <div
              className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 dark:bg-blue-400/3 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          <div className="container mx-auto p-8 relative z-10">
            <div className="grid lg:grid-cols-[350px_1fr] gap-8">
              <Card
                className={`sticky top-8 h-fit backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center gap-6">
                    {data.title && (
                      <div className="relative">
                        {data.title?.profile_photo && (
                          <Avatar className="w-32 h-32 ring-4 ring-blue-500/30 dark:ring-blue-400/30 ring-offset-4 ring-offset-white dark:ring-offset-gray-800">
                            <img
                              src={
                                "http://localhost:8000" +
                                data.title?.profile_photo
                              }
                              alt="Profile"
                              className="object-cover rounded-full"
                            />
                          </Avatar>
                        )}
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-balance mb-2 text-gray-900 dark:text-white">
                        {data?.title?.display_name}
                      </h2>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                        {data.title?.title}
                      </p>
                    </div>
                    <Separator className="my-4 w-full bg-gray-200 dark:bg-gray-700" />
                    <div className="w-full">
                      <div className="flex items-center gap-2 mb-4">
                        <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          Skills
                        </h3>
                      </div>
                      {hasSkills ? (
                        Object.entries(data.skills || {}).map(([cat, arr]) => (
                          <div key={cat} className="mb-6">
                            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3 capitalize">
                              {cat}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(arr || []).map((s, i) => (
                                <Badge
                                  key={`${cat}-${i}`}
                                  variant="secondary"
                                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
                                >
                                  {s}
                                </Badge>
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
                    <Separator className="my-4 w-full bg-gray-200 dark:bg-gray-700" />
                    <div className="flex flex-col w-full gap-3">
                      {data.contact?.phone && (
                        <a
                          href={`tel:${data.contact.phone}`}
                          className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
                        >
                          <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          {data.contact.phone}
                        </a>
                      )}
                      {data.contact?.email && (
                        <a
                          href={`mailto:${data.contact.email}`}
                          className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
                        >
                          <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          {data.contact.email}
                        </a>
                      )}
                      {data.contact?.website && (
                        <a
                          href={data.contact.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
                        >
                          <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          {data.contact.website.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                      {data.contact?.github && (
                        <a
                          href={data.contact.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
                        >
                          <Github className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          {data.contact.github.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                      {data.contact?.linkedin && (
                        <a
                          href={data.contact.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
                        >
                          <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          {data.contact.linkedin.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                      {data.contact?.twitter && (
                        <a
                          href={data.contact.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
                        >
                          <Twitter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          {data.contact.twitter.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                      {data.contact?.instagram && (
                        <a
                          href={data.contact.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
                        >
                          <Instagram className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          {data.contact.instagram.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-6">
                <Card
                  className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300`}
                  style={{ animationDelay: "0.4s" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-pretty text-gray-700 dark:text-gray-300">
                      {data.title?.about}
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300`}
                  style={{ animationDelay: "0.8s" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {hasEducations ? (
                      <div className="space-y-4">
                        {data.educations.map((ed, idx) => (
                          <div
                            key={idx}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-all duration-300 hover:border-blue-500/30 backdrop-blur-sm"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-balance text-gray-900 dark:text-white">
                                {ed.title}
                              </h3>
                              <Badge
                                variant="outline"
                                className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                              >
                                {fmt(ed.from_date)} - {fmt(ed.to_date)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {ed.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No education added yet
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card
                  className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300`}
                  style={{ animationDelay: "0.6s" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      Work Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {hasWorks ? (
                      <div className="space-y-4">
                        {data.works.map((w, idx) => (
                          <div
                            key={idx}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-all duration-300 hover:border-blue-500/30 backdrop-blur-sm"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-lg text-balance text-gray-900 dark:text-white">
                                {w.title}
                              </h3>
                              <Badge
                                variant="outline"
                                className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                              >
                                {fmt(w.from_date)} - {fmt(w.to_date)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {w.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No work experience added yet
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card
                  className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300`}
                  style={{ animationDelay: "1.0s" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {hasProjects ? (
                        data.projects.map((p, idx) => (
                          <Card
                            key={idx}
                            className="border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-all duration-300 hover:border-blue-500/30 group backdrop-blur-sm"
                          >
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-balance group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-gray-900 dark:text-white">
                                  {p.title}
                                </h4>
                                <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <Badge
                                variant="outline"
                                className="text-xs mb-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                              >
                                {fmt(p.from_date)} - {fmt(p.to_date)}
                              </Badge>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {p.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          No project added yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300`}
                  style={{ animationDelay: "1.2s" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {hasCertifications ? (
                      <div className="space-y-4">
                        {data.certifications.map((c, idx) => (
                          <div
                            key={idx}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-all duration-300 hover:border-blue-500/30 backdrop-blur-sm"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="font-semibold text-balance text-gray-900 dark:text-white">
                                {c.title}
                              </div>
                              <Badge
                                variant="outline"
                                className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                              >
                                {fmt(c.from_date)}
                                {c.to_date ? ` - ${fmt(c.to_date)}` : ""}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {c.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No certification added yet
                      </p>
                    )}
                  </CardContent>
                </Card>
                <Card
                  className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300`}
                  style={{ animationDelay: "1.4s" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      Interests & Hobbies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {hasHobbies ? (
                        data.hobbies.map((h, i) => (
                          <Badge
                            key={i}
                            className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors px-4 py-2 text-sm"
                            variant="outline"
                          >
                            {h.title}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          No hobby added yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
    )
}


