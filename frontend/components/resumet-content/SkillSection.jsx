// components/resume/SkillsSection.jsx
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";

export default function SkillsSection({ resumeData, setResumeData }) {
  const [tempSkillParent, setTempSkillParent] = useState("");
  const [tempSkill, setTempSkill] = useState("");

  return (
    <div className="bg-white dark:bg-black p-3 rounded-md mb-3">
      {/* Add New Skill Category */}
      {/* <div className="flex mb-4 items-center">
        <Input
          className="w-42  dark:bg-gray-300 bg-gray-200 mb-4"
          value={tempSkillParent}
          onChange={(e) => setTempSkillParent(e.target.value)}
          placeholder="New Skill Category"
        />
        <Plus
          className="bg-primary text-white ms-2 rounded-full cursor-pointer"
          onClick={() => {
            const newCategory = tempSkillParent.trim().replace(/\s+/g, " ");
            if (Object.keys(resumeData.skills).includes(newCategory)) {
              alert("This category already exists.");
            } else if (newCategory) {
              setResumeData((prev) => ({
                ...prev,
                skills: {
                  ...prev.skills,
                  [newCategory]: [],
                },
              }));
              setTempSkillParent("");
            }
          }}
        />
      </div> */}
      <div className="flex items-center mb-4">
        <Input
          className="w-42 dark:bg-gray-300 bg-gray-200"
          value={tempSkillParent}
          onChange={(e) => setTempSkillParent(e.target.value)}
          placeholder="New Skill Category"
        />
        <Plus
          className="bg-primary text-white ms-2 rounded-full cursor-pointer "
          onClick={() => {
            const newCategory = tempSkillParent.trim().replace(/\s+/g, " ");
            if (Object.keys(resumeData.skills).includes(newCategory)) {
              alert("This category already exists.");
            } else if (newCategory) {
              setResumeData((prev) => ({
                ...prev,
                skills: {
                  ...prev.skills,
                  [newCategory]: [],
                },
              }));
              setTempSkillParent("");
            }
          }}
        />
      </div>


      {/* Skills Accordion */}
      <div className="space-y-3">
        <Accordion type="single" collapsible className="w-full">
          {Object.keys(resumeData.skills).map((category) => (
            <AccordionItem
              key={category}
              value={category}
              className="dark:bg-gray-500 bg-gray-100 text-black border-none rounded-md px-3 mb-3"
            >
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent className="bg-gray-300 p-3 rounded-md mb-3">
                <span
                  className="flex items-center mb-3 cursor-pointer"
                  onClick={() =>
                    setResumeData((prev) => ({
                      ...prev,
                      skills: Object.fromEntries(
                        Object.entries(prev.skills).filter(
                          ([key]) => key !== category
                        )
                      ),
                    }))
                  }
                >
                  Remove whole <span className="font-bold mx-1">{category}</span>{" "}
                  category
                </span>

                {/* Add skill to category */}
                <div className="flex mb-4 items-center">
                  <Input
                    className="w-42  dark:bg-gray-300 bg-gray-200 "
                    value={tempSkill}
                    onChange={(e) => setTempSkill(e.target.value)}
                    placeholder="Add Skill"
                  />
                  <Plus
                    className="bg-primary text-white ms-2 rounded-full cursor-pointer"
                    onClick={() => {
                      const newSkill = tempSkill.trim().replace(/\s+/g, " ");
                      if (resumeData.skills[category].includes(newSkill)) {
                        alert("This skill already exists.");
                      } else if (newSkill) {
                        setResumeData((prev) => ({
                          ...prev,
                          skills: {
                            ...prev.skills,
                            [category]: [...prev.skills[category], newSkill],
                          },
                        }));
                        setTempSkill("");
                      }
                    }}
                  />
                </div>

                {/* Skills chips */}
                {resumeData.skills[category].map((skill) => (
                  <Badge
                    key={skill}
                    className="shadow-sm me-1 rounded-full px-2 py-1 items-center gap-1"
                  >
                    {skill}
                    <span
                      className="cursor-pointer text-white ms-1"
                      onClick={() =>
                        setResumeData((prev) => ({
                          ...prev,
                          skills: {
                            ...prev.skills,
                            [category]: prev.skills[category].filter(
                              (s) => s !== skill
                            ),
                          },
                        }))
                      }
                    >
                      x
                    </span>
                  </Badge>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
