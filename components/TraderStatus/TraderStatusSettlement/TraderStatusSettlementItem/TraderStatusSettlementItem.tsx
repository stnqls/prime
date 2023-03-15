import React from "react";
import Lee from "../../../../lib/Lee";

import "./TraderStatusSettlementItem.scss";

const TraderStatusSettlementItem = (props: any) => {
  return (
    <li className={`trader-status-settlement-item ${props.status}`}>
      <div className="trader-status-settlement-item__contents">
        <ul className="trader-status-settlement-item__contents__list parents">
          <li className="trader-status-settlement-item__contents__list__nickname">
            {props.nickname}
          </li>
          <li className="trader-status-settlement-item__contents__list__email">
            {props.email}
          </li>
          <li className="trader-status-settlement-item__contents__list__payment-price">
            {Lee.addComma(props.payment_price)}원
          </li>
          <li className="trader-status-settlement-item__contents__list__settlement-price">
            {Lee.addComma(props.settlement_price)}원
          </li>
          <li className="trader-status-settlement-item__contents__list__payment-status">
            {props.payment_status ? (
              <span className="success">결제완료</span>
            ) : (
              <span className="pending">결제대기</span>
            )}
          </li>
        </ul>
      </div>
    </li>
  );
};

export default TraderStatusSettlementItem;
