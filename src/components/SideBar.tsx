import React from 'react';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '1',
        label: '분필 칠판'
    },
    {
        key: '2',
        label: '화이트 보드'
    },
    {
        key: '3',
        label: '물백묵 칠판'
    },
    {
        key: '4',
        label: '스탠드 칠판'
    },
    {
        key: '5',
        label: '게시판 | 오선 칠판 | 계획표',
        children: [
            {
                key: '5',
                label: '게시판'
            },
            {
                key: '6',
                label: '오선 칠판'
            },
            {
                key: '7',
                label: '월 계획표'
            }
        ],
    },
    {
        key: '8',
        label: '책걸상'
    },
    {
        key: '9',
        label: '분필 | 지우개',
        children: [
            {key: '9', label: '분필'},
            {key: '10', label: '지우개'},
            {key: '11', label: '지우개 털이'},
        ],
    },
    {
        key: '12',
        label: '강의대 | 교체 상판',
        children: [
            {key: '12', label: '강의대'},
            {key: '13', label: '교체 상판'}
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