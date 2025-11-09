"use client";
import { useEffect, useState, useRef, use } from "react";
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
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function ResumeContent() {
  const [resumeData, setResumeData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);
  const [tempData, setTempData] = useState({
    title: "",
    from_date: "",
    to_date: "",
    description: "",
  });
  const [titleData, setTitleData] = useState({});
  const [contactData, setContactData] = useState({});
  const isFirstRender = useRef(true);
  const [isUserChanged, setIsUserChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_data();
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isUserChanged) {
      sendData();
      setIsUserChanged(false);
    }
  }, [resumeData, isUserChanged]);

  const get_data = async () => {
    setLoading(true);
    let res = await axios.get("http://localhost:8000/api/resume-data/");
    setResumeData(res.data);
    setTitleData(res.data.title);
    setContactData(res.data.contact);
    setLoading(false);
  };

  const handleDialogConfirm = async () => {
    const {
      title = "",
      from_date = "",
      to_date = "",
      description = "",
    } = tempData;

    if (openDialog === "hobbies") {
      if (!title.trim()) {
        toast("Empty field is not allowed...", {
          unstyled: true,
          position: "top-center",
          className: "bg-rose-600 text-white px-4 py-2 rounded-lg shadow-lg",
        });
        return;
      }
    } else {
      if (!title.trim() || !from_date || !to_date) {
        toast("Empty field is not allowed...", {
          unstyled: true,
          position: "top-center",
          className: "bg-rose-600 text-white px-4 py-2 rounded-lg shadow-lg",
        });
        return;
      }
    }

    const updatedTemp = { ...tempData, user: resumeData?.title?.user };

    setIsUserChanged(true);

    if (openDialog && updatedTemp) {
      const sectionData = resumeData[openDialog] || [];
      if (editIndex !== null) {
        const updatedSection = [...sectionData];
        updatedSection[editIndex] = updatedTemp;
        setResumeData({ ...resumeData, [openDialog]: updatedSection });
        setEditIndex(null);
      } else {
        setResumeData({
          ...resumeData,
          [openDialog]: [...sectionData, updatedTemp],
        });
      }
    }

    setTempData({ title: "", from_date: "", to_date: "", description: "" });
    setOpenDialog(null);
  };

  const sendData = async () => {
    try {
      const formData = new FormData();

      // title به صورت JSON
      if (resumeData.title) {
        const cleanTitleData = { ...resumeData.title };
        delete cleanTitleData.user; // user را حذف کن
        delete cleanTitleData.profile_photo; // عکس را جدا می‌کنیم

        formData.append("title", JSON.stringify(cleanTitleData));
      }

      // اضافه کردن فایل پروفایل فقط اگر فایل واقعی باشد
      if (resumeData.title?.profile_photo instanceof File) {
        formData.append("profile_photo", resumeData.title.profile_photo);
      }

      if (resumeData.title?.remove_photo) {
        formData.append("remove_photo", "true");
      }

      // بقیه بخش‌ها
      formData.append("contact", JSON.stringify(resumeData.contact || {}));
      formData.append(
        "educations",
        JSON.stringify(resumeData.educations || [])
      );
      formData.append("works", JSON.stringify(resumeData.works || []));
      formData.append("projects", JSON.stringify(resumeData.projects || []));
      formData.append(
        "certifications",
        JSON.stringify(resumeData.certifications || [])
      );
      formData.append("hobbies", JSON.stringify(resumeData.hobbies || []));
      formData.append("skills", JSON.stringify(resumeData.skills || {}));

      await axios.post("http://localhost:8000/api/resume-data/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast("Data saved successfully!", {
        unstyled: true,
        position: "top-center",
        className: "bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg",
      });
    } catch (error) {
      console.error("Error saving data:", error);
      toast("failed to save data.", {
        unstyled: true,
        position: "top-center",
        className: "bg-rose-600 text-white px-4 py-2 rounded-lg shadow-lg",
      });
    }
  };

  return (
    <div className="w-3/4 p-6 space-y-6 relative rounded-lg">
      {loading && (
        <div className=" bg-gray-400/0 flex justify-center items-center w-full h-full absolute z-1000 ">
          <div className="bg-slate-950 flex p-3 rounded-md">
            <Loader2Icon className="animate-spin h-6 w-6 me-2" />
            loading please wait...
          </div>
        </div>
      )}
      <p
        className="text-sm text-gray-400"
        onClick={() => {
          console.log(resumeData);
        }}
      >
        Edit your resume content
      </p>
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="about"
          className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none"
        >
          <AccordionTrigger>Title Info</AccordionTrigger>
          <AccordionContent>
            <AboutSection
              resumeData={resumeData}
              setResumeData={setResumeData}
              titleData={titleData}
              setTitleData={setTitleData}
              setIsUserChanged={setIsUserChanged}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="contact"
          className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none"
        >
          <AccordionTrigger>Contact</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <ContactSection
              resumeData={resumeData}
              setResumeData={setResumeData}
              contactData={contactData}
              setContactData={setContactData}
              setIsUserChanged={setIsUserChanged}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="educations"
          className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none"
        >
          <AccordionTrigger>Educations</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <EducationSection
              resumeData={resumeData}
              setResumeData={setResumeData}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setTempData={setTempData}
              setEditIndex={setEditIndex}
              setIsUserChanged={setIsUserChanged}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="works"
          className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none"
        >
          <AccordionTrigger>Work Experiences</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <WorkSection
              resumeData={resumeData}
              setResumeData={setResumeData}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setTempData={setTempData}
              setEditIndex={setEditIndex}
              setIsUserChanged={setIsUserChanged}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="projects"
          className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none"
        >
          <AccordionTrigger>Projects</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <ProjectSection
              resumeData={resumeData}
              setResumeData={setResumeData}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setTempData={setTempData}
              setEditIndex={setEditIndex}
              setIsUserChanged={setIsUserChanged}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="certifications"
          className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none"
        >
          <AccordionTrigger>Certifications</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <CertificationSection
              resumeData={resumeData}
              setResumeData={setResumeData}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setTempData={setTempData}
              setEditIndex={setEditIndex}
              setIsUserChanged={setIsUserChanged}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="hobbies"
          className="dark:bg-gray-500 bg-gray-100 text-black rounded-md px-3 mb-3 border-none"
        >
          <AccordionTrigger>Hobbies</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <HobbySection
              resumeData={resumeData}
              setResumeData={setResumeData}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setTempData={setTempData}
              setEditIndex={setEditIndex}
              setIsUserChanged={setIsUserChanged}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          key="skills"
          value="skills"
          className="dark:bg-gray-500 bg-gray-100 text-black border-none rounded-md px-3 mb-3"
        >
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent className=" p-3 rounded-md mb-3">
            <SkillsSection
              resumeData={resumeData}
              setResumeData={setResumeData}
              setIsUserChanged={setIsUserChanged}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="bg-gray-50 dark:bg-black">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-white">
              Add {openDialog}
            </DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Title"
            value={tempData.title || ""}
            onChange={(e) =>
              setTempData({ ...tempData, title: e.target.value })
            }
            className=" mb-2 text-black dark:text-white"
          />
          {openDialog !== "hobbies" && (
            <div>
              <div className="flex gap-4 mb-2">
                {/* <div className="flex flex-col w-1/2">
                  <label className="text-sm text-gray-600 mb-1">From</label>
                  <Input
                    className=" text-black dark:text-white"
                    type="date"
                    value={tempData.from_date || ""}
                    onChange={(e) =>
                      setTempData({ ...tempData, from_date: e.target.value })
                    }
                  />
                </div> */}
                {/* FROM DATE PICKER */}

                <div className="flex flex-col w-1/2">
                  <label className="text-sm text-gray-600 mb-1">From</label>
                  <Popover>
                    <PopoverTrigger asChild className="w-1/2">
                      <Button
                        className={cn(
                          "w-full justify-start text-left font-normal text-black dark:text-white bg-gray-200",
                          !tempData.from_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {tempData.from_date ? (
                          format(new Date(tempData.from_date), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown" // 👈 اضافه‌شده برای نمایش انتخاب ماه و سال
                        fromYear={1950} // 👈 از چه سالی نمایش دهد
                        toYear={new Date().getFullYear()} // 👈 تا سال فعلی
                        selected={
                          tempData.from_date
                            ? new Date(tempData.from_date)
                            : undefined
                        }
                        onSelect={(date) =>
                          setTempData({
                            ...tempData,
                            from_date: date
                              ? date
                                ? format(date, "yyyy-MM-dd")
                                : ""
                              : "",
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {/* <div className="flex flex-col w-1/2">
                  <label className="text-sm text-gray-600 mb-1">To</label>
                  <Input
                    className=" text-black dark:text-white"
                    type="date"
                    value={tempData.to_date || ""}
                    onChange={(e) =>
                      setTempData({ ...tempData, to_date: e.target.value })
                    }
                  />
                </div> */}
                <div className="flex flex-col w-1/2">
                  <label className="text-sm text-gray-600 mb-1">to</label>
                  <Popover>
                    <PopoverTrigger asChild className="w-1/2">
                      <Button
                        className={cn(
                          "w-full justify-start text-left font-normal text-black dark:text-white bg-gray-200",
                          !tempData.to_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {tempData.to_date ? (
                          format(new Date(tempData.to_date), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown" // 👈 اضافه‌شده برای نمایش انتخاب ماه و سال
                        fromYear={1950} // 👈 از چه سالی نمایش دهد
                        toYear={new Date().getFullYear()} // 👈 تا سال فعلی
                        selected={
                          tempData.to_date
                            ? new Date(tempData.to_date)
                            : undefined
                        }
                        onSelect={(date) =>
                          setTempData({
                            ...tempData,
                            to_date: date
                              ? date
                                ? format(date, "yyyy-MM-dd")
                                : ""
                              : "",
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Textarea
                placeholder="Description"
                value={tempData.description || ""}
                onChange={(e) =>
                  setTempData({ ...tempData, description: e.target.value })
                }
                className=" mb-2 text-black dark:text-white"
              />
            </div>
          )}

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
