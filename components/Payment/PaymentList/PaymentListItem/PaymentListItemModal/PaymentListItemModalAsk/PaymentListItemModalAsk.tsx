import React, { useEffect, useState } from "react";
import Router from "next/router";
import Lee from "../../../../../../lib/Lee";
import DelayLink from "../../../../../../lib/DelayLink";
import axios from "axios";

import "./PaymentListItemModalAsk.scss";

const PaymentListItemModalAsk = (props: any) => {
  return (
    <div className="payment-list-item-modal-ask" id="PaymentListItemModalAsk">
      <div
        className="payment-list-item-modal-ask__hide"
        onClick={function () {
          props.setView(false);
        }}
      />
      <div className="payment-list-item-modal-ask__contents">
        <div className="payment-list-item-modal-ask__contents__category">
          문의하기
        </div>
        <img
          className="payment-list-item-modal-ask__contents__close"
          src="/images/icons/x-sign.png"
          alt="x-sign"
          onClick={function () {
            props.setView(false);
          }}
        />
        <div className="payment-list-item-modal-ask__contents__context parents">
          <div className="payment-list-item-modal-ask__contents__context__title">
            해당 결제에 대한 문의사항이 있으신가요?
          </div>
          <DelayLink to={`Inquiry`} delay={200} onDelayStart={Lee.loadingStart}>
            <div className="payment-list-item-modal-ask__contents__context__phone">
              {/* <img src="/images/icons/phone-call.png" alt="phone" />
              1577-0000 */}
              고객센터 &gt; 1:1 문의하기
            </div>
          </DelayLink>
          <div className="payment-list-item-modal-ask__contents__context__paragraph">
            {/* 해당 번호로 문의 내용을 전달해주시면 빠르게 답변을 도와드리겠습니다. */}
            고객센터 1:1문의하기에 내용을 남겨주시면 확인후 답변을
            도와드리겠습니다.
          </div>
          <div className="payment-list-item-modal-ask__contents__context__time">
            {/* * 고객센터 운영시간 : 평일 09:00 ~ 18:00 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentListItemModalAsk;
