import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import menuReducer from './MenuSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
