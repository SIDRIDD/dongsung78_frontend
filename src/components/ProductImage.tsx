import React from 'react';
import './css/ProductImage.css';

interface ProductImageProps {
    imageUrl: string;
}
const ProductImage: React.FC<ProductImageProps> = ({ imageUrl }) => {
    return (
        <div className="product-page-image">
            <img src={`${process.env.PUBLIC_URL}/${imageUrl}`} alt="Product" />
        </div>
    );
};

export default ProductImage;
