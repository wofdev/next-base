import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Phone,
} from "lucide-react";

export default function ResumePreview() {
  const data = {
    display_name: "John Doe",
    title: "Senior Web Developer",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet.",
    profilePhoto: {
      url: "https://example.com/avatar/johndoe.jpg",
      alt: "John Doe profile photo",
    },
    skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "HTML5 & CSS3",
      "Tailwind CSS",
      "PostgreSQL",
      "MongoDB",
    ],
    educations: [
      {
        title: "B.Sc. Computer Science",
        description:
          "Graduated from State University (2013–2017)...",
      },
      {
        title: "Full-Stack Web Development Bootcamp",
        description:
          "Completed an intensive bootcamp at Tech Academy (2018)...",
      },
    ],
    works: [
      {
        title: "Senior Frontend Engineer at BrightApps Inc.",
        description:
          "Led the frontend team in developing a SaaS platform...",
      },
      {
        title: "Full-Stack Developer at Nova Web Solutions",
        description:
          "Worked on e-commerce and management platforms...",
      },
    ],
    projects: [
      {
        title: "Project Management Dashboard",
        description:
          "Built a project tracking dashboard using React...",
      },
      {
        title: "E-commerce Web App",
        description:
          "Developed a full-featured e-commerce platform...",
      },
    ],
    certifications: [
      {
        title: "AWS Certified Developer – Associate",
        description: "Issued by Amazon Web Services in 2021.",
      },
      {
        title: "Certified React Developer",
        description: "Issued by Meta in 2022.",
      },
    ],
    hobbies: ["Photography", "Traveling", "Cycling", "Chess"],
    contactdetails: {
      phone: "+1 415-555-0123",
      email: "john.doe@example.com",
      website: "https://www.johndoe.dev",
      github: "johndoe",
      linkedIn: "johndoe",
      twitter: "johndoe_dev",
      instagram: "john_doe_photography",
    },
  };

  return (
    <div className="min-h-screen bg-surface-2 p-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          {/* ستون چپ */}
          <Card className="sticky top-8 h-fit">
            <CardContent>
              <div className="flex flex-col items-center text-center gap-4">
                <Avatar className="w-32 h-32">
                  {data.profilePhoto?.url ? (
                    <AvatarImage
                      src={data.profilePhoto.url}
                      alt={data.profilePhoto.alt}
                    />
                  ) : (
                    <AvatarFallback>
                      {(data.display_name || "?").slice(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div>
                  <h1 className="text-2xl font-semibold">
                    {data.display_name}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {data.title}
                  </p>
                </div>

                <Separator className="my-3 w-full" />

                <div className="flex flex-wrap gap-2 justify-center">
                  {data.skills.slice(0, 6).map((s, i) => (
                    <Badge
                      key={i}
                      className="uppercase text-xs py-2 px-3"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>

                <Separator className="my-3 w-full" />

                <div className="flex flex-col w-full gap-2">
                  {data.contactdetails.phone && (
                    <a
                      href={`tel:${data.contactdetails.phone}`}
                      className="flex items-center gap-2 text-sm hover:underline"
                    >
                      <Phone size={16} /> {data.contactdetails.phone}
                    </a>
                  )}

                  {data.contactdetails.email && (
                    <a
                      href={`mailto:${data.contactdetails.email}`}
                      className="flex items-center gap-2 text-sm hover:underline"
                    >
                      <Mail size={16} /> {data.contactdetails.email}
                    </a>
                  )}

                  {data.contactdetails.website && (
                    <a
                      href={data.contactdetails.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm hover:underline"
                    >
                      <Globe size={16} />{" "}
                      {data.contactdetails.website.replace(
                        /^https?:\/\//,
                        ""
                      )}
                    </a>
                  )}
                </div>

                <div className="flex gap-3 mt-3 justify-center">
                  {data.contactdetails.github && (
                    <a
                      href={`https://github.com/${data.contactdetails.github}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github />
                    </a>
                  )}
                  {data.contactdetails.linkedIn && (
                    <a
                      href={`https://www.linkedin.com/in/${data.contactdetails.linkedIn}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin />
                    </a>
                  )}
                  {data.contactdetails.twitter && (
                    <a
                      href={`https://twitter.com/${data.contactdetails.twitter}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Twitter />
                    </a>
                  )}
                  {data.contactdetails.instagram && (
                    <a
                      href={`https://instagram.com/${data.contactdetails.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram />
                    </a>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button asChild>
                    <a
                      href={data.contactdetails.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit Website
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ستون راست */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-justify">{data.about}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <Badge key={i} className="rounded-full">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                {data.educations.map((ed, idx) => (
                  <div key={idx} className="p-3 border rounded-lg mb-2">
                    <h3 className="font-semibold">{ed.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {ed.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {data.works.map((w, idx) => (
                  <div key={idx} className="p-3 border rounded-lg mb-2">
                    <h3 className="font-semibold">{w.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {w.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.projects.map((p, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold">{p.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {p.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                {data.certifications.map((c, idx) => (
                  <div key={idx} className="p-3 border rounded-lg mb-2">
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {c.description}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hobbies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.hobbies.map((h, i) => (
                    <Badge key={i} className="py-2 px-3">
                      {h}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
