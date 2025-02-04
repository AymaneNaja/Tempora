import { Droplet, Wind } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface WindHumidityProps {
    windSpeed: number;
    humidity: number;
    loading: boolean;
}

const WindHumidity: React.FC<WindHumidityProps> = ({ windSpeed, humidity, loading }) => {
    return (
        <div className="bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 p-6 rounded-lg shadow-lg text-white h-fit">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Wind & Humidity</h2>
            <div className="flex justify-between items-center">
                <div className="text-center w-1/2">
                    <Wind className="text-5xl mx-auto mb-2" />
                    <p className="text-lg font-semibold">Wind Speed</p>
                    {loading ? (
                        <Skeleton className="h-8 w-24 mx-auto mt-1 bg-white/50" />
                    ) : (
                        <p className="text-3xl font-bold mt-1">{windSpeed} m/s</p>
                    )}
                </div>
                <div className="text-center w-1/2">
                    <Droplet className="text-5xl mx-auto mb-2" />
                    <p className="text-lg font-semibold">Humidity</p>
                    {loading ? (
                        <Skeleton className="h-8 w-24 mx-auto mt-1 bg-white/50" />
                    ) : (
                        <p className="text-3xl font-bold mt-1">{humidity}%</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WindHumidity;

