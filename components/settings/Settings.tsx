'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleNotifications,
    setVolume,
    setUnit,
} from '@/redux/slices/weatherSlice';
import { RootState } from '@/redux/store';
import { useTheme } from 'next-themes';
export default function Settings() {
    const { theme, setTheme } = useTheme()
    const dispatch = useDispatch();
    const {
        temperatureUnit,
        windUnit,
        pressureUnit,
        precipitationUnit,
        distanceUnit,
        notificationsEnabled,
        volume,
    } = useSelector((state: RootState) => state.settings);

    const unitSettings = [
        {
            name: 'Temperature',
            unitType: 'temperatureUnit',
            options: [
                { label: 'Celsius', value: 'Celsius', icon: '°C' },
                { label: 'Fahrenheit', value: 'Fahrenheit', icon: '°F' },
            ],
            state: temperatureUnit,
        },
        {
            name: 'Wind',
            unitType: 'windUnit',
            options: [
                { label: 'Kilometers/Hour', value: 'km/h', icon: 'km/h' },
                { label: 'Miles/Hour', value: 'mph', icon: 'mph' },
            ],
            state: windUnit,
        },
        {
            name: 'Pressure',
            unitType: 'pressureUnit',
            options: [
                { label: 'Hectopascals', value: 'hPa', icon: 'hPa' },
                { label: 'Millimeters of Mercury', value: 'mmHg', icon: 'mmHg' },
            ],
            state: pressureUnit,
        },
        {
            name: 'Precipitation',
            unitType: 'precipitationUnit',
            options: [
                { label: 'Millimeters', value: 'mm', icon: 'mm' },
                { label: 'Inches', value: 'inches', icon: 'in' },
            ],
            state: precipitationUnit,
        },
        {
            name: 'Distance',
            unitType: 'distanceUnit',
            options: [
                { label: 'Kilometers', value: 'km', icon: 'km' },
                { label: 'Miles', value: 'miles', icon: 'mi' },
            ],
            state: distanceUnit,
        },
    ];

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-xl w-full max-w-2xl transition-colors duration-300 border"
        >
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}
            >
                Settings & Preferences
            </motion.h2>

            {/* Units */}
            <div className="space-y-6">
                {unitSettings.map((setting, index) => (
                    <motion.div
                        key={setting.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex justify-between items-center"
                    >
                        <Label
                            htmlFor={setting.name}
                            className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
                        >
                            {setting.name}
                        </Label>
                        <div className="flex items-center space-x-4">
                            {setting.options.map((option) => (
                                <span
                                    key={option.value}
                                    className={`text-2xl font-semibold cursor-pointer ${setting.state === option.value
                                        ? theme === 'light'
                                            ? 'text-blue-600'
                                            : 'text-blue-400'
                                        : 'text-gray-400'
                                        }`}
                                    onClick={() =>
                                        dispatch(setUnit({ unitType: setting.unitType, value: option.value }))
                                    }
                                >
                                    {option.icon}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.hr
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.5 }}
                className={`my-8 border-2 rounded-full ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}
            />

            {/* Additional Settings */}
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-between items-center"
                >
                    <Label
                        htmlFor="notifications"
                        className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
                    >
                        Notifications
                    </Label>
                    <Switch
                        id="notifications"
                        checked={notificationsEnabled}
                        onCheckedChange={() => dispatch(toggleNotifications())}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-2"
                >
                    <Label
                        htmlFor="volume"
                        className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
                    >
                        Notification Volume
                    </Label>
                    <div className="flex items-center space-x-4">
                        <VolumeX className="w-6 h-6 text-gray-400" />
                        <Slider
                            id="volume"
                            min={0}
                            max={100}
                            step={1}
                            value={[volume]}
                            onValueChange={(value) => dispatch(setVolume(value[0]))}
                            className="flex-grow"
                        />
                        <Volume2 className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Current volume: {volume}%
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-between items-center"
                >
                    <Label
                        htmlFor="theme"
                        className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
                    >
                        Theme
                    </Label>
                    <div
                        className="w-16 h-8 flex items-center rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"
                        onClick={handleThemeToggle}
                    >
                        <motion.div
                            className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center mx-1"
                            animate={{ x: theme === 'light' ? 0 : 32 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                            {theme === 'light' ? (
                                <Sun className="w-4 h-4 text-yellow-500" />
                            ) : (
                                <Moon className="w-4 h-4 text-blue-500" />
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
