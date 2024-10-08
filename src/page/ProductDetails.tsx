import React, {useState} from 'react';
import './css/ProductDetails.css';
import { useCart } from '../context/CartContext';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useLocation, useNavigate} from "react-router-dom";
import {message} from "antd";

interface ProductDetailsProps {
    productId: number;

    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;

}

interface PurchaseData {
    productId: number;
    count: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({productId, name, description, price, stock, imgUrl  }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, setDrawerVisible, cartItems, purchaseItems } = useCart();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const location = useLocation();

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleAddToCart = () => {
        const product = { productId, name, description, price, stock, quantity, imgUrl };
        addToCart(product);
        setDrawerVisible(true);
    };

    const handleBuyNow = () => {

        if(!isLoggedIn){
            message.warning('상품 구매를 위해 로그인이 필요합니다.');
            navigate('/login', { state: { from: location } });
            return;
        }
        const product = { productId, name, description, price, stock, quantity, imgUrl };

        const purchaseData: PurchaseData[] = cartItems.map(item => ({
            productId: item.productId,
            count: item.quantity,
        }));
        navigate('/delivery', { state: { items: [product] } });
        purchaseItems(purchaseData);
    };


    return (
        <div className="product-details-info">
            <div className="product-details-title-info">
                <h1 className="product-details-title">{name}</h1>
                <span>상품 요약 정보: {description}</span>
                <span>판매가: {price.toLocaleString()} 원</span>
                <span>배송비: 무료 배송</span>
            </div>
            <div className="product-details-quantity">
                <button className="quantity-details-button" onClick={handleDecrease}>-</button>
                <span className="details-quantity">{quantity}</span>
                <button className="quantity-details-button" onClick={handleIncrease}>+</button>
                <div className="product-details-price">
                    <span className="details-price">{price.toLocaleString()} 원</span>
                </div>
            </div>
            <div className="product-details-buttons">
                <button className="add-to-cart" onClick={handleAddToCart}>장바구니 담기</button>
                <button className="buy-now" onClick={handleBuyNow}>바로구매</button>
            </div>
        </div>
    );
};

export default ProductDetails;
