"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, Globe, Github, Instagram, Twitter, Briefcase, GraduationCap, Award, Heart, Code, Info, Sun, Moon, MapPin, Calendar, Sparkles, Zap, Star, Rocket, Target, TrendingUp, Linkedin, Paperclip, PhilippinePeso, PhoneCall, Smile } from 'lucide-react'
import axios from "axios"
// Sample data structure

const fmt = (d) => {
  if (!d) return "Present"
  const date = new Date(d)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

export default function ResumeThemes() {
  // const [display_theme, setDisplayTheme] = useState(1)
  const [theme, setTheme] = useState("light")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const [data, setData] = useState({});
  useEffect(() => {
    const get_data = async () => {
      let res = await axios.get("http://localhost:8000/api/resume-data/")
      setData(res.data)
      console.log(res.data)
    }
    get_data();
  }, [])

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-950">

      {/* Theme 1: modern */}
      {data?.title?.theme == 1 && (<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden rounded-2xl">
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
              className={`sticky top-8 h-fit backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center gap-6">
                  {
                    data.title && <div className="relative">
                      {
                        data.title?.profile_photo && <Avatar className="w-32 h-32 ring-4 ring-blue-500/30 dark:ring-blue-400/30 ring-offset-4 ring-offset-white dark:ring-offset-gray-800">
                          <img
                            src={"http://localhost:8000" + data.title?.profile_photo}
                            alt="Profile"
                            className="object-cover rounded-full"
                          />
                        </Avatar>
                      }
                    </div>
                  }
                  <div>
                    <h2 className="text-2xl font-bold text-balance mb-2 text-gray-900 dark:text-white">{data?.title?.display_name}</h2>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">{data.title?.title}</p>
                  </div>
                  <Separator className="my-4 w-full bg-gray-200 dark:bg-gray-700" />
                  <div className="w-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Skills</h3>
                    </div>
                    {Object.entries(data.skills || {}).map(([cat, arr]) => (
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
                    ))}
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
                className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
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
                  <p className="leading-relaxed text-pretty text-gray-700 dark:text-gray-300">{data.title?.about}</p>
                </CardContent>
              </Card>

              <Card
                className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
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
                  {data.educations && data.educations.length ? (
                    <div className="space-y-4">
                      {data.educations.map((ed, idx) => (
                        <div
                          key={idx}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-all duration-300 hover:border-blue-500/30 backdrop-blur-sm"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-balance text-gray-900 dark:text-white">{ed.title}</h3>
                            <Badge
                              variant="outline"
                              className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                            >
                              {fmt(ed.from_date)} - {fmt(ed.to_date)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{ed.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">No education added.</p>
                  )}
                </CardContent>
              </Card>

              <Card
                className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
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
                  {data.works && data.works.length ? (
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
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{w.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">No work experience.</p>
                  )}
                </CardContent>
              </Card>

              <Card
                className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
                style={{ animationDelay: "1.0s" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Featured Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data.projects && data.projects.length ? (
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
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.description}</p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">No projects yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card
                className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
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
                  {data.certifications && data.certifications.length ? (
                    <div className="space-y-4">
                      {data.certifications.map((c, idx) => (
                        <div
                          key={idx}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-all duration-300 hover:border-blue-500/30 backdrop-blur-sm"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="font-semibold text-balance text-gray-900 dark:text-white">{c.title}</div>
                            <Badge
                              variant="outline"
                              className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                            >
                              {fmt(c.from_date)}
                              {c.to_date ? ` - ${fmt(c.to_date)}` : ""}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{c.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">No certifications.</p>
                  )}
                </CardContent>
              </Card>
              <Card
                className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
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
                    {data.hobbies && data.hobbies.length ? (
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">No hobbies listed.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      )}
      {/* Theme 2: grass */}
      {data?.title?.theme == 2 && (
        <div className="min-h-screen bg-emerald-50 dark:bg-slate-900 rounded-2xl">
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
                  <h1 className="text-3xl sm:text-5xl font-bold text-emerald-900 dark:text-emerald-100 mb-2 break-words">
                    {data.title.display_name}
                  </h1>
                  <p className="text-lg sm:text-xl text-emerald-700 dark:text-emerald-300 break-words">
                    {data.title.title}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border-l-4 border-emerald-500">
                  <h3 className="text-lg font-bold mb-4 text-emerald-900 dark:text-emerald-100">Contact</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2"> <Phone className="w-4 h-4 text-green-800 dark:text-green-400" />{data.contact.phone && <div className="text-gray-700 dark:text-gray-300">{data.contact.phone}</div>}</div>
                    <div className="flex gap-2"> <Mail className="w-4 h-4 text-green-800 dark:text-green-400" />{data.contact.email && <div className="text-gray-700 dark:text-gray-300">{data.contact.email}</div>}</div>
                    <div className="flex gap-2"> <Globe className="w-4 h-4 text-green-800 dark:text-green-400" />{data.contact.website && <div className="text-gray-700 dark:text-gray-300">{data.contact.website.replace(/^https?:\/\//, "")}</div>}</div>
                    <div className="flex gap-2"> <Github className="w-4 h-4 text-green-800 dark:text-green-400" />{data.contact.github && <div className="text-gray-700 dark:text-gray-300">{data.contact.github}</div>}</div>
                    <div className="flex gap-2"> <Linkedin className="w-4 h-4 text-green-800 dark:text-green-400" />{data.contact.linkedin && <div className="text-gray-700 dark:text-gray-300">{data.contact.linkedin}</div>}</div>
                    <div className="flex gap-2"> <Twitter className="w-4 h-4 text-green-800 dark:text-green-400" />{data.contact.twitter && <div className="text-gray-700 dark:text-gray-300">{data.contact.twitter}</div>}</div>
                    <div className="flex gap-2"> <Instagram className="w-4 h-4 text-green-800 dark:text-green-400" />{data.contact.instagram && <div className="text-gray-700 dark:text-gray-300">{data.contact.instagram}</div>}</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border-l-4 border-teal-500">
                  <h3 className="text-lg font-bold mb-4 text-emerald-900 dark:text-emerald-100">Skills</h3>
                  {Object.entries(data.skills).map(([cat, arr]) => (
                    <div key={cat} className="mb-4">
                      <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-2 font-semibold">{cat}</h4>
                      <div className="space-y-1">
                        {arr.map((s, i) => (
                          <div key={i} className="text-sm text-gray-700 dark:text-gray-300">• {s}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                  <h3 className="text-lg font-bold mb-4 text-emerald-900 dark:text-emerald-100">Hobbies</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.hobbies.map((h, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
                        {h.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">About</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.title.about}</p>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-300 dark:bg-emerald-700"></div>
                  <div className="space-y-8 pl-8">

                    <div>
                      <div className="absolute left-0 w-4 h-4 bg-teal-500 rounded-full -ml-[7px]"></div>
                      <h3 className="text-xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">Education</h3>
                      {data.educations.map((ed, idx) => (
                        <div key={idx} className="mb-6 bg-white dark:bg-slate-800 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{ed.title}</h4>
                            <span className="text-xs text-teal-600 dark:text-teal-400">
                              {fmt(ed.from_date)} - {fmt(ed.to_date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{ed.description}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="absolute left-0 w-4 h-4 bg-emerald-500 rounded-full -ml-[7px]"></div>
                      <h3 className="text-xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">Experience</h3>
                      {data.works.map((w, idx) => (
                        <div key={idx} className="mb-6 bg-white dark:bg-slate-800 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{w.title}</h4>
                            <span className="text-xs text-emerald-600 dark:text-emerald-400">
                              {fmt(w.from_date)} - {fmt(w.to_date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{w.description}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="absolute left-0 w-4 h-4 bg-cyan-500 rounded-full -ml-[7px]"></div>
                      <h3 className="text-xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">Projects</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {data.projects.map((p, idx) => (
                          <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{p.title}</h4>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-2">
                              {fmt(p.from_date)} - {fmt(p.to_date)}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{p.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="absolute left-0 w-4 h-4 bg-cyan-500 rounded-full -ml-[7px]"></div>
                      <h3 className="text-xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">Certifications</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {data.certifications.map((p, idx) => (
                          <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{p.title}</h4>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-2">
                              {fmt(p.from_date)} - {fmt(p.to_date)}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{p.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Theme 3: mango */}
      {data?.title?.theme == 3 && (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 dark:from-gray-900 dark:via-red-950 dark:to-orange-950 rounded-2xl p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-orange-600 to-amber-300 dark:from-orange-700 dark:to-red-700 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
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
                    <h1 className="text-3xl sm:text-5xl font-black mb-3">{data.title.display_name}</h1>
                    <p className="text-xl sm:text-2xl font-light text-red-100">{data.title.title}</p>
                    <p className="mt-4 text-red-50 max-w-2xl">{data.title.about}</p>
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Contact</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-2"> <Phone className="w-4 h-4 text-red-600 dark:text-red-400" />{data.contact.phone && <div className="text-gray-700 dark:text-gray-300">{data.contact.phone}</div>}</div>
                  <div className="flex gap-2"> <Mail className="w-4 h-4 text-red-600 dark:text-red-400" />{data.contact.email && <div className="text-gray-700 dark:text-gray-300">{data.contact.email}</div>}</div>
                  <div className="flex gap-2"> <Globe className="w-4 h-4 text-red-600 dark:text-red-400" />{data.contact.website && <div className="text-gray-700 dark:text-gray-300">{data.contact.website.replace(/^https?:\/\//, "")}</div>}</div>
                  <div className="flex gap-2"> <Github className="w-4 h-4 text-red-600 dark:text-red-400" />{data.contact.github && <div className="text-gray-700 dark:text-gray-300">{data.contact.github}</div>}</div>
                  <div className="flex gap-2"> <Linkedin className="w-4 h-4 text-red-600 dark:text-red-400" />{data.contact.linkedin && <div className="text-gray-700 dark:text-gray-300">{data.contact.linkedin}</div>}</div>
                  <div className="flex gap-2"> <Twitter className="w-4 h-4 text-red-600 dark:text-red-400" />{data.contact.twitter && <div className="text-gray-700 dark:text-gray-300">{data.contact.twitter}</div>}</div>
                  <div className="flex gap-2"> <Instagram className="w-4 h-4 text-red-600 dark:text-red-400" />{data.contact.instagram && <div className="text-gray-700 dark:text-gray-300">{data.contact.instagram}</div>}</div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Skills</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(data.skills).map(([cat, arr]) => (
                    <div key={cat}>
                      <h4 className="text-xs uppercase font-bold text-red-600 dark:text-red-400 mb-2">{cat}</h4>
                      <div className="flex flex-wrap gap-2">
                        {arr.map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Education</h3>
                </div>
                <div className="space-y-4">
                  {data.educations.map((ed, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{ed.title}</h4>
                      <p className="text-xs text-red-600 dark:text-red-400 mb-2">
                        {fmt(ed.from_date)} - {fmt(ed.to_date)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{ed.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Experience</h3>
                </div>
                <div className="space-y-4">
                  {data.works.map((w, idx) => (
                    <div key={idx} className="border-l-4 border-red-500 pl-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">{w.title}</h4>
                        <span className="text-xs text-red-600 dark:text-red-400 font-semibold">
                          {fmt(w.from_date)} - {fmt(w.to_date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{w.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Projects</h3>
                </div>
                <div className="space-y-4">
                  {data.projects.map((w, idx) => (
                    <div key={idx} className="border-l-4 border-red-500 pl-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">{w.title}</h4>
                        <span className="text-xs text-red-600 dark:text-red-400 font-semibold">
                          {fmt(w.from_date)} - {fmt(w.to_date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{w.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Paperclip className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Certifications</h3>
                </div>
                <div className="space-y-4">
                  {data.certifications.map((ed, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{ed.title}</h4>
                      <p className="text-xs text-red-600 dark:text-red-400 mb-2">
                        {fmt(ed.from_date)} - {fmt(ed.to_date)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{ed.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Smile className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Hobbies</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex flex-wrap gap-2">
                    {data.hobbies.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                        {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Theme 4: cyberpunk */}
      {data?.title?.theme == 4 && (
        <div className="min-h-screen bg-black rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
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
                    <p className="text-2xl text-cyan-300 font-mono">&gt; {data.title.title}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr] gap-6">
              <div className="space-y-4">
                <div className="border border-purple-500/50 rounded-lg p-4 bg-purple-950/20">
                  {data.title?.profile_photo && (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-purple-500 p-1"><Avatar className="w-full h-full">
                      <img
                        src={"http://localhost:8000" + data.title.profile_photo}
                        alt="Profile"
                        className="object-cover rounded-full"
                      />
                    </Avatar></div>
                  )}
                  <div className="text-center">
                    <div className="text-cyan-400 text-xs font-mono mb-2">[PROFILE_ACTIVE]</div>
                  </div>
                </div>
                <div className="border border-cyan-500/50 rounded-lg p-4 bg-cyan-950/20">
                  <h3 className="text-cyan-400 font-mono text-sm mb-3 flex items-center gap-2">
                    <span className="text-pink-500">&gt;</span> CONTACT.SYS
                  </h3>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex gap-2"> <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />{data.contact.phone && <div className="text-gray-50 dark:text-gray-50">{data.contact.phone}</div>}</div>
                    <div className="flex gap-2"> <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />{data.contact.email && <div className="text-gray-50 dark:text-gray-50">{data.contact.email}</div>}</div>
                    <div className="flex gap-2"> <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />{data.contact.website && <div className="text-gray-50 dark:text-gray-50">{data.contact.website.replace(/^https?:\/\//, "")}</div>}</div>
                    <div className="flex gap-2"> <Github className="w-4 h-4 text-purple-600 dark:text-purple-400" />{data.contact.github && <div className="text-gray-50 dark:text-gray-50">{data.contact.github}</div>}</div>
                    <div className="flex gap-2"> <Linkedin className="w-4 h-4 text-purple-600 dark:text-purple-400" />{data.contact.linkedin && <div className="text-gray-50 dark:text-gray-50">{data.contact.linkedin}</div>}</div>
                    <div className="flex gap-2"> <Twitter className="w-4 h-4 text-purple-600 dark:text-purple-400" />{data.contact.twitter && <div className="text-gray-50 dark:text-gray-50">{data.contact.twitter}</div>}</div>
                    <div className="flex gap-2"> <Instagram className="w-4 h-4 text-purple-600 dark:text-purple-400" />{data.contact.instagram && <div className="text-gray-50 dark:text-gray-50">{data.contact.instagram}</div>}</div>
                  </div>
                </div>
                <div className="border border-pink-500/50 rounded-lg p-4 bg-pink-950/20">
                  <h3 className="text-pink-400 font-mono text-sm mb-3 flex items-center gap-2">
                    <span className="text-cyan-500">&gt;</span> SKILLS.EXE
                  </h3>
                  {Object.entries(data.skills).map(([cat, arr]) => (
                    <div key={cat} className="mb-3">
                      <div className="text-xs text-purple-400 font-mono mb-1">[{cat.toUpperCase()}]</div>
                      <div className="space-y-1">
                        {arr.map((s, i) => (
                          <div key={i} className="text-xs text-gray-300 font-mono">
                            <span className="text-cyan-500">▸</span> {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="border border-cyan-500/50 rounded-lg p-6 bg-gradient-to-br from-cyan-950/20 to-purple-950/20">
                  <h3 className="text-cyan-400 font-mono text-lg mb-3 flex items-center gap-2">
                    <span className="text-pink-500">&gt;&gt;</span> ABOUT.TXT
                  </h3>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">{data.title.about}</p>
                </div>
                <div className="border border-purple-500/50 rounded-lg p-6 bg-gradient-to-br from-purple-950/20 to-pink-950/20">
                  <h3 className="text-purple-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <span className="text-cyan-500">&gt;&gt;</span> EDUCATION.LOG
                  </h3>
                  <div className="space-y-4">
                    {data.educations.map((w, idx) => (
                      <div key={idx} className="border-l-2 border-purple-500 pl-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-cyan-300 font-mono text-sm font-bold">{w.title}</h4>
                          <span className="text-xs text-pink-400 font-mono">
                            [{fmt(w.from_date)} - {fmt(w.to_date)}]
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs font-mono">{w.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-purple-500/50 rounded-lg p-6 bg-gradient-to-br from-purple-950/20 to-pink-950/20">
                  <h3 className="text-purple-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <span className="text-cyan-500">&gt;&gt;</span> EXPERIENCE.LOG
                  </h3>
                  <div className="space-y-4">
                    {data.works.map((w, idx) => (
                      <div key={idx} className="border-l-2 border-purple-500 pl-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-cyan-300 font-mono text-sm font-bold">{w.title}</h4>
                          <span className="text-xs text-pink-400 font-mono">
                            [{fmt(w.from_date)} - {fmt(w.to_date)}]
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs font-mono">{w.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-purple-500/50 rounded-lg p-6 bg-gradient-to-br from-purple-950/20 to-pink-950/20">
                  <h3 className="text-purple-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <span className="text-cyan-500">&gt;&gt;</span> PROJECTS.LOG
                  </h3>
                  <div className="space-y-4">
                    {data.projects.map((w, idx) => (
                      <div key={idx} className="border-l-2 border-purple-500 pl-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-cyan-300 font-mono text-sm font-bold">{w.title}</h4>
                          <span className="text-xs text-pink-400 font-mono">
                            [{fmt(w.from_date)} - {fmt(w.to_date)}]
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs font-mono">{w.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-purple-500/50 rounded-lg p-6 bg-gradient-to-br from-purple-950/20 to-pink-950/20">
                  <h3 className="text-purple-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <span className="text-cyan-500">&gt;&gt;</span> CERTIFICATIOS.SAVED
                  </h3>
                  <div className="space-y-4">
                    {data.certifications.map((w, idx) => (
                      <div key={idx} className="border-l-2 border-purple-500 pl-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-cyan-300 font-mono text-sm font-bold">{w.title}</h4>
                          <span className="text-xs text-pink-400 font-mono">
                            [{fmt(w.from_date)} - {fmt(w.to_date)}]
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs font-mono">{w.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-cyan-500/50 rounded-lg p-4 bg-cyan-950/20">
                    <h3 className="text-cyan-400 font-mono text-sm mb-3 flex items-center gap-2">
                      <span className="text-purple-500">&gt;</span> HOBBIES.FUN
                    </h3>
                    {data.hobbies.map((ed, idx) => (
                      <div key={idx} className="mb-3">
                        <h4 className="text-gray-300 font-mono text-xs font-bold">{ed.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Theme 5: classic */}
      {data?.title?.theme == 5 && (
        <div className="min-h-screen bg-amber-50 dark:bg-stone-900 rounded-2xl p-8">
          <div className="max-w-5xl mx-auto">
            {/* Classic Header */}
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
                            <span className="truncate">{data.contact.phone}</span>
                          </td>
                        </tr>
                      )}
                      {data.contact.email && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Mail className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">{data.contact.email}</span>
                          </td>
                        </tr>
                      )}
                      {data.contact.website && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Globe className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">{data.contact.website.replace(/^https?:\/\//, "")}</span>
                          </td>
                        </tr>
                      )}
                      {data.contact.github && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Github className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">{data.contact.github}</span>
                          </td>
                        </tr>
                      )}
                      {data.contact.linkedin && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Linkedin className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">{data.contact.linkedin}</span>
                          </td>
                        </tr>
                      )}
                      {data.contact.twitter && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Twitter className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">{data.contact.twitter}</span>
                          </td>
                        </tr>
                      )}
                      {data.contact.instagram && (
                        <tr className="hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="text-amber-900 dark:text-amber-100 whitespace-nowrap">
                            <Instagram className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                          </td>
                          <td className="px-4 py-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <span className="truncate">{data.contact.instagram}</span>
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
                {data.educations.map((ed, idx) => (
                  <div key={idx} className="border-l-2 border-amber-300 pl-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-serif font-bold text-amber-900 dark:text-amber-100">{ed.title}</h3>
                      <span className="text-sm text-amber-700 dark:text-amber-300 font-sans">
                        {fmt(ed.from_date)} – {fmt(ed.to_date)}
                      </span>
                    </div>
                    <p className="text-amber-800 dark:text-amber-200 font-serif">{ed.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Professional Experience
              </h2>
              <div className="pl-0 space-y-6">
                {data.works.map((w, idx) => (
                  <div key={idx} className="border-l-2 border-amber-300 pl-4">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-xl font-serif font-bold text-amber-900 dark:text-amber-100">{w.title}</h3>
                      <span className="text-sm text-amber-700 dark:text-amber-300 font-sans">
                        {fmt(w.from_date)} – {fmt(w.to_date)}
                      </span>
                    </div>
                    <p className="text-amber-800 dark:text-amber-200 font-serif leading-relaxed">{w.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Projects
              </h2>
              <div className="pl-0 space-y-4">
                {data.projects.map((p, idx) => (
                  <div key={idx} className="border-l-2 border-amber-300 dark:border-amber-700 pl-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-serif font-bold text-amber-900 dark:text-amber-100">{p.title}</h3>
                      <span className="text-sm text-amber-700 dark:text-amber-300 font-sans">
                        {fmt(p.from_date)} – {fmt(p.to_date)}
                      </span>
                    </div>
                    <p className="text-amber-800 dark:text-amber-200 font-serif">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Certifications
              </h2>
              <div className="pl-0 space-y-4">
                {data.certifications.map((p, idx) => (
                  <div key={idx} className="border-l-2 border-amber-300 dark:border-amber-700 pl-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-serif font-bold text-amber-900 dark:text-amber-100">{p.title}</h3>
                      <span className="text-sm text-amber-700 dark:text-amber-300 font-sans">
                        {fmt(p.from_date)} – {fmt(p.to_date)}
                      </span>
                    </div>
                    <p className="text-amber-800 dark:text-amber-200 font-serif">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Skills
              </h2>
              <div className="pl-0 grid md:grid-cols-3 gap-6">
                {Object.entries(data.skills).map(([cat, arr]) => (
                  <div key={cat}>
                    <h3 className="text-sm uppercase tracking-wider text-amber-700 dark:text-amber-300 font-semibold mb-2 font-sans">
                      {cat}
                    </h3>
                    <ul className="space-y-1">
                      {arr.map((s, i) => (
                        <li key={i} className="text-amber-800 dark:text-amber-200 font-serif">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-8 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Interests
              </h2>
              <div className="pl-0">
                <p className="text-amber-800 dark:text-amber-200 font-serif">
                  {data.hobbies.map((h) => h.title).join(" • ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
