import React, { useEffect } from 'react';
import './css/HeroSection.css';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

function HeroSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 사용하지 않는 코드 주석 처리
    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const token = urlParams.get('token');
    //     const email = urlParams.get('email');
    //     const userName = urlParams.get('userName');
    //
    //     if (email && userName) {
    //         dispatch(login({ token, user: { email, userName }}));
    //         navigate('/'); // 원하는 페이지로 이동
    //     }
    // }, [dispatch, navigate]);

    // 이미지 크기 조절 함수
    const adjustImageSize = () => {
        const image = document.querySelector('.hero-image');
        const viewportWidth = window.innerWidth;

        // 여기서 이미지를 뷰포트 너비의 50%로 설정 (원하는 비율로 조정 가능)
        image.style.width = `${viewportWidth * 0.65}px`;
    };

    // 컴포넌트가 마운트될 때와 리사이즈 이벤트 시 실행
    useEffect(() => {
        adjustImageSize(); // 초기 크기 조정

        window.addEventListener('resize', adjustImageSize);

        // cleanup 함수로 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', adjustImageSize);
        };
    }, []);

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
