'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const GradientText = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        {children}
    </span>
)

export default function LandingPage() {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row">
            <motion.div
                className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Image
                    src="/placeholder.svg?height=1080&width=1920"
                    alt="Beautiful weather landscape"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 via-purple-500/50 to-pink-500/50" />
            </motion.div>
            <motion.div
                className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 bg-gray-50 dark:bg-gray-900 min-h-[50vh] md:min-h-screen"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    Welcome to <GradientText>Tempora</GradientText>
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl mb-8 text-center text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    Discover real-time weather information for cities around the world, beautifully visualized.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                        <Link href="/dashboard">
                            Get Started
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}

