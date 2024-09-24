import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            console.log('Logged in'); // 디버깅 로그
            state.isLoggedIn = true;
        },
        logout: (state) => {
            console.log('Logged out'); // 디버깅 로그
            state.isLoggedIn = false;
            // 필요한 경우, 쿠키에서 토큰 삭제 로직 추가
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
