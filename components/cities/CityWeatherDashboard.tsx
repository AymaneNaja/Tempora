'use client'

import React, { useState, useEffect } from "react"
import { CloudSun, CloudRain, Sun, Cloud, Wind, Droplets, AlertCircle } from 'lucide-react'
import { motion } from "framer-motion"
import { getWeatherData } from '@/lib/utils'
import { CityCardSkeleton } from "./CityCardSkeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Map weather conditions to Lucide icons
const weatherIcons = {
    Clear: <Sun className="w-16 h-16 lg:w-24 lg:h-24 text-yellow-500" />,
    Clouds: <Cloud className="w-16 h-16 lg:w-24 lg:h-24 text-gray-400" />,
    Rain: <CloudRain className="w-16 h-16 lg:w-24 lg:h-24 text-blue-500" />,
    Drizzle: <CloudRain className="w-16 h-16 lg:w-24 lg:h-24 text-blue-300" />,
    Thunderstorm: <CloudSun className="w-16 h-16 lg:w-24 lg:h-24 text-purple-500" />,
    Snow: <CloudSun className="w-16 h-16 lg:w-24 lg:h-24 text-blue-200" />,
    Mist: <CloudSun className="w-16 h-16 lg:w-24 lg:h-24 text-gray-300" />,
}

interface WeatherData {
    city: string
    temperature: number
    time: string
    condition: string
    humidity: number
    windSpeed: number
}

function CityCard({ data, onClick }: { data: WeatherData, onClick: () => void }) {
    return (
        <Card className="w-full cursor-pointer" onClick={onClick}>
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl lg:text-4xl font-bold text-gray-800 dark:text-white"
                        >
                            {data.city}
                        </motion.h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{data.time}</p>
                    </div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                    >
                        {weatherIcons[data.condition] || <Sun className="w-16 h-16 lg:w-24 lg:h-24 text-yellow-500" />}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 dark:text-white">
                        {data.temperature}°
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">{data.condition}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-around mt-6"
                >
                    <div className="flex items-center">
                        <Droplets className="w-6 h-6 text-blue-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">{data.humidity}%</span>
                    </div>
                    <div className="flex items-center">
                        <Wind className="w-6 h-6 text-green-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">{data.windSpeed} km/h</span>
                    </div>
                </motion.div>
            </CardContent>
        </Card>
    )
}

function CitiesWeatherDashboard() {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCity, setSelectedCity] = useState<WeatherData | null>(null)
    const cities = ["New York", "London", "Tokyo", "Sydney", "Paris", "Moscow"]

    useEffect(() => {
        async function fetchWeatherData() {
            try {
                const data = await Promise.all(cities.map(city => getWeatherData(city)))
                setWeatherData(data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching weather data:", error)
                setError("Failed to fetch weather data. Please try again later.")
                setLoading(false)
            }
        }

        fetchWeatherData()
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <CityCardSkeleton />
                        </motion.div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                    Global Weather Dashboard
                </h1>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )
    }

    if (selectedCity) {
        return (
            <div className="container mx-auto px-4 py-8">
                <button
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setSelectedCity(null)}
                >
                    Back to Dashboard
                </button>
                <CityCard data={selectedCity} onClick={() => { }} />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                Global Weather Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weatherData.map((data, index) => (
                    <motion.div
                        key={data.city}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <CityCard data={data} onClick={() => setSelectedCity(data)} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default CitiesWeatherDashboard
