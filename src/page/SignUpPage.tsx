// SignUpPage.tsx
import React from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: {
        city: string;
        street: string;
        zipcode: string;
    };
}

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: SignUpFormValues) => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/save', values);
            message.success('Sign up successful');
            navigate('/login');
        } catch (error) {
            console.error('Sign up failed:', error);
            message.error('Sign up failed');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', marginTop: '100px' }}>
            <h2>Sign Up</h2>
            <Form name="signup" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                    <Input placeholder="ID" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please enter your phone number!' }]}
                >
                    <Input placeholder="Phone Number" />
                </Form.Item>
                <Form.Item
                    name={['address', 'city']}
                    rules={[{ required: true, message: 'Please enter your city!' }]}
                >
                    <Input placeholder="City" />
                </Form.Item>
                <Form.Item
                    name={['address', 'street']}
                    rules={[{ required: true, message: 'Please enter your street!' }]}
                >
                    <Input placeholder="Street" />
                </Form.Item>
                <Form.Item
                    name={['address', 'zipcode']}
                    rules={[{ required: true, message: 'Please enter your zipcode!' }]}
                >
                    <Input placeholder="Zipcode" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUpPage;
