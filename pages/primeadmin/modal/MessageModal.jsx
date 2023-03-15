import React, { useState, useEffect } from "react";
import axios from "axios";
import Lee from "../../../lib/Lee";

import "./MessageModal.scss";
import AdminMessageContents from "../../../components/Message/MessageContents/AdminMessageContents";

function MessageModal(props) {
  const [message, setMessage] = useState([]);

  const traderId = props.traderId;
  const memberId = props.memberId;

  function getMessages() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/messages?traderId=${traderId}&memberId=${memberId}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setMessage(res.data.data);
        } else {
          if ((res.data.errCode = "101")) {
            Lee.refreshToken(getMessages);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  }

  useEffect(() => {
    getMessages();
  }, [traderId, memberId]);

  return (
    <React.Fragment>
      <div
        className="admin-message-modal__hide"
        onClick={() => {
          props.setModal(false);
        }}
      ></div>
      <div className="admin-message-modal">
        <div className="admin-message-modal__title">
          멤버 {props.memberName} - 트레이더 {props.traderName}의 쪽지함
        </div>
        <img
          className="admin-message-modal__close"
          src="/assets/x-sign.png"
          alt="x-sign"
          onClick={function () {
            props.setModal(false);
          }}
        />
        <div className="admin-message-modal__body">
          <div className="admin-message-modal__body__content">
            <AdminMessageContents message={message} traderId={traderId} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MessageModal;
