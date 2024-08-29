import React from 'react';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: '분필 칠판'
    },
    {
        key: 'sub2',
        label: '화이트 보드'
    },
    {
        key: 'sub3',
        label: '물백묵 칠판'
    },
    {
        key: 'sub4',
        label: '스탠드 칠판'
    },
    {
        key: 'sub5',
        label: '게시판 | 계획표',
        children: [
            {
                key: '5-1',
                label: '게시판'
            },
            {
                key: '5-2',
                label: '오선 칠판 | 월 계획표',
                type: 'group',
                children: [
                    {key: '1', label: '오선 칠판'},
                    {key: '2', label: '월 계획표'},
                ],
            },
        ],
    },
    {
        key: 'sub6',
        label: '책걸상'
    },
    {
        key: 'sub7',
        label: '분필 | 지우개',
        children: [
            {key: '1', label: '분필'},
            {key: '2', label: '지우개'},
            {key: '3', label: '지우개 털이'},
            {key: '4', label: '물백묵 리필잉크'},
        ],
    },
    {
        key: 'sub8',
        label: '강의대 | 교체 상판',
        children: [
            {key: '1', label: '강의대'},
            {key: '2', label: '교체 상판'}
        ],
    },
];


const SideBar: React.FC = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };
    return (
        <Menu onClick={onClick} style={{width: 256, alignItems: 'flex-start'}} mode="vertical" items={items}/>
    );
};


export default SideBar;