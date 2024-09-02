import React from 'react';
import ProductGrid from "../page/ProductGrid";
import {useNavigate} from "react-router-dom";

// 임의의 컴포넌트 예시
const ProductPage = () => <div>상품 페이지</div>;
const NoticeBoard = () => <div>게시판</div>;
const ChalkBoard = () => <div>분필 칠판</div>;

const WhiteBoard = () => <div>화이트 칠판</div>

interface ContentProps {
    selectedMenuKey: string;
}

const Content: React.FC<ContentProps> = ({ selectedMenuKey }) => {
    const navigate = useNavigate();
    let content;

    switch (selectedMenuKey) {
        case '1':
            // content = <ProductGrid />;
            content = <ChalkBoard />;
            break;
        case '2':
            content = <WhiteBoard />;
            break;
        case '5-1':
            content = <NoticeBoard />;
            break;
        // 추가적인 case로 컴포넌트를 매핑
        default:
            content = <div>콘텐츠를 선택하세요</div>;
    }

    return (
        <div style={{ flex: 1, padding: '16px' }}>
            {content}
        </div>
    );
};

export default Content;
