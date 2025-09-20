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
import { PencilLine, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
export default function ResumeContent() {
  const [resumeData, setResumeData] = useState({
    about: "",
    profilePhoto: null,
    display_name: "",
    title: "",
    skills: { frontend: ["nextjs", "react", "js", "hooks"], backend: ["python", "django", "celery"] },
    educations: [],
    works: [],
    projects: [],
    certifications: [],
    hobbies: [],
    contactdetails: {
      phone: "",
      email: "",
      website: "",
      github: "",
      linkedIn: "",
      twitter: "",
      instagram: "",
    },
  });


  const [editIndex, setEditIndex] = useState(null);

  const [openDialog, setOpenDialog] = useState(null);
  const [tempData, setTempData] = useState({});



  const sendData = async () => {
    //     const formData = {};
    //     formData.about = resumeData?.about;
    //     formData.display_name = resumeData?.display_name;
    //     formData.title = resumeData?.title;
    // formData.skills = resumeData?.skills;
    //     if (resumeData?.profilePhoto) {
    //       formData.profilePhoto = resumeData?.profilePhoto;
    //     }

    //     ["educations", "works", "projects", "certifications", "hobbies"].forEach(
    //       (key) => formData[key] = resumeData[key]
    //     );
    //     formData.contactdetails = resumeData?.contactdetails;

    console.log(resumeData)

    // try {
    //   await axios.post("http://localhost:8000/api/resume/edit/2/", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //   });
    // } catch (err) {
    //   console.error("Upload failed", err);
    // }
  };

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

    <div className="w-3/4 p-6 space-y-6  rounded-lg border">
      <p className=" ">Edit your resume content</p>
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        {/* About */}
        <AccordionItem value="about" className="bg-gray-100 rounded-md px-3 border-none mb-3">
          <AccordionTrigger>About</AccordionTrigger>
          <AccordionContent className="bg-white p-3 rounded-md mb-3">
            <Textarea
              placeholder="Write about yourself"
              value={resumeData?.about}
              onChange={(e) => setResumeData({ ...resumeData, about: e.target.value })}
              className="mb-4"
            />
            <Input
              placeholder="Display Name"
              value={resumeData?.display_name}
              onChange={(e) => setResumeData({ ...resumeData, display_name: e.target.value })}
              className="mb-2"
            />
            <Input
              placeholder="Title"
              value={resumeData?.title}
              onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
              className="mb-2"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setResumeData({ ...resumeData, profilePhoto: e.target.files?.[0] || null })
              }
            />
            {resumeData?.profilePhoto && (
              <img
                src={URL.createObjectURL(resumeData?.profilePhoto)}
                alt="Profile"
                className="mt-3 w-24 h-24 object-cover rounded-full border"
              />
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Contact */}
        <AccordionItem value="contact" className="bg-gray-100 rounded-md px-3 border-none mb-3">
          <AccordionTrigger>Contact</AccordionTrigger>
          <AccordionContent className="bg-white p-3 rounded-md mb-3">
            {resumeData && Object.keys(resumeData?.contactdetails).map((key) => (
              <Input
                key={key}
                placeholder={key}
                value={resumeData?.contactdetails[key] || ""}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    contactdetails: { ...resumeData?.contactdetails, [key]: e.target.value },
                  })
                }
                className="mb-2"
              />
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Dynamic Sections */}
        {[
          { label: "Educations", key: "educations" },
          { label: "Work Experiences", key: "works" },
          { label: "Projects", key: "projects" },
          { label: "Certifications", key: "certifications" },
          { label: "Hobbies", key: "hobbies" },
        ].map((section) => (
          <AccordionItem key={section.key} value={section.key} className="bg-gray-100 rounded-md px-3 border-none mb-3">
            <AccordionTrigger>{section.label}</AccordionTrigger>
            <AccordionContent className="bg-white p-3 rounded-md mb-3">
              <div className="space-y-3">
                {resumeData && resumeData[section.key].map((item, idx) => (
                  <div
                    key={idx}
                    className="border p-3 rounded flex justify-between items-center"
                  >
                    <div>
                      <div>{item.title || "Untitled"}</div>
                      <div className="text-gray-400" >{item.description.substring(0, 50) + "..." || "Untitled"}</div>
                    </div>
                    <div className="flex gap-1">
                      <Trash2
                        className="text-rose-700 cursor-pointer  border p-1 rounded"
                        size={26}
                        onClick={() =>
                          setResumeData({
                            ...resumeData,
                            [section.key]: resumeData[section.key].filter((_, i) => i !== idx),
                          })
                        }
                      >
                        Remove
                      </Trash2>
                      <PencilLine
                        onClick={() => {
                          setTempData(item);
                          setOpenDialog(section.key);
                          setEditIndex(idx);
                        }}
                        className="text-gray-700 cursor-pointer border p-1 rounded" size={26}>

                      </PencilLine>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={() => setOpenDialog(section.key)}>
                  + Add {section.label}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        <AccordionItem key="skills" value="skills" className="bg-gray-100 rounded-md px-3 border-none mb-3">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent className="bg-white p-3 rounded-md mb-3">
            <div className="space-y-3">
              <Accordion type="single" collapsible className="w-full">
                {resumeData && Object.keys(resumeData?.skills).map((x) => {
                  return <AccordionItem value={x} className="bg-gray-100 rounded-md px-3 border-none mb-3">
                    <AccordionTrigger>{x}</AccordionTrigger>
                    <AccordionContent className="bg-white p-3 rounded-md mb-3">
                    {resumeData?.skills[x].map((y) => (
  <span
    key={y}
    className="shadow-sm border me-1 rounded-full px-2 py-1 items-center gap-1  " 
  >
    {y}

    <span className="cursor-pointer text-rose-500  ms-1"
      onClick={() => {
        setResumeData((prev) => ({
          ...prev,
          skills: {
            ...prev.skills,
            [x]: prev.skills[x].filter((skill) => skill !== y),
          },
        }));
      }}>
      x
    </span>
    
  </span>
))}

                    </AccordionContent>
                  </AccordionItem>
                })}

              </Accordion>
            </div>
          </AccordionContent>
        </AccordionItem>


      </Accordion>

      <Button onClick={sendData} className="">
        Save Changes
      </Button>

      {/* Dialog */}
      <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {openDialog}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Title"
            value={tempData.title || ""}
            onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
            className="mb-2"
          />
          <Textarea
            placeholder="Description"
            value={tempData.description || ""}
            onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
            className="mb-2"
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
