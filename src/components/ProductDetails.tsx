import React, {useState} from 'react';
import './css/ProductDetails.css';
import { useCart } from '../context/CartContext';

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
    userId: string;
    count: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({productId, name, description, price, stock, imgUrl  }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, setDrawerVisible, cartItems, purchaseItems } = useCart();
    const userId = "admin";

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
        const purchaseData: PurchaseData[] = cartItems.map(item => ({
            productId: item.productId,
            userId: userId,
            count: item.quantity,
        }));
        purchaseItems(purchaseData); // 필요한 데이터만 전송
    };


    return (
        <div className="product-details-info">
            <h1 className="product-details-title">{name}</h1>
            <div className="product-details-price">
                <span className="details-price">{price.toLocaleString()} 원</span>
            </div>
            <div className="product-details-shipping">
                <span>배송비 2,500원</span>
            </div>
            {/*<div className="product-delivery">*/}
            {/*    <span>토요일 7/6 도착 예정</span>*/}
            {/*</div>*/}
            <div className="product-details-quantity">
                <button className="quantity-details-button" onClick={handleDecrease}>-</button>
                <span className="details-quantity">{quantity}</span>
                <button className="quantity-details-button" onClick={handleIncrease}>+</button>
            </div>
            <div className="product-details-buttons">
                <button className="add-to-cart" onClick={handleAddToCart}>장바구니 담기</button>
                <button className="buy-now" onClick={handleBuyNow}>바로구매</button>
            </div>
        </div>
    );
};

export default ProductDetails;
