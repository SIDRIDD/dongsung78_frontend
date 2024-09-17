import React from 'react';
import './css/Footer.css';
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    const companyName = process.env.REACT_APP_COMPANY_NAME;
    const businessRegistrationNumber = process.env.REACT_APP_BUSINESS_REGISTRATION_NUMBER;
    const communicationSalesNumber = process.env.REACT_APP_COMMUNICATION_SALES_NUMBER;
    const address = process.env.REACT_APP_ADDRESS;
    const phone = process.env.REACT_APP_PHONE;
    const email = process.env.REACT_APP_EMAIL;

    return (
        <footer className="footer">
            <div className="footer-links">
                <Link to="/">홈</Link>
                <Link to="/product-grid/1">상품</Link>
                <Link to="/quote-contact">견적문의</Link>
            </div>
            <div className="contact-info">
                <p>업체명: {companyName}</p>
                <p>사업자 등록 번호: {businessRegistrationNumber}    통신판매업 번호: {communicationSalesNumber}</p>
                <p>주소: {address}</p>
                <p>전화: {phone}  이메일: {email}</p>
            </div>
        </footer>
    );
}

export default Footer;
