'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setCity, fetchWeatherData } from '@/redux/slices/weatherSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, XCircle, Loader2 } from 'lucide-react';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const dispatch = useDispatch<AppDispatch>();
    const weatherData = useSelector((state: RootState) => state.search);

    const cityNames = ['New York', 'Tokyo', 'London', 'Paris', 'Sydney'];

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % cityNames.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setLoading(true);
        setError(false);

        if (event.target.value.trim() === '') {
            setSuggestions([]);
            setLoading(false);
            return;
        }

        try {
            const result = await fetchSuggestions(event.target.value);
            setSuggestions(result);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const fetchSuggestions = async (query: string) => {
        try {
            const response = await fetch(`/api/places?query=${encodeURIComponent(query)}`);

            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data.suggestions;
        } catch (error: any) {
            console.error('Error fetching suggestions:', error.message);
            throw new Error(error.message || 'An unknown error occurred');
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
        dispatch(setCity(suggestion));
        dispatch(fetchWeatherData({ city: suggestion }));
    };

    return (
        <div className="relative w-full max-w-2xl border rounded-xl z-50">
            <div className="relative flex items-center bg-inherit rounded-xl pl-4 pr-2 py-1.5 focus-within:ring ring-slate-500">
                <Search className="text-gray-500" />
                <input
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder={searchTerm ? '' : cityNames[placeholderIndex]} // Show placeholder only if searchTerm is empty
                    className="flex-grow bg-transparent border-none outline-none dark:text-slate-200 text-gray-800 placeholder-gray-500 px-2"
                />
                <AnimatePresence>
                    {searchTerm && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <button
                                onClick={() => setSearchTerm('')}
                                className="p-1 rounded-xl hover:bg-gray-200 transition"
                            >
                                <XCircle className="h-5 w-5 text-gray-500" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    className="ml-2 px-4 py-1.5 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-400 text-white font-medium rounded-full hover:bg-blue-600 transition"
                    onClick={() => {
                        if (searchTerm.trim()) {
                            dispatch(fetchWeatherData({ city: searchTerm }));
                        }
                    }}
                >
                    Search
                </button>
            </div>
            <AnimatePresence>
                {(loading || error || suggestions.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-x-0 top-full mt-2 rounded-lg shadow-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-gray-900 overflow-hidden z-100"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center py-4">
                                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center py-3 text-red-500">
                                <XCircle className="mr-2" /> No results found.
                            </div>
                        ) : (
                            <ul className="py-2">
                                {suggestions.map((suggestion, index) => (
                                    <motion.li
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        key={suggestion}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        className="px-4 py-2 z-[100] text-inherit cursor-pointer dark:hover:bg-gray-900 dark:hover:text-white hover:bg-gray-100 transition-colors duration-150"
                                    >
                                        {suggestion}
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
