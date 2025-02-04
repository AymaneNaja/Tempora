import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/weatherSlice';


export const store = configureStore({
    reducer: {
        settings: searchSlice.settings,
        search: searchSlice.search,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
