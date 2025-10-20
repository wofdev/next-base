"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactSection({ resumeData, setResumeData }) {
  return <div>

    <Label className="mb-2" >Phone</Label>
    <Input
      value={resumeData?.contact?.phone || ""}
      onChange={(e) =>
        setResumeData({
          ...resumeData,
          contact: { ...resumeData?.contact, phone: e.target.value },
        })
      }
      className="mb-2 dark:bg-gray-400 bg-gray-50"
    />

    <Label className="mb-2" >E-mail</Label>
    <Input
      value={resumeData?.contact?.email || ""}
      onChange={(e) =>
        setResumeData({
          ...resumeData,
          contact: { ...resumeData?.contact, email: e.target.value },
        })
      }
      className="mb-2 dark:bg-gray-400 bg-gray-50"
    />

    <Label className="mb-2" >Website</Label>
    <Input
      value={resumeData?.contact?.website || ""}
      onChange={(e) =>
        setResumeData({
          ...resumeData,
          contact: { ...resumeData?.contact, website: e.target.value },
        })
      }
      className="mb-2 dark:bg-gray-400 bg-gray-50"
    />

    <Label className="mb-2" >Github</Label>
    <Input
      value={resumeData?.contact?.github || ""}
      onChange={(e) =>
        setResumeData({
          ...resumeData,
          contact: { ...resumeData?.contact, github: e.target.value },
        })
      }
      className="mb-2 dark:bg-gray-400 bg-gray-50"
    />

    <Label className="mb-2" >Linkedin</Label>
    <Input
      value={resumeData?.contact?.linkedin || ""}
      onChange={(e) =>
        setResumeData({
          ...resumeData,
          contact: { ...resumeData?.contact, linkedin: e.target.value },
        })
      }
      className="mb-2 dark:bg-gray-400 bg-gray-50"
    />

    <Label className="mb-2" >Twitter</Label>
    <Input
      value={resumeData?.contact?.twitter || ""}
      onChange={(e) =>
        setResumeData({
          ...resumeData,
          contact: { ...resumeData?.contact, twitter: e.target.value },
        })
      }
      className="mb-2 dark:bg-gray-400 bg-gray-50"
    />

    <Label className="mb-2" >Instagram</Label>
    <Input
      value={resumeData?.contact?.instagram || ""}
      onChange={(e) =>
        setResumeData({
          ...resumeData,
          contact: { ...resumeData?.contact, instagram: e.target.value },
        })
      }
      className="mb-2 dark:bg-gray-400 bg-gray-50"
    />

  </div>
}

