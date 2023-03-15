import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import DelayLink from "../../lib/DelayLink";
import Lee from "../../lib/Lee";

import NotificationItem from "./NotificationItem";
import "./Notification.scss";

const Notification = (props: any) => {
  // const alert = props.alert;
  const [alert, setAlert]: any = useState([]);

  function deleteAlert() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/users/alert?alertId=${""}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setAlert([]);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(deleteAlert);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
      });
  }

  useEffect(() => {
    setAlert(props.alert);
  }, []);

  return (
    <div className="notification">
      <div className="notification__top">
        <div className="notification__top__count">
          알림 ({props.alert.length})
        </div>
        {alert.length > 0 && (
          <div
            className="notification__top__all"
            onClick={() => {
              deleteAlert();
            }}
          >
            모두읽음
          </div>
        )}
      </div>
      <ul className="notification__list">
        {alert.length > 0 ? (
          alert.map((item: any, idx: number) => (
            <NotificationItem
              key={`notification-list-${idx}`}
              senderNickname={item.senderNickname}
              packageName={item.packageName}
              writerNickname={item.writerNickname}
              date={item.date}
              categoryCode={item.categoryCode}
              id={item.id}
            />
          ))
        ) : (
          <li className="notification__list__none">알림이 없습니다.</li>
        )}
      </ul>
      <Link href="/user?page=alert">
        <div className="notification__bottom">알림 목록</div>
      </Link>
    </div>
  );
};

export default Notification;
