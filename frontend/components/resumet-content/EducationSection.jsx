// components/resume/EducationSection.jsx
"use client";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";


export default function EducationSection({
  data,
  setData,
  openDialog,
  setOpenDialog,
  setTempData,
  setEditIndex,
}) {

  useEffect(() => {
    const getdata = async () => {
      const res = await axios.get('http://localhost:8000/api/education-data/');
      setData(prev => ({ 
        ...prev, 
        educations: res.data.map((x=>({
                  from: x.from_date,
        to: x.to_date,
        title: x.title,
        description:x.description
        }))) }))
    }
    getdata();
  }, [])

  return (
    <div className="space-y-3">
      {data.educations.map((item, idx) => (
        <div
          key={idx}
          className=" p-3 rounded flex justify-between items-center dark:bg-gray-400 bg-gray-200"
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
              onClick={() =>
                setData({
                  ...data,
                  educations: data.educations.filter((_, i) => i !== idx),
                })
              }
            />
            <PencilLine
              onClick={() => {
                setTempData(item);
                setOpenDialog("educations");
                setEditIndex(idx);
              }}
              className="cursor-pointer p-1 rounded text-white bg-gray-700"
              size={26}
            />
          </div>
        </div>
      ))}

      <Button onClick={() => setOpenDialog("educations")}>
        + Add
      </Button>
    </div>
  );
}
