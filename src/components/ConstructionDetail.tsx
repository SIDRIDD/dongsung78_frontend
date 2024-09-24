import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Card, Typography, Space, Avatar} from 'antd';
import axios from 'axios';
import {UserOutlined} from "@ant-design/icons";

const {Title, Text, Paragraph} = Typography;

interface DataItem {
    constructionId: number;

    title: string;
    categoryName: string;

    companyName: string;

    insertDate: string;

    userName: string;

    details: Detail[];

}
interface Detail{
    companyDetail: string;

    companyDescription: string;

    img_url: string;
}

const QuoteDetail: React.FC = () => {
    const {id} = useParams();
    const [data, setData] = useState<DataItem | null>(( null));
    const [loading, setLoading] = useState<boolean>(false);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const constructionDetailUrl = process.env.REACT_APP_API_CONSTRUCTION_DETAIL;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<DataItem>(`${apiUrl}${constructionDetailUrl}?id=${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, [id, apiUrl]);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card className="post-container">
                <Title level={3} className="post-title">{data.title}</Title>
                <Space direction="vertical" size="middle" className="post-header">
                    <Space align="center">
                        <Avatar size="large" icon={<UserOutlined/>}/>
                        <div>
                            <Text className="post-id">{data.userName}</Text>
                            <Text className="post-date">{data.insertDate}</Text>
                        </div>
                    </Space>
                </Space>
                {data.details.map((detail, index) => (
                    <div key={index} style={{ marginTop: '20px', textAlign: 'left' }}>
                        <Paragraph>
                            {detail.companyDetail} - {detail.companyDescription}
                        </Paragraph>
                        <img src={`${process.env.PUBLIC_URL}/${detail.img_url}`} alt={detail.companyDescription} style={{ width: '100%', marginTop: '10px' }} />
                    </div>
                ))}
                <div className="post-reactions">
                    <Space size="middle">
                    </Space>
                </div>
            </Card>
        </div>

    );
};

export default QuoteDetail;
