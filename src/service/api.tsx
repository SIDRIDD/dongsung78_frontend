import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // 리프레시 토큰으로 새로운 액세스 토큰 요청
                const { data } = await api.get('http://localhost:8080/api/user/check');
                // 새로운 액세스 토큰을 저장하거나 재요청에 사용
                originalRequest.headers['Authorization'] = `Bearer ${data}`;
                return api(originalRequest);
            } catch (refreshError) {
                // 리프레시 실패 시 로그아웃 처리 또는 에러 핸들링
                console.error('Refresh token failed:', refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
