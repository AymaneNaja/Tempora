'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData, setCoordinates } from '../../redux/slices/weatherSlice';
import WeatherMap from './WeatherMap';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import WindHumidity from './WindHumidity';
import TemperatureTrend from './TemperatureTrend';
import UVAirQuality from './UVAirQuality';
import { RootState } from '@reduxjs/toolkit/query';
import { Skeleton } from '@/components/ui/skeleton';
import { Moon, Sun, AlertTriangle } from 'lucide-react';

const Home = () => {
    const dispatch = useDispatch();
    const { city, weatherData, loading, error, lat, lon } = useSelector(
        (state: RootState) => state.search
    );
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (navigator.geolocation && lat === null && lon === null) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(setCoordinates({ lat: latitude, lon: longitude }));
                },
                (err) => {
                    console.error('Geolocation error:', err);
                }
            );
        }
    }, [dispatch, lat, lon]);

    useEffect(() => {
        if (lat && lon) {
            dispatch(fetchWeatherData({ lat, lon }));
        } else {
            dispatch(fetchWeatherData({ city }));
        }
    }, [dispatch, lat, lon, city]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Error</h2>
                    <p className="text-gray-600 dark:text-gray-300">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-inherit transition-colors duration-200  ${darkMode ? 'dark' : ''}`}>
            <div className="container mx-auto pr-4  py-8 max-w-7xl">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <WeatherMap
                            city={weatherData?.city}
                            lat={weatherData?.lat}
                            lng={weatherData?.lon}
                            temperature={weatherData?.temperature}
                            description={weatherData?.description}
                            loading={loading}
                        />
                    </div>
                    <CurrentWeather
                        temperature={weatherData?.temperature}
                        description={weatherData?.description}
                        icon={weatherData?.icon}
                        humidity={weatherData?.humidity}
                        windSpeed={weatherData?.windSpeed}
                        loading={loading}
                    />
                    <div className="lg:col-span-2">
                        <Forecast
                            daily={weatherData?.forecast.daily}
                            hourly={weatherData?.forecast.hourly}
                            loading={loading}
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <WindHumidity
                            windSpeed={weatherData?.windSpeed}
                            humidity={weatherData?.humidity}
                            loading={loading}
                        />
                        <UVAirQuality
                            uvIndex={5}
                            airQuality={50}
                            loading={loading}
                        />

                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                        <TemperatureTrend
                            hourlyData={weatherData?.forecast.hourly.map(hour => ({
                                time: hour.time,
                                temperature: hour.temperature,
                            }))}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

