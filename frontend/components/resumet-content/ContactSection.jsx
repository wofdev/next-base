 "use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection({resumeData,setResumeData}) {
    return <div>
         {resumeData && Object.keys(resumeData?.contactdetails).map((key) => (
              <Input
                key={key}
                placeholder={key}
                value={resumeData?.contactdetails[key] || ""}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    contactdetails: { ...resumeData?.contactdetails, [key]: e.target.value },
                  })
                }
                className="mb-2"
              />
            ))}
    </div>
}
 
