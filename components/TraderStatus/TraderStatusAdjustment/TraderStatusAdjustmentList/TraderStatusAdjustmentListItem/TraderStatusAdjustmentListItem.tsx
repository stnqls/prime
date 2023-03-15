import React from "react";
import Lee from "../../../../../lib/Lee";
import axios from "axios";

import "./TraderStatusAdjustmentListItem.scss";

const TraderStatusAdjustmentListItem = (props: any) => {
  function submit() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "POST",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/traders/withdrawals`,
      headers,
      data: {
        paymentIdArray: [props.paymentId],
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("정산 요청이 완료 되었습니다.");
          location.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(submit);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  return (
    <li className={`trader-status-adjustment-list-item ${props.status}`}>
      <ul className="trader-status-adjustment-list-item__list">
        <li className="trader-status-adjustment-list-item__list__nickname">
          {props.nickname}
        </li>
        <li className="trader-status-adjustment-list-item__list__product-name">
          {props.packageName}
        </li>
        <li className="trader-status-adjustment-list-item__list__product-price">
          {Lee.addComma(props.product_price)}원
        </li>
        <li className="trader-status-adjustment-list-item__list__end-date">
          {/* {props.end_date} */}
          {props.expireDate}
        </li>
        <li className="trader-status-adjustment-list-item__list__refund-price">
          {props.status === 3
            ? Lee.addComma(props.product_price - props.refundAmount)
            : Lee.addComma(props.product_price)}
          원
        </li>
        <li className="trader-status-adjustment-list-item__list__submit">
          <span className="success" onClick={submit}>
            정산
          </span>
        </li>
      </ul>
    </li>
  );
};

export default TraderStatusAdjustmentListItem;
