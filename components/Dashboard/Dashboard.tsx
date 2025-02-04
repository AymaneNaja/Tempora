'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherData, setCity, setCoordinates } from '@/redux/slices/weatherSlice'
import { RootState, AppDispatch } from '@/redux/store'
import CurrentForecast from './CurrentForecast'
import DaysForecast from './DayForecast'
import WeekForecast from './WeekForecast'
import AirConditioning from './AirConditiong'
import { motion } from 'framer-motion';
import { SkeletonLoader } from './SkeletonLoader'
import { ErrorScreen } from './ErrorScreen'

function Dashboard() {
    const dispatch = useDispatch<AppDispatch>()
    const { city, weatherData, loading, error } = useSelector((state: RootState) => state.search)

    useEffect(() => {
        // Determine location or default to Madrid
        const determineLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        dispatch(setCoordinates({ lat: latitude, lon: longitude }))
                        dispatch(fetchWeatherData({ lat: latitude, lon: longitude }))
                    },
                    () => {
                        // Default to Madrid if location access is denied
                        dispatch(setCity('Madrid'))
                        dispatch(fetchWeatherData({ city: 'Madrid' }))
                    }
                )
            } else {
                // Default to Madrid if geolocation is unavailable
                dispatch(setCity('Madrid'))
                dispatch(fetchWeatherData({ city: 'Madrid' }))
            }
        }

        determineLocation()
    }, [dispatch])

    const handleRetry = () => {
        if (city) {
            dispatch(fetchWeatherData({ city }))
        }
    }

    if (loading) return <SkeletonLoader /> // Loading state
    if (error) return <ErrorScreen error={error} onRetry={handleRetry} /> // Error handling
    if (!weatherData) return null // If no weather data is available

    return (
        <motion.div
            className="container mx-auto px-2 py-4 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <CurrentForecast city={weatherData.city} data={weatherData} />
                    <DaysForecast data={weatherData.forecast.hourly} />
                    <AirConditioning data={weatherData} />
                </div>
                <div>
                    <WeekForecast data={weatherData.forecast.daily} />
                </div>
            </div>
        </motion.div>
    )
}

export default Dashboard
