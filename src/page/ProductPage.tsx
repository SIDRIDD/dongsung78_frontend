import React, {useEffect, useState} from 'react';
import ProductImage from "../components/ProductImage";
import ProductDetails from "../components/ProductDetails";
import './css/ProductPage.css';
import {useParams} from "react-router-dom";
import axios from "axios";

interface Product {

    id: number;

    name: string;

    description: string;

    price: number;

    stock: number;
    imageUrl: string;

    categoryName: string;

    priority: number;
}

const ProductPage: React.FC = () => {
    const {productId} = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/product/getone/${productId}`)
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-page-container">
            <div className="product-page">
                <ProductImage imageUrl={product.imageUrl}/>
                <ProductDetails
                    productId={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    stock={product.stock}
                    imgUrl={product.imageUrl}
                />
            </div>
        </div>
    );
};

export default ProductPage;
