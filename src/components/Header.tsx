import React, {useState, useEffect} from 'react';
import './css/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDropDown from './ProductDropDown';
import {Button, Input} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import DrawerComponent from './DrawerComponent';
import {useCart} from '../context/CartContext';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store/store';
import {login, logout} from '../store/authSlice';
import axios from "axios";

const Header: React.FC = () => {
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const {cartItems, drawerVisible, setDrawerVisible} = useCart();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const dispatch: AppDispatch = useDispatch();


    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const toggleDrawer = () => {
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
        dispatch(logout());
        navigate('/');
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/check', {
                    withCredentials: true // 쿠키를 포함
                });
                console.log("/check 동작");

                if (response.status === 200) {
                    const data = response.data;
                    console.log("Authenticated:", data);
                    // 토큰과 사용자 정보를 Redux 상태로 업데이트
                    dispatch(login({token: data.token, user: {email: data.email, userName: data.userName}}));
                } else {
                    console.log("Not authenticated or invalid token");
                }
            } catch (error) {
                console.error("Failed to fetch:", error);
            }
        };

        checkLoginStatus();
    }, [dispatch]);


    console.log('Is Logged In:', isLoggedIn); // 디버깅을 위한 로그 추가

    return (
        <Navbar expand="lg" className="navbar-dark bg-custom w-100">
            <Container style={{padding: 0, width: '100%'}}>
                <Navbar.Brand as={Link} to={"/"}>
                    <img src={`${process.env.PUBLIC_URL}/img/logo_minisize.png`} alt="Company Logo" className="logo"/>
                </Navbar.Brand>
                <Navbar.Toggle style={{backgroundColor: 'black'}} aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/"} style={{color: 'black', marginRight: '30px'}}>Home</Nav.Link>
                        <Nav.Link href="#action" style={{marginRight: '30px', marginLeft: '30px'}}>
                            <ProductDropDown navigate={navigate}/>
                        </Nav.Link>
                        <Nav.Link as={Link} to={"/quote-contact"} style={{color: 'black'}}>견적문의</Nav.Link>
                    </Nav>
                    <div className="cart-icon">
                        <span role="img" aria-label="cart" onClick={toggleDrawer}>🛒</span>
                        <span className="cart-count d-flex align-items-center ms-auto"
                              style={{color: 'black'}}>{cartItems.length}</span>
                    </div>
                    {isLoggedIn ? (
                        <Button onClick={handleLogout} style={{
                            color: 'black',
                            backgroundColor: 'transparent',
                            border: 'none',
                            marginLeft: '20px'
                        }}>
                            Logout
                        </Button>
                    ) : (
                        <Button onClick={() => navigate('/login')} style={{
                            color: 'black',
                            backgroundColor: 'transparent',
                            border: 'none',
                            marginLeft: '20px'
                        }}>
                            Login
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
            <DrawerComponent visible={drawerVisible} onClose={onClose} items={cartItems}/>
        </Navbar>
    );
};

export default Header;
