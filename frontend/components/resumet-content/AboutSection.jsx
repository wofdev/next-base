"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AboutSection({
  resumeData,
  setResumeData,
  titleData,
  setTitleData,
  setIsUserChanged,
}) {
  const handleClick = () => {
    if (titleData.about == "" || titleData.display_name == "" || titleData.title == "") {
      toast("invalid input...",
          {
            unstyled: true,
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
        <Label className="mb-2">About</Label>
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
        <Label className="mb-2">Display Name</Label>
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
        <Label className="mb-2">Title</Label>
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

      {/* <div>
        <Label className="mb-2">Profile Photo</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setTitleData({
              ...titleData,
              title: {
                ...titleData,
                profilePhoto: e.target.files?.[0] || null,
              },
            })
          }
          className="w-full dark:bg-gray-400 bg-gray-50"
        />
        {titleData?.profilePhoto && (
          <img
            src={URL.createObjectURL(titleData.profilePhoto)}
            alt="Profile"
            className="mt-2 w-24 h-24 object-cover rounded-full border"
          />
        )}
      </div> */}
      <Button onClick={handleClick} className="flex-0 w-20">
        {" "}
        Done
      </Button>
    </div>
  );
}
