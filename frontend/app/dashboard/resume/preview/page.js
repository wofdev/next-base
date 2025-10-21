"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Phone,
  Download,
  Share2,
  Star,
  Zap,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"
import axios from "axios"

export default function ResumePreview() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsVisible(true)
    setMounted(true)
  }, [])

  const [data, setData] = useState({});
  useEffect(()=>{
    const get_data = async () => {
      let res = await axios.get("http://localhost:8000/api/resume-data/")
      setData(res.data)
      console.log(res.data)
    }
    get_data();
  },[])

  // ====== helpers ======
  const fmt = (iso) => {
    if (!iso) return ""
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleString(undefined, { month: "short", year: "numeric" })
  }

  const nameFromEmail = (email) => {
    if (!email) return "Your Name"
    const local = email.split("@")[0]
    return local
      .split(/[.\-_]/)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ")
  }



  // flatten skills for quick badges
  const flatSkills = Object.entries(data.skills || {}).flatMap(([cat, arr]) => (arr || []).map((s) => ({ cat, s })))

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden rounded-2xl">
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
        <div className={`flex justify-between items-center mb-8 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
            Preview Preview
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Professional • Modern • Impressive</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 hover:bg-blue-500/20 border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 text-gray-700 dark:text-gray-300"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 hover:bg-blue-500/20 border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 text-gray-700 dark:text-gray-300"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white animate-glow"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[350px_1fr] gap-8">
          <Card
            className={`sticky top-8 h-fit backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center gap-6">
                <div className="relative">
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
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 dark:bg-blue-500 text-white rounded-full p-2">
                    <Star className="w-4 h-4" />
                  </div>
                </div>

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
                    <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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
//   Zap,
//   Code,
//   Briefcase,
//   GraduationCap,
//   Award,
//   Heart,
// } from "lucide-react"

// export default function ResumePreview() {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     setIsVisible(true)
//   }, [])

//   const data = {
//     title: {
//       about:
//         "I am a passionate full-stack developer with 5+ years of experience in building scalable web applications and RESTful APIs. I thrive on creating innovative solutions that bridge the gap between cutting-edge technology and exceptional user experiences.",
//       profilePhoto: null,
//       title: "Full Stack Developer",
//     },
//     skills: {
//       frontend: ["Next.js", "React", "JavaScript", "TypeScript"],
//       backend: ["Python", "Django", "Node.js", "REST API"],
//       devops: ["Docker", "AWS", "CI/CD", "Kubernetes"],
//     },
//     educations: [
//       {
//         from: "2018-09-01",
//         to: "2022-06-30",
//         title: "B.Sc. in Computer Science - University of California",
//         description:
//           "Graduated with honors, focused on software engineering and web development. Led multiple hackathon teams to victory.",
//       },
//       {
//         from: "2023-01-01",
//         to: "2023-06-30",
//         title: "React Advanced Bootcamp",
//         description: "Completed an intensive React & Next.js course with distinction.",
//       },
//     ],
//     works: [
//       {
//         from: "2022-07-01",
//         to: "2024-09-01",
//         title: "Senior Software Engineer at Google",
//         description:
//           "Developed scalable microservices for Google Cloud Platform. Led a team of 5 engineers and improved system performance by 40%.",
//       },
//       {
//         from: "2020-01-01",
//         to: "2022-06-30",
//         title: "Frontend Developer at StartupX",
//         description:
//           "Built React and Next.js apps with real-time features and WebSocket integration. Increased user engagement by 60%.",
//       },
//     ],
//     projects: [
//       {
//         from: "2023-03-01",
//         to: "2023-08-01",
//         title: "E-commerce Platform",
//         description:
//           "Developed a full-stack e-commerce platform with Next.js, Django and Stripe payments integration. Processed $1M+ in transactions.",
//       },
//       {
//         from: "2024-01-01",
//         to: "2024-03-01",
//         title: "AI Chatbot",
//         description:
//           "Created a chatbot powered by OpenAI GPT API to automate customer support. Reduced response time by 80%.",
//       },
//     ],
//     certifications: [
//       {
//         from: "2021-05-01",
//         to: "2021-05-01",
//         title: "AWS Certified Solutions Architect",
//         description: "Earned AWS certification for designing and deploying scalable systems on AWS.",
//       },
//       {
//         from: "2022-08-15",
//         to: "2022-08-15",
//         title: "Google Cloud Professional",
//         description: "Google Cloud Platform Professional Cloud Architect Certification.",
//       },
//     ],
//     hobbies: [
//       {
//         title: "Photography",
//         description: "I enjoy landscape and street photography on weekends.",
//       },
//       {
//         title: "Traveling",
//         description: "Love exploring new cultures and cities.",
//       },
//       {
//         title: "Open Source",
//         description: "Contributing to open source projects and mentoring developers.",
//       },
//     ],
//     contact: {
//       phone: "+1 234 567 890",
//       email: "john.doe@example.com",
//       website: "https://johndoe.dev",
//       github: "https://github.com/johndoe",
//       linkedIn: "https://linkedin.com/in/johndoe",
//       twitter: "https://twitter.com/johndoe",
//       instagram: "https://instagram.com/johndoe",
//     },
//   }

//   // ====== helpers ======
//   const fmt = (iso) => {
//     if (!iso) return ""
//     const d = new Date(iso)
//     if (Number.isNaN(d.getTime())) return iso
//     return d.to_dateLocaleString(undefined, { month: "short", year: "numeric" })
//   }

//   const nameFromEmail = (email) => {
//     if (!email) return "Your Name"
//     const local = email.split("@")[0]
//     return local
//       .split(/[.\-_]/)
//       .map((s) => s.charAt(0).to_dateUpperCase() + s.slice(1))
//       .join(" ")
//   }

//   const display_name = nameFromEmail(data.contactdetails?.email)

//   // flatten skills for quick badges
//   const flatSkills = Object.entries(data.skills || {}).flatMap(([cat, arr]) => (arr || []).map((s) => ({ cat, s })))

//   return (
//     <div className="min-h-screen bg-background grid-pattern relative overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
//         <div
//           className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
//           style={{ animationDelay: "2s" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"
//           style={{ animationDelay: "4s" }}
//         ></div>
//       </div>

//       <div className="container mx-auto p-8 relative z-10 bg-white dark:bg-black">
//         <div className={`flex justify-between items-center mb-8 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}>
//           <div>
//             <h1 className="text-4xl font-bold text-gradient mb-2">Resume Preview</h1>
//             <p className="text-muted-foreground">Professional • Modern • Impressive</p>
//           </div>
//           <div className="flex gap-3">
//             <Button variant="outline" size="sm" className="glass-effect hover:bg-primary/20 bg-transparent dark:text-white text-black">
//               <Share2 className="w-4 h-4 mr-2 " />
//               Share
//             </Button>
//             <Button size="sm" className="bg-primary hover:bg-primary/90 animate-glow">
//               <Download className="w-4 h-4 mr-2" />
//               Download PDF
//             </Button>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-[350px_1fr] gap-8">
//           <Card
//             className={`sticky top-8 h-fit glass-effect border-primary/20 ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}
//             style={{ animationDelay: "0.2s" }}
//           >
//             <CardContent className="p-8">
//               <div className="flex flex-col items-center text-center gap-6">
//                 <div className="relative">
//                   <Avatar className="w-32 h-32 ring-4 ring-primary/30 ring-offset-4 ring-offset-background">
//                     {data.title?.profilePhoto ? (
//                       <AvatarImage src={data.title.profilePhoto || "/placeholder.svg"} alt={display_name} />
//                     ) : (
//                       <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
//                         {display_name
//                           .split(" ")
//                           .map((p) => p[0])
//                           .slice(0, 2)
//                           .join("")}
//                       </AvatarFallback>
//                     )}
//                   </Avatar>
//                   <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
//                     <Star className="w-4 h-4" />
//                   </div>
//                 </div>

//                 <div>
//                   <h2 className="text-2xl font-bold text-balance mb-2">{display_name}</h2>
//                   <p className="text-primary font-medium text-lg">{data.title?.title}</p>
//                   <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
//                     <Zap className="w-4 h-4 text-accent" />
//                     Available for hire
//                   </div>
//                 </div>

//                 <Separator className="my-4 w-full bg-border/50" />

//                 <div className="w-full">
//                   <div className="flex items-center gap-2 mb-4">
//                     <Code className="w-5 h-5 text-primary" />
//                     <h3 className="font-semibold text-lg">Skills</h3>
//                   </div>
//                   {Object.entries(data.skills || {}).map(([cat, arr]) => (
//                     <div key={cat} className="mb-6">
//                       <div className="flex items-center text-muted-foreground text-sm mb-3 capitalize">{cat}</div>
//                       <div className="flex flex-wrap gap-2">
//                         {(arr || []).map((s, i) => (
//                           <Badge
//                             key={`${cat}-${i}`}
//                             variant="secondary"
//                             className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
//                           >
//                             {s}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <Separator className="my-4 w-full bg-border/50" />

//                 <div className="flex flex-col w-full gap-3">
//                   {data.contactdetails?.phone && (
//                     <a
//                       href={`tel:${data.contactdetails.phone}`}
//                       className="flex items-center gap-3 text-sm hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10"
//                     >
//                       <Phone className="w-4 h-4 text-primary" />
//                       {data.contactdetails.phone}
//                     </a>
//                   )}
//                   {data.contactdetails?.email && (
//                     <a
//                       href={`mailto:${data.contactdetails.email}`}
//                       className="flex items-center gap-3 text-sm hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10"
//                     >
//                       <Mail className="w-4 h-4 text-primary" />
//                       {data.contactdetails.email}
//                     </a>
//                   )}
//                   {data.contactdetails?.website && (
//                     <a
//                       href={data.contactdetails.website}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-3 text-sm hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10"
//                     >
//                       <Globe className="w-4 h-4 text-primary" />
//                       {data.contactdetails.website.replace(/^https?:\/\//, "")}
//                     </a>
//                   )}
//                 </div>

//                 <div className="flex gap-4 mt-4 justify-center">
//                   {data.contactdetails?.github && (
//                     <a
//                       href={data.contactdetails.github}
//                       target="_blank"
//                       rel="noreferrer"
//                       aria-label="github"
//                       className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       <Github className="w-5 h-5" />
//                     </a>
//                   )}
//                   {data.contactdetails?.linkedIn && (
//                     <a
//                       href={data.contactdetails.linkedIn}
//                       target="_blank"
//                       rel="noreferrer"
//                       aria-label="linkedin"
//                       className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       <Linkedin className="w-5 h-5" />
//                     </a>
//                   )}
//                   {data.contactdetails?.twitter && (
//                     <a
//                       href={data.contactdetails.twitter}
//                       target="_blank"
//                       rel="noreferrer"
//                       aria-label="twitter"
//                       className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       <Twitter className="w-5 h-5" />
//                     </a>
//                   )}
//                   {data.contactdetails?.instagram && (
//                     <a
//                       href={data.contactdetails.instagram}
//                       target="_blank"
//                       rel="noreferrer"
//                       aria-label="instagram"
//                       className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       <Instagram className="w-5 h-5" />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="space-y-6">
//             {/* About */}
//             <Card
//               className={`glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "0.4s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl">
//                   <div className="p-2 bg-primary/20 rounded-lg">
//                     <Star className="w-5 h-5 text-primary" />
//                   </div>
//                   About
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="leading-relaxed text-pretty text-foreground/90">{data.title?.about}</p>
//               </CardContent>
//             </Card>

//             {/* Work Experience */}
//             <Card
//               className={`glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "0.6s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl">
//                   <div className="p-2 bg-primary/20 rounded-lg">
//                     <Briefcase className="w-5 h-5 text-primary" />
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
//                         className="p-4 border border-border/50 rounded-xl bg-card/50 hover:bg-card/80 transition-all duration-300 hover:border-primary/30"
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <h3 className="font-semibold text-lg text-balance">{w.title}</h3>
//                           <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
//                             {fmt(w.from_date)} - {fmt(w.to_date)}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-muted-foreground leading-relaxed">{w.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-muted-foreground">No work experience.</p>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Education */}
//             <Card
//               className={`glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "0.8s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl">
//                   <div className="p-2 bg-primary/20 rounded-lg">
//                     <GraduationCap className="w-5 h-5 text-primary" />
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
//                         className="p-4 border border-border/50 rounded-xl bg-card/50 hover:bg-card/80 transition-all duration-300 hover:border-primary/30"
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <h3 className="font-semibold text-balance">{ed.title}</h3>
//                           <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
//                             {fmt(ed.from_date)} - {fmt(ed.to_date)}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-muted-foreground leading-relaxed">{ed.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-muted-foreground">No education added.</p>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Projects */}
//             <Card
//               className={`glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "1.0s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl">
//                   <div className="p-2 bg-primary/20 rounded-lg">
//                     <Code className="w-5 h-5 text-primary" />
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
//                         className="border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300 hover:border-primary/30 group"
//                       >
//                         <CardContent className="pt-4">
//                           <div className="flex items-start justify-between mb-2">
//                             <h4 className="font-semibold text-balance group-hover:text-primary transition-colors">
//                               {p.title}
//                             </h4>
//                             <Zap className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
//                           </div>
//                           <Badge
//                             variant="outline"
//                             className="text-xs mb-3 bg-primary/10 text-primary border-primary/20"
//                           >
//                             {fmt(p.from_date)} - {fmt(p.to_date)}
//                           </Badge>
//                           <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
//                         </CardContent>
//                       </Card>
//                     ))
//                   ) : (
//                     <p className="text-sm text-muted-foreground">No projects yet.</p>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Certifications */}
//             <Card
//               className={`glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "1.2s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl">
//                   <div className="p-2 bg-primary/20 rounded-lg">
//                     <Award className="w-5 h-5 text-primary" />
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
//                         className="p-4 border border-border/50 rounded-xl bg-card/50 hover:bg-card/80 transition-all duration-300 hover:border-primary/30"
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <div className="font-semibold text-balance">{c.title}</div>
//                           <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
//                             {fmt(c.from_date)}
//                             {c.to_date ? ` - ${fmt(c.to_date)}` : ""}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-muted-foreground">No certifications.</p>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Hobbies */}
//             <Card
//               className={`glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
//               style={{ animationDelay: "1.4s" }}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-xl">
//                   <div className="p-2 bg-primary/20 rounded-lg">
//                     <Heart className="w-5 h-5 text-primary" />
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
//                         className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors px-4 py-2 text-sm"
//                         variant="outline"
//                       >
//                         {h.title}
//                       </Badge>
//                     ))
//                   ) : (
//                     <p className="text-sm text-muted-foreground">No hobbies listed.</p>
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
