import axios from 'axios';
import { login } from "../store/authSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const useOAuthLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOAuthLogin = async (provider: string, code: string, state: string) => {
        let loginProvider = '';

        try {
            switch (provider) {
                case 'naver':
                    loginProvider = provider;
                    break;
                case 'kakao':
                    loginProvider = provider;
                    break;
                case 'google':
                    loginProvider = provider;
                    break;
                default:
                    throw new Error('Unsupported provider: ' + provider);
            }

            const response = await axios.post(`http://localhost:8080/auth/oauth/${loginProvider}`, {
                code: code,
                redirectUri: process.env.REACT_APP_NAVER_REDIRECTURL
            });

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
