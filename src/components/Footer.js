import React from 'react';
import './css/Footer.css';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <Link to="/">홈</Link>
                <Link to="/product-grid/1">상품</Link>
                <Link to="/quote-contact">견적문의</Link>
            </div>
            <div className="contact-info">
                <p>업체명: 동성칠판교구</p>
                <p>사업자 등록 번호: 00000001111117777777    통신판매업 번호: 11111111118888888</p>
                <p>주소: ---------------------- </p>
                <p>전화: 010 - 1111 - 2222  이메일: dongsung7804@naver.com</p>
            </div>
            {/*<div className="social-media">*/}
            {/*    <a href="#facebook">Facebook</a>*/}
            {/*    <a href="#instagram">Instagram</a>*/}
            {/*</div>*/}
            {/*<div className="newsletter">*/}
            {/*    <input type="email" placeholder="이메일 입력" />*/}
            {/*    <button>문의하기</button>*/}
            {/*</div>*/}
        </footer>
    );
}

export default Footer;
