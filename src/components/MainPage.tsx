import React, { useState } from 'react';
import Sidebar from './SideBar';
import Content from './Content';
import {useDispatch} from "react-redux";
import { setSelectedMenuKey } from '../store/MenuSlice';
import {Outlet} from "react-router-dom";

const MainPage: React.FC = () => {
    const dispatch = useDispatch();

    const handleMenuSelect = (key: string) => {
        dispatch(setSelectedMenuKey(key));
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar onSelectMenu={handleMenuSelect} /> {/* SideBar 컴포넌트 */}
            <div style={{ flex: 1, padding: '16px' }}>
                {/*<Content /> /!* Content 컴포넌트 *!/*/}
                <Outlet />
            </div>
        </div>
    );
};

export default MainPage;
