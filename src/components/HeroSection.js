import React from 'react';
import './css/HeroSection.css';
import {Link} from "react-router-dom";

function HeroSection() {
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
