import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';

interface UserInfo {
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

const MyPage: React.FC = () => {
    const [form] = Form.useForm();
    const [userInfo, setUserInfo] = useState<UserInfo>();

    // 사용자 정보 가져오기
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/get-user', {
                withCredentials: true,
            });
            setUserInfo(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            message.error('사용자 정보를 가져오는 데 실패했습니다. 새로고침 후 다시 시도해주세요.');
        }
    };

    // 컴포넌트 마운트 시 사용자 정보 가져오기
    useEffect(() => {
        fetchUserInfo();
    }, []);

    // 사용자 정보가 변경되면 폼 필드에 값 설정
    useEffect(() => {
        if (userInfo) {
            form.setFieldsValue(userInfo);
        }
    }, [userInfo, form]);

    // 폼 제출 시 수정 API 호출
    const onFinish = async (values: UserInfo) => {
        try {
            const dataToSend = {
                ...userInfo,
                ...values,
                address: {
                    ...userInfo?.address,
                    ...values.address,
                },
            };
            await axios.put('http://localhost:8080/api/user/update-user', dataToSend, {
                withCredentials: true,
            });
            message.success('회원정보가 성공적으로 수정되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error('Error updating user data:', error);
            message.error('회원정보 수정에 실패했습니다.');
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: 'auto', padding: '20px', fontFamily: 'PaperlogyBold' }}>
            <h2>마이페이지</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="email" label="이메일" rules={[{ required: true, message: '이메일을 입력해주세요.' }]}>
                    <Input placeholder="이메일" />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="전화번호"
                    rules={[{ required: true, message: '전화번호를 입력해주세요.' }]}
                >
                    <Input placeholder="전화번호" />
                </Form.Item>
                <Form.Item
                    name={['address', 'roadAddress']}
                    label="도로명 주소"
                    rules={[{ required: true, message: '도로명 주소를 입력해주세요.' }]}
                >
                    <Input placeholder="도로명 주소" />
                </Form.Item>
                <Form.Item
                    name={['address', 'detailAddress']}
                    label="상세 주소"
                    rules={[{ required: true, message: '상세 주소를 입력해주세요.' }]}
                >
                    <Input placeholder="상세 주소" />
                </Form.Item>
                <Form.Item
                    name={['address', 'zipcode']}
                    label="우편번호"
                    rules={[{ required: true, message: '우편번호를 입력해주세요.' }]}
                >
                    <Input placeholder="우편번호" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        수정하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MyPage;
