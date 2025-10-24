// components/resume/hobbiesection.jsx
"use client";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";

export default function HobbySection({
  resumeData,
  setResumeData,
  openDialog,
  setOpenDialog,
  setTempData,
  setEditIndex,
  setIsUserChanged
}) {
  return (
    <div className="space-y-3">
      {resumeData?.hobbies?.map((item, idx) => (
        <div
          key={idx}
          className="p-3 rounded flex justify-between items-center  dark:bg-gray-400 bg-gray-200"
        >
          <div>
            <div>{item.title || "Untitled"}</div>
            <div className="">
              {item.description?.substring(0, 50) + "..." || "Untitled"}
            </div>
          </div>
          <div className="flex gap-1">
            <Trash2
              className="bg-rose-700 cursor-pointer text-white p-1 rounded"
              size={26}
              onClick={() => {
                if (confirm("are you sure to delete?")) {
                  setIsUserChanged(true)
                  setResumeData({
                    ...resumeData,
                    hobbies: resumeData.hobbies.filter((_, i) => i !== idx),
                  });
                }
              }}
            />
            <PencilLine
              onClick={() => {
                setTempData(item);
                setOpenDialog("hobbies");
                setEditIndex(idx);
              }}
              className="cursor-pointer p-1 rounded text-white bg-gray-700"
              size={26}
            />
          </div>
        </div>
      ))}

      <Button onClick={() => setOpenDialog("hobbies")}>+ Add</Button>
    </div>
  );
}
