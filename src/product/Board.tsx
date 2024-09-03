import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/Board.css';
import {Pagination} from "antd";

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

interface BoardProps {
    categoryId: string;
}

const Board: React.FC<BoardProps> = ({ categoryId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 16;

    const fetchProducts = async (page: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product/get`, {
                params: {
                    categoryId: categoryId,
                    page: page - 1,
                    size: pageSize,
                },
            });
            setProducts(response.data.content);
            setTotal(response.data.totalElements);
            setLoading(false); // 로딩이 완료되면 로딩 상태를 false로 설정
        } catch (error) {
            setError('Failed to fetch products.');
            console.error(error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // 페이지 변경 시 현재 페이지 업데이트
        setLoading(true); // 새로운 페이지로 이동할 때 로딩 상태를 true로 설정
        window.scrollTo(0, 0); // 페이지 상단으로 스크롤
    };

    useEffect(() => {
        fetchProducts(currentPage); // 현재 페이지의 제품을 불러옴
    }, [categoryId, currentPage]);


    return (
        <div>
            {error && <div>{error}</div>}
            <div className="product-grid">
                {loading && !products.length ? (
                    <div>Loading...</div> // 첫 로드 시에만 로딩 메시지를 표시합니다.
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
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
                />
            </div>
        </div>
    );
};

export default Board;
