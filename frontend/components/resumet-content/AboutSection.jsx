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
import { Plus, X } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ImageCropper from "./ImageCropper";

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
      toast("About, display name and title can not be empty...", {
        unstyled: true,
        position: "top-center",
        className: "bg-rose-600 text-white px-4 py-2 rounded-lg shadow-lg",
      });
    } else {
      setIsUserChanged(true);
      setResumeData((p) => ({ ...p, title: titleData }));
    }
  };

  // 🧩 کراپ عکس
  const [image, setImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // نگهداری URL های ایجاد شده برای Fileها برای revoke
  const objectUrlRef = useRef(null);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setIsDialogOpen(true); // باز کردن مودال کراپ
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (croppedImgBase64) => {
    // تبدیل base64 به Blob و File برای آپلود
    const res = await fetch(croppedImgBase64);
    const blob = await res.blob();
    const file = new File([blob], "profile_photo.jpg", { type: blob.type });

    // آزاد کردن URL قبلی اگر بود
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    // ایجاد URL موقت برای نمایش تصویر
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;

    setTitleData({
      ...titleData,
      profile_photo: file, // File واقعی برای آپلود
      _profile_photo_preview: objectUrl, // URL موقت برای نمایش
      remove_photo: true,
    });

    setIsDialogOpen(false);
    setImage(null);
  };

  // helper برای نمایش تصویر
  const getProfilePhotoURL = () => {
    if (!titleData?.profile_photo) return null;

    if (titleData._profile_photo_preview) {
      // File تازه کراپ شده
      return titleData._profile_photo_preview;
    } else if (typeof titleData.profile_photo === "string") {
      // URL از سرور
      return titleData.profile_photo.startsWith("http")
        ? titleData.profile_photo
        : `http://localhost:8000${titleData.profile_photo}`;
    }
    return null;
  };

  // cleanup URL وقتی کامپوننت unmount می شود
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 p-3 rounded-md">
      {/* About */}
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

      {/* Display Name */}
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

      {/* Title */}
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

      {/* Birth */}
      <div className="flex flex-col w-54">
        <label className="text-sm text-gray-600 mb-1">birth</label>
        <Popover>
          <PopoverTrigger asChild className="w-1/2">
            <Button
              className={cn(
                "w-full justify-start text-left font-normal text-black dark:text-white bg-gray-200",
                !titleData.birth && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {titleData.birth ? (
                format(new Date(titleData.birth), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              fromYear={1950}
              toYear={new Date().getFullYear()}
              selected={titleData.birth ? new Date(titleData.birth) : undefined}
              onSelect={(date) =>
                setTitleData({
                  ...titleData,
                  birth: date ? format(date, "yyyy-MM-dd") : "",
                })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Profile Photo */}
      <div>
        <Label className="mb-2">Profile Photo</Label>
        <div className="relative inline-block">
          {getProfilePhotoURL() ? (
            <img
              src={getProfilePhotoURL()}
              alt="Profile"
              className="mt-2 w-24 h-24 object-cover rounded-full border"
            />
          ) : (
            <div className="mt-2 w-24 h-24 rounded-full border flex items-center justify-center text-xs text-gray-500">
              no image
            </div>
          )}

          {/* دکمه آپلود و کراپ */}
          <label className="absolute right-0 top-18 w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
            <Plus className="text-white" />
          </label>

          {/* حذف عکس */}
          <label
            onClick={() => {
              if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
              setTitleData({
                ...titleData,
                profile_photo: null,
                _profile_photo_preview: null,
                remove_photo: true,
              });
            }}
            className="text-white p-1 absolute left-0 top-18 w-6 h-6 flex items-center justify-center rounded-full bg-rose-600 cursor-pointer"
          >
            <X />
          </label>
        </div>
      </div>

      {/* Theme */}
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
        Done
      </Button>

      {/* Dialog کراپ */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl bg-gray-700">
          {image && (
            <ImageCropper
              imageSrc={image}
              onComplete={handleCropComplete}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

