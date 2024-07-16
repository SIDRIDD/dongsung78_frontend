import React from 'react';
import './css/ProductCategories.css';

function ProductCategories() {
    const categories = [
        { id: 1, name: '화이트보드', image: 'img/WhiteBoard1_aftersize.png' },
        { id: 2, name: '분필 칠판', image: 'img/BlackBoard_aftersize.png' },
        { id: 3, name: '분필', image: 'img/chalk_aftersize.png' },
    ];

    return (
        <section className="product-categories">
            <h2>제품 카테고리</h2>
            <div className="categories-grid">
                {categories.map(category => (
                    <div className="category-card" key={category.id}>
                        <img src={`${process.env.PUBLIC_URL}/${category.image}`} alt={category.name} />
                        <h3>{category.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProductCategories;
