import React from "react";
import Lee from "../../../../lib/Lee";
import axios from "axios";

function TraderPaymentRequestItem(props) {
  function approval() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "PATCH",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/withdrawals",
      headers,
      data: {
        withdrawalId: props.id,
      },
    })
      .then((res) => {
        alert("해당 정산에 대해 승인 처리가 완료되었습니다.");
        location.reload();
      })
      .catch((err) => {
        window.alert("에러");
      });
  }

  function deny() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "PATCH",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/withdrawals/denied",
      headers,
      data: {
        withdrawalId: props.id,
      },
    })
      .then((res) => {
        alert("해당 정산거절이 완료되었습니다.");
        location.reload();
      })
      .catch((err) => {
        window.alert("에러");
      });
  }

  return (
    <React.Fragment>
      <td className="traderrequest__table__body__tradername">{props.name}</td>
      <td className="traderrequest__table__body__phone">{props.phone}</td>
      <td className="traderrequest__table__body__package">
        {props.packageName}
      </td>
      <td className="traderrequest__table__body__price">
        {props.price > 0 ? Lee.addComma(props.price) : "0"}원
      </td>
      <td className="traderrequest__table__body__date">{props.date}</td>
      <td className="traderrequest__table__body__approval">
        <button type="button" className="table__btn" onClick={approval}>
          {props.approval}
        </button>
      </td>
      <td className="traderrequest__table__body__deny">
        <button type="button" className="table__btn__red" onClick={deny}>
          {props.deny}
        </button>
      </td>
    </React.Fragment>
  );
}

export default TraderPaymentRequestItem;
