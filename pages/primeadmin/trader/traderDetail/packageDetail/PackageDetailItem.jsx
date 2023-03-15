import React, { useState } from "react";
import Lee from "../../../../../lib/Lee";

function PackageDetailItem(props) {
  const [modal, setModal] = useState(true);
  const showModal = () => {
    setModal(true);
    props.getPackageModal(modal);
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
      status = "구독 승인 대기";
      break;
    case 1:
      status = "구독 완료";
      break;
    case 2:
      status = "구독 취소 대기";
      break;
    case 3:
      status = "취소 완료";
      break;
    default:
      status = "none";
  }

  return (
    <React.Fragment>
      <td className="packagedetail__tbody__package">{props.packageName}</td>
      <td className="packagedetail__tbody__traderuid">{props.packageId}</td>
      <td className="packagedetail__tbody__packageprice">
        {Lee.addComma(props.price)}원
      </td>
      <td className="packagedetail__tbody__more">
        <img
          src="/assets/admin_more.png"
          alt="more"
          className="packagedetail__tbody__more__img"
          onClick={() => {
            showModal();
            setDetail();
          }}
        />
      </td>
    </React.Fragment>
  );
}

export default PackageDetailItem;
