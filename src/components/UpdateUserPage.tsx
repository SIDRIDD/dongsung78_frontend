// SignUpPage.tsx
import React, {useEffect, useState} from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {withAttributes} from "js-cookie";

interface UpdateUser {
    userId: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: {
        roadAddress: string;
        detailAddress: string;
        zipcode: string;
    };
}

const UpdateUserPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [usernameStatus, setUsernameStatus] = useState<'success' | 'error' | undefined>(undefined);
    const [checkingUsername, setCheckingUsername] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UpdateUser>();
    const [form] = Form.useForm(); // 폼 인스턴스 생성

    const onFinish = async (values: UpdateUser) => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/update-user', values);
            message.success('Sign up successful');
            navigate('/product-grid/1');
        } catch (error) {
            console.error('' +
                'Sign up failed:', error);
            message.error('Sign up failed');
        }
    };

    useEffect(() => {
        loadOldUserDate();
    }, []); // 빈 배열 추가

    useEffect(() => {
        console.log('userInfo 훅: ' + userInfo);
        if (userInfo) {
            form.setFieldsValue(userInfo);
        }
    }, [userInfo, form]);
        
    const loadOldUserDate = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/get-user', { withCredentials: true });
            console.log('response:', response);
            console.log('response.data:', response.data);
            setUserInfo(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    const checkUsernameAvailability = async () => {
        if (!username) {
            message.error('Please enter a username to check');
            return;
        }

        setCheckingUsername(true);

        try {
            const response = await axios.get(`http://localhost:8080/api/user/check-signup?username=${username}`);
            console.log(response.data)
            if (response.data == true) {
                setUsernameStatus('success');
                message.success('사용가능한 ID입니다.');
            } else{
                setUsernameStatus('error');
                message.error('이미 존재하는 ID입니다.');
            }
        } catch (error) {
            console.error('Username check failed:', error);
            message.error('Failed to check username');
            setUsernameStatus(undefined);
        } finally {
            setCheckingUsername(false);
        }
    };


    return (
        <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'PaperlogyBold'}}>
            <h2>회원정보 수정</h2>
            <Form name="signup" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                    validateStatus={usernameStatus}
                    hasFeedback
                >
                    <Input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // 상태 업데이트
                        addonAfter={
                            <Button
                                type="link"
                                onClick={checkUsernameAvailability} // 현재 상태 값으로 체크
                                loading={checkingUsername}
                            >
                                Check
                            </Button>
                        }
                    />

                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                    <Input placeholder="Email" />
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
                    <Input placeholder="도시명" />
                </Form.Item>
                <Form.Item
                    name={['address', 'street']}
                    rules={[{ required: true, message: 'Please enter your street!' }]}
                >
                    <Input placeholder="나머지 주소" />
                </Form.Item>
                <Form.Item
                    name={['address', 'zipcode']}
                    rules={[{ required: true, message: 'Please enter your zipcode!' }]}
                >
                    <Input placeholder="우편번호" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        수정하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateUserPage;
