// import 'antd/dist/reset.css'
// import { DownOutlined, SmileOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import {Dropdown, Menu, Space} from 'antd';
// import React, {useEffect, useState} from "react";
// import './css/ProductDropDown.css';
// import {MenuItem} from "@mui/material";
//
// interface Category {
//     name: string;
// }
//
// const DynamicMenu: React.FC = () => {
//     const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/api/category/get');
//                 const data: Category[] = await response.json();
//
//                 const items: MenuProps['items'] = data.map((item, index) => ({
//                     key: String(index + 1),
//                     label: (
//                         <a target="_blank" rel="noopener noreferrer">
//                             <Space className="custom-dropdown-menu">
//                                 {item.name}
//                             </Space>
//
//                         </a>
//                     ),
//                 }));
//
//                 setMenuItems(items);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     return (
//         <Dropdown menu={{ items: menuItems }} >
//             <a onClick={(e) => e.preventDefault()}>
//                 <Space style={{ color: 'black', marginRight: '20px'}}>
//                     상품
//                     <DownOutlined style={{ marginTop: '7px'}}  />
//                 </Space>
//             </a>
//         </Dropdown>
//     );
// };
//
// const App: React.FC = () => (
//     <DynamicMenu />
// );
//
// export default App;

import React, { useEffect, useState } from 'react';
import {Dropdown, Menu, MenuProps, Space} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './css/ProductDropDown.css';
import { useNavigate } from 'react-router-dom';

interface Category {
    name: string;
}

interface ProductDropDownProps {
    navigate: ReturnType<typeof useNavigate>;
}

const ProductDropDown: React.FC<ProductDropDownProps> = ({ navigate}) => {
    const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);

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
        <Dropdown overlay={<Menu items={menuItems} />}>
            <a onClick={(e) => e.preventDefault()}>
                <Space style={{ color: 'black', marginRight: '20px' }}>
                    상품
                    <DownOutlined style={{ marginTop: '7px' }} />
                </Space>
            </a>
        </Dropdown>
    );
};

export default ProductDropDown;

