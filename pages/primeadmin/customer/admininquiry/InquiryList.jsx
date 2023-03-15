import React from "react";
import Link from "next/link";
import axios from "axios";

function InquiryList(props) {
  let category = props.categoryCode;
  switch (category) {
    case "201":
      category = "일반회원";
      break;
    case "202":
      category = "트레이더";
      break;
  }
  let status = props.status;
  switch (status) {
    case 0:
      status = "안읽음";
      break;
    case 1:
      status = "읽음";
      break;
    case 2:
      status = "답변완료";
      break;
  }

  return (
    <Link
      href={{
        pathname: "/primeadmin",
        query: {
          page: "adminInquiryDetail",
          id: props.id,
        },
      }}
    >
      <tr className="admin-inquiry__table__body__tr">
        <td className="admin-inquiry__table__body__member">
          {props.memberId ? props.memberId : "비회원"}
        </td>
        <td className="admin-inquiry__table__body__name">{props.name}</td>
        <td className="admin-inquiry__table__body__email">{props.email}</td>
        <td className="admin-inquiry__table__body__category">{category}</td>
        <td className="admin-inquiry__table__body__title">{props.title}</td>
        <td className="admin-inquiry__table__body__date">{props.date}</td>
        <td className="admin-inquiry__table__body__status"> {status}</td>
      </tr>
    </Link>
  );
}

export default InquiryList;
