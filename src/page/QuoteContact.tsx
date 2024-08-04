import React, { useState, useEffect } from 'react';
import {List, Space, Card, Typography, Button, message} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

type PaginationPosition = 'top' | 'bottom' | 'both';
type PaginationAlign = 'start' | 'center' | 'end';

interface DataItem {
    id: number;
    title: string;
    description?: string;
    status:string;

    userId: string;
}

const { Title } = Typography;

const positionOptions: PaginationPosition[] = ['top', 'bottom', 'both'];
const alignOptions: PaginationAlign[] = ['start', 'center', 'end'];

const QuoteContact: React.FC = () => {
    const [position, setPosition] = useState<PaginationPosition>('bottom');
    const [align, setAlign] = useState<PaginationAlign>('center');
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const userName = useSelector((state: RootState) => state.auth.user?.userName);


    useEffect(() => {
        // 데이터베이스에서 데이터를 가져오는 함수
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get< {content:DataItem[]}>(`http://localhost:8080/api/contact/getall`);
                setData(response.data.content);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleShowForm = () => {

        if(userName) {
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '100px'}}>
                    <Button type="primary" onClick={handleShowForm}>
                        문의 글 작성하기
                    </Button>
                </div>
                <List
                    loading={loading}
                    pagination={{ position, align }}
                    style={{ width: '50%', margin: '0 auto', textAlign: 'left' }}
                    //dataSource={data.filter(item => item.status === 'ACTIVE')} // ACTIVE 상태인 아이템만 표시
                    dataSource={data}
                    renderItem={(data) => (
                        <List.Item >
                            <List.Item.Meta
                                title={<a onClick={() => handleItemClick(data.id)}>{data.title}</a>}
                                description={data.description}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </Space>
    );
};

export default QuoteContact;
