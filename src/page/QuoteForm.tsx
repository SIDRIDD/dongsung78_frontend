import React from 'react';
import {Button, Input, Form, Card, Typography, Space, message} from 'antd';
import axios from 'axios';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useNavigate, useParams} from "react-router-dom";

const { Title } = Typography;

const QuoteForm: React.FC = () => {
    const {contactType, typeId} = useParams<{ contactType: string; typeId: string }>();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const contactSaveUrl = process.env.REACT_APP_CONTACT_SAVE_URL;

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
            await axios.post(`${apiUrl}${contactSaveUrl}`, {
                title : values.title,
                description : values.description,
                contactType : contactType,
                typeId : typeId
            }, {
                withCredentials : true
            });
            // 0: 견적문의, else: 상품문의
            if(contactType === '0'){
                navigate('/quote-contact');
            } else {
                navigate(`/product-grid/0`) ;

            }
            message.success('등록되었습니다.');
        } catch (error) {
            message.error('등록에 실패하였습니다.');
        }
    };

    return (
        <Space direction="vertical" size="large" style={{ display: 'flex', border: 'none' }}>
            <Card
                title={<Title level={2} style={{ margin: 0}}>문의 글 작성하기</Title>}
                size="small"
                style={{ height: '100%', border: 'none' }}
            >
                <Form onFinish={handleFormSubmit}>
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
