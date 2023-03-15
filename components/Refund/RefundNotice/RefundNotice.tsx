import React from "react";

import "./RefundNotice.scss";

const RefundNotice = () => {
  return (
    <div className="refund-notice" id="RefundNotice">
      <div className="refund-notice__contents">
        <div className="refund-notice__contents__title">환불 정책</div>
        <ul className="refund-notice__contents__lists">
          <li>
            1. 환불 및 취소하기는 프라임인베스트먼트사의 유료 서비스 정책에
            의거합니다.
          </li>
          <li>2. 할인이벤트로 결제를 하신 경우에는 할인이 불가합니다.</li>
          <li>
            3. 1개월(30일) 상품판매액 X 30 - 이용기간 / 30 으로 일할 계산 된다는
            점 인지바랍니다.
          </li>
          <li>4. 상품의 가격이 전문가마다 다른 점 인지바랍니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default RefundNotice;
