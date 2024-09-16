import React, { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useOAuthLogin } from '../service/OAuthService';
import {login} from "../store/authSlice";
import {useDispatch} from "react-redux";
import {Cookie} from "@mui/icons-material";
import Cookies from "js-cookie";


const OauthCallback: React.FC = () => {
    const { userName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // userName 파라미터가 올바르게 전달되었는지 확인
        if (userName) {
            console.log('Received userName:', userName);
            // 필요한 로직 수행 (예: 세션 스토리지에 저장)
            sessionStorage.setItem('userName', userName);
            navigate('/product-grid/0');
        } else {
            console.error('userName 를 저장하지 못했습니다.');
        }
    }, [userName]);

    return (
        <div>
            <h1>네이버 로그인 성공!</h1>
            <p>사용자 이름: {userName}</p>
        </div>
    );
};

export default OauthCallback;
