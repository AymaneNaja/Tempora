'use client'

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SunIcon, CloudIcon, RainIcon, SnowIcon, CloudSunIcon } from "@/components/WeatherIcons"

import { Card, CardContent } from "@/components/ui/card"

const weatherIcons = {
  Clear: <SunIcon className="w-12 h-12" />,
  Clouds: <CloudIcon className="w-12 h-12" />,
  Rain: <RainIcon className="w-12 h-12" />,
  Snow: <SnowIcon className="w-12 h-12" />,
  PartlyCloudy: <CloudSunIcon className="w-12 h-12" />,
}

interface CurrentForecastProps {
  data: {
    temperature: number;
    description: string;
  },
  city: string
}

export default function CurrentForecast({ data, city }: CurrentForecastProps) {
  const [cityImage, setCityImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        const response = await fetch(`/api/weatherImg?city=${encodeURIComponent(city)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch city image')
        }
        const { imageUrl } = await response.json()
        setCityImage(imageUrl)
      } catch (error) {
        console.error('Error fetching city image:', error)
      }
    }

    fetchCityImage()
  }, [city])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto z-0"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative">
          {cityImage && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${cityImage})` }}
            />
          )}
          <div className={`relative z-10 p-6 text-white ${cityImage ? 'bg-black bg-opacity-40' : 'bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700'}`}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-2 tracking-tight first-letter:uppercase">{city}</h2>
              <p className="text-lg font-medium opacity-80">{data.description}</p>
            </motion.div>
            <div className="flex justify-between items-center mt-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {weatherIcons[data.description] || <SunIcon className="w-24 h-24 text-yellow-300" />}
              </motion.div>
              <motion.p
                className="text-6xl font-bold"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {data.temperature}°C
              </motion.p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

