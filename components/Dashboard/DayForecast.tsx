'use client'

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/useMediaQuery"

// Import custom weather icons
import { SunIcon, CloudIcon, RainIcon, SnowIcon, CloudSunIcon } from "@/components/WeatherIcons"

const weatherIcons = {
    Clear: <SunIcon className="w-12 h-12" />,
    Clouds: <CloudIcon className="w-12 h-12" />,
    Rain: <RainIcon className="w-12 h-12" />,
    Snow: <SnowIcon className="w-12 h-12" />,
    PartlyCloudy: <CloudSunIcon className="w-12 h-12" />,
}

interface DayForecastProps {
    data: Array<{
        time: string;
        temperature: number;
        condition: string;
    }>
}

export default function DaysForecast({ data }: DayForecastProps) {
    const isSmallScreen = useMediaQuery("(max-width: 640px)")

    return (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 shadow-lg">
            <CardHeader className="border-b border-gray-200 dark:border-gray-600">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Today's Forecast</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className={`grid gap-4 ${isSmallScreen ? 'grid-cols-3' : 'grid-cols-6'}`}>
                    {data.slice(0, isSmallScreen ? 3 : 6).map((forecast, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{forecast.time}</p>
                            <div className="mb-2">
                                {weatherIcons[forecast.condition] || <SunIcon className="w-12 h-12" />}
                            </div>
                            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{forecast.temperature}°C</p>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

