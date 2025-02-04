import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
    city: string;
    lat: number | null;
    lon: number | null;
    weatherData: WeatherData | null;
    loading: boolean;
    error: string | null;
}

interface WeatherData {
    city: string,
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    forecast: {
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
    };
}

const initialWeatherState: WeatherState = {
    city: '',
    lat: null,
    lon: null,
    weatherData: null,
    loading: false,
    error: null,
};

type SettingsState = {
    theme: 'light' | 'dark';
    temperatureUnit: 'metric' | 'imperial'; // Fixed for OpenWeather API compatibility
    windUnit: 'km/h' | 'mph';
    pressureUnit: 'hPa' | 'mmHg';
    precipitationUnit: 'mm' | 'in';
    distanceUnit: 'km' | 'miles';
    notificationsEnabled: boolean;
    use12hTime: boolean;
    volume: number; // 0-100 range for volume
};

interface RootState {
    weather: WeatherState;
    settings: SettingsState;
}

const initialSettingsState: SettingsState = {
    theme: 'light',
    temperatureUnit: 'metric',
    windUnit: 'km/h',
    pressureUnit: 'hPa',
    notificationsEnabled: false,
    use12hTime: false,
    volume: 50,
    distanceUnit: 'km',
    precipitationUnit: 'mm',
};

// Async thunk to fetch weather data based on settings
export const fetchWeatherData = createAsyncThunk<
    WeatherData,
    { city?: string; lat?: number; lon?: number },
    { state: RootState }
>('weather/fetchWeatherData', async ({ city, lat, lon }, { getState, rejectWithValue }) => {
    const state = getState();
    const units = state.settings.temperatureUnit;

    try {
        let query = '';
        if (!lat || !lon) {
            if (navigator.geolocation) {
                await new Promise<void>((resolve) => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            lat = position.coords.latitude;
                            lon = position.coords.longitude;
                            resolve();
                        },
                        () => {
                            // Default to Madrid if geolocation fails
                            lat = 40.4168;
                            lon = -3.7038;
                            resolve();
                        }
                    );
                });
            } else {
                // Default to Madrid if geolocation is unavailable
                lat = 40.4168;
                lon = -3.7038;
            }
        }

        query = city
            ? `q=${city}`
            : `lat=${lat}&lon=${lon}`;

        const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=${units}`
        );
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=${units}`
        );

        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();


        return {
            city: currentWeatherData.name, // Update the city from API response
            lat: currentWeatherData.coord.lat,
            lon: currentWeatherData.coord.lon,
            temperature: Math.round(currentWeatherData.main.temp),
            description: currentWeatherData.weather[0].description,
            icon: currentWeatherData.weather[0].icon,
            humidity: currentWeatherData.main.humidity,
            windSpeed: currentWeatherData.wind.speed,
            forecast: {
                daily: forecastData.list
                    .filter((_, index) => index % 8 === 0)
                    .slice(0, 5)
                    .map(item => ({
                        date: new Date(item.dt * 1000).toLocaleDateString(),
                        temperature: Math.round(item.main.temp),
                        condition: item.weather[0].main,
                    })),
                hourly: forecastData.list.slice(0, 6).map(item => ({
                    time: new Date(item.dt * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                    temperature: Math.round(item.main.temp),
                    condition: item.weather[0].main,
                })),
            },
        };
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});


export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initialWeatherState,
    reducers: {
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
        setCoordinates: (state, action: PayloadAction<{ lat: number; lon: number }>) => {
            state.lat = action.payload.lat;
            state.lon = action.payload.lon;

        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchWeatherData.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.weatherData = action.payload;
                state.loading = false;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettingsState,
    reducers: {
        setUnit: (
            state,
            action: PayloadAction<{ unitType: string; value: string }>
        ) => {
            const { unitType, value } = action.payload;
            if (state.hasOwnProperty(unitType)) {
                (state as any)[unitType] = value;
            }
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
        toggleNotifications: (state) => {
            state.notificationsEnabled = !state.notificationsEnabled;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        // Additional reducers
    },
});

export const { setCity, setCoordinates } = weatherSlice.actions;

export const {
    setVolume,
    setUnit,
    setTheme,
    toggleNotifications,
} = settingsSlice.actions;

export default {
    search: weatherSlice.reducer,
    settings: settingsSlice.reducer,
};
