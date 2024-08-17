import React, { useState, useEffect } from 'react';
import { List, Space, Card, Typography, Button, message, Pagination } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface DataItem {
    id: number;
    title: string;
    description?: string;
    status: string;
    userId: string;
}

const { Title } = Typography;

const QuoteContact: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const pageSize = 10; // 한 페이지당 표시할 항목 수
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const fetchData = async (page: number) => {
        setLoading(true);
        try {
            const response = await axios.get<{ content: DataItem[], totalElements: number }>(
                `http://localhost:8080/api/contact/getall`,
                {
                    params: {
                        page: page - 1, // API는 0부터 시작하므로 page-1
                        size: pageSize
                    }
                }
            );
            setData(response.data.content);
            setTotalItems(response.data.totalElements);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // 페이지 변경 시 상단으로 스크롤
    };

    const handleShowForm = () => {
        if (isLoggedIn) {
            navigate('/quote-form');
        } else {
            navigate('/login');
            message.warning('문의 글 작성을 위해 로그인이 필요합니다.');
        }
    };

    const handleItemClick = (id: number) => {
        navigate(`/quote-detail/${id}`);
    };

    return (
        <Space direction="vertical" size="large" style={{ display: 'flex', marginTop: '150px' }}>
            <Card
                title={<Title level={2} style={{ margin: 0 }}>견적 문의</Title>}
                size="small"
                style={{ height: '100%' }}
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '100px' }}>
                    <Button type="primary" onClick={handleShowForm}>
                        문의 글 작성하기
                    </Button>
                </div>
                <List
                    loading={loading}
                    style={{ width: '50%', margin: '0 auto', textAlign: 'left' }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a onClick={() => handleItemClick(item.id)}>{item.title}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Pagination
                        current={currentPage}
                        total={totalItems}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </div>
            </Card>
        </Space>
    );
};

export default QuoteContact;
