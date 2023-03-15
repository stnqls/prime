import React, { useEffect, useState } from "react";
import "./UserListItem.scss";
import axios from "axios";
import Lee from "../../../../lib/Lee";

function UserListItem(props) {
  const [role, setRole] = useState(props.role);

  useEffect(() => {
    setRole(props.role);
  }, []);

  useEffect(() => {
    setRole(props.role);
  }, [props.page]);

  function changeTrader(uid) {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "PATCH",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/traders",
      headers,
      data: {
        memberId: uid,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("트레이더로 전환되었습니다.");
          setRole("trader");
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
  return (
    <React.Fragment>
      <td>{props.name}</td>
      <td>{props.nickname}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
      <td>{props.uid}</td>
      <td>
        {role === "member" ? (
          <button
            className="userlistitem__button"
            onClick={() => changeTrader(props.uid)}
          >
            전환하기
          </button>
        ) : null}
      </td>
    </React.Fragment>
  );
}

export default UserListItem;
