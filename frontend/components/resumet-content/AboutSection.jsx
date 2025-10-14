// components/resume/AboutSection.jsx
"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import axios from "axios";
export default function AboutSection({ data, setData }) {

  useEffect(() => {
    const getdata = async () => {
      const res = await axios.get('http://localhost:8000/api/title-data/');
      console.log(res.data)
      setData(prev => ({ 
        ...prev, 
        titleData: {
           ...prev.titleData, 
           about: res.data.about,
           title: res.data.title
          } }))
    }
    getdata();
  }, [])

  return (
    <div className=" p-3 rounded-md mb-3">
      <Textarea
        placeholder="Write about yourself"
        value={data.titleData.about}
        onChange={(e) => setData({ ...data, titleData: { ...data.titleData, about: e.target.value } })}
        className=" dark:bg-gray-400 bg-gray-50 mb-4"
      />
      <Input
        placeholder="Display Name"
        value={data.titleData.display_name}
        onChange={(e) => setData({ ...data, titleData: { ...data.titleData, display_name: e.target.value } })}
        className=" dark:bg-gray-400 bg-gray-50 mb-2"
      />
      <Input
        placeholder="Title"
        value={data.titleData.title}
        onChange={(e) => setData({ ...data, titleData: { ...data.titleData, title: e.target.value } })}
        className=" dark:bg-gray-400 bg-gray-50 mb-2"
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setData({ ...data, titleData: { ...data.titleData, profilePhoto: e.target.files?.[0] || null } })
        }
        className=" dark:bg-gray-400 bg-gray-50 text-back"
      />
      {data?.profilePhoto && (
        <img
          src={URL.createObjectURL(data.titleData.profilePhoto)}
          alt="Profile"
          className=" dark:bg-gray-400 bg-gray-50 mt-3 w-24 h-24 object-cover rounded-full border"
        />
      )}
    </div>
  );
}
