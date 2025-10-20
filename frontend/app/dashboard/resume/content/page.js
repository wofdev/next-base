"use client";
import { useEffect, useState } from "react";
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
  
  const [resumeData, setResumeData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);
  const [tempData, setTempData] = useState({});

  useEffect(()=>{
    const get_data = async () => {
      let res = await axios.get("http://localhost:8000/api/resume-data/")
      setResumeData(res.data)
    }
    get_data();
  },[])

  const handleDialogConfirm = () => {
    setTempData({...tempData,user:1})
    if (openDialog && tempData) {
      if (editIndex !== null) {
        const updatedSection = [...resumeData[openDialog]];
        updatedSection[editIndex] = {...tempData,user:1};
        setResumeData({ ...resumeData, [openDialog]: updatedSection });
        setEditIndex(null);
      } else {
        setResumeData({
          ...resumeData,
          [openDialog]: [...resumeData[openDialog], {...tempData,user:1}],
        });
      }
    }
    setTempData({});
    setOpenDialog(null);
  };

  const sendData = async () => {
    console.log(resumeData)
    let res = await axios.post("http://localhost:8000/api/resume-data/",resumeData)
  }

  return (
    <div className="w-3/4 p-6 space-y-6  rounded-lg">
      <p className="text-sm text-gray-400" onClick={()=>{console.log(resumeData)}}>Edit your resume content</p>
      <Button onClick={sendData}>
        SAVE DATA
      </Button>
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="about" className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none">
          <AccordionTrigger>About</AccordionTrigger>
          <AccordionContent>
            <AboutSection resumeData={resumeData} setResumeData={setResumeData} />
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
              resumeData={resumeData}
              setResumeData={setResumeData}
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
              resumeData={resumeData}
              setResumeData={setResumeData}
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
              resumeData={resumeData}
              setResumeData={setResumeData}
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
              resumeData={resumeData}
              setResumeData={setResumeData}
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
              resumeData={resumeData}
              setResumeData={setResumeData}
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
            <SkillsSection resumeData={resumeData} setResumeData={setResumeData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="bg-gray-50 dark:bg-black">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-white">Add {openDialog}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Title"
            value={tempData.title || ""}
            onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
            className=" mb-2 text-black dark:text-white"
          />
          {openDialog !== "hobbies" && (
            <div className="flex gap-4 mb-2">
              <div className="flex flex-col w-1/2">
                <label className="text-sm text-gray-600 mb-1">From</label>
                <Input
                className=" text-black dark:text-white"
                  type="date"
                  value={tempData.from_date || ""}
                  onChange={(e) => setTempData({ ...tempData, from_date: e.target.value })}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-sm text-gray-600 mb-1">To</label>
                <Input
                className=" text-black dark:text-white"
                  type="date"
                  value={tempData.to_date || ""}
                  onChange={(e) => setTempData({ ...tempData, to_date: e.target.value })}
                />
              </div>
            </div>
          )}
          <Textarea
            placeholder="Description"
            value={tempData.description || ""}
            onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
            className=" mb-2 text-black dark:text-white"
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
