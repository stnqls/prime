import React, { useState } from "react";
import Lee from "../../../../../lib/Lee";

function SubscribeDetailItem(props) {
  const [modal, setModal] = useState(true);
  const showModal = () => {
    setModal(true);
    props.getSubscribeModal(modal);
  };

  let tradername = props.traderNickname;
  let packagename = props.packageName;
  let packageprice = props.price;
  let description = props.description;
  const setDetail = () => {
    props.getDetail({
      traderName: tradername,
      packageName: packagename,
      packagePrice: packageprice,
      description: description,
    });
  };

  let status = props.status;
  switch (status) {
    case 0:
      status = "결제승인 대기";
      break;
    case 1:
      status = "결제 완료";
      break;
    case 2:
      status = "환불승인 대기";
      break;
    case 3:
      status = "환불완료";
      break;
    case 4:
      status = "정산승인 대기";
      break;
    case 5:
      status = "정산완료";
      break;
    case 9:
      status = "결제 취소";
      break;
    default:
      status = "none";
  }

  return (
    <React.Fragment>
      <td className="subscribedetail__tbody__tradernickname">
        {props.traderNickname}
      </td>
      <td className="subscribedetail__tbody__package">{props.packageName}</td>
      <td className="subscribedetail__tbody__traderuid">{props.traderId}</td>
      <td className="subscribedetail__tbody__startdate">
        {props.status === 9 ? "-" : props.purchaseDate}
      </td>
      <td className="subscribedetail__tbody__enddate">
        {props.status === 9 ? "-" : props.expireDate}
      </td>
      <td className="subscribedetail__tbody__packageprice">
        {Lee.addComma(props.price)}원
      </td>
      <td className="subscribedetail__tbody__status">{status}</td>
      <td className="subscribedetail__tbody__more">
        <img
          src="/assets/admin_more.png"
          alt="more"
          className="subscribedetail__tbody__more__img"
          onClick={() => {
            showModal();
            setDetail();
          }}
        />
      </td>
    </React.Fragment>
  );
}

export default SubscribeDetailItem;
