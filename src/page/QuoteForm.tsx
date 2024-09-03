import React from 'react';
import {Button, Input, Form, Card, Typography, Space, message} from 'antd';
import axios from 'axios';
import {useSelector} from "react-redux";
import Cookies from "js-cookie";
import {RootState} from "../store/store";
import {useNavigate} from "react-router-dom";

const { Title } = Typography;

const QuoteForm: React.FC = () => {
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const userCheck = async () => {
        if(!isLoggedIn){
            message.error('로그아웃 상태입니다.\n 댓글을 등록하려면 로그인이 필요합니다.');
            return false;
        }
        return true;
    }

    const handleFormSubmit = async (values: { title: string; description: string }) => {
        try {
            userCheck();
            await axios.post('http://localhost:8080/api/contact/save', {
                title : values.title,
                description : values.description
            }, {
                withCredentials : true
            });
            // 성공적으로 제출된 후 목록 페이지로 이동
            navigate('/quote-contact') ;
            message.success('등록되었습니다.');
        } catch (error) {
            console.error('Failed to submit data:', error);
            message.error('등록에 실패하였습니다.');
        }
    };

    return (
        <Space direction="vertical" size="large" style={{ display: 'flex', marginTop: '150px' }}>
            <Card
                title={<Title level={2} style={{ margin: 0}}>문의 글 작성하기</Title>}
                size="small"
                style={{ height: '100%' }}
            >
                <Form onFinish={handleFormSubmit} style={{ marginTop: '20px' }}>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Description" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    );
};

export default QuoteForm;
