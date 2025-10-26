"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactSection({
  resumeData,
  setResumeData,
  contactData,
  setContactData,
  setIsUserChanged,
}) {
  const handleClick = () => {
    if (contactData.phone === "") {
      toast("Empty phone is not allowed",
          {
            unstyled: true,
            className: "bg-rose-600 text-white px-4 py-2 rounded-lg shadow-lg",
          });
      return;
    }

    if (contactData.email === "") {
      toast("Empty email is not allowed",
          {
            unstyled: true,
            className: "bg-rose-600 text-white px-4 py-2 rounded-lg shadow-lg",
          });
      return;
    }

    if (!/^[+]?\d+$/.test(contactData.phone)) {
      toast("Invalid phone",
          {
            unstyled: true,
            className: "bg-rose-600 text-white px-4 py-2 rounded-lg shadow-lg",
          });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      toast("Invalid email",
          {
            unstyled: true,
            className: "bg-rose-600 text-white px-4 py-2 rounded-lg shadow-lg",
          });
      return;
    }

    setIsUserChanged(true);
    setResumeData((p) => ({ ...p, contact: contactData }));
  };

  return (
    <div>
      <Label className="mb-2">Phone *</Label>
      <Input
        value={contactData?.phone || ""}
        onChange={(e) =>
          setContactData({
            ...contactData,
            phone: e.target.value,
          })
        }
        className="mb-2 dark:bg-gray-400 bg-gray-50"
      />

      <Label className="mb-2">E-mail *</Label>
      <Input
        value={contactData?.email || ""}
        onChange={(e) =>
          setContactData({
            ...contactData,
            email: e.target.value,
          })
        }
        className="mb-2 dark:bg-gray-400 bg-gray-50"
      />

      <Label className="mb-2">Website</Label>
      <Input
        value={contactData?.website || ""}
        onChange={(e) =>
          setContactData({
            ...contactData,
            website: e.target.value,
          })
        }
        className="mb-2 dark:bg-gray-400 bg-gray-50"
      />

      <Label className="mb-2">Github</Label>
      <Input
        value={contactData?.github || ""}
        onChange={(e) =>
          setContactData({
            ...contactData,
            github: e.target.value,
          })
        }
        className="mb-2 dark:bg-gray-400 bg-gray-50"
      />

      <Label className="mb-2">Linkedin</Label>
      <Input
        value={contactData?.linkedin || ""}
        onChange={(e) =>
          setContactData({
            ...contactData,
            linkedin: e.target.value,
          })
        }
        className="mb-2 dark:bg-gray-400 bg-gray-50"
      />

      <Label className="mb-2">Twitter</Label>
      <Input
        value={contactData?.twitter || ""}
        onChange={(e) =>
          setContactData({
            ...contactData,
            twitter: e.target.value,
          })
        }
        className="mb-2 dark:bg-gray-400 bg-gray-50"
      />

      <Label className="mb-2">Instagram</Label>
      <Input
        value={contactData?.instagram || ""}
        onChange={(e) =>
          setContactData({
            ...contactData,
            instagram: e.target.value,
          })
        }
        className="mb-2 dark:bg-gray-400 bg-gray-50"
      />

      <Button onClick={handleClick}>Done</Button>
    </div>
  );
}
