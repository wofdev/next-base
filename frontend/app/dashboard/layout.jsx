"use client"
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-50 flex items-center justify-between bg-gray-50 dark:bg-gray-900 px-4">
            <SidebarTrigger className="text-black dark:text-white"/>
            <ThemeToggle />
          </header>
          <main className="flex-1 p-6 bg-white dark:bg-black">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
} 
