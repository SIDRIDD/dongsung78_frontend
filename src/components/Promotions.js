import React from 'react';
import './css/Promotions.css';

function Promotions() {
    return (
        <section className="promotions">
            <h2>현재 프로모션</h2>
            <div className="promotion-card">
                <h3>특별 할인</h3>
                <p>지금 주문하면 30% 할인!</p>
                <div className="timer">00:15:30 남음</div>
            </div>
        </section>
    );
}

export default Promotions;
