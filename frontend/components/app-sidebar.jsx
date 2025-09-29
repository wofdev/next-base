"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
  ChevronUp,
  LetterText,
  Gauge,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export function AppSidebar() {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Gauge,
    },
    {
      title: "Resume Content",
      url: "/dashboard/resume/content",
      icon: LetterText,
    },
    {
      title: "Resume Preview",
      url: "/dashboard/resume/preview",
      icon: Eye,
    },
  ];

  const { data: session, status } = useSession();

  return (
    <Sidebar>
      {/* <SidebarHeader /> */}
      <SidebarContent  className="dark:bg-black dark:text-white bg-white text-black">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="/" className="text-gray-400">TopCV</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter  className="dark:bg-black dark:text-white bg-white text-black">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  {session ? session?.user?.email : "Unknown User"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
