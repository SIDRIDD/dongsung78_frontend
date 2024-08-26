import React, {useEffect, useState} from 'react';
import {Menu, Button, MenuProps, Space} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './css/NavBar.css';
import {useNavigate} from "react-router-dom";

interface Category {
    name: string;
}

const NavBar = () => {
    const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/category/get');
                const data: Category[] = await response.json();

                const items: MenuProps['items'] = data.map((item, index) => ({
                    key: String(index + 1),
                    label: (
                        <span
                            onClick={() => {
                                navigate(`/product-grid/${index + 1}`);
                            }}
                        >
                            <Space className="custom-dropdown-menu">
                                {item.name}
                            </Space>
                        </span>
                    ),
                }));

                setMenuItems(items);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="nav-container">
            <Menu mode="horizontal" className="nav-menu">
                <Menu.Item key="category" className="nav-item category">
                    <Button type="primary" icon={<MenuOutlined />} className="category-button">
                        CATEGORY
                    </Button>
                </Menu.Item>
                <Menu.Item key="customInquiry" className="nav-item">
                    칠판
                </Menu.Item>
                <Menu.Item key="sizeCustomInquiry" className="nav-item">
                    책걸상
                </Menu.Item>
                <Menu.Item key="productQA" className="nav-item">
                    기타 용품
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default NavBar;
