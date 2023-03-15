import React from "react";
import Lee from "../../../../lib/Lee";
import axios from "axios";

function DepositItem(props) {
  let method = props.method;
  if (method === "bank") {
    method = "계좌이체";
  } else {
    method = "카드결제";
  }

  function approvePayment() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/payments/depositReq/${props.paymentId}`,
      headers,
      data: {
        packageId: props.packageId,
        traderId: props.traderId,
        memberId: props.memberId,
        subscriptionId: props.subscriptionId,
        month: 1,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("결제 승인이 완료되었습니다.");
          window.location.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(approvePayment);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  function cancelPayment() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/payments/depositReq/${props.paymentId}/denied`,
      headers,
      data: {
        memberId: props.memberId,
        subscriptionId: props.subscriptionId,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("승인 취소가 왼료되었습니다.");
          window.location.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(cancelPayment);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
        console.log(err);
      });
  }
  return (
    <React.Fragment>
      <td className="userdeposit__table__body__name">{props.name}</td>
      <td className="userdeposit__table__body__phone">{props.phone}</td>
      <td className="userdeposit__table__body__package">{props.packageName}</td>
      <td className="userdeposit__table__body__id">{props.memberId}</td>
      <td className="userdeposit__table__body__method">{method}</td>
      <td className="userdeposit__table__body__date">{props.date}</td>
      <td className="userdeposit__table__body__price">
        {Lee.addComma(props.price)}원
      </td>
      <td className="userdeposit__table__body__approval">
        <button type="button" className="table__btn" onClick={approvePayment}>
          {props.approval}
        </button>
      </td>
      <td className="userdeposit__table__body__cancel">
        <button
          type="button"
          className="table__btn__red"
          onClick={cancelPayment}
        >
          {props.cancel}
        </button>
      </td>
    </React.Fragment>
  );
}

export default DepositItem;
