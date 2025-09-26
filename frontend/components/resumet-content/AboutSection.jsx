// components/resume/AboutSection.jsx
"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AboutSection({ data, setData }) {
  return (
    <div className="bg-white p-3 rounded-md mb-3">
      <Textarea
        placeholder="Write about yourself"
        value={data.titleData.about}
        onChange={(e) => setData({ ...data, titleData:{...data.titleData,about: e.target.value}})}
        className="mb-4"
      />
      <Input
        placeholder="Display Name"
        value={data.titleData.display_name}
        onChange={(e) => setData({ ...data, titleData:{...data.titleData, display_name: e.target.value }})}
        className="mb-2"
      />
      <Input
        placeholder="Title"
        value={data.titleData.title}
        onChange={(e) => setData({ ...data, titleData:{...data.titleData, title: e.target.value }})}
        className="mb-2"
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setData({ ...data,titleData:{...data.titleData, profilePhoto: e.target.files?.[0] || null }})
        }
      />
      {data?.profilePhoto && (
        <img
          src={URL.createObjectURL(data.titleData.profilePhoto)}
          alt="Profile"
          className="mt-3 w-24 h-24 object-cover rounded-full border"
        />
      )}
    </div>
  );
}
