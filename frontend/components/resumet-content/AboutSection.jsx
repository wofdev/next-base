// components/resume/AboutSection.jsx
"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
export default function AboutSection({ data, setData }) {

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
    </div>
  );
}
