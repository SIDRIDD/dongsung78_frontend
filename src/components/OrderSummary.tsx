import React, {useEffect} from 'react';
import './css/OrderSummary.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface OrderSummaryProps {
    items: { name: string; description: string; price: number; quantity: number; imgUrl: string, productId: number }[];
    shippingCost: number;
    discount: number;

    shippingInfo: {
        name: string;
        phone: string;
        address: {
            roadAddress  : string;
            detailAddress: string;
            zipCode: string;
        };
        request: string;
    };
}

declare global {
    interface Window {
        IMP?: any;
    }
}
interface PurchaseData {
    productId: number;
    count: number;

    userName: string;

    phoneNumber: string;

    roadAddress: string;

    detailAddress: string;

    zipCode: string;

    request: string;

}


const OrderSummary: React.FC<OrderSummaryProps> = ({ items, shippingCost, discount , shippingInfo}) => {
    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const navigate = useNavigate();


    const getPurchaseData = (shippingInfo: OrderSummaryProps['shippingInfo']): PurchaseData[] => {
        console.log('getPurchaseData 부분에서 shippingInfo: ', shippingInfo);
        return items.map(item => ({
            productId: item.productId, // Assuming items have an id field. Replace with the actual field if different
            count: item.quantity,
            userName: shippingInfo.name,
            phoneNumber: shippingInfo.phone,
            roadAddress: shippingInfo.address.roadAddress,
            detailAddress: shippingInfo.address.detailAddress,
            zipCode: shippingInfo.address.zipCode,
            request: shippingInfo.request
        }));
    };
    const purchaseItems = async (purchaseData: PurchaseData[]) => {
        try {
            console.log('purchaseData : ', purchaseData);
            const response = await axios.post('http://localhost:8080/api/order/save', purchaseData
                , {withCredentials: true});
            console.log(response.data); // 성공 메시지 출력
            // 성공적으로 구매가 완료된 후 장바구니를 비웁니다.
        } catch (error) {
            console.error('Error purchasing items:', error);
        }
    };

    useEffect(() => {
        // 포트원 SDK 스크립트를 동적으로 로드
        const script = document.createElement('script');
        script.src = 'https://cdn.iamport.kr/v1/iamport.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);



    const handlePayment = () => {
        if(!shippingInfo.address.detailAddress){
            alert('상세 주소를 입력해 주세요.');
            return;
        }
        // 포트원 SDK 로드 확인
        if (window.IMP) {
            const { IMP } = window;
            IMP.init('imp77836246');  // 포트원 상점 아이디로 초기화

            const paymentData = {
                pg: 'kakaopay',  // 사용할 PG사
                pay_method: 'card',  // 결제수단
                merchant_uid: `mid_${new Date().getTime()}`,  // 상점에서 생성한 고유 주문번호
                name: '주문명: 결제 테스트',
                amount: totalAmount,  // 최종 결제 금액
                buyer_email: 'customer@example.com',  // 구매자 이메일 (필요시 수정)
                // buyer_name: '홍길동',  // 구매자 이름 (필요시 수정)
                // buyer_tel: '010-1234-5678',  // 구매자 연락처 (필요시 수정)
                // buyer_addr: '서울특별시 강남구 역삼동',  // 구매자 주소 (필요시 수정)
                buyer_postcode: '01181',
                m_redirect_url: 'http://localhost:3000/',  // 결제 후 리디렉션될 페이지
            }

            IMP.request_pay(paymentData, (rsp: any) => {
                if (rsp.success) {
                    const purchaseData = getPurchaseData(shippingInfo);
                    purchaseItems(purchaseData);
                    sessionStorage.setItem('cartKinds', '0');
                    alert('결제가 완료되었습니다.');
                    navigate('/product-grid/1');
                    // 결제 성공 처리 로직
                } else {
                    alert('결제에 실패하였습니다. 에러 내용: ' + rsp.error_msg);
                    // 결제 실패 처리 로직
                }
            });
        } else {
            alert('결제 모듈이 로드되지 않았습니다. 페이지를 새로고침 해주세요.');
        }
    };

    const handleGeneralPayment = () => {
        if(!shippingInfo.address.detailAddress){
            alert('상세 주소를 입력해 주세요.');
            return;
        }

        if (window.IMP) {
            const { IMP } = window;
            IMP.init('imp77836246');  // 실제 가맹점 식별코드로 변경

            // const paymentData = {
            //     pg: 'tosspayments',  // PG사 설정
            //     pay_method: 'card',   // 결제수단 ('card', 'trans', 'vbank' 등)
            //     merchant_uid: `mid_${new Date().getTime()}`,  // 고유한 주문번호
            //     name: '주문명: 상품 결제',
            //     amount: totalAmount,  // 결제 금액
            //     buyer_email: 'customer@example.com',  // 실제 데이터로 변경
            //     buyer_name: shippingInfo.name,
            //     buyer_tel: shippingInfo.phone,
            //     buyer_addr: `${shippingInfo.address.roadAddress} ${shippingInfo.address.detailAddress}`,
            //     buyer_postcode: shippingInfo.address.zipCode,
            // };
            const paymentData = {
                pg: "html5_inicis", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
                pay_method: "card", // 결제수단
                merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
                amount: 1000, // 결제금액
                name: "아임포트 결제 데이터 분석", // 주문명
                buyer_name: "홍길동", // 구매자 이름
                buyer_tel: "01012341234", // 구매자 전화번호
                buyer_email: "example@example.com", // 구매자 이메일
                buyer_addr: "신사동 661-16", // 구매자 주소
                buyer_postcode: "06018", // 구매자 우편번호
            };


            IMP.request_pay(paymentData, (rsp: any) => {
                console.log('Payment Response:', rsp);
                if (rsp.success) {
                    const purchaseData = getPurchaseData(shippingInfo);
                    purchaseItems(purchaseData);
                    sessionStorage.setItem('cartKinds', '0');
                    alert('결제가 완료되었습니다.');
                    navigate('/product-grid/1');
                } else {
                    console.log('실패 rsp 전체: ' + rsp);
                    console.log('실패 메시지: ' + rsp.error_msg);
                    alert('결제에 실패하였습니다. 에러 내용: ' + rsp.error_msg);
                }
            });
        } else {
            alert('결제 모듈이 로드되지 않았습니다. 페이지를 새로고침 해주세요.');
        }
    };

    return (
        <div className="order-summary">
            <div className="order-summary-header">
                <h2>주문상품 {items.length}개</h2>
            </div>
            <div className="order-summary-body">
                {items.map((item, index) => (
                    <div key={index} className="order-item">
                        <img src={`${process.env.PUBLIC_URL}/${item.imgUrl}`} alt={item.name} className="order-item-img" />
                        <div className="order-item-details">
                            <h3 className="order-item-name">{item.name}</h3>
                            <p className="order-item-price">{item.price.toLocaleString()}원 / {item.quantity}개</p>
                        </div>
                    </div>
                ))}
                <div className="order-summary-shipping">
                    <span>배송비</span>
                    <span>{shippingCost === 0 ? '무료배송' : `${shippingCost.toLocaleString()}원`}</span>
                </div>
            </div>
            <div className="order-summary-footer">
                <div className="order-summary-amount">
                    <span>상품금액</span>
                    <span>{totalAmount.toLocaleString()}원</span>
                </div>
                <div className="order-summary-total">
                    <span style={{ marginTop: '20px' }}>총 결제금액</span>
                    <span className="total-amount">{totalAmount.toLocaleString()}원</span>
                </div>
                <button className="order-summary-button" onClick={handlePayment} style={{ backgroundColor: 'black', fontFamily: 'PaperlogyBold' }}> 카카오 페이로 결제하기</button>
                <button className="order-summary-button-general" onClick={handleGeneralPayment} style={{ backgroundColor: 'black', fontFamily: 'PaperlogyBold' }}>카드로 결제하기</button>
                <span> ** 실제 결제 연동 준비중입니다. ** 테스트용 결제만 가능합니다. 결제를 원할 시에 견적/문의 연락처로 연락주시기 바랍니다. </span>
            </div>
        </div>
    );
};

export default OrderSummary;
