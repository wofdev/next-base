"use client"

import React from "react"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <span
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=" w-10 h-10 flex items-center justify-center"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-black dark:text-white" />
      ) : (
        <Moon className="h-5 w-5 text-black dark:text-white" />
      )}
    </span>
  )
}


// "use client"

// import React from "react"
// import { useTheme } from "next-themes"
// import { Button } from "@/components/ui/button" // از shadcn

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme()

//   return (
//     <Button
//       variant="outline"
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//     >
//       {theme === "dark" ? "☀️" : "🌙"}
//     </Button>
//   )
// }
