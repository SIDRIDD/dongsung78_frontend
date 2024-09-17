import React from 'react';
import {Button} from 'antd';
import {useNavigate} from "react-router-dom";


const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const minisizeLogo = process.env.REACT_APP_MINISIZE_LOGO;

    const hadleQoute = () => {
        navigate('quote-contact');
    }
    const handleConstruction = () => {
        navigate('/construction');
    }

    function handleProduct() {
        navigate('/product-grid/0');
    }

    return (
        <div style={{alignItems: 'center', display: 'flex', position: 'sticky', top: 0, zIndex: 100}}>
            <div style={{
                height: '53px',
                alignItems: 'stretch',
                border: 'contain',
                cursor: 'pointer',
                marginRight: '20px',
                width: '256px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'white'
            }}>
                <a>
                    <img onClick={() => navigate('/product-grid/1')}
                         src={`${process.env.PUBLIC_URL}${minisizeLogo}`}
                         alt="Product"/>
                </a>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '10px 20px',
                backgroundColor: '#fff',
            }}>
                <Button onClick={handleProduct} type="link" style={{fontFamily: 'PaperlogyBold', color: 'black'}}>전체
                    상품</Button>
                <Button onClick={hadleQoute} type="link" style={{fontFamily: 'PaperlogyBold', color: 'black'}}>견적 문의
                    게시판</Button>
                <Button onClick={handleConstruction} type="link" style={{fontFamily: 'PaperlogyBold', color: 'black'}}>시공
                    사진</Button>
                <Button disabled={true} type="link"
                        style={{fontFamily: 'PaperlogyBold', color: 'black', width: '150px', height: '40px'}}> </Button>
                <Button disabled={true} type="link"
                        style={{fontFamily: 'PaperlogyBold', color: 'black', width: '150px', height: '40px'}}> </Button>
                <Button disabled={true} type="link"
                        style={{fontFamily: 'PaperlogyBold', color: 'black', width: '150px', height: '40px'}}> </Button>
            </div>
        </div>
    );
};

export default NavBar;