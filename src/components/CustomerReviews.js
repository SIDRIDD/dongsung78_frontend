import React from 'react';
import './css/CustomerReviews.css';

function CustomerReviews() {
    const reviews = [
        { id: 1, name: '대학교 시공', description: '**대학교 대형 칠판 시공사진', rating: 5, image: 'img/BlackBoard_aftersize.png' },
        { id: 2, name: '학원 시공', description: '**학원 학원용 칠판 시공사진', rating: 4, image: 'img/BlackBoard_aftersize.png' },
    ];

    return (
        <section className="customer-reviews">
            <h2>시공 사진</h2>
            <div className="reviews-grid">
                {reviews.map(review => (
                    <div className="review-card" key={review.id}>
                        <img src={`${process.env.PUBLIC_URL}/${review.image}`} alt={review.name} />
                        <h3 style={{ marginTop: '20px' }}>{review.name}</h3>
                        <p>{review.description}</p>
                        <p>Rating: {review.rating} ⭐</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CustomerReviews;
