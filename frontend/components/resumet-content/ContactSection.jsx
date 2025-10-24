"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContactSection({
  resumeData,
  setResumeData,
  contactData,
  setContactData,
  setIsUserChanged,
}) {
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    // Required fields check
    const requiredFields = [
      "phone",
      "email",
      "website",
      "github",
      "linkedin",
      "twitter",
      "instagram",
    ];
    requiredFields.forEach((field) => {
      if (!contactData?.[field]?.trim()) {
        newErrors[field] = `${field[0].toUpperCase() + field.slice(1)} is required.`;
      }
    });

    // Phone: only numbers, optional '+'
    const phone = contactData?.phone?.trim() || "";
    const phoneRegex = /^\+?\d+$/;
    if (phone && !phoneRegex.test(phone)) {
      newErrors.phone =
        "Phone number must contain only digits and may start with '+'.";
    }

    // Email: basic pattern
    const email = contactData?.email?.trim() || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    // Website: must be a valid URL
    const website = contactData?.website?.trim() || "";
    const websiteRegex =
      /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/[\w\d-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
    if (website && !websiteRegex.test(website)) {
      newErrors.website = "Invalid website URL.";
    }

    // Social links validation
    const socialRegex =
      /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/[\w\d-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
    ["github", "linkedin", "twitter", "instagram"].forEach((key) => {
      const value = contactData?.[key]?.trim() || "";
      if (value && !socialRegex.test(value)) {
        newErrors[key] = `Invalid ${key} URL.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = () => {
    if (!validateFields()) return;
    setIsUserChanged(true);
    setResumeData((p) => ({ ...p, contact: contactData }));
  };

  return (
    <div>
      {/* PHONE */}
      <Label className="mb-2">Phone</Label>
      <Input
        value={contactData?.phone || ""}
        onChange={(e) =>
          setContactData({ ...contactData, phone: e.target.value })
        }
        className="mb-1 dark:bg-gray-400 bg-gray-50"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm mb-2">{errors.phone}</p>
      )}

      {/* EMAIL */}
      <Label className="mb-2">E-mail</Label>
      <Input
        value={contactData?.email || ""}
        onChange={(e) =>
          setContactData({ ...contactData, email: e.target.value })
        }
        className="mb-1 dark:bg-gray-400 bg-gray-50"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-2">{errors.email}</p>
      )}

      {/* WEBSITE */}
      <Label className="mb-2">Website</Label>
      <Input
        value={contactData?.website || ""}
        onChange={(e) =>
          setContactData({ ...contactData, website: e.target.value })
        }
        className="mb-1 dark:bg-gray-400 bg-gray-50"
      />
      {errors.website && (
        <p className="text-red-500 text-sm mb-2">{errors.website}</p>
      )}

      {/* SOCIAL LINKS */}
      {["github", "linkedin", "twitter", "instagram"].map((field) => (
        <div key={field}>
          <Label className="mb-2 capitalize">{field}</Label>
          <Input
            value={contactData?.[field] || ""}
            onChange={(e) =>
              setContactData({ ...contactData, [field]: e.target.value })
            }
            className="mb-1 dark:bg-gray-400 bg-gray-50"
          />
          {errors[field] && (
            <p className="text-red-500 text-sm mb-2">{errors[field]}</p>
          )}
        </div>
      ))}

      <Button onClick={handleClick} className="mt-3">
        Done
      </Button>
    </div>
  );
}

// "use client";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// export default function ContactSection({
//   resumeData,
//   setResumeData,
//   contactData,
//   setContactData,
//   setIsUserChanged,
// }) {
//   const handleClick = () => {
//     setIsUserChanged(true)
//     setResumeData((p) => ({ ...p, contact: contactData }));
//   };

//   return (
//     <div>
//       <Label className="mb-2">Phone</Label>
//       <Input
//         value={contactData?.phone || ""}
//         onChange={(e) =>
//           setContactData({
//             ...contactData,
//             phone: e.target.value,
//           })
//         }
//         className="mb-2 dark:bg-gray-400 bg-gray-50"
//       />

//       <Label className="mb-2">E-mail</Label>
//       <Input
//         value={contactData?.email || ""}
//         onChange={(e) =>
//           setContactData({
//             ...contactData,
//             email: e.target.value,
//           })
//         }
//         className="mb-2 dark:bg-gray-400 bg-gray-50"
//       />

//       <Label className="mb-2">Website</Label>
//       <Input
//         value={contactData?.website || ""}
//         onChange={(e) =>
//           setContactData({
//             ...contactData,
//             website: e.target.value,
//           })
//         }
//         className="mb-2 dark:bg-gray-400 bg-gray-50"
//       />

//       <Label className="mb-2">Github</Label>
//       <Input
//         value={contactData?.github || ""}
//         onChange={(e) =>
//           setContactData({
//             ...contactData,
//             github: e.target.value,
//           })
//         }
//         className="mb-2 dark:bg-gray-400 bg-gray-50"
//       />

//       <Label className="mb-2">Linkedin</Label>
//       <Input
//         value={contactData?.linkedin || ""}
//         onChange={(e) =>
//           setContactData({
//             ...contactData,
//             linkedin: e.target.value,
//           })
//         }
//         className="mb-2 dark:bg-gray-400 bg-gray-50"
//       />

//       <Label className="mb-2">Twitter</Label>
//       <Input
//         value={contactData?.twitter || ""}
//         onChange={(e) =>
//           setContactData({
//             ...contactData,
//             twitter: e.target.value,
//           })
//         }
//         className="mb-2 dark:bg-gray-400 bg-gray-50"
//       />

//       <Label className="mb-2">Instagram</Label>
//       <Input
//         value={contactData?.instagram || ""}
//         onChange={(e) =>
//           setContactData({
//             ...contactData,
//             instagram: e.target.value,
//           })
//         }
//         className="mb-2 dark:bg-gray-400 bg-gray-50"
//       />

//       <Button onClick={handleClick}>Done</Button>
//     </div>
//   );
// }
