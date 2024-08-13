import React from 'react';
import {Button, Card, Form, Input, message, Select} from 'antd';
import axios from "axios";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface FormValues {
    username: string;
}
const KakaoId: React.FC = () => {
    const [form] = Form.useForm();
    const titleText = "*카카오 계정으로 사용할 이름을 입력 후 적어주세요*." +
        "기존에 카카오 로그인을 하셨던 회원분께서는 기존 아이디를 입력해주시기 바랍니다."+
        " 사이트 내에서 문의 글 게시, 댓글 등록 등에 사용됩니다." +
        "실제 사용은 입력하신 name_kakao 로 사용됩니다." +
        "예시) 입력: aa, 사용하는 name: aa_kakao";
    const titleWithLineBreaks = titleText.split('.').map((text, index) => (
        <React.Fragment key={index}>
            {text.trim()}
            {index < titleText.split('.').length - 1 && <br/>}
        </React.Fragment>
    ));

    const callApi = async (data: FormValues) => {
        try {
            await axios.get(`http://localhost:8080/oauth/kakao/token?id=${data.username}`,
                {withCredentials: true});
            message.success('카카오 로그인!');
        } catch (error: any) {
            message.error('카카오 로그인 실패..');
        }
    };

    const onFinish = (values: FormValues) => {
        console.log('Received values:', values);
        callApi(values); // API 호출 함수 실행
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // 전체 화면 높이
        }}>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{maxWidth: 600}}
            >
                <Form.Item
                    name="username"
                    label="사용하실 name"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>
                <Card bordered={true}>
                    {titleWithLineBreaks}
                </Card>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>

    );
};

export default KakaoId;