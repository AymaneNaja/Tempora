import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function getWeatherData(city: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    time: new Date(data.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    condition: data.weather[0].main,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
  };
}
export async function getSimilarCities(countryCode: string, limit: number = 5) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/find?appid=${API_KEY}&type=like&cnt=${limit}&country=${countryCode}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch similar cities");
  }
  const data = await response.json();
  return data.list.map((city: any) => ({
    city: city.name,
    temperature: Math.round(city.main.temp),
    condition: city.weather[0].main,
    humidity: city.main.humidity,
    windSpeed: Math.round(city.wind.speed * 3.6),
  }));
}