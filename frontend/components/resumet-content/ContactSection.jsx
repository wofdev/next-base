"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContactSection({
  resumeData,
  setResumeData,
  contactData,
  setContactData,
  setIsUserChanged,
}) {
  const handleClick = () => {
    if (contactData.phone === "") {
      alert("Empty phone is not allowed");
      return;
    }

    if (contactData.email === "") {
      alert("Empty email is not allowed");
      return;
    }

    if (!/^[+]?\d+$/.test(contactData.phone)) {
      alert("Invalid phone");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      alert("Invalid email");
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
