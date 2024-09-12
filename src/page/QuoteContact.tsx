import React, { useState, useEffect } from 'react';
import {List, Space, Card, Typography, Button, message, Pagination, Table, Modal} from 'antd';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../store/store";
import {setSelectedItemId, setSelectedMenuKey} from "../store/MenuSlice";


interface DataItem {
    id: number;
    title: string;
    description?: string;
    status: string;
    userId: string;

    userName: string;

    time: string;
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const dispatch = useDispatch();
    const contentKeyValue = 101;

    const fetchData = async (page: number) => {
        setLoading(true);
        try {
            const response = await axios.get<{ content: DataItem[], totalElements: number }>(
                `http://localhost:8080/api/contact/getall?contacttype=0`,
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
            navigate('/quote-form/0/null');
        } else {
            navigate('/login', { state: { from: location } });
            message.warning('문의 글 작성을 위해 로그인이 필요합니다.');
        }
    };

    const handleItemClick = (id: number) => {
        navigate(`/quote-detail/${id}`);
    };

    const showModal = (id: number) => {
        setSelectedItemId(id);  // 삭제할 항목의 ID 저장
        setIsModalVisible(true); // 모달 창 표시
    };

    const handleOk = () => {
        if (selectedItemId !== null) {
            handleDelete(selectedItemId); // 선택된 아이템 삭제
        }
        setIsModalVisible(false); // 모달 창 닫기
    };

    const handleCancel = () => {
        setIsModalVisible(false); // 모달 창 닫기
    };

    const columns = [
        {
            title: '제목',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, item: DataItem) => <a onClick={() => handleItemClick(item.id)}>{text}</a>,
        },
        // 필요시 description이나 다른 데이터 필드에 대한 열을 추가할 수 있습니다.
        {
            title: '작성자',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '작성일자',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '',
            key: 'action',
            render: (text: string, item: DataItem) => (
                item.userName === sessionStorage.getItem('userName') ? ( // 게시글 작성자와 userName 비교
                    <>
                        <Button
                            type="primary"
                            danger
                            onClick={() => showModal(item.id)}
                            style={{ width: '1px', height: '18px', backgroundColor: 'white', color: 'black'}}
                        >
                            x
                        </Button>

                        <Modal
                            title="삭제 확인"
                            visible={isModalVisible}
                            onOk={handleOk} // Yes 버튼 클릭 시
                            onCancel={handleCancel} // No 버튼 클릭 시
                            okText="Yes"
                            cancelText="No"
                        >
                            정말로 삭제하시겠습니까?
                        </Modal>
                    </>
                ) : null
            ),
        },
    ];

    const handleDelete = async (itemId: number) => {
        setLoading(true);
        try {
            const response = await axios.delete(`http://localhost:8080/api/contact/delete?itemid=${itemId}`);
            fetchData(currentPage);
            message.success("삭제되었습니다.");
        } catch (error) {
            message.warning('삭제에 실패하였습니다.');
        }
        setLoading(false);
    }

    return (
        <Space direction="vertical" size="large" style={{ display: 'flex'}}>
            <Card
                title={<Title level={2} style={{ display: 'flex', fontFamily: 'PaperlogyBold' }}>견적 문의</Title>}
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                    <Button type="primary" onClick={handleShowForm}>
                        문의 글 작성하기
                    </Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        current={currentPage}
                        total={totalItems}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        showLessItems={false}
                    />
                </div>
            </Card>
        </Space>
    );
};

export default QuoteContact;
