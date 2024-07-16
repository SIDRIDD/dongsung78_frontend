import React, {createContext, useState, useContext, ReactNode} from 'react';
import axios from "axios";

interface Product {
    productId: number;

    name: string;

    description: string;
    price: number;
    stock: number;

    quantity: number;

    imgUrl: string;
}

interface PurchaseData {
    productId: number;
    userId: string;
    count: number;
}

interface CartContextProps {
    cartItems: Product[];
    setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
    drawerVisible: boolean;
    setDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
    removeFromCart: (name: string) => void;

    updateQuantity: (name: string, quantity: number) => void;

    addToCart: (product: Product) => void;

    purchaseItems: (purchaseData: PurchaseData[]) => void;
}


const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode; // 명시적으로 children 프로퍼티 지정
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);


    const removeFromCart = (name: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== name));
    };
    const updateQuantity = (name: string, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.name === name ? { ...item, quantity } : item
            )
        );
    };

    const addToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.name === product.name);
            if (existingItem) {
                return prevItems.map(item =>
                    item.name === product.name
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }
            return [...prevItems, product];
        });
        setDrawerVisible(true);
    };

    const purchaseItems = async (purchaseData: PurchaseData[]) => {
        try {
            const response = await axios.post('http://localhost:8080/api/order/save', purchaseData);
            console.log(response.data); // 성공 메시지 출력
            // 성공적으로 구매가 완료된 후 장바구니를 비웁니다.
            setCartItems([]);
        } catch (error) {
            console.error('Error purchasing items:', error);
        }
    };


    return (
        <CartContext.Provider value={{ cartItems, setCartItems, drawerVisible, setDrawerVisible, removeFromCart, updateQuantity, addToCart, purchaseItems }}>
            {children}
        </CartContext.Provider>
    );
};
