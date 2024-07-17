import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOAuthLogin } from '../service/OAuthService';

const NaverCallback: React.FC = () => {
    const navigate = useNavigate();
    const handleOAuthLogin = useOAuthLogin();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        if (code && state) {
            handleOAuthLogin('naver', code, state)
                .then(() => navigate('/dashboard'))
                .catch(error => console.error('OAuth Login Failed:', error));
        }
    }, [navigate, handleOAuthLogin]);

    return <div>Logging in with Naver...</div>;
};

export default NaverCallback;
