import React, { useState } from 'react';
import Sidebar from './SideBar'; // SideBar 경로에 맞게 수정
import Content from './Content'; // Content 경로에 맞게 수정

const MainPage: React.FC = () => {
    const [selectedMenuKey, setSelectedMenuKey] = useState<string>(''); // 선택된 메뉴 상태

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar onSelectMenu={setSelectedMenuKey} /> {/* SideBar 컴포넌트 */}
            <div style={{ flex: 1, padding: '16px' }}>
                <Content selectedMenuKey={selectedMenuKey} /> {/* Content 컴포넌트 */}
            </div>
        </div>
    );
};

export default MainPage;
