import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import axios from "axios";

function RefundItem(props) {
  const [refundAmount, setRefundAmount] = useState(props.refundPrice);
  const [memo, setMemo] = useState(false);

  const showMemo = (index) => {
    setMemo((i) => ({
      ...i,
      [index]: !i[index],
    }));
  };

  let method = props.method;
  if (method === "bank") {
    method = "계좌이체";
  } else {
    method = "카드결제";
  }

  function approveRefund() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    let datas;

    // if (refundAmount) {
    //   datas = {
    //     traderId: props.traderId,
    //     memberId: props.memberId,
    //     subscriptionId: props.subscriptionId,
    //     refundAmount: refundAmount,
    //   };
    // } else {
    //   window.alert("환불금액을 입력해 주세요.");
    // }

    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/payments/refund/${props.paymentId}`,
      headers,
      data: {
        traderId: props.traderId,
        memberId: props.memberId,
        subscriptionId: props.subscriptionId,
        refundAmount: refundAmount ? refundAmount : props.refundAmount,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("환불 승인이 완료되었습니다.");
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
        if (refundAmount) {
          window.alert("일시적인 오류입니다. 다시 시도해주세요.");
        } else {
          window.alert("환불금액을 입력해 주세요.");
        }
      });
  }

  function rejectRefund() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/payments/refund/${props.paymentId}/denied`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          alert("환불 거절이 완료되었습니다.");
          window.location.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(rejectRefund);
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
    <React.Fragment>
      <tr className="userrefund__table__body__tr">
        <td
          className="userrefund__table__body__name"
          onClick={() => {
            showMemo(props.index);
          }}
        >
          {props.name}
        </td>
        {/* <td className="userrefund__table__body__id">{props.paymentId}</td> */}
        <td
          className="userrefund__table__body__phone"
          onClick={() => {
            showMemo(props.index);
          }}
        >
          {props.phone}
        </td>
        <td
          className="userrefund__table__body__package-name"
          onClick={() => {
            showMemo(props.index);
          }}
        >
          {props.packageName}
        </td>
        <td
          className="userrefund__table__body__method"
          onClick={() => {
            showMemo(props.index);
          }}
        >
          {method}
        </td>
        <td
          className="userrefund__table__body__date"
          onClick={() => {
            showMemo(props.index);
          }}
        >
          {props.date}
        </td>
        <td
          className="userrefund__table__body__price"
          onClick={() => {
            showMemo(props.index);
          }}
        >
          {Lee.addComma(props.price)}원
        </td>
        <td
          className="userrefund__table__body__refund-price"
          onClick={() => {
            showMemo(props.index);
          }}
        >
          {Lee.addComma(props.refundPrice)}원
        </td>
        <td className="userrefund__table__body__final-price">
          <input
            type="number"
            defaultValue={props.refundPrice}
            onChange={function (e) {
              setRefundAmount(e.target.value);
            }}
          />
        </td>
        <td className="userrefund__table__body__approval">
          <button type="button" className="table__btn" onClick={approveRefund}>
            환불승인
          </button>
        </td>
        <td className="userrefund__table__body__reject">
          <button
            type="button"
            className="table__btn reject"
            onClick={rejectRefund}
          >
            환불거절
          </button>
        </td>
      </tr>
      <tr
        className={
          memo[props.index]
            ? "userrefund__table__body__memo"
            : "userrefund__table__body__memo--none"
        }
      >
        <td className="userrefund__table__body__memo__td" colSpan="10">
          {props.refundMemo}
        </td>
      </tr>
    </React.Fragment>
  );
}

export default RefundItem;
