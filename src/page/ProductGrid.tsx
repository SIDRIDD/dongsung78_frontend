import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import './css/ProductGrid.css';
import axios from 'axios';
import {Pagination} from "antd";
import Choice from "../components/Choice";

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
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0); // 총 제품 수를 저장할 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 저장할 상태
    const pageSize = 15; // 한 페이지당 표시할 제품 수


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

    const categoryName = products.length > 0 ? products[0].categoryName : '';

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // 페이지 변경 시 현재 페이지 업데이트
        window.scrollTo(0, 0); // 페이지 상단으로 스크롤
    };

    return (
        <div className="product-grid" style={{marginTop: '100px'}}>
            {/*<h2>{categoryName}</h2>*/}
            <Choice/>
            <div className="product-list">
                {products.map(product => (
                    <Link key={product.id} to={`/product-detail/${product.id}`} style={{textDecoration: 'none'}}>
                        <div key={product.id} className="product-grid-card">
                            <img src={`${process.env.PUBLIC_URL}/${product.imageUrl}`}
                                 alt={product.name} className="product-image"/>
                            <div className="product-info">
                                <h3 className="product-grid-name">{product.name}</h3>
                                <p className="product-grid-price">{product.price.toLocaleString()} 원</p>
                                {/*{product.salePrice ? (*/}
                                {/*    <p className="product-price">*/}
                                {/*        <span className="original-price">${product.price}</span>*/}
                                {/*        <span className="sale-price">${product.salePrice}</span>*/}
                                {/*    </p>*/}
                                {/*) : (*/}
                                {/*    <p className="product-price">${product.price}</p>*/}
                                {/*)}*/}
                                <p className="product-grid-description">{product.description}</p>
                                <button className="product-grid-button">상세 보기</button>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Pagination
                    current={currentPage}
                    total={total}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    style={{textAlign: 'center', marginTop: '20px'}}
                />
            </div>
        </div>
    );
};

export default ProductGrid;
