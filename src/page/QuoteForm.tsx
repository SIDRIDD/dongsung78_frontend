import React from 'react';
import { Button, Input, Form, Card, Typography, Space } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const QuoteForm: React.FC = () => {
    const handleFormSubmit = async (values: { title: string; description: string }) => {
        try {
            await axios.post('/api/quotes', values);
            // 성공적으로 제출된 후 목록 페이지로 이동
            window.location.href = '/quote-contact';
        } catch (error) {
            console.error('Failed to submit data:', error);
        }
    };

    return (
        <Space direction="vertical" size="large" style={{ display: 'flex', marginTop: '150px' }}>
            <Card
                title={<Title level={2} style={{ margin: 0 }}>문의 글 작성하기</Title>}
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
