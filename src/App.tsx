import React, {useEffect, useState} from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ProductGrid from './page/ProductGrid';
import {BrowserRouter as Router, Route, Routes, useLocation, Navigate, useNavigate} from 'react-router-dom';
import QuoteContact from "./page/QuoteContact";
import ProductPage from "./page/ProductPage";
import {CartProvider} from './context/CartContext';
import QuoteForm from "./page/QuoteForm";
import ItemDetail from "./page/ItemDetail";
import QuoteDetail from "./page/QuoteDetail";
import Login from "./page/Login";
import OauthCallback from "./callback/OauthCallback";
import SignUpPage from "./page/SignUpPage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store";
import axios from "axios";
import {login, logout} from "./store/authSlice";
import KakaoId from "./components/KakaoId";
import Delivery from "./components/Delivery";
import NavBar from "./components/NavBar";
import MainPage from "./components/MainPage";
import Construction from "./components/Construction";
import ConstructionDetail from "./components/ConstructionDetail";
import UpdateUserPage from "./components/UpdateUserPage";



function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = () => {
            const apiUrl = process.env.REACT_APP_API_BASE_URL;
            axios.get(`${apiUrl}/api/user/refresh-check`, { withCredentials: true })
                .then(response => {
                    if (response.status === 200) {
                        dispatch(login());
                    } else {
                        dispatch(logout());
                    }
                })
                .catch(() => {
                    dispatch(logout());
                });
        };

        // 컴포넌트가 마운트될 때 한 번 호출
        fetchData();

        // 14분마다 fetchData 함수 호출
        const interval = setInterval(() => {
            fetchData();
        }, 14 * 60 * 1000); // 14분을 밀리초로 변환

        // 컴포넌트 언마운트 시 setInterval 정리
        return () => clearInterval(interval);
    }, [dispatch]);
    return (
        <div className="App">
            <CartProvider>
                <Header/>
                <div className="App_sub">
                    <HeroSection/>
                    <NavBar/>
                    <div className="main-content">
                        <main>
                            <Routes>
                                <Route path="/" element={<Navigate to="/product-grid/0" />} />
                                <Route path="/" element={<MainPage/>}>
                                    <Route path="/product-grid/:category" element={<ProductGrid/>}/>
                                    <Route path="/product-grid/:category/:productId" element={<ProductPage/>}/>
                                    <Route path="/quote-contact" element={<QuoteContact/>}/>
                                    <Route path="/quote-form/:contactType/:typeId" element={<QuoteForm/>}/>
                                    <Route path="/quote-detail/:itemId" element={<QuoteDetail />}/>
                                    <Route path="/item-detail/:id" element={<ItemDetail/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/signup" element={<SignUpPage/>}/>
                                    <Route path="/oauth-login-success/:userName" element={<OauthCallback/>}/>
                                    <Route path="/kakaoid" element={<KakaoId/>}/>
                                    <Route path="/delivery" element={<Delivery/>}/>
                                    <Route path="/construction" element={<Construction />}/>
                                    <Route path="/construction-detail/:id" element={<ConstructionDetail/>}/>
                                    <Route path="/update-user" element={<UpdateUserPage/>}/>
                                </Route>
                            </Routes>
                        </main>
                    </div>
                </div>
                <Footer/>
            </ CartProvider>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App/>
        </Router>
    );
}
