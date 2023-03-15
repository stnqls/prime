import React, { useEffect, useState } from "react";
import "./TraderListItem.scss";
import axios from "axios";
import Lee from "../../../../lib/Lee";
import router from "next/router";

function TraderListItem(props) {
  const [role, setRole] = useState();

  useEffect(() => {
    setRole(props.role);
  }, []);

  function changeUser(uid) {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "PATCH",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/users",
      headers,
      data: {
        traderId: uid,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("일반멤버로 전환되었습니다.");
          router.reload();
          setRole("member");
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(change);
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
      {/* <td>{props.date}</td> */}
      {/* <td
        className="traderlistitem__table__more"
        onClick={() => props.setModal(true)}
        >
        <div className="traderlistitem__table__more__contain">
        <img
        src={props.more}
        alt="more"
        className="traderlistitem__table__more__contain__img"
        />
        </div>
      </td> */}
      {/* <td>
        {role === "trader" ? (
          <button
            className="userlistitem__button"
            onClick={() => changeUser(props.uid)}
          >
            전환하기
          </button>
        ) : null}
      </td> */}
      <td>
        <button
          className="userlistitem__button"
          onClick={() => changeUser(props.uid)}
        >
          전환하기
        </button>
      </td>
    </React.Fragment>
  );
}

export default TraderListItem;
