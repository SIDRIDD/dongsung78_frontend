import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import axios from 'axios';
import { message } from 'antd';

const NaverCallback: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOAuthLogin = async (code: string, state: string) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/oauth', {
                code: code,
                provider: 'naver',
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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        if (code && state) {
            handleOAuthLogin(code, state);
        }
    }, []);

    return <div>Logging in...</div>;
};

export default NaverCallback;
