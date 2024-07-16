// src/page/ItemDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Card, Typography, Spin, Descriptions, Table} from 'antd';
import axios from 'axios';

interface DataItem {
    id: number;
    title: string;
    description?: string;
    userId: string;
    createdAt: string;
}

const { Title, Paragraph, Text } = Typography;

const ItemDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<DataItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            try {
                const response = await axios.get<DataItem>(`http://localhost:8080/api/contact/get/${ id }`);
                console.log('Response data:', response.data);
                setItem(response.data);
                console.log("확인: " +response.data.id);
            } catch (error) {
                console.error('Failed to fetch item:', error);
            }
            setLoading(false);
        };
        fetchItem();
    }, [id]);

    if (loading) {
        return <Spin />;
    }

    if (!item) {
        return <div>Item not found</div>;
    }

    const items = [
        {
            key: '1',
            label: 'Title',
            children: item.title,
        },
        {
            key: '2',
            label: 'User ID',
            children: item.userId,
        },
        {
            key: '3',
            label: 'Created At',
            children: item.createdAt ? new Date(item.createdAt).toLocaleString() : '작성일 정보 없음',
        },
        // {
        //     key: '1',
        //     label: 'Description',
        //     children: <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.description || 'N/A'}</span>,
        // },
    ];

    return (
        <Card style={{ marginTop: '150px' }}>
            {/*<Table*/}
            {/*    style={{ marginTop: 8 }}*/}
            {/*    columns={[*/}
            {/*        { title: `제목: ${item.title}`, dataIndex: 'name', key: 'name'},*/}
            {/*        { title: `작성자: ${item.userId}`, dataIndex: 'age', key: 'age' }*/}
            {/*    ]}*/}
            {/*/>*/}
            <Title level={2} style={{ marginBottom: '24px', textAlign: 'left'}}>{`제목 : ${item.title}`}</Title>
            <p style={{ textAlign: 'left', width: '70%' }}>------------------------------------------------------------------------------------------------</p>
            <Descriptions layout="vertical"  items={items} />
            <Title level={3} style={{ marginBottom: '15px', textAlign: 'left'}}>{`${item.description}`}</Title>

        </Card>
    );
};

export default ItemDetail;
