import React from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';
import ProductGrid from './page/ProductGrid';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import QuoteContact from "./page/QuoteContact";
import ProductPage from "./page/ProductPage";
import { CartProvider } from './context/CartContext';
import QuoteForm from "./page/QuoteForm";
import ItemDetail from "./page/ItemDetail";
import QuoteDetail from "./page/QuoteDetail";
import Login from "./page/Login";
import NaverCallback from "./callback/NaverCallback";
import SignUpPage from "./page/SignUpPage";


//
/**
 * 2024.07.12 메모 <우선적으로 해야할 것>
 * TODO: 1. Login 이후에 Login -> Logout 전환 안됨.
 * TODO: 2. Login 정보 저장 안됨(아마 백단 처리 안해서 그런듯) -> 로그인 이후에 상품 구매하기 기능 실행 하니까 userId = admin 으로 들어감
 * TODO: 3. kakao 로그인 연동 안됨
 * TODO: 4. Oauth 연동 관련 백단처리 필요
 * TODO: 5. 화면 줄어들었을 때 Header에 표시되는 버튼 클릭시 메뉴 바가 안닫힘
 */
function App() {
    const location = useLocation();
    const showAdditionalComponents = location.pathname === '/';

    return (
        <div className="App">
            <CartProvider>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HeroSection />} />
                        <Route path="/product-grid/:category" element={<ProductGrid />} />
                        <Route path="/quote-contact" element={<QuoteContact />} />
                        <Route path="/quote-form" element={<QuoteForm />} />
                        <Route path="/quote-detail/:id" element={<QuoteDetail />} />
                        <Route path="product-detail/:id" element={<ProductPage />} />
                        <Route path="/item-detail/:id" element={<ItemDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/" element={<NaverCallback />} />
                    </Routes>
                    {showAdditionalComponents && (
                        <>
                            <FeaturedProducts />
                            <CustomerReviews />
                        </>
                    )}
                </main>
                <Footer />
            </ CartProvider>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
