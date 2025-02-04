import { Navigation } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { setCoordinates, fetchWeatherData } from '@/redux/slices/weatherSlice';
import { AppDispatch } from '@/redux/store';

function UserLocation() {
    const dispatch = useDispatch<AppDispatch>();

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    console.log('User location:', { latitude, longitude }); // Debugging

                    // Update global state with coordinates
                    dispatch(setCoordinates({ lat: latitude, lon: longitude }));

                    // Fetch weather data using the coordinates
                    dispatch(fetchWeatherData({ lat: latitude, lon: longitude }));
                },
                (error) => {
                    console.error('Geolocation error:', error.message);

                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
            console.error('Geolocation not supported by this browser.');
        }
    };

    return (
        <Button
            className="h-12 w-12"
            variant="outline"
            onClick={handleGetLocation}
        >
            <Navigation className="rotate-90 scale-125 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}

export default UserLocation;
