import React from 'react';
import Sidebar from '../components/SideBar';
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
            <Sidebar onSelectMenu={handleMenuSelect} />
            <div style={{ flex: 1, padding: '16px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainPage;
