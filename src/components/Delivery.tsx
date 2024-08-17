import React, {useState} from 'react';
import {Form, Input, Button, Checkbox, Select} from 'antd';
import OrderSummary from "./OrderSummary";
import {useLocation} from 'react-router-dom';

const {Option} = Select;

const ShippingInfoForm: React.FC = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const {items} = location.state || {items: []}; // 전달된 items 데이터 받기
    const [isCustom, setIsCustom] = useState(false);

    const [requestValue, setRequestValue] = useState('');

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleSelectChange = (value: string) => {
        if (value === 'custom') {
            setIsCustom(true);
            setRequestValue('');  // "직접 입력"을 선택하면 기존 값을 지우고 Input 필드를 활성화
        } else {
            setIsCustom(false);
            setRequestValue(value);  // 선택된 값을 상태로 저장
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRequestValue(e.target.value);  // Input 필드에 입력된 값을 상태에 저장
    };

    const handleDropdownVisibleChange = (open: boolean) => {
        if (open && !isCustom) {
            setRequestValue('');  // 드롭다운이 열릴 때 값 초기화 (단, isCustom이 false일 때만)
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <div style={{
                display: 'flex',
                gap: '20px', // 컴포넌트 사이의 간격을 줄입니다
                justifyContent: 'center',
                alignItems: 'flex-start',
                maxWidth: '900px',
                width: '100%',
            }}>
                <Form
                    form={form}
                    name="shippingInfo"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{marginLeft: '100px', width: '300px'}}
                >
                    <Form.Item
                        label="이름"
                        name="name"
                        rules={[{required: true, message: '이름을 입력해 주세요.'}]}
                    >
                        <Input placeholder="이름을 입력해 주세요."/>
                    </Form.Item>

                    <Form.Item
                        label="연락처"
                        name="phone"
                        rules={[{required: true, message: '연락처를 입력해 주세요.'}]}
                    >
                        <Input placeholder="'-'없이 입력해 주세요."/>
                    </Form.Item>

                    <Form.Item
                        label="주소"
                        name="address"
                        rules={[{required: true, message: '주소를 입력해 주세요.'}]}
                    >
                        <Input.Group compact>
                            <Input placeholder="주소를 입력해 주세요."/>
                            {/*<Button type="primary">주소찾기</Button>*/}
                        </Input.Group>
                    </Form.Item>

                    <Form.Item name="detailedAddress">
                        <Input placeholder="상세 주소를 입력해 주세요."/>
                    </Form.Item>

                    <Form.Item
                        label="요청사항"
                        name="request"
                    >
                        <Select
                            placeholder="배송시 요청사항을 선택해 주세요."
                            style={{ width: '100%' }}
                            onChange={handleSelectChange}  // Select 값 변경 시 호출
                            onDropdownVisibleChange={handleDropdownVisibleChange}
                            value={isCustom ? 'custom' : requestValue}  // "직접 입력" 시 "custom"으로 설정
                            allowClear
                        >
                            <Option value="none">선택 안함</Option>
                            <Option value="leaveAtDoor">문 앞에 두고 가세요.</Option>
                            <Option value="callBefore">배송 전에 연락 주세요.</Option>
                            <Option value="custom">직접 입력</Option>
                        </Select>

                        {isCustom && (  // "직접 입력"이 선택되었을 때만 Input 필드를 렌더링
                            <Input
                                placeholder="요청사항을 입력해 주세요."
                                value={requestValue}
                                onChange={handleInputChange}
                                style={{ marginTop: '10px', width: '100%' }}
                            />
                        )}
                    </Form.Item>


                    {/*<Form.Item>*/}
                    {/*    <Button type="primary" htmlType="submit">*/}
                    {/*        제출*/}
                    {/*    </Button>*/}
                    {/*</Form.Item>*/}
                </Form>

                <OrderSummary items={items} shippingCost={0} discount={126000}/>
            </div>
        </div>
    );
};

export default ShippingInfoForm;
