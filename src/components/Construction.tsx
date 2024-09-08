import React, { useState, useEffect } from 'react';
import {List, Space, Card, Typography, Button, message, Pagination, Table} from 'antd';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../store/store";
import {setSelectedItemId, setSelectedMenuKey} from "../store/MenuSlice";


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
    const location = useLocation();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const dispatch = useDispatch();


    const fetchData = async (page: number) => {
        setLoading(true);
        try {
            const response = await axios.get<{ content: DataItem[], totalElements: number }>(
                `http://localhost:8080/api/construction/get-list`,
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


    const handleItemClick = (item: DataItem) => {
        navigate(`/construction-detail/${item.constructionId}`);
    };

    const columns = [
        {
            title: '제목',
            key: 'title',
            render: (text: string, item: DataItem) => (
                <a onClick={() => handleItemClick(item)}>
                    {`${item.companyName} ${item.categoryName} 시공 사진`}
                </a>
            ),
        },
        // 필요시 description이나 다른 데이터 필드에 대한 열을 추가할 수 있습니다.
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
                    pagination={false} // 필요시 pagination 추가 가능
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
