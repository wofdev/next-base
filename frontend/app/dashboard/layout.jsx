import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
        <AppSidebar className="mt-60 bg-amber-400"  />
          <header className="fixed z-50 flex items-center justify-between w-full bg-white dark:bg-black top-0 px-4 mb-64">
            <SidebarTrigger className="text-black dark:text-white" />
            <ThemeToggle className="text-black dark:text-white" />
          </header>
          <main className="flex justify-center w-full p-5 pt-20">
            {children}
          </main>
    </SidebarProvider>
  );
}
