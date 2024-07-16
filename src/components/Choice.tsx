import React from 'react';
import { Breadcrumb } from 'antd';
import {Link, useLocation} from "react-router-dom";
import './css/Choice.css';

const Choice: React.FC = () => {
    const location = useLocation();

    const getClassName = (path: string) => {
        return location.pathname.includes(path) ? 'active' : '';
    };

    return (
        <div className="breadcrumb-container">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item>
                    <Link to="/product-grid/1" className={getClassName('/product-grid/1')}>칠판</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/product-grid/2" className={getClassName('/product-grid/2')}>책걸상</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/product-grid/3" className={getClassName('/product-grid/3')}>기타용품</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export default Choice;