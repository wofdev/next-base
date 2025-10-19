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
        value={data.title.about}
        onChange={(e) => setData({ ...data, title: { ...data.title, about: e.target.value } })}
        className="w-full dark:bg-gray-400 bg-gray-50"
      />
      <Input
        placeholder="Display Name"
        value={data.title.display_name}
        onChange={(e) => setData({ ...data, title: { ...data.title, display_name: e.target.value } })}
        className="w-full dark:bg-gray-400 bg-gray-50"
      />
      <Input
        placeholder="Title"
        value={data.title.title}
        onChange={(e) => setData({ ...data, title: { ...data.title, title: e.target.value } })}
        className="w-full dark:bg-gray-400 bg-gray-50"
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setData({ ...data, title: { ...data.title, profilePhoto: e.target.files?.[0] || null } })
        }
        className="w-full dark:bg-gray-400 bg-gray-50 text-back"
      />
      {data?.profilePhoto && (
        <img
          src={URL.createObjectURL(data.title.profilePhoto)}
          alt="Profile"
          className="w-full dark:bg-gray-400 bg-gray-50 w-24 h-24 object-cover rounded-full border"
        />
      )}
    </div>
  );
}
