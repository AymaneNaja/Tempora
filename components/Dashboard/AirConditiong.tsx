'use client'

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Custom SVG icons
const ThermometerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 14.76V3.5C14 2.67 13.33 2 12.5 2S11 2.67 11 3.5V14.76C9.81 15.31 9 16.54 9 18C9 19.66 10.34 21 12 21S15 19.66 15 18C15 16.54 14.19 15.31 13 14.76Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18.5C12.8284 18.5 13.5 17.8284 13.5 17C13.5 16.1716 12.8284 15.5 12 15.5C11.1716 15.5 10.5 16.1716 10.5 17C10.5 17.8284 11.1716 18.5 12 18.5Z" fill="currentColor" />
  </svg>
)

const UVIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const WindIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2M12.59 19.41A2 2 0 1 0 14 16H2M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DropletIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

interface AirConditioningProps {
  data: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
  }
}

export default function AirConditioning({ data }: AirConditioningProps) {
  const conditions = [
    { icon: <ThermometerIcon className="w-10 h-10 text-red-500" />, label: "Real Feel", value: `${data.temperature}°C` },
    { icon: <UVIcon className="w-10 h-10 text-yellow-500" />, label: "UV Index", value: data.uvIndex },
    { icon: <WindIcon className="w-10 h-10 text-blue-500" />, label: "Wind", value: `${data.windSpeed} m/s` },
    { icon: <DropletIcon className="w-10 h-10 text-teal-500" />, label: "Humidity", value: `${data.humidity}%` },
  ]

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 shadow-lg">
      <CardHeader className="border-b border-gray-200 dark:border-gray-600">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Air Conditions</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {conditions.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.icon}
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-2">{item.label}</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

