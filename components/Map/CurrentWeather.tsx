import { Wind, WindIcon } from "lucide-react";

interface CurrentWeatherProps {
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ temperature, description, icon, humidity, windSpeed }) => {

    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between ">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Current Weather</h2>
                    <p className="text-5xl font-bold mb-4">{temperature}°C</p>

                </div>
                <img
                    src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
                    alt={description}
                    className="w-32 h-32"
                />
            </div>
            <div className="flex justify-between mt-6">
                <p className="text-xl capitalize">{description}</p>
                <div className="flex items-center">
                    <Wind className="text-3xl mr-2" />
                    <span>{humidity}%</span>
                </div>
                <div className="flex items-center">
                    <WindIcon className="text-3xl mr-2" />
                    <span>{windSpeed} m/s</span>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;

