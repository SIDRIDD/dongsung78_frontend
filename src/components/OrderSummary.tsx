import React, {useEffect} from 'react';
import './css/OrderSummary.css';

interface OrderSummaryProps {
    items: { name: string; description: string; price: number; quantity: number; imgUrl: string }[];
    shippingCost: number;
    discount: number;
}

declare global {
    interface Window {
        IMP?: any;
    }
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, shippingCost, discount }) => {
    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
        // 포트원 SDK 로드 확인
        if (window.IMP) {
            const { IMP } = window;
            IMP.init('imp77836246');  // 포트원 상점 아이디로 초기화

            const paymentData = {
                pg: 'tosspayments',  // 사용할 PG사
                pay_method: 'card',  // 결제수단
                merchant_uid: `mid_${new Date().getTime()}`,  // 상점에서 생성한 고유 주문번호
                name: '주문명: 결제 테스트',
                amount: totalAmount,  // 최종 결제 금액
                buyer_email: 'customer@example.com',  // 구매자 이메일 (필요시 수정)
                buyer_name: '홍길동',  // 구매자 이름 (필요시 수정)
                buyer_tel: '010-1234-5678',  // 구매자 연락처 (필요시 수정)
                buyer_addr: '서울특별시 강남구 역삼동',  // 구매자 주소 (필요시 수정)
                buyer_postcode: '01181',
                m_redirect_url: 'http://localhost:3000/',  // 결제 후 리디렉션될 페이지
            };

            IMP.request_pay(paymentData, (rsp: any) => {
                if (rsp.success) {
                    alert('결제가 완료되었습니다.');
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
                <button className="order-summary-button" onClick={handlePayment}>결제하기</button>
            </div>
        </div>
    );
};

export default OrderSummary;
