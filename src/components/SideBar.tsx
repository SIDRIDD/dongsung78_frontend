import React from 'react';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {Link} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '1',
        label: <Link to="/product-grid/1">분필 칠판</Link>
    },
    {
        key: '2',
        label: <Link to="/product-grid/2">화이트 보드</Link>
    },
    {
        key: '3',
        label: <Link to="/product-grid/3">물백묵 칠판</Link>

    },
    {
        key: '4',
        label: <Link to="/product-grid/4">스탠드 칠판</Link>


    },
    {
        key: '5',
        label: <Link to="/product-grid/5">게시판 | 오선 칠판 | 계획표</Link>,
        children: [
            {
                key: '5',
                label: <Link to="/product-grid/5">게시판</Link>,
            },
            {
                key: '6',
                label: <Link to="/product-grid/6">오선 칠판</Link>,
            },
            {
                key: '7',
                label: <Link to="/product-grid/7">월 계획표</Link>,
            }
        ],
    },
    {
        key: '8',
        label: <Link to="/product-grid/8">책걸상</Link>,
    },
    {
        key: '9',
        label: <Link to="/product-grid/9">분필 | 지우개</Link>,
        children: [
            {key: '9', label: <Link to="/product-grid/9">분필</Link>,},
            {key: '10', label: <Link to="/product-grid/10">지우개</Link>,},
            {key: '11', label: <Link to="/product-grid/11">지우개 털이</Link>,},
        ],
    },
    {
        key: '12',
        label: <Link to="/product-grid/12">강의대 | 교체 상판</Link>,
        children: [
            {key: '12', label: <Link to="/product-grid/12">강의대</Link>,},
            {key: '13', label: <Link to="/product-grid/13">교체 상판</Link>,}
        ],
    },
];

interface SideBarProps {
    onSelectMenu: (key: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onSelectMenu }) => {
    const onClick: MenuProps['onClick'] = (e) => {
        onSelectMenu(e.key);
    };

    return (
        <Menu onClick={onClick} style={{width: 256, alignItems: 'flex-start'}} mode="vertical" items={items}/>
    );
};


export default SideBar;