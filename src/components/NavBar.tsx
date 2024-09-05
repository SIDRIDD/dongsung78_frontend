import React, {useState} from 'react';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Button, Menu} from 'antd';
import {Link, useNavigate} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Navigation One',
        key: 'mail',
    },
    {
        label: 'Navigation Two',
        key: 'app',
        disabled: true,
    },
    {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {label: 'Option 1', key: 'setting:1'},
                    {label: 'Option 2', key: 'setting:2'},
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {label: 'Option 3', key: 'setting:3'},
                    {label: 'Option 4', key: 'setting:4'},
                ],
            },
        ],
    },
    {
        key: 'alipay',
        label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
        ),
    },
];

const NavBar: React.FC = () => {
    const [current, setCurrent] = useState('mail');
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const hadleQoute = () => {
        navigate('quote-contact');
    }

    return (
        <div style={{alignItems: 'center', display: 'flex', position: 'sticky', top:0, zIndex: 100}}>
            <div style={{marginRight: '20px', width: '256px', height: '100%', display: 'flex', justifyContent: 'center', backgroundColor: 'white'}}>
                <a>
                    <img onClick={() => navigate('/product-grid/1')} src={`${process.env.PUBLIC_URL}/img/logo_minisize.png`}
                         alt="Product"/>
                </a>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '10px 20px',
                backgroundColor: '#fff'
            }}>
                <Button onClick={hadleQoute}type="link" style={{color: 'black'}}>견적 문의 게시판</Button>
                <Button type="link" style={{color: 'black'}}>시공 사진</Button>
                <Button type="link" style={{color: 'black'}}>상품 Q&A</Button>
                <Button type="link" style={{color: 'black'}}>개인결제창</Button>
                <Button type="link" style={{color: 'black'}}>화물배송비조회</Button>
                <Button type="link" style={{color: 'black'}}>칠판수리/원자재</Button>
            </div>
        </div>
    );
};

export default NavBar;