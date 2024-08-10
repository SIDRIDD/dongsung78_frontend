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
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        const userName = urlParams.get('userName');
        console.log('token : ', token);
        // const accessToken = Cookies.get('accessToken');
        // const email = Cookies.get('email');
        // const userName = Cookies.get('userName');

        console.log('email: ', email);
        console.log('userName : ', userName);

        if (token && email && userName) {
            dispatch(login());
            navigate('/'); // 원하는 페이지로 이동
            console.log("here!! email, userName : ", email, userName);
        }
    }, [dispatch, navigate]);

    return <div>Logging in with Naver...</div>;
};

export default NaverCallback;
