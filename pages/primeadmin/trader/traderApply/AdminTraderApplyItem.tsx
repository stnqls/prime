import { useState } from "react";
import axios from "axios";
import Lee from "../../../../lib/Lee";

const AdminTraderApplyItem = (props: any) => {
  function changeTrader(uid: string) {
    const headers: any = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "PATCH",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/users/apply_trader/allowed",
      headers,
      data: {
        memberId: uid,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("트레이더로 전환되었습니다.");
          location.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(changeTrader);
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

  function denyTrader(uid: string) {
    const headers: any = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "PATCH",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/users/apply_trader/denied",
      headers,
      data: {
        memberId: uid,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("거절이 완료되었습니다.");
          location.reload();
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
        console.log(err);
      });
  }

  return (
    <tr className="admin-trader-apply__table__body__tr">
      <td>{props.name}</td>
      <td>{props.nickname}</td>
      <td>{props.phoneNumber}</td>
      <td>{props.email}</td>
      <td>{props.date}</td>
      <td className="admin-trader-apply__table__body__btns">
        <button
          className="admin-trader-apply__table__body__btns__accept"
          onClick={() => {
            changeTrader(props.id);
          }}
        >
          수락
        </button>
        <button
          className="admin-trader-apply__table__body__btns__deny"
          onClick={() => {
            denyTrader(props.id);
          }}
        >
          거절
        </button>
      </td>
    </tr>
  );
};

export default AdminTraderApplyItem;
