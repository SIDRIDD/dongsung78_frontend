import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, Modal} from 'antd';
import OrderSummary from "./OrderSummary";
import {useLocation} from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import {Checkbox} from 'antd';
import type {CheckboxProps} from 'antd';
import axios from "axios";

const {Option} = Select;

const ShippingInfoForm: React.FC = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const {items} = location.state || {items: []};
    const [isCustom, setIsCustom] = useState(false);
    const [requestValue, setRequestValue] = useState('');

    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        phone: '',
        address: {
            roadAddress: '',
            detailAddress: '',
            zipCode: ''
        },
        request: ''
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [postcodeKey, setPostcodeKey] = useState(0);

    useEffect(() => {
        form.setFieldsValue({
            name: shippingInfo.name,
            phone: shippingInfo.phone,
            address: {
                roadAddress: shippingInfo.address.roadAddress,
                detailAddress: shippingInfo.address.detailAddress,
                zipCode: shippingInfo.address.zipCode,
            },
            request: shippingInfo.request,
        });
    }, [shippingInfo, form]);

    const onChange: CheckboxProps['onChange'] = async (e) => {
        console.log(`checked = ${e.target.checked}`);
        if (e.target.checked === true) {
            if (shippingInfo == null) {
                const response = await axios.get(`http://localhost:8080/api/user/delivery-info`, {
                    withCredentials: true
                })

                setShippingInfo(prevState => ({
                    ...prevState,
                    address: {
                        roadAddress: response.data.roadAddress,
                        detailAddress: response.data.detailAddress,
                        zipCode: response.data.zipCode
                    },
                }))
            } else {
                form.setFieldsValue({
                    address: {
                        roadAddress: shippingInfo.address.roadAddress,
                        detailAddress: shippingInfo.address.detailAddress,
                        zipCode: shippingInfo.address.zipCode
                    }
                })
            }
        } else {
            form.setFieldsValue({
                address: {
                    roadAddress: '',
                    detailAddress: '',
                    zipCode: ''
                }
            })
        }
    };

    const handleSelectChange = (value: string) => {
        if (value === '직접 입력') {
            setIsCustom(true);
            setRequestValue('');
        } else {
            setIsCustom(false);
            setRequestValue(value);
            setShippingInfo(prevState => ({
                ...prevState,
                request: value
            }));
        }
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingInfo(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
    };

    const handleAddressChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingInfo(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [field]: e.target.value
            }
        }));
    };

    const handleDropdownVisibleChange = (open: boolean) => {
        if (open && !isCustom) {
            setRequestValue('');
        }
    };

    const handleComplete = (data: any) => {
        let roadAddress = '';
        let zipcode = '';

        if (data.addressType === 'R') {
            roadAddress = data.roadAddress;
            zipcode = data.zonecode; // zonecode를 사용해 우편번호를 설정합니다.
        }

        setShippingInfo(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                roadAddress: roadAddress,
                zipCode: zipcode
            }
        }));

        handleCloseModal();
    };

    const handleOpenModal = () => {
        setPostcodeKey(prevKey => prevKey + 1); // key 증가
        setIsModalVisible(true);
    };

    // 모달이 닫힐 때 key를 초기화
    const handleCloseModal = () => {
        form.setFieldsValue({
            address: {
                roadAddress: shippingInfo.address.roadAddress,
                detailAddress: '',
                zipCode: shippingInfo.address.zipCode
            }
        });
        setIsModalVisible(false);
        setPostcodeKey(0); // key 초기화
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
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'flex-start',
                maxWidth: '900px',
                width: '100%',
            }}>
                <Form
                    form={form}
                    name="shippingInfo"
                    layout="vertical"
                    onFinish={() => {
                    }}
                    onFinishFailed={() => {
                    }}
                    style={{marginLeft: '100px', width: '300px'}}
                >
                    <Form.Item
                        label="[배송지 정보 입력]"
                    >
                    </Form.Item>
                    <Form.Item
                        label="이름"
                        name="name"
                        rules={[{required: true, message: '이름을 입력해 주세요.'}]}
                    >
                        <Input
                            placeholder="이름을 입력해 주세요."
                            onChange={handleInputChange('name')}
                        />
                    </Form.Item>

                    <Form.Item
                        label="연락처"
                        name="phone"
                        rules={[{required: true, message: '연락처를 입력해 주세요.'}]}
                    >
                        <Input
                            placeholder="'-'없이 입력해 주세요."
                            onChange={handleInputChange('phone')}
                        />
                    </Form.Item>

                    <Form.Item label="주소" required>

                        <Checkbox onChange={onChange} style={{alignItems: 'left', justifyItems: 'left'}}>이전 배송지 정보
                            불러오기</Checkbox>
                        <Button type="primary" onClick={handleOpenModal} style={{marginLeft: '10px', marginBottom: '10px'}}>
                            주소 검색
                        </Button>

                        <Form.Item
                            name={['address', 'roadAddress']}
                            rules={[{required: true, message: '도로명 주소를 입력해 주세요.'}]}
                        >
                            <Input
                                placeholder="도로명 주소를 입력하세요. 예) 강남구 대치로 11길 11"
                                onChange={handleAddressChange('roadAddress')}
                                value={shippingInfo.address.roadAddress}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['address', 'detailAddress']}
                            rules={[{required: true, message: '상세 주소를 입력하세요.'}]}
                        >
                            <Input
                                placeholder="상세 주소, 예시) 1111동 1111호"
                                onChange={handleAddressChange('detailAddress')}
                                value={shippingInfo.address.detailAddress}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['address', 'zipCode']}
                            rules={[{required: true, message: '우편번호를 입력해 주세요.'}]}
                        >
                            <Input
                                placeholder="우편번호를 입력하세요. 예) 10283"
                                onChange={handleAddressChange('zipCode')}
                                value={shippingInfo.address.zipCode}
                            />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        label="요청사항"
                        name="request"
                    >
                        <Select
                            placeholder="배송시 요청사항을 선택해 주세요."
                            style={{width: '100%'}}
                            onChange={handleSelectChange}
                            onDropdownVisibleChange={handleDropdownVisibleChange}
                            value={isCustom ? '직접 입력' : requestValue}
                            allowClear
                        >
                            <Option value="요청사항 없음.">선택 안함</Option>
                            <Option value="문 앞에 두고 가세요.">문 앞에 두고 가세요.</Option>
                            <Option value="배송 전에 연락 주세요.">배송 전에 연락 주세요.</Option>
                            <Option value="직접 입력">직접 입력</Option>
                        </Select>

                        {isCustom && (
                            <Input
                                placeholder="요청사항을 입력해 주세요."
                                value={requestValue}
                                onChange={(e) => {
                                    setRequestValue(e.target.value);
                                    setShippingInfo(prevState => ({
                                        ...prevState,
                                        request: e.target.value
                                    }));
                                }}
                                style={{marginTop: '10px', width: '100%'}}
                            />
                        )}
                    </Form.Item>
                </Form>

                <OrderSummary items={items} shippingCost={0} discount={126000} shippingInfo={shippingInfo}/>
            </div>

            {/* Daum Postcode 모달 */}
            <Modal
                title="주소 검색"
                visible={isModalVisible}
                onCancel={handleCloseModal} // 모달이 닫힐 때 key 초기화
                footer={null}
                destroyOnClose={true}
            >
                <DaumPostcode key={postcodeKey} onComplete={handleComplete}/>
            </Modal>
        </div>
    );
};

export default ShippingInfoForm;
