import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;

    user: User | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    user: null,
};

interface User {
    email: string;
    name: string;
    userId: number;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; user: User}>) => {
            console.log('Logged in with token:', action.payload.token); // 디버깅 로그 추가
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            console.log('Logged out'); // 디버깅 로그 추가
            state.isLoggedIn = false;
            state.token = null;
        }
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
