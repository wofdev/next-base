"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cross, Plus, Trash2, X } from "lucide-react";

export default function AboutSection({
  resumeData,
  setResumeData,
  titleData,
  setTitleData,
  setIsUserChanged,
}) {
  const handleClick = () => {
    if (
      titleData.about == "" ||
      titleData.display_name == "" ||
      titleData.title == ""
    ) {
      toast("invalid input...", {
        unstyled: true,
        position: "top-center",
        className: "bg-rose-600 text-white px-4 py-2 rounded-lg shadow-lg",
      });
    } else {
      setIsUserChanged(true);
      setResumeData((p) => ({ ...p, title: titleData }));
    }
  };

  return (
    <div className="flex flex-col gap-4 p-3 rounded-md">
      <div>
        <Label className="mb-2">About *</Label>
        <Textarea
          placeholder="Write about yourself"
          value={titleData.about}
          onChange={(e) =>
            setTitleData({
              ...titleData,
              about: e.target.value,
            })
          }
          className="w-full dark:bg-gray-400 bg-gray-50"
        />
      </div>

      <div>
        <Label className="mb-2">Display Name *</Label>
        <Input
          placeholder="Display Name"
          value={titleData.display_name}
          onChange={(e) =>
            setTitleData({
              ...titleData,
              display_name: e.target.value,
            })
          }
          className="w-full dark:bg-gray-400 bg-gray-50"
        />
      </div>

      <div>
        <Label className="mb-2">Title *</Label>
        <Input
          placeholder="Title"
          value={titleData.title}
          onChange={(e) =>
            setTitleData({
              ...titleData,
              title: e.target.value,
            })
          }
          className="w-full dark:bg-gray-400 bg-gray-50"
        />
      </div>

      <div>
        <Label className="mb-2">Profile Photo</Label>

        {/* نمایش تصویر — هم برای فایل جدید، هم فایل ذخیره‌شده از بک‌اند */}
        <div className="relative inline-block">
          {titleData?.profile_photo ? (
            <img
              src={
                titleData.profile_photo instanceof File
                  ? URL.createObjectURL(titleData.profile_photo)
                  : `http://localhost:8000${titleData.profile_photo}`
              }
              alt="Profile"
              className="mt-2 w-24 h-24 object-cover rounded-full border"
            />
          ) : <div className="mt-2 w-24 h-24 object-cover rounded-full border flex items-center justify-center"> no image </div>}

          <label className=" absolute right-0 top-18 w-6 h-6 flex items-center justify-center rounded-full  bg-blue-600 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setTitleData({
                  ...titleData,
                  profile_photo: e.target.files?.[0] || null,
                  remove_photo: true, 
                })
              }
            />
            <Plus className="text-white"/>
          </label>
          <label
            onClick={() => {
              setTitleData({
                ...titleData,
                profile_photo: null,
                remove_photo: true, 
              });
            }}
            className="text-white p-1 absolute left-0 top-18 w-6 h-6 flex items-center justify-center rounded-full  bg-rose-600 cursor-pointer"
          >
            <X/>
          </label>
        </div>
      </div>

      {/* Theme Dropdown with shadcn */}
      <div>
        <Label className="mb-2">Theme</Label>
        <Select
          value={titleData.theme}
          onValueChange={(value) =>
            setTitleData({
              ...titleData,
              theme: value,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={1}>Modern</SelectItem>
            <SelectItem value={2}>Green Garden</SelectItem>
            <SelectItem value={3}>Red Pumpkin</SelectItem>
            <SelectItem value={4}>Cyberpunk</SelectItem>
            <SelectItem value={5}>England</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleClick} className="flex-0 w-20">
        {" "}
        Done
      </Button>
    </div>
  );
}
