import React from 'react';
import {Drawer} from 'antd';
import {useCart} from "../context/CartContext";
import "./css/DrawerComponent.css";

interface DrawerComponentProps {
    visible: boolean;
    onClose: () => void;

    items: { productId: number, name: string; description: string; price: number; stock: number; quantity: number; imgUrl: string }[];
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({visible, onClose, items}) => {
    const {removeFromCart, updateQuantity, purchaseItems} = useCart();

    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const userId = "admin";

    const handlePurchase = () => {
        const purchaseData = items.map(item => ({
            productId: item.productId,
            userId: userId,
            count: item.quantity,
        }));
        purchaseItems(purchaseData);
    };

    return (
        <Drawer title="장바구니" onClose={onClose} open={visible}>
            {items.map((item, index) => (
                <div key={index} className="drawer-item">
                    <img src={`${process.env.PUBLIC_URL}/${item.imgUrl}`} className="drawer-item-img"/> {/* 이미지 추가 */}
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
            <div className="total-amount"> {/* 총 금액 표시 추가 */}
                <h3>총 금액: {totalAmount.toLocaleString()} 원</h3>
            </div>
            <div className="drawer-footer"> {/* 구매하기 버튼 추가 */}
                <button className="purchase-button" onClick={handlePurchase}>구매하기</button>
            </div>
        </Drawer>
    );
};

export default DrawerComponent;
