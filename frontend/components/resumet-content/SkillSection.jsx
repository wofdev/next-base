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

export default function SkillsSection({ data, setData }) {
  const [tempSkillParent, setTempSkillParent] = useState("");
  const [tempSkill, setTempSkill] = useState("");

  return (
    <div className="bg-white p-3 rounded-md mb-3">
      {/* Add New Skill Category */}
      <div className="flex mb-4 items-center">
        <Input
          className="w-42"
          value={tempSkillParent}
          onChange={(e) => setTempSkillParent(e.target.value)}
          placeholder="New Skill Category"
        />
        <Plus
          className="bg-primary text-white ms-2 rounded-full cursor-pointer"
          onClick={() => {
            const newCategory = tempSkillParent.trim().replace(/\s+/g, " ");
            if (Object.keys(data.skills).includes(newCategory)) {
              alert("This category already exists.");
            } else if (newCategory) {
              setData((prev) => ({
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
          {Object.keys(data.skills).map((category) => (
            <AccordionItem
              key={category}
              value={category}
              className="bg-gray-100 rounded-md px-3 border-none mb-3"
            >
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent className="bg-white p-3 rounded-md mb-3">
                <span
                  className="flex items-center mb-3 cursor-pointer"
                  onClick={() =>
                    setData((prev) => ({
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
                    className="w-42"
                    value={tempSkill}
                    onChange={(e) => setTempSkill(e.target.value)}
                    placeholder="Add Skill"
                  />
                  <Plus
                    className="bg-primary text-white ms-2 rounded-full cursor-pointer"
                    onClick={() => {
                      const newSkill = tempSkill.trim().replace(/\s+/g, " ");
                      if (data.skills[category].includes(newSkill)) {
                        alert("This skill already exists.");
                      } else if (newSkill) {
                        setData((prev) => ({
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
                {data.skills[category].map((skill) => (
                  <span
                    key={skill}
                    className="shadow-sm border me-1 rounded-full px-2 py-1 items-center gap-1"
                  >
                    {skill}
                    <span
                      className="cursor-pointer text-rose-500 ms-1"
                      onClick={() =>
                        setData((prev) => ({
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
                  </span>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
