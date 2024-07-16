import React, {useEffect, useState} from 'react';
import './css/FeaturedProducts.css';
import {MenuProps} from "antd";
import {Category} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";



interface Product {
    id: number;
    name: string;
    image: string;
    description?: string;
}

interface ApiProduct {
    categoryId: number;
    name: string;
    description: string;

    imgUrl : string;
}

const FeaturedProducts: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/category/get');
                const data: ApiProduct[] = await response.json();

                const updatedProducts: Product[] = data.map((item) => ({
                    id: item.categoryId,
                    name: item.name,
                    description: item.description,
                    image: item.imgUrl // 실제 이미지 경로로 대체 필요
                }));

                setProducts(updatedProducts);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleCardClick = (category: number) => {
        navigate(`/product-grid/${category}`);
    };

    return (
        <section className="featured-products">
            <h2>상품 카테고리</h2>
            <div className="products-grid">
                {products.map(product => (
                    <div
                        className="product-card"
                        key={product.id}
                        onClick={() => handleCardClick(product.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={product.image} alt={product.name} />
                        <h3 style={{ marginTop: '20px' }}>{product.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}


export default FeaturedProducts;
