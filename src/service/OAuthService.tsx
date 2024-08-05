import axios from 'axios';
import { login } from "../store/authSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const useOAuthLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const naverRedirectUri = process.env.REACT_APP_NAVER_CALLBACK_URL || '';
    const kakaoRedirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URL || '';

    const handleOAuthLogin = async (provider: string, code: string, state: string) => {
        let loginProvider = '';
        let redirectUri = '';

        try {
            switch (provider) {
                case 'naver':
                    loginProvider = provider;
                    redirectUri = naverRedirectUri;
                    break;
                case 'kakao':
                    loginProvider = provider;
                    redirectUri = kakaoRedirectUri;
                    break;
                default:
                    throw new Error('Unsupported provider: ' + provider);
            }
            console.log('콜백 이후loginProvider');
            console.log(`loginProvider : ${loginProvider}`);
            console.log(`RedirectUri : ${redirectUri}`);
            const response = await axios.post(`http://localhost:8080/auth/api/oauth/${loginProvider}`, {
                code: code,
                redirectUri: redirectUri
            });

            console.log('response 확인:', response.data);
            const { token } = response.data;
            dispatch(login(token));

            message.success('Login Successful');
            navigate('/');
        } catch (error) {
            console.error('OAuth Login Failed:', error);
            message.error('OAuth Login Failed');
        }
    };

    return handleOAuthLogin;
};
