 "use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection({resumeData,setResumeData}) {
    return <div>
         {resumeData && Object.keys(resumeData?.contact).map((key) => (
              <Input
                key={key}
                placeholder={key}
                value={resumeData?.contact[key] || ""}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    contact: { ...resumeData?.contact, [key]: e.target.value },
                  })
                }
                className="mb-2 dark:bg-gray-400 bg-gray-50"
              />
            ))}
    </div>
}
 
