import React from "react";
import Lee from "../../../../lib/Lee";
import axios from "axios";

function TraderPaymentDetailsItem(props) {
  let status;

  if (props.status === 0) {
    status = "승인 요청 중";
  } else if (props.status === 1) {
    status = "정산 승인";
  } else if (props.status === 2) {
    status = "정산 거절";
  } else {
    status = "승인 요청 중";
  }

  // function cancel() {
  //   const headers = {
  //     authorization: window.sessionStorage.getItem("accessToken"),
  //   };

  //   axios({
  //     method: "PATCH",
  //     url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/withdrawals/denied",
  //     headers,
  //     data: {
  //       withdrawalId: props.id,
  //     },
  //   })
  //     .then((res) => {
  //       alert("해당 정산에 대해 취소 처리가 완료되었습니다.");
  //       location.reload();
  //     })
  //     .catch((err) => {
  //       window.alert("에러");
  //     });
  // }

  return (
    <React.Fragment>
      <td className="traderdetails__table__body__name">{props.name}</td>
      <td className="traderdetails__table__body__phone">{props.phone}</td>
      <td className="traderdetails__table__body__package">
        {props.packageName}
      </td>
      <td className="traderdetails__table__body__price">
        {props.price > 0 ? Lee.addComma(props.price) : 0}원
      </td>
      <td className="traderdetails__table__body__date">{props.date}</td>
      <td className="traderdetails__table__body__status">{status}</td>
      {/* {props.status === 1 ? (
        <td className="traderdetails__table__body__approval">
          <button type="button" className="table__btn reject" onClick={cancel}>
            취소하기
          </button>
        </td>
      ) : null} */}
    </React.Fragment>
  );
}

export default TraderPaymentDetailsItem;
