import React from "react";
import Lee from "../../../../lib/Lee";

function UserPaymentDetailsItem(props) {
  let status = props.status;
  let date;
  switch (status) {
    case 0:
      status = "결제 승인 대기";
      date = props.requestDate;
      break;
    case 1:
      status = "결제 완료";
      date = props.purchaseDate;
      break;
    case 2:
      status = "환불 승인 대기";
      date = props.refundDate;
      break;
    case 3:
      status = "환불 완료";
      date = props.refundDate;
      break;
    case 4:
      status = "정산승인 대기";
      date = props.expireDate;
      break;
    case 5:
      status = "정산 완료";
      date = props.expireDate;
      break;
    case 9:
      status = "결제 취소";
      date = props.requestDate;
      break;
    default:
      status = "none";
      date;
  }
  let method = props.method;
  if (method === "bank") {
    method = "계좌이체";
  } else {
    method = "카드결제";
  }
  return (
    <React.Fragment>
      <td className="userdetails__table__body__name">{props.name}</td>
      <td className="userdetails__table__body__phone">{props.phone}</td>
      <td className="userdetails__table__body__id">{props.packageName}</td>
      <td className="userdetails__table__head__method">{method}</td>
      {props.status === 3 ? (
        <td className="userdetails__table__body__price">
          {Lee.addComma(props.price)} / {Lee.addComma(props.refundAmount)}원
        </td>
      ) : (
        <td className="userdetails__table__body__price">
          {Lee.addComma(props.price)}원
        </td>
      )}
      <td className="userdetails__table__body__date">{date}</td>
      <td className="userdetails__table__body__status">{status}</td>
    </React.Fragment>
  );
}
export default UserPaymentDetailsItem;
