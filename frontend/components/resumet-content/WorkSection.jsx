// components/resume/WorkSection.jsx
"use client";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";

export default function WorkSection({
  data,
  setData,
  openDialog,
  setOpenDialog,
  setTempData,
  setEditIndex,
}) {
  return (
    <div className="space-y-3">
      {data.works.map((item, idx) => (
        <div
          key={idx}
          className="border p-3 rounded flex justify-between items-center"
        >
          <div>
            <div>{item.title || "Untitled"}</div>
            <div className="text-gray-400">
              {item.description?.substring(0, 50) + "..." || "Untitled"}
            </div>
          </div>
          <div className="flex gap-1">
            <Trash2
              className="text-rose-700 cursor-pointer  border p-1 rounded"
              size={26}
              onClick={() =>
                setData({
                  ...data,
                  works: data.works.filter((_, i) => i !== idx),
                })
              }
            />
            <PencilLine
              onClick={() => {
                setTempData(item);
                setOpenDialog("works");
                setEditIndex(idx);
              }}
              className="text-gray-700 cursor-pointer border p-1 rounded"
              size={26}
            />
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={() => setOpenDialog("works")}>
        + Add
      </Button>
    </div>
  );
}
