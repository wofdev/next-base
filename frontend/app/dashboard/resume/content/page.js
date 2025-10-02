"use client";
import { useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-context-menu";
import AboutSection from "@/components/resumet-content/AboutSection";
import ContactSection from "@/components/resumet-content/ContactSection";
import EducationSection from "@/components/resumet-content/EducationSection";
import WorkSection from "@/components/resumet-content/WorkSection";
import ProjectSection from "@/components/resumet-content/ProjectSection";
import CertificationSection from "@/components/resumet-content/CertificationSection";
import HobbySection from "@/components/resumet-content/HobbySection";
import SkillsSection from "@/components/resumet-content/SkillSection";
export default function ResumeContent() {
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
        description: "Google Cloud Platform Professional Cloud Architect Certification.",
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

  const [editIndex, setEditIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);
  const [tempData, setTempData] = useState({});

  const sendData = async () => { console.log(resumeData) };

  const handleDialogConfirm = () => {
    if (openDialog && tempData) {
      if (editIndex !== null) {
        const updatedSection = [...resumeData[openDialog]];
        updatedSection[editIndex] = tempData;
        setResumeData({ ...resumeData, [openDialog]: updatedSection });
        setEditIndex(null);
      } else {
        setResumeData({
          ...resumeData,
          [openDialog]: [...resumeData[openDialog], tempData],
        });
      }
    }
    setTempData({});
    setOpenDialog(null);
  };

  return (

    <div className="w-3/4 p-6 space-y-6  rounded-lg">
      <p className="text-sm text-gray-400">Edit your resume content</p>
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="about" className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none">
          <AccordionTrigger>About</AccordionTrigger>
          <AccordionContent>
            <AboutSection data={resumeData} setData={setResumeData} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="contact" className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none">
          <AccordionTrigger>Contact</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <ContactSection resumeData={resumeData} setResumeData={setResumeData} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="educations" className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none">
          <AccordionTrigger>Educations</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <EducationSection
              data={resumeData}
              setData={setResumeData}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setTempData={setTempData}
              setEditIndex={setEditIndex}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="works" className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none">
          <AccordionTrigger>Work Experiences</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <WorkSection
              data={resumeData}
              setData={setResumeData}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setTempData={setTempData}
              setEditIndex={setEditIndex}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="projects" className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none">
          <AccordionTrigger>Projects</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <ProjectSection
              data={resumeData}
              setData={setResumeData}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setTempData={setTempData}
              setEditIndex={setEditIndex}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="certifications" className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none">
          <AccordionTrigger>Certifications</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <CertificationSection
              data={resumeData}
              setData={setResumeData}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setTempData={setTempData}
              setEditIndex={setEditIndex}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="hobbies" className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none">
          <AccordionTrigger>Hobbies</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <HobbySection
              data={resumeData}
              setData={setResumeData}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setTempData={setTempData}
              setEditIndex={setEditIndex}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem key="skills" value="skills" className="dark:bg-gray-500 bg-gray-100 text-black border-none rounded-md px-3 mb-3">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <SkillsSection data={resumeData} setData={setResumeData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button onClick={sendData} className="">
        Save Changes
      </Button>
      <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="bg-gray-300 dark:bg-black">
          <DialogHeader>
            <DialogTitle>Add {openDialog}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Title"
            value={tempData.title || ""}
            onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
            className="!bg-gray-300 mb-2"
          />
          {openDialog !== "hobbies" && (
            <div className="flex gap-4 mb-2">
              <div className="flex flex-col w-1/2">
                <label className="text-sm text-gray-600 mb-1">From</label>
                <Input
                className="!bg-gray-300"
                  type="date"
                  value={tempData.from || ""}
                  onChange={(e) => setTempData({ ...tempData, from: e.target.value })}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-sm text-gray-600 mb-1">To</label>
                <Input
                className="!bg-gray-300"
                  type="date"
                  value={tempData.to || ""}
                  onChange={(e) => setTempData({ ...tempData, to: e.target.value })}
                />
              </div>
            </div>
          )}
          <Textarea
            placeholder="Description"
            value={tempData.description || ""}
            onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
            className="!bg-gray-300 mb-2"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleDialogConfirm}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
