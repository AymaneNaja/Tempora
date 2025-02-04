import { SunIcon, CloudIcon, RainIcon, SnowIcon, CloudSunIcon } from "@/components/WeatherIcons"
import { Skeleton } from '@/components/ui/skeleton';

interface ForecastProps {
    daily: Array<{
        date: string;
        temperature: number;
        condition: string;
    }>;
    hourly: Array<{
        time: string;
        temperature: number;
        condition: string;
    }>;
    loading: boolean;
}

const weatherIcons = {
    Clear: <SunIcon className="w-8 h-8" />,
    Clouds: <CloudIcon className="w-8 h-8" />,
    Rain: <RainIcon className="w-8 h-8" />,
    Snow: <SnowIcon className="w-8 h-8" />,
    PartlyCloudy: <CloudSunIcon className="w-8 h-8" />,
}

const Forecast: React.FC<ForecastProps> = ({ daily, hourly, loading }) => {
    return (
        <div className="bg-white dark:bg-inherit dark:border-2 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 dark:from-blue-400 dark:to-teal-200">Forecast</h2>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Daily</h3>
                <div className="overflow-x-auto slider">
                    <div className="inline-flex space-x-4 pb-2">
                        {loading ? (
                            Array(5).fill(0).map((_, index) => (
                                <Skeleton key={index} className="h-24 w-full rounded-lg dark:bg-gray-700" />
                            ))
                        ) : (
                            daily?.slice(0, 5).map((day, index) => (
                                <div key={index} className="text-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex flex-col justify-center items-center">
                                    <p className="font-semibold text-sm text-gray-500 dark:text-gray-400 truncate">{day.date}</p>
                                    <div className="my-2 text-center">{weatherIcons[day.condition] || <SunIcon className="w-8 h-8 mx-auto" />}</div>
                                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{day.temperature}°C</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Hourly</h3>
                <div className="overflow-x-auto">
                    <div className="inline-flex space-x-4 pb-2 slider">
                        {loading ? (
                            Array(24).fill(0).map((_, index) => (
                                <Skeleton key={index} className="h-24 w-20 rounded-lg dark:bg-gray-700" />
                            ))
                        ) : (
                            hourly?.slice(0, 24).map((hour, index) => (
                                <div key={index} className="text-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg min-w-[80px] flex flex-col justify-center items-center">
                                    <p className="font-semibold text-sm text-gray-500 dark:text-gray-400 truncate">{hour.time}</p>
                                    <div className="my-2">{weatherIcons[hour.condition] || <SunIcon className="w-8 h-8 mx-auto" />}</div>
                                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{hour.temperature}°C</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forecast;

