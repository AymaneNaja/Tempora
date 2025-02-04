'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SunIcon, CloudIcon, RainIcon, SnowIcon, CloudSunIcon } from "@/components/WeatherIcons"

const weatherIcons = {
    Clear: <SunIcon className="w-8 h-8" />,
    Clouds: <CloudIcon className="w-8 h-8" />,
    Rain: <RainIcon className="w-8 h-8" />,
    Snow: <SnowIcon className="w-8 h-8" />,
    PartlyCloudy: <CloudSunIcon className="w-8 h-8" />,
}

interface WeekForecastProps {
    data: Array<{
        date: string;
        temperature: number;
        condition: string;
    }>
}

export default function WeekForecast({ data }: WeekForecastProps) {
    return (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 shadow-lg">
            <CardHeader className="border-b border-gray-200 dark:border-gray-600">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">7-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="space-y-4">
                    {data.map((forecast, index) => (
                        <motion.div
                            key={index}
                            className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-102"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{forecast.date}</p>
                            <div className="flex items-center space-x-2">
                                {weatherIcons[forecast.condition] || <SunIcon className="w-8 h-8" />}
                                <span className="text-sm text-gray-500 dark:text-gray-400">{forecast.condition}</span>
                            </div>
                            <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{forecast.temperature}°C</p>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

