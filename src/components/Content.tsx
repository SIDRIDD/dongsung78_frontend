import React, {useEffect} from 'react';
import Board from '../product/Board'; // Board 컴포넌트 임포트
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import QuoteContact from "../page/QuoteContact";
import QuoteDetail from "../page/QuoteDetail";


const Content: React.FC = () => {
    const selectedMenuKey = useSelector((state: RootState) => state.menu.selectedMenuKey);
    const selectedItemId = useSelector((state: RootState) => state.menu.selectedItemId);
    let content;

    switch (selectedMenuKey) {
        case '1':
            content = <Board categoryId="1" />; // Board 컴포넌트로 categoryId 전달
            break;
        case '2':
            content = <Board categoryId="2" />; // WhiteBoard를 렌더링하는 대신 Board 사용
            break;
        case '3':
            content = <Board categoryId="3" />; // 물백묵 칠판
            break;
        case '4':
            content = <Board categoryId="4" />; // 스탠드 칠판
            break;
        case '5':
            content = <Board categoryId="5" />; // 게시판
            break;
        case '6':
            content = <Board categoryId="6" />; // 오선 칠판
            break;
        case '7':
            content = <Board categoryId="7" />; // 월 계획표
            break;
        case '8':
            content = <Board categoryId="8" />; // 책걸상
            break;
        case '9':
            content = <Board categoryId="9" />; // 분필
            break;
        case '10':
            content = <Board categoryId="10" />; // 지우개
            break;
        case '11':
            content = <Board categoryId="11" />; // 지우개 털이
            break;
        case '12':
            content = <Board categoryId="12" />; // 강의대
            break;
        case '13':
            content = <Board categoryId="13" />; // 교체 상판
            break;
        case '100':
            content = <QuoteContact/>;
            break;
        case '101':
            console.log('selectedMenuKey: ' + selectedMenuKey);
            content = <QuoteDetail itemId={selectedItemId} />;
            break;
        default:
            content = <Board categoryId="1" />;
    }

    return (
        <div style={{ flex: 1, padding: '16px' }}>
            {content}
        </div>
    );
};

export default Content;
