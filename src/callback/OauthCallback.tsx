import React, { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const OauthCallback: React.FC = () => {
    const { userName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (userName) {
            sessionStorage.setItem('userName', userName);
            navigate('/product-grid/0');
        } else {
            console.error('userName 를 저장하지 못했습니다.');
        }
    }, [userName]);

    return (
        <div>
            <h1>Oauth 로그인 성공!</h1>
            <p>사용자 이름: {userName}</p>
        </div>
    );
};

export default OauthCallback;
