import React, {useEffect} from 'react';
import {Drawer, message} from 'antd';
import {useCart} from "../context/CartContext";
import "./css/DrawerComponent.css";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from 'react-router-dom';
import {RootState} from "../store/store";

interface DrawerComponentProps {
    visible: boolean;
    onClose: () => void;

    items: { productId: number, name: string; description: string; price: number; stock: number; quantity: number; imgUrl: string }[];
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({visible, onClose, items}) => {
    const {removeFromCart, updateQuantity} = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const handlePurchase = () => {

        if(!isLoggedIn){
            message.warning('상품 구매를 위해 로그인이 필요합니다.');
            onClose();
            navigate('/login', { state: { from: location } });
            return;
        }
        console.log('items 확인 : ', items);
        onClose();
        navigate('/delivery', {state: { items }});

    };

    useEffect(() => {
        sessionStorage.setItem('cartKinds', items.length.toString());
    })

    return (
        <Drawer style={{fontFamily: 'PaperlogyBold'}} title="장바구니" onClose={onClose} open={visible}>
            {items.map((item, index) => (
                <div key={index} className="drawer-item">
                    <img src={`${process.env.PUBLIC_URL}/${item.imgUrl}`} className="drawer-item-img"/>
                    <div className="drawer-item-content">
                        <div className="drawer-item-header">
                            <h2 className="drawer-item-name">{item.name}</h2>
                            <button className="drawer-item-actions" onClick={() => removeFromCart(item.name)}>x</button>
                        </div>
                        <span className="drawer-item-price">{item.price.toLocaleString()} 원</span>
                        <div className="drawer-item-footer">
                            <div className="quantity-control">
                                <button onClick={() => updateQuantity(item.name, item.quantity - 1)}
                                        disabled={item.quantity <= 1}>-
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="total-amount">
                <h3 style={{ font: 'PaperlogyBold' }}>총 금액: {totalAmount.toLocaleString()} 원</h3>
            </div>
            <div className="drawer-footer">
                <button className="purchase-button" onClick={handlePurchase} style={{ font: 'PaperlogyBold' }}>구매하기</button>
            </div>
        </Drawer>
    );
};

export default DrawerComponent;
