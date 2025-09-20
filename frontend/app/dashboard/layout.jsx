import { Geist, Geist_Mono } from "next/font/google";
import { Botton } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full relative">
          <header className="flex items-center px-4 border-b fixed top-0 z-50 w-full bg-white">
            <SidebarTrigger />
          </header>
          <div className="flex justify-center w-full p-5 mt-7">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
