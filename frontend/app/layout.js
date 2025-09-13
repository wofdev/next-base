"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Botton} from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SessionProvider } from "next-auth/react";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
            {children}
        </SessionProvider>
      
      </body>
    </html>
  );
}
