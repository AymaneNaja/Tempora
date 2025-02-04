"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function DayNightSwitch() {
    const { setTheme, theme } = useTheme()

    return (
        <div>
            {theme === 'light' ? <Button onClick={() => setTheme('dark')} variant="outline" className="h-12 w-12">
                <Sun className="  text-amber-400  scale-125 transition-all dark:-rotate-90 dark:scale-0 hover:bg-slate-50" />
            </Button> : null}
            {theme === 'dark' ?
                <Button className="h-12 w-12" onClick={() => setTheme('light')} variant={'outline'}>

                    <Moon className="rotate-90 scale-125 transition-all dark:rotate-0 dark:scale-100" />
                </Button> : null}

        </div>

    )
}
