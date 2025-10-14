// components/resume/AboutSection.jsx
"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
export default function AboutSection({ data, setData }) {

  useEffect(() => {
    const getdata = async () => {
      const res = await axios.get('http://localhost:8000/api/title-data/');
      setData(prev => ({ 
        ...prev, 
        titleData: {
           ...prev.titleData, 
           about: res.data.about,
           title: res.data.title,
           display_name: res.data.display_name,
          } }))
    }
    getdata();
  }, [])

  const sendAboutData = async () => {
    await axios.post('http://localhost:8000/api/title-data/',data.titleData);
  }

  return (
    <div className="flex flex-wrap p-3 rounded-md gap-2">
      <Textarea
        placeholder="Write about yourself"
        value={data.titleData.about}
        onChange={(e) => setData({ ...data, titleData: { ...data.titleData, about: e.target.value } })}
        className="w-full dark:bg-gray-400 bg-gray-50"
      />
      <Input
        placeholder="Display Name"
        value={data.titleData.display_name}
        onChange={(e) => setData({ ...data, titleData: { ...data.titleData, display_name: e.target.value } })}
        className="w-full dark:bg-gray-400 bg-gray-50"
      />
      <Input
        placeholder="Title"
        value={data.titleData.title}
        onChange={(e) => setData({ ...data, titleData: { ...data.titleData, title: e.target.value } })}
        className="w-full dark:bg-gray-400 bg-gray-50"
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setData({ ...data, titleData: { ...data.titleData, profilePhoto: e.target.files?.[0] || null } })
        }
        className="w-full dark:bg-gray-400 bg-gray-50 text-back"
      />
      {data?.profilePhoto && (
        <img
          src={URL.createObjectURL(data.titleData.profilePhoto)}
          alt="Profile"
          className="w-full dark:bg-gray-400 bg-gray-50 w-24 h-24 object-cover rounded-full border"
        />
      )}
      <Button onClick={sendAboutData}>
        save About section
      </Button>
    </div>
  );
}
