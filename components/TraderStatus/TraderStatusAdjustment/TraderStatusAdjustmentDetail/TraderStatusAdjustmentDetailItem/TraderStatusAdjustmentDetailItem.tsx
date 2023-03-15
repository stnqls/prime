import React from "react";
import Lee from "../../../../../lib/Lee";

import "./TraderStatusAdjustmentDetailItem.scss";

const TraderStatusAdjustmentDetailItem = (props: any) => {
  let status = props.status;
  switch (status) {
    case 0:
      status = "정산 승인 요청중";
      break;
    case 1:
      status = "정산 완료";
      break;
    case 2:
      status = "정산 거절";
      break;
  }

  return (
    <li className={`trader-status-adjustment-detail-item`}>
      <ul className="trader-status-adjustment-detail-item__list">
        <li className="trader-status-adjustment-detail-item__list__nickname">
          {props.nickname}
        </li>
        <li className="trader-status-adjustment-detail-item__list__product-name">
          {props.packageName}
        </li>
        <li className="trader-status-adjustment-detail-item__list__product-price">
          {Lee.addComma(props.product_price)}원
        </li>
        <li className="trader-status-adjustment-detail-item__list__end-date">
          {/* {props.end_date} */}
          {props.expireDate}
        </li>
        <li className="trader-status-adjustment-detail-item__list__refund-price">
          {props.status === 3
            ? Lee.addComma(props.product_price - props.withdrawalAmount)
            : Lee.addComma(props.product_price)}
          원
        </li>
        <li className="trader-status-adjustment-detail-item__list__submit">
          {status}
        </li>
      </ul>
    </li>
  );
};

export default TraderStatusAdjustmentDetailItem;
