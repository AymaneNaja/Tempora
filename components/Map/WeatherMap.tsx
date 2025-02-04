'use client'
import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming this is the correct import

interface WeatherMapProps {
    city: string;
    lat: number;
    lng: number;
    temperature: number;
    description: string;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ city, lat, lng, temperature, description }) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    const center = {
        lat: lat,
        lng: lng,
    };

    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
        setIsLoading(false); // Hide skeleton once map is loaded
    }, []);

    return (
        <div className="rounded-lg overflow-hidden shadow-lg relative w-full">
            {isLoading ? <div className="h-[400px] w-full">
                <Skeleton className='h-full w-full' />
            </div> : null}
            <div className={isLoading ? 'hidden' : 'block'}> <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                >
                    <Marker position={center} />

                </GoogleMap>
            </LoadScript>
            </div>
        </div>
    );
};

export default WeatherMap;