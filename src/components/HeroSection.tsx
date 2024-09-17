import React, { useEffect } from 'react';
import './css/HeroSection.css';

const HeroSection: React.FC = () => {
    const heroImage = process.env.REACT_APP_HERO_IMAGE;
    // 이미지 크기 조절 함수
    const adjustImageSize = () => {
        const image = document.querySelector('.hero-image') as HTMLImageElement | null;
        const viewportWidth = window.innerWidth;

        if (image) {
            image.style.width = `${viewportWidth * 0.65}px`;
        }
    };

    useEffect(() => {
        adjustImageSize();

        window.addEventListener('resize', adjustImageSize);

        return () => {
            window.removeEventListener('resize', adjustImageSize);
        };
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-image-container">
                <img src={`${process.env.PUBLIC_URL}${heroImage}`} alt="Banner" className="hero-image" />
            </div>
        </section>
    );
}

export default HeroSection;
