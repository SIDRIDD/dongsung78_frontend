import React, {useState, useEffect} from 'react';
import './css/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Input} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import DrawerComponent from './DrawerComponent';
import {useCart} from '../context/CartContext';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store/store';
import {login, logout} from '../store/authSlice';
import axios from "axios";
import Cookies from "js-cookie";
import {setSelectedMenuKey} from "../store/MenuSlice";

const Header: React.FC = () => {
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const {cartItems, drawerVisible, setDrawerVisible} = useCart();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const cartKinds = sessionStorage.getItem('cartKinds');

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const toggleDrawer = () => {
        console.log('토클');
        setDrawerVisible(!drawerVisible);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    const {Search} = Input;

    const onSearch = (value: string) => {
        setSearchVisible(!searchVisible);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        sessionStorage.setItem('cartKinds', '0');
        dispatch(logout());
        navigate('/product-grid/1');
    };

    const handleLogin = () => {
        sessionStorage.setItem('cartKinds', '0');
        navigate('/login');
    }

    const handleNavigate = (key: string) => {
        dispatch(setSelectedMenuKey(key)); // Redux 상태 업데이트
        navigate('/quote-contact'); // 페이지 이동
    };

    console.log('Is Logged In:', isLoggedIn); // 디버깅을 위한 로그 추가

    return (
        <Navbar expand="lg" className="navbar-dark bg-custom w-100 py-1" style={{ fontSize: '0.7rem', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
            <Container style={{ display: 'flex', justifyContent: 'center', maxWidth: '1200px' }}>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/product-grid/1" style={{ color: '#666' }}>홈</Nav.Link>
                    <Nav.Link onClick={() => handleNavigate('100')} style={{ color: '#666' }}>견적문의</Nav.Link>
                </Nav>
                <Nav className="ms-auto" style={{ alignItems: 'center' }}>
                    {isLoggedIn ? (
                        <>
                            <Nav.Link as={Link} to="/update-user" style={{ color: '#666', marginRight: '15px' }}>마이페이지</Nav.Link>
                            <Nav.Link onClick={handleLogout} style={{ color: '#666', marginRight: '15px', cursor: 'pointer' }}>로그아웃</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login" style={{ color: '#666', marginRight: '15px' }}>로그인</Nav.Link>
                            <Nav.Link as={Link} to="/signup" style={{ color: '#666', marginRight: '15px' }}>회원가입</Nav.Link>
                        </>
                    )}
                    <span
                        style={{
                            color: '#666',
                            marginRight: '15px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            height: '100%',
                            lineHeight: 'inherit',
                            padding: '0.5rem 1rem',
                            textDecoration: 'none'
                        }}
                        onClick={toggleDrawer}
                    >
                        장바구니
                    </span>
                </Nav>
            </Container>
            <DrawerComponent visible={drawerVisible} onClose={onClose} items={cartItems} />
        </Navbar>

        // <Navbar expand="lg" className="navbar-dark bg-custom w-100">
        //     <Container style={{padding: 0, width: '100%'}}>
        //         <Navbar.Brand as={Link} to={"/"}>
        //             <img src={`${process.env.PUBLIC_URL}/img/logo_minisize.png`} alt="Company Logo" className="logo"/>
        //         </Navbar.Brand>
        //         <Navbar.Toggle style={{backgroundColor: 'black'}} aria-controls="basic-navbar-nav"/>
        //         <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        //             <Nav className="me-auto">
        //                 <Nav.Link as={Link} to={"/"} style={{color: 'black', marginRight: '30px'}}>Home</Nav.Link>
        //                 <Nav.Link href="#action" style={{marginRight: '30px', marginLeft: '30px'}}>
        //                     <ProductDropDown navigate={navigate}/>
        //                 </Nav.Link>
        //                 <Nav.Link as={Link} to={"/quote-contact"} style={{color: 'black'}}>견적문의</Nav.Link>
        //             </Nav>
        //             <div className="cart-icon">
        //                 <span role="img" aria-label="cart" onClick={toggleDrawer}>🛒</span>
        //                 <span className="cart-count d-flex align-items-center ms-auto"
        //                       style={{color: 'black'}}>{cartKinds}</span>
        //             </div>
        //             {isLoggedIn ? (
        //                 <Button onClick={handleLogout} style={{
        //                     color: 'black',
        //                     backgroundColor: 'transparent',
        //                     border: 'none',
        //                     marginLeft: '20px'
        //                 }}>
        //                     Logout
        //                 </Button>
        //             ) : (
        //                 <Button onClick={handleLogin} style={{
        //                     color: 'black',
        //                     backgroundColor: 'transparent',
        //                     border: 'none',
        //                     marginLeft: '20px'
        //                 }}>
        //                     Login
        //                 </Button>
        //             )}
        //         </Navbar.Collapse>
        //     </Container>
        //     <DrawerComponent visible={drawerVisible} onClose={onClose} items={cartItems}/>
        // </Navbar>
    );
};

export default Header;
