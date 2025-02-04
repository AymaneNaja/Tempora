'use client'
import { AppSidebar } from "@/components/AppsideBar";
import Navbar from "@/components/Navigation/Navbar";

import { usePathname } from 'next/navigation';


function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLandingPage = pathname === '/';

    if (isLandingPage) {
        return children;
    }

    return (
        <>
            <AppSidebar />
            <main className="w-11/12 min-h-screen mx-auto">
                <Navbar />
                {children}
            </main>
        </>
    );
}

export default LayoutWrapper
