import React, {useEffect} from 'react';
import './css/HeroSection.css';
import {Link, useNavigate} from "react-router-dom";
import {login} from "../store/authSlice";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";

function HeroSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const token = urlParams.get('token');
    //     const email = urlParams.get('email');
    //     const userName = urlParams.get('userName');
    //
    //     console.log('token : ', token);
    //     console.log('email: ', email);
    //     console.log('userName : ', userName);
    //
    //     if (email && userName) {
    //         dispatch(login({ token, user: { email, userName }}));
    //         navigate('/'); // 원하는 페이지로 이동
    //         console.log("here!! email, userName : ", email, userName);
    //     }
    // }, [dispatch, navigate]);

    return (
        <section className="hero-section">
            <div className="hero-image-container">
                <img src={`${process.env.PUBLIC_URL}/img/merge_best.png`} alt="Banner" className="hero-image" />
                <div className="hero-text">
                    <div className="hero-buttons">
                        <Link to="/product-grid/1" className="hero-button">지금 쇼핑하기</Link>
                        <Link to='/quote-contact' className="hero-button">견적문의 하기</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
