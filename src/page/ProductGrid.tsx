import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import './css/ProductGrid.css';
import axios from 'axios';
import {Button, Col, Divider, Grid, Pagination, Row, Space} from "antd";

interface Product {

    id: number;

    name: string;

    description: string;

    price: number;

    stock: number;
    imageUrl: string;

    categoryName: string;

    priority: number;
}

//TODO: 그리드 각 card의 균형이 안맞음, 사진 크기가 다를 경우에 -> 하나로 통일 해야함 이전에 한거 있는데 찾을 수가 없음

const ProductGrid: React.FC = () => {
    const {category} = useParams<{ category: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0); // 총 제품 수를 저장할 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 저장할 상태
    const pageSize = 16; // 한 페이지당 표시할 제품 수
    const navigate = useNavigate();


    const fetchProducts = async (page: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product/get?categoryId=${category}&page=${page - 1}&size=${pageSize}`);
            setProducts(response.data.content);
            setTotal(response.data.totalElements); // 총 제품 수 설정

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        setCurrentPage(1); // 카테고리가 변경될 때 현재 페이지를 1로 설정
    }, [category]);

    useEffect(() => {
        fetchProducts(currentPage); // 현재 페이지의 제품을 불러옴
    }, [category, currentPage]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page); // 페이지 변경 시 현재 페이지 업데이트
        window.scrollTo(0, 0); // 페이지 상단으로 스크롤
    };

    function handleProduct(productId: number) {
        navigate(`/product-grid/${category}/${productId}`);
    }
    const categoryMenus = [
        "전체",
        "분필칠판",
        "화이트 보드",
        "물백묵 칠판",
        "스탠드 칠판",
        "게시판",
        "오선 칠판",
        "계획표",
        "책걸상",
        "분필",
        "지우개",
        "지우개 털이",
        "강의대",
        "교체 상판",

        // ... 추가적인 카테고리 이름들
    ];

    const handleCategoryButton = (categoryId : number) => {
        navigate(`/product-grid/${categoryId}`)
    }

    const categoryIndex = Number(category); // useParams는 string을 반환하므로 숫자로 변환
    const categoryMenu = categoryIndex >= 0 && categoryIndex < categoryMenus.length ? categoryMenus[categoryIndex] : "전체";

    return (
        <div>
            {error && <div>{error}</div>}
            <Divider orientation="left" style={{ fontSize: '20px', fontFamily: 'PaperlogyBold' }}>{categoryMenu} ({total})</Divider>
            <Space size={[8, 16]} wrap>
                {categoryMenus.map((categoryMenu, index) => (
                    <Button key={index} onClick={() => handleCategoryButton(index)}>
                        {categoryMenu}
                    </Button>
                ))}
            </Space>
            <div className="product-grid">
                {loading && !products.length ? (
                    <div>Loading...</div> // 첫 로드 시에만 로딩 메시지를 표시합니다.
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="product-card" onClick={() => handleProduct(product.id)}
                        style={{ cursor: 'pointer' }}>
                            <img src={`${process.env.PUBLIC_URL}/${product.imageUrl}`} alt={product.name}
                                 className="product-image"/>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <span>{product.price.toLocaleString()} 원</span>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                <Pagination
                    current={currentPage}
                    total={total}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false} 
                    showLessItems={false}
                />
            </div>
        </div>
    );
};

export default ProductGrid;
