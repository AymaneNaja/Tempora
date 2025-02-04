"use client";

import { usePathname } from "next/navigation";
import { CloudSunRain, Building2, SlidersHorizontal, Map } from 'lucide-react';
import Link from 'next/link';

const items = [
    { title: "Weather", url: "/dashboard", icon: CloudSunRain },
    { title: "Cities", url: "/cities", icon: Building2 },
    { title: "Map", url: "/map", icon: Map },
    { title: "Settings", url: "/settings", icon: SlidersHorizontal },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-50">
            <ul className="flex justify-around items-center h-16">
                {items.map((item) => (
                    <li key={item.title}>
                        <Link href={item.url} className="flex flex-col items-center">
                            <item.icon
                                className={`h-6 w-6 mb-1 ${pathname === item.url
                                    ? "text-blue-400"
                                    : "text-gray-400"
                                    }`}
                            />
                            <span className={`text-xs ${pathname === item.url
                                ? "text-blue-400"
                                : "text-gray-400"
                                }`}>
                                {item.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
