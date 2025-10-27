"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, Globe, Github, Instagram, Twitter, Briefcase, GraduationCap, Award, Heart, Code, Info, Sun, Moon, MapPin, Calendar, Sparkles, Zap, Star, Rocket, Target, TrendingUp } from 'lucide-react'
import axios from "axios"
// Sample data structure

const fmt = (d) => {
  if (!d) return "Present"
  const date = new Date(d)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

export default function ResumeThemes() {
  const [display_theme, setDisplayTheme] = useState(1)
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
      {/* Theme Selector */}
      <div className="max-w-7xl mx-auto mb-8 flex gap-4 flex-wrap">
        {[1, 2, 3, 4, 5].map((t) => (
          <Button
            key={t}
            onClick={() => setDisplayTheme(t)}
            variant={display_theme === t ? "default" : "outline"}
            size="sm"
          >
            Theme {t}
          </Button>
        ))}
      </div>

      {/* Theme 1: Modern Blue/Purple with Floating Elements */}
      {
        display_theme == 1 && <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden rounded-2xl">
          {/* Background decorative elements with dark mode support */}
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
            <div className={`flex justify-end items-center mb-8 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}>
              <div className="flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 hover:bg-blue-500/20 border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 text-gray-700 dark:text-gray-300"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  {theme === "dark" ? "Light" : "Dark"}
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[350px_1fr] gap-8">
              <Card
                className={`sticky top-8 h-fit backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-8">
                  <div>{console.log(data.title)}</div>
                  <div className="flex flex-col items-center text-center gap-6">
                    {data.title && <div className="relative">
                      <Avatar className="w-32 h-32 ring-4 ring-blue-500/30 dark:ring-blue-400/30 ring-offset-4 ring-offset-white dark:ring-offset-gray-800">
                        {data.title?.profilePhoto ? (
                          <AvatarImage src={data.title.profilePhoto || "/placeholder.svg"} alt={data?.title?.display_name} />
                        ) : (
                          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-white">
                            {data?.title?.display_name
                              .split(" ")
                              .map((p) => p[0])
                              .slice(0, 2)
                              .join("")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>}

                    <div>
                      <h2 className="text-2xl font-bold text-balance mb-2 text-gray-900 dark:text-white">{data?.title?.display_name}</h2>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">{data.title?.title}</p>
                      {/* <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    Available for hire
                  </div> */}
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
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* About */}
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

                {/* Work Experience */}
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

                {/* Education */}
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

                {/* Projects */}
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

                {/* Certifications */}
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

                {/* Hobbies */}
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
      }

      {/* Theme 2: Minimalist Green/Teal with Timeline */}
      {display_theme === 2 && (
        <div className="min-h-screen bg-emerald-50 dark:bg-slate-900 rounded-2xl">
          <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-5xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">{data.title.display_name}</h1>
                <p className="text-xl text-emerald-700 dark:text-emerald-300">{data.title.title}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="border-emerald-300 dark:border-emerald-700"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Contact & Skills */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border-l-4 border-emerald-500">
                  <h3 className="text-lg font-bold mb-4 text-emerald-900 dark:text-emerald-100">Contact</h3>
                  <div className="space-y-3 text-sm">
                    {data.contact.email && (
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        {data.contact.email}
                      </div>
                    )}
                    {data.contact.phone && (
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        {data.contact.phone}
                      </div>
                    )}
                    {data.contact.website && (
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        {data.contact.website.replace(/^https?:\/\//, "")}
                      </div>
                    )}
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

              {/* Right Column - Timeline */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">About</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.title.about}</p>
                </div>

                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-300 dark:bg-emerald-700"></div>

                  <div className="space-y-8 pl-8">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme 3: Bold Orange/Red with Grid Layout */}
      {display_theme === 3 && (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 dark:from-gray-900 dark:via-red-950 dark:to-orange-950 rounded-2xl p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h1 className="text-5xl font-black mb-3">{data.title.display_name}</h1>
                  <p className="text-2xl font-light text-orange-100">{data.title.title}</p>
                  <p className="mt-4 text-orange-50 max-w-2xl">{data.title.about}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Contact Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Contact</h3>
                </div>
                <div className="space-y-3 text-sm">
                  {data.contact.email && <div className="text-gray-700 dark:text-gray-300">{data.contact.email}</div>}
                  {data.contact.phone && <div className="text-gray-700 dark:text-gray-300">{data.contact.phone}</div>}
                  {data.contact.website && <div className="text-gray-700 dark:text-gray-300">{data.contact.website.replace(/^https?:\/\//, "")}</div>}
                </div>
              </div>

              {/* Skills Card */}
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
                      <h4 className="text-xs uppercase font-bold text-orange-600 dark:text-orange-400 mb-2">{cat}</h4>
                      <div className="flex flex-wrap gap-2">
                        {arr.map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Experience</h3>
                </div>
                <div className="space-y-4">
                  {data.works.map((w, idx) => (
                    <div key={idx} className="border-l-4 border-orange-500 pl-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">{w.title}</h4>
                        <span className="text-xs text-orange-600 dark:text-orange-400 font-semibold">
                          {fmt(w.from_date)} - {fmt(w.to_date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{w.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
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

              {/* Projects */}
              {data.projects.map((p, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{p.title}</h4>
                  </div>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mb-2">
                    {fmt(p.from_date)} - {fmt(p.to_date)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{p.description}</p>
                </div>
              ))}

              {/* Certifications */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Certifications</h3>
                </div>
                <div className="space-y-3">
                  {data.certifications.map((c, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{c.title}</h4>
                      <p className="text-xs text-pink-600 dark:text-pink-400">{fmt(c.from_date)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme 4: Dark Cyberpunk with Neon Accents */}
      {display_theme === 4 && (
        <div className="min-h-screen bg-black rounded-2xl p-8 relative overflow-hidden">
          {/* Neon grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Glowing Header */}
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                  >
                    <Zap className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr] gap-6">
              {/* Sidebar */}
              <div className="space-y-4">
                {/* Profile */}
                <div className="border border-purple-500/50 rounded-lg p-4 bg-purple-950/20">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-purple-500 p-1">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={data.title.profilePhoto || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white font-bold">
                        {data.title.display_name.split(" ").map((p) => p[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-400 text-xs font-mono mb-2">[PROFILE_ACTIVE]</div>
                  </div>
                </div>

                {/* Contact */}
                <div className="border border-cyan-500/50 rounded-lg p-4 bg-cyan-950/20">
                  <h3 className="text-cyan-400 font-mono text-sm mb-3 flex items-center gap-2">
                    <span className="text-pink-500">&gt;</span> CONTACT.SYS
                  </h3>
                  <div className="space-y-2 text-xs font-mono">
                    {data.contact.email && <div className="text-gray-300">{data.contact.email}</div>}
                    {data.contact.phone && <div className="text-gray-300">{data.contact.phone}</div>}
                    {data.contact.github && <div className="text-gray-300">{data.contact.github.replace(/^https?:\/\//, "")}</div>}
                  </div>
                </div>

                {/* Skills */}
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

              {/* Main Content */}
              <div className="space-y-4">
                {/* About */}
                <div className="border border-cyan-500/50 rounded-lg p-6 bg-gradient-to-br from-cyan-950/20 to-purple-950/20">
                  <h3 className="text-cyan-400 font-mono text-lg mb-3 flex items-center gap-2">
                    <span className="text-pink-500">&gt;&gt;</span> ABOUT.TXT
                  </h3>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">{data.title.about}</p>
                </div>

                {/* Experience */}
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

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {data.projects.map((p, idx) => (
                    <div key={idx} className="border border-pink-500/50 rounded-lg p-4 bg-gradient-to-br from-pink-950/20 to-purple-950/20 hover:border-pink-500 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                        <h4 className="text-pink-300 font-mono text-sm font-bold">{p.title}</h4>
                      </div>
                      <p className="text-xs text-cyan-400 font-mono mb-2">
                        [{fmt(p.from_date)} - {fmt(p.to_date)}]
                      </p>
                      <p className="text-gray-400 text-xs font-mono">{p.description}</p>
                    </div>
                  ))}
                </div>

                {/* Education & Certs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-cyan-500/50 rounded-lg p-4 bg-cyan-950/20">
                    <h3 className="text-cyan-400 font-mono text-sm mb-3 flex items-center gap-2">
                      <span className="text-purple-500">&gt;</span> EDUCATION.DB
                    </h3>
                    {data.educations.map((ed, idx) => (
                      <div key={idx} className="mb-3">
                        <h4 className="text-gray-300 font-mono text-xs font-bold">{ed.title}</h4>
                        <p className="text-cyan-400 text-xs font-mono">
                          [{fmt(ed.from_date)} - {fmt(ed.to_date)}]
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border border-pink-500/50 rounded-lg p-4 bg-pink-950/20">
                    <h3 className="text-pink-400 font-mono text-sm mb-3 flex items-center gap-2">
                      <span className="text-cyan-500">&gt;</span> CERTS.DAT
                    </h3>
                    {data.certifications.map((c, idx) => (
                      <div key={idx} className="mb-3">
                        <h4 className="text-gray-300 font-mono text-xs font-bold">{c.title}</h4>
                        <p className="text-pink-400 text-xs font-mono">[{fmt(c.from_date)}]</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme 5: Elegant Serif with Cream/Brown Palette */}
      {display_theme === 5 && (
        <div className="min-h-screen bg-amber-50 dark:bg-stone-900 rounded-2xl p-8">
          <div className="max-w-5xl mx-auto">
            {/* Classic Header */}
            <div className="text-center mb-12 pb-8 border-b-2 border-amber-800 dark:border-amber-200">
              <h1 className="text-6xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-3">
                {data.title.display_name}
              </h1>
              <p className="text-xl text-amber-700 dark:text-amber-300 font-serif italic">{data.title.title}</p>
              <div className="flex justify-center gap-6 mt-6 text-sm text-amber-800 dark:text-amber-200">
                {data.contact.email && <span>{data.contact.email}</span>}
                {data.contact.phone && <span>•</span>}
                {data.contact.phone && <span>{data.contact.phone}</span>}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="mt-4 text-amber-700 dark:text-amber-300"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>

            {/* Professional Summary */}
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Professional Summary
              </h2>
              <p className="text-amber-800 dark:text-amber-200 leading-relaxed font-serif text-lg pl-16">
                {data.title.about}
              </p>
            </div>

            {/* Core Competencies */}
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Core Competencies
              </h2>
              <div className="pl-16 grid md:grid-cols-3 gap-6">
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

            {/* Professional Experience */}
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Professional Experience
              </h2>
              <div className="pl-16 space-y-6">
                {data.works.map((w, idx) => (
                  <div key={idx}>
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

            {/* Education */}
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Education
              </h2>
              <div className="pl-16 space-y-4">
                {data.educations.map((ed, idx) => (
                  <div key={idx}>
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

            {/* Notable Projects */}
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                Notable Projects
              </h2>
              <div className="pl-16 space-y-4">
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

            {/* Certifications & Interests */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                  Certifications
                </h2>
                <div className="pl-12 space-y-2">
                  {data.certifications.map((c, idx) => (
                    <div key={idx}>
                      <h3 className="font-serif font-semibold text-amber-900 dark:text-amber-100">{c.title}</h3>
                      <p className="text-sm text-amber-700 dark:text-amber-300 font-sans">{fmt(c.from_date)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-amber-800 dark:bg-amber-200"></div>
                  Interests
                </h2>
                <div className="pl-12">
                  <p className="text-amber-800 dark:text-amber-200 font-serif">
                    {data.hobbies.map((h) => h.title).join(" • ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import {
//   Mail,
//   Globe,
//   Github,
//   Linkedin,
//   Twitter,
//   Instagram,
//   Phone,
//   Download,
//   Share2,
//   Star,
//   Info,
//   Zap,
//   Code,
//   Briefcase,
//   GraduationCap,
//   Award,
//   Heart,
//   Sun,
//   Moon,
// } from "lucide-react"
// import { useTheme } from "next-themes"
// import axios from "axios"

// export default function ResumePreview() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [mounted, setMounted] = useState(false)
//   const { theme, setTheme } = useTheme()
//   const display_theme = 1;

//   useEffect(() => {
//     setIsVisible(true)
//     setMounted(true)
//   }, [])

//   const [data, setData] = useState({});
//   useEffect(()=>{
//     const get_data = async () => {
//       let res = await axios.get("http://localhost:8000/api/resume-data/")
//       setData(res.data)
//       console.log(res.data)
//     }
//     get_data();
//   },[])

//   // ====== helpers ======
//   const fmt = (iso) => {
//     if (!iso) return ""
//     const d = new Date(iso)
//     if (Number.isNaN(d.getTime())) return iso
//     return d.toLocaleString(undefined, { month: "short", year: "numeric" })
//   }

//   const nameFromEmail = (email) => {
//     if (!email) return "Your Name"
//     const local = email.split("@")[0]
//     return local
//       .split(/[.\-_]/)
//       .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
//       .join(" ")
//   }



//   // flatten skills for quick badges
//   const flatSkills = Object.entries(data.skills || {}).flatMap(([cat, arr]) => (arr || []).map((s) => ({ cat, s })))

//   if (!mounted) {
//     return null
//   }

//   return (
//     display_theme == 1 && <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden rounded-2xl">
//       {/* Background decorative elements with dark mode support */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-float"></div>
//         <div
//           className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-float"
//           style={{ animationDelay: "2s" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 dark:bg-blue-400/3 rounded-full blur-3xl animate-float"
//           style={{ animationDelay: "4s" }}
//         ></div>
//       </div>

//       <div className="container mx-auto p-8 relative z-10">
//         <div className={`flex justify-end items-center mb-8 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}>
//           <div className="flex">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 hover:bg-blue-500/20 border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 text-gray-700 dark:text-gray-300"
//             >
//               {theme === "dark" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
//               {theme === "dark" ? "Light" : "Dark"}
//             </Button>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-[350px_1fr] gap-8">
//           <Card
//             className={`sticky top-8 h-fit backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}
//             style={{ animationDelay: "0.2s" }}
//           >
//             <CardContent className="p-8">
//               <div className="flex flex-col items-center text-center gap-6">
//                 <div className="relative">
//                   <Avatar className="w-32 h-32 ring-4 ring-blue-500/30 dark:ring-blue-400/30 ring-offset-4 ring-offset-white dark:ring-offset-gray-800">
//                     {data.title?.profilePhoto ? (
//                       <AvatarImage src={data.title.profilePhoto || "/placeholder.svg"} alt={data?.title?.display_name} />
//                     ) : (
//                       <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-white">
//                         {data?.title?.display_name
//                           .split(" ")
//                           .map((p) => p[0])
//                           .slice(0, 2)
//                           .join("")}
//                       </AvatarFallback>
//                     )}
//                   </Avatar>
//                   {/* <div className="absolute -bottom-2 -right-2 bg-blue-600 dark:bg-blue-500 text-white rounded-full p-2">
//                     <Star className="w-4 h-4" />
//                   </div> */}
//                 </div>

//                 <div>
//                   <h2 className="text-2xl font-bold text-balance mb-2 text-gray-900 dark:text-white">{data?.title?.display_name}</h2>
//                   <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">{data.title?.title}</p>
//                   {/* <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
//                     <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//                     Available for hire
//                   </div> */}
//                 </div>

//                 <Separator className="my-4 w-full bg-gray-200 dark:bg-gray-700" />

//                 <div className="w-full">
//                   <div className="flex items-center gap-2 mb-4">
//                     <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                     <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Skills</h3>
//                   </div>
//                   {Object.entries(data.skills || {}).map(([cat, arr]) => (
//                     <div key={cat} className="mb-6">
//                       <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3 capitalize">
//                         {cat}
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         {(arr || []).map((s, i) => (
//                           <Badge
//                             key={`${cat}-${i}`}
//                             variant="secondary"
//                             className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
//                           >
//                             {s}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <Separator className="my-4 w-full bg-gray-200 dark:bg-gray-700" />

//                 <div className="flex flex-col w-full gap-3">
//                   {data.contact?.phone && (
//                     <a
//                       href={`tel:${data.contact.phone}`}
//                       className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
//                     >
//                       <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                       {data.contact.phone}
//                     </a>
//                   )}
//                   {data.contact?.email && (
//                     <a
//                       href={`mailto:${data.contact.email}`}
//                       className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
//                     >
//                       <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                       {data.contact.email}
//                     </a>
//                   )}
//                   {data.contact?.website && (
//                     <a
//                       href={data.contact.website}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
//                     >
//                       <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                       {data.contact.website.replace(/^https?:\/\//, "")}
//                     </a>
//                   )}

//                                     {data.contact?.github && (
//                     <a
//                       href={data.contact.github}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
//                     >
//                       <Github className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                       {data.contact.github.replace(/^https?:\/\//, "")}
//                     </a>
//                   )}
//                                     {data.contact?.instagram && (
//                     <a
//                       href={data.contact.instagram}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
//                     >
//                       <Instagram className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                       {data.contact.instagram.replace(/^https?:\/\//, "")}
//                     </a>
//                   )}

//                                                       {data.contact?.twitter && (
//                     <a
//                       href={data.contact.twitter}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300"
//                     >
//                       <Twitter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                       {data.contact.twitter.replace(/^https?:\/\//, "")}
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="space-y-6">
//             {/* About */}
//             <Card
//               className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "0.4s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   About
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="leading-relaxed text-pretty text-gray-700 dark:text-gray-300">{data.title?.about}</p>
//               </CardContent>
//             </Card>

//             {/* Work Experience */}
//             <Card
//               className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "0.6s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   Work Experience
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {data.works && data.works.length ? (
//                   <div className="space-y-4">
//                     {data.works.map((w, idx) => (
//                       <div
//                         key={idx}
//                         className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-all duration-300 hover:border-blue-500/30 backdrop-blur-sm"
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <h3 className="font-semibold text-lg text-balance text-gray-900 dark:text-white">
//                             {w.title}
//                           </h3>
//                           <Badge
//                             variant="outline"
//                             className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
//                           >
//                             {fmt(w.from_date)} - {fmt(w.to_date)}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{w.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-600 dark:text-gray-400">No work experience.</p>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Education */}
//             <Card
//               className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "0.8s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   Education
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {data.educations && data.educations.length ? (
//                   <div className="space-y-4">
//                     {data.educations.map((ed, idx) => (
//                       <div
//                         key={idx}
//                         className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-all duration-300 hover:border-blue-500/30 backdrop-blur-sm"
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <h3 className="font-semibold text-balance text-gray-900 dark:text-white">{ed.title}</h3>
//                           <Badge
//                             variant="outline"
//                             className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
//                           >
//                             {fmt(ed.from_date)} - {fmt(ed.to_date)}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{ed.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-600 dark:text-gray-400">No education added.</p>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Projects */}
//             <Card
//               className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "1.0s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   Featured Projects
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {data.projects && data.projects.length ? (
//                     data.projects.map((p, idx) => (
//                       <Card
//                         key={idx}
//                         className="border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-all duration-300 hover:border-blue-500/30 group backdrop-blur-sm"
//                       >
//                         <CardContent className="pt-4">
//                           <div className="flex items-start justify-between mb-2">
//                             <h4 className="font-semibold text-balance group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-gray-900 dark:text-white">
//                               {p.title}
//                             </h4>
//                             <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//                           </div>
//                           <Badge
//                             variant="outline"
//                             className="text-xs mb-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
//                           >
//                             {fmt(p.from_date)} - {fmt(p.to_date)}
//                           </Badge>
//                           <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.description}</p>
//                         </CardContent>
//                       </Card>
//                     ))
//                   ) : (
//                     <p className="text-sm text-gray-600 dark:text-gray-400">No projects yet.</p>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Certifications */}
//             <Card
//               className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "1.2s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   Certifications
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {data.certifications && data.certifications.length ? (
//                   <div className="space-y-4">
//                     {data.certifications.map((c, idx) => (
//                       <div
//                         key={idx}
//                         className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-all duration-300 hover:border-blue-500/30 backdrop-blur-sm"
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <div className="font-semibold text-balance text-gray-900 dark:text-white">{c.title}</div>
//                           <Badge
//                             variant="outline"
//                             className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
//                           >
//                             {fmt(c.from_date)}
//                             {c.to_date ? ` - ${fmt(c.to_date)}` : ""}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{c.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-600 dark:text-gray-400">No certifications.</p>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Hobbies */}
//             <Card
//               className={`backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "1.4s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl text-gray-900 dark:text-white">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   Interests & Hobbies
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-wrap gap-3">
//                   {data.hobbies && data.hobbies.length ? (
//                     data.hobbies.map((h, i) => (
//                       <Badge
//                         key={i}
//                         className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors px-4 py-2 text-sm"
//                         variant="outline"
//                       >
//                         {h.title}
//                       </Badge>
//                     ))
//                   ) : (
//                     <p className="text-sm text-gray-600 dark:text-gray-400">No hobbies listed.</p>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }