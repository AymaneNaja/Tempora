import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface TemperatureTrendProps {
    hourlyData: Array<{
        time: string;
        temperature: number;
    }>;
    loading: boolean;
}

const TemperatureTrend: React.FC<TemperatureTrendProps> = ({ hourlyData, loading }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 dark:from-blue-400 dark:to-teal-200">Temperature Trend</h2>
            {loading ? (
                <Skeleton className="h-[300px] w-full dark:bg-gray-700" />
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis
                            dataKey="time"
                            stroke="#718096"
                            tick={{ fill: '#718096' }}
                            tickFormatter={(time) => time.split(' ')[0]}
                        />
                        <YAxis
                            stroke="#718096"
                            tick={{ fill: '#718096' }}
                            tickFormatter={(temp) => `${temp}°C`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '8px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                border: 'none'
                            }}
                            labelStyle={{ color: '#4a5568', fontWeight: 'bold' }}
                            formatter={(value) => [`${value}°C`, 'Temperature']}
                        />
                        <Line
                            type="monotone"
                            dataKey="temperature"
                            stroke="#8884d8"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default TemperatureTrend;

