import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
    withCredentials: true,
});

let isChecking = false; // /check 요청 중인지 확인하는 플래그
let failedRequestsQueue: any[] = []; // /check 요청 동안 대기할 요청 큐

const naviage = useNavigate();
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const checkUrl = process.env.REACT_APP_USER_CHECK_URL;
const refreshTokenUrl = process.env.REACT_APP_REFRESH_TOKEN_URL;

// /check API를 통해 토큰 유효성을 검사하는 함수
const checkToken = async () => {
    try {
        // /check API 호출하여 토큰 유효성 검사
        const response = await api.post(`${apiUrl}${checkUrl}`, {}, { withCredentials: true });
        return response.data; // 응답 데이터 반환 (유효한 경우)
    } catch (error) {
        throw new Error('Token check failed');
    }
};

// refreshToken을 사용하여 새로운 accessToken을 발급받는 함수
const refreshAccessToken = async () => {
    try {
        const { data } = await api.post(`${apiUrl}${refreshTokenUrl}`, {}, { withCredentials: true });
        return data.accessToken; // 새로운 accessToken 반환
    } catch (error) {
        naviage('/login');
        message.error('다시 로그인을 해주시기 바랍니다.');
        throw new Error('Failed to refresh token');
    }
};

// Axios 요청 인터셉터
api.interceptors.request.use(
    async (config) => {
        // withCredentials가 포함된 요청만 처리
        if (config.withCredentials) {
            // 이미 /check API를 호출 중이라면, 요청을 대기 큐에 추가
            if (isChecking) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({
                        onSuccess: () => {
                            resolve(config); // /check가 성공하면 대기 중인 요청을 재시도
                        },
                        onFailure: (error: any) => {
                            reject(error); // /check가 실패하면 대기 중인 요청도 실패
                        },
                    });
                });
            }

            // /check API가 실행 중이 아니면, 실행 시작
            isChecking = true;

            try {
                // /check API 호출하여 토큰 유효성 검사
                await checkToken();
                isChecking = false;

                // 대기 중인 요청 처리
                failedRequestsQueue.forEach((req) => req.onSuccess());
                failedRequestsQueue = [];

            } catch (error) {
                // /check 실패: refreshToken으로 토큰 갱신 시도
                isChecking = false;
                try {
                    const newAccessToken = await refreshAccessToken();
                    
                    // 갱신된 accessToken을 저장하고 원래 요청에 반영
                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    
                    // 대기 중인 요청 처리
                    failedRequestsQueue.forEach((req) => req.onSuccess());
                    failedRequestsQueue = [];
                } catch (refreshError) {
                    // refreshToken이 만료되었거나 실패한 경우
                    failedRequestsQueue.forEach((req) => req.onFailure(refreshError));
                    failedRequestsQueue = [];
                    return Promise.reject(refreshError); // 로그아웃 처리 또는 사용자에게 재로그인 요청
                }
            }
        }

        // 요청 진행
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
