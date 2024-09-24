import React, { useState, useEffect } from 'react';
import {Space, Card, Typography, Pagination, Table} from 'antd';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';



interface DataItem {
    constructionId: number;

    title: string;
    companyCode: number;
    categoryName: string;

    companyName: string;

    userName: string;

    insertDt: string;

    details: Detail;

}
interface Detail{
    companyDetail: string;

    companyDescription: string;

    img_url: string;
}


const { Title } = Typography;

const QuoteContact: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const pageSize = 10; // 한 페이지당 표시할 항목 수
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const constructionListUrl = process.env.REACT_APP_API_CONSTRUCTION_LIST;


    useEffect(() => {
        const fetchData = async (page: number) => {
            setLoading(true);
            try {
                const response = await axios.get<{ content: DataItem[], totalElements: number }>(
                    `${apiUrl}${constructionListUrl}`,
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

        fetchData(currentPage);
    }, [currentPage, apiUrl, constructionListUrl]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // 페이지 변경 시 상단으로 스크롤
    };


    const handleItemClick = (item: DataItem) => {
        navigate(`/construction-detail/${item.constructionId}`);
    };

    const columns = [
        {
            title: '제목',
            key: 'title',
            render: (text: string, item: DataItem) => (
                // <a onClick={() => handleItemClick(item)}>
                //     {`${item.companyName} ${item.categoryName} 시공 사진`}
                // </a>
                <button onClick={() => handleItemClick(item)} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    {`${item.companyName} ${item.categoryName} 시공 사진`}
                </button>
            ),
        },
        {
            title: '작성자',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '작성일자',
            dataIndex: 'insertDt',
            key: 'insertDt',
        },
    ];

    return (
        <Space direction="vertical" size="large" style={{ display: 'flex'}}>
            <Card
                title={<Title level={2} style={{ display: 'flex', fontFamily: 'PaperlogyBold' }}>시공 사진</Title>}
                size="small"
                style={{ height: '100%', border: '1px solid transparent' }}
            >
                <Table
                    columns={columns}
                    dataSource={data}
                    size="small"
                    loading={loading}
                    rowKey="id"
                    pagination={false}
                    style={{ width: '100%', margin: '0 auto', textAlign: 'left' }}
                />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
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
