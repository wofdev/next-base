"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AboutSection({ resumeData, setResumeData }) {
  return (
    <div className="flex flex-col gap-4 p-3 rounded-md">
      <div>
        <Label className="mb-2" >About</Label>
        <Textarea
          placeholder="Write about yourself"
          value={resumeData.title.about}
          onChange={(e) =>
            setResumeData({ ...resumeData, title: { ...resumeData.title, about: e.target.value } })
          }
          className="w-full dark:bg-gray-400 bg-gray-50"
        />
      </div>

      <div>
        <Label className="mb-2" >Display Name</Label>
        <Input
          placeholder="Display Name"
          value={resumeData.title.display_name}
          onChange={(e) =>
            setResumeData({ ...resumeData, title: { ...resumeData.title, display_name: e.target.value } })
          }
          className="w-full dark:bg-gray-400 bg-gray-50"
        />
      </div>

      <div>
        <Label className="mb-2" >Title</Label>
        <Input
          placeholder="Title"
          value={resumeData.title.title}
          onChange={(e) =>
            setResumeData({ ...resumeData, title: { ...resumeData.title, title: e.target.value } })
          }
          className="w-full dark:bg-gray-400 bg-gray-50"
        />
      </div>

      <div>
        <Label className="mb-2" >Profile Photo</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              title: { ...resumeData.title, profilePhoto: e.target.files?.[0] || null },
            })
          }
          className="w-full dark:bg-gray-400 bg-gray-50"
        />
        {resumeData.title?.profilePhoto && (
          <img
            src={URL.createObjectURL(resumeData.title.profilePhoto)}
            alt="Profile"
            className="mt-2 w-24 h-24 object-cover rounded-full border"
          />
        )}
      </div>
    </div>
  );
}
