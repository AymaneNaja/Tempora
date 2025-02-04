// store/weatherApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const OPENWEATHERMAP_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
    endpoints: (builder) => ({
        getWeather: builder.query({
            query: (query: string) => `weather?q=${query}&appid=${OPENWEATHERMAP_API_KEY}`,
        }),
        getSuggestions: builder.query({
            query: (query: string) =>
                `find?q=${query}&type=like&sort=population&cnt=5&appid=${OPENWEATHERMAP_API_KEY}`,
        }),
    }),
});

export const { useGetWeatherQuery, useGetSuggestionsQuery } = weatherApi;
