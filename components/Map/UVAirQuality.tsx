import { Sun, Wind } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface UVAirQualityProps {
    uvIndex: number;
    airQuality: number;
    loading: boolean;
}

const UVAirQuality: React.FC<UVAirQualityProps> = ({ uvIndex, airQuality, loading }) => {
    const getUVDescription = (index: number) => {
        if (index <= 2) return 'Low';
        if (index <= 5) return 'Moderate';
        if (index <= 7) return 'High';
        if (index <= 10) return 'Very High';
        return 'Extreme';
    };

    const getAirQualityDescription = (aqi: number) => {
        if (aqi <= 50) return 'Good';
        if (aqi <= 100) return 'Moderate';
        if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
        if (aqi <= 200) return 'Unhealthy';
        if (aqi <= 300) return 'Very Unhealthy';
        return 'Hazardous';
    };

    return (
        <div className="bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 dark:from-yellow-600 dark:via-red-700 dark:to-pink-700 p-6 rounded-lg shadow-lg text-white h-fit">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200">UV Index & Air Quality</h2>
            <div className="flex justify-between items-center">
                <div className="text-center w-1/2">
                    <Sun className="text-5xl mx-auto mb-2" />
                    <p className="text-lg font-semibold">UV Index</p>
                    {loading ? (
                        <Skeleton className="h-8 w-24 mx-auto mt-1 bg-white/50" />
                    ) : (
                        <>
                            <p className="text-3xl font-bold my-1">{uvIndex}</p>
                            <p className="text-sm">{getUVDescription(uvIndex)}</p>
                        </>
                    )}
                </div>
                <div className="text-center w-1/2">
                    <Wind className="text-5xl mx-auto mb-2" />
                    <p className="text-lg font-semibold">Air Quality</p>
                    {loading ? (
                        <Skeleton className="h-8 w-24 mx-auto mt-1 bg-white/50" />
                    ) : (
                        <>
                            <p className="text-3xl font-bold my-1">{airQuality}</p>
                            <p className="text-sm">{getAirQualityDescription(airQuality)}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UVAirQuality;

