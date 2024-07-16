import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            console.log('Logged in with token:', action.payload); // 디버깅 로그 추가
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        logout: (state) => {
            console.log('Logged out'); // 디버깅 로그 추가
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
