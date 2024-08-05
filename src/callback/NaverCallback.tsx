import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOAuthLogin } from '../service/OAuthService';
import {login} from "../store/authSlice";
import {useDispatch} from "react-redux";
import {Cookie} from "@mui/icons-material";
import Cookies from "js-cookie";


const NaverCallback: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        const email = Cookies.get('email');
        const userName = Cookies.get('userName');

        console.log('email: ', email);
        console.log('userName : ', userName);

        if (accessToken && email && userName) {
            dispatch(login({ token: accessToken, user: { email, userName } }));
            navigate('/'); // 원하는 페이지로 이동
        }
    }, [dispatch, navigate]);

    return <div>Logging in with Naver...</div>;
};

export default NaverCallback;
