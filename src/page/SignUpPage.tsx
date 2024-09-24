// SignUpPage.tsx
import React, {useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: {
        roadAddress: string;
        detailAddress: string;
        zipcode: string;
    };
}

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [usernameStatus, setUsernameStatus] = useState<'success' | 'error' | undefined>(undefined);
    const [checkingUsername, setCheckingUsername] = useState<boolean>(false);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const userSaveUrl = process.env.REACT_APP_USER_SAVE_URL;
    const checkSignupUrl = process.env.REACT_APP_CHECK_SIGNUP_URL;
    const onFinish = async (values: SignUpFormValues) => {
        try {
            await axios.post(`${apiUrl}${userSaveUrl}`, values);
            message.success('Sign up successful');
            navigate('/login');
        } catch (error) {
            console.error('' +
                'Sign up failed:', error);
            message.error('Sign up failed');
        }
    };
    const checkUsernameAvailability = async () => {
        if (!username) {
            message.error('Please enter a username to check');
            return;
        }

        setCheckingUsername(true);

        try {
            const response = await axios.get(`${apiUrl}${checkSignupUrl}?username=${username}`);
            if (response.data === true) {
                setUsernameStatus('success');
                message.success('사용가능한 ID입니다.');
            } else {
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
        <div style={{maxWidth: 400, margin: 'auto', fontFamily: 'PaperlogyBold'}}>
            <h2>회원가입</h2>
            <Form name="signup" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    rules={[{required: true, message: 'Please enter your name!'}]}
                    validateStatus={usernameStatus}
                    hasFeedback
                >
                    <Input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        addonAfter={
                            <Button
                                type="link"
                                onClick={checkUsernameAvailability}
                                loading={checkingUsername}
                            >
                                Check
                            </Button>
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Please enter your email!'}]}
                >
                    <Input placeholder="Email"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please enter your password!'}]}
                >
                    <Input.Password placeholder="Password"/>
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    rules={[{required: true, message: 'Please enter your phone number!'}]}
                >
                    <Input placeholder="Phone Number"/>
                </Form.Item>
                <Form.Item
                    name={['address', 'city']}
                    rules={[{required: true, message: 'Please enter your city!'}]}
                >
                    <Input placeholder="도시명"/>
                </Form.Item>
                <Form.Item
                    name={['address', 'street']}
                    rules={[{required: true, message: 'Please enter your street!'}]}
                >
                    <Input placeholder="나머지 주소"/>
                </Form.Item>
                <Form.Item
                    name={['address', 'zipcode']}
                    rules={[{required: true, message: 'Please enter your zipcode!'}]}
                >
                    <Input placeholder="우편번호"/>
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
