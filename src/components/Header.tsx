import React from 'react';
import './css/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input, message} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import DrawerComponent from './DrawerComponent';
import {useCart} from '../context/CartContext';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import {logout} from '../store/authSlice';
import axios from "axios";
import {setSelectedMenuKey} from "../store/MenuSlice";

const Header: React.FC = () => {
    const {cartItems, drawerVisible, setDrawerVisible} = useCart();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const toggleDrawer = () => {
        console.log('토클');
        setDrawerVisible(!drawerVisible);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        sessionStorage.setItem('cartKinds', '0');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        axios.post(`${apiUrl}/api/user/logout`, {}, {
            withCredentials: true // 쿠키를 전송하기 위해 설정
        })
            .then(response => {
                // 성공 시 로그아웃 처리 후 페이지 이동
                message.success("로그아웃 되었습니다.");
                dispatch(logout());
                navigate('/product-grid/1');
            })
            .catch(error => {
                // 오류 처리
                console.error("Logout failed", error);
            });

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


    return (
        <div className="header">
            <Navbar expand="lg" className="navbar-dark bg-custom w-100 py-1" style={{
                fontSize: '0.7rem',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: '1px solid #ddd'
            }}>
                <Container style={{display: 'flex', justifyContent: 'center', maxWidth: '1200px'}}>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/product-grid/1" style={{color: '#666'}}>홈</Nav.Link>
                        <Nav.Link onClick={() => handleNavigate('100')} style={{color: '#666'}}>견적문의</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto" style={{alignItems: 'center'}}>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link onClick={handleLogout} style={{
                                    color: '#666',
                                    marginRight: '15px',
                                    cursor: 'pointer'
                                }}>로그아웃</Nav.Link>
                                <Nav.Link as={Link} to="/update-user"
                                          style={{color: '#666', marginRight: '15px'}}>마이페이지</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login"
                                          style={{color: '#666', marginRight: '15px'}}>로그인</Nav.Link>
                                <Nav.Link as={Link} to="/signup"
                                          style={{color: '#666', marginRight: '15px'}}>회원가입</Nav.Link>
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
                <DrawerComponent visible={drawerVisible} onClose={onClose} items={cartItems}/>
            </Navbar>
        </div>
    );
};

export default Header;
