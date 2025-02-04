"use client";

import { usePathname } from "next/navigation";
import { CloudSunRain, Building2, SlidersHorizontal, Map } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Montserrat } from 'next/font/google';
import { BottomNav } from './BottomBar';

const montserrat = Montserrat({
    subsets: ['latin'],
    weights: ['400', '700'],
});

const items = [
    { title: "Weather", url: "/dashboard", icon: CloudSunRain },
    { title: "Cities", url: "/cities", icon: Building2 },
    { title: "Map", url: "/map", icon: Map },
    { title: "Settings", url: "/settings", icon: SlidersHorizontal },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <>
            <div className="hidden md:block h-screen mx-4 my-4 border shadow-lg rounded-xl bg-gray-800">
                <Sidebar variant={"floating"} collapsible={"none"} className={"h-full"}>
                    <SidebarContent>
                        <SidebarHeader className="text-center">
                            <h1 className={`text-xl font-extrabold bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-400 text-transparent bg-clip-text animate-gradient-flow ${montserrat.className}`}>
                                Tempora
                            </h1>
                        </SidebarHeader>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                className={`w-full h-fit ${pathname === item.url
                                                    ? "dark:bg-gray-700 bg-slate-100  text-white rounded-lg"
                                                    : ""
                                                    }`}
                                                asChild
                                            >
                                                <a
                                                    href={item.url}
                                                    className="flex flex-col justify-center items-center py-2"
                                                >
                                                    <item.icon
                                                        className={`h-6 w-6   ${item.title === 'Weather' ? 'scale-150' : 'scale-125'} ${pathname === item.url
                                                            ? "text-blue-400"
                                                            : "text-gray-400"
                                                            }`}
                                                    />
                                                    <span
                                                        className={`text-center ${pathname === item.url ? "text-blue-400" : "text-gray-400"
                                                            }`}
                                                    >
                                                        {item.title}
                                                    </span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </div>
            <BottomNav />
        </>
    );
}

