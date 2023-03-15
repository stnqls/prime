import React, { useEffect, useState } from "react";
import axios from "axios";
import router from "next/router";
import Lee from "../lib/Lee";
import AlertItem from "../components/Alert/AlertItem";
import "../styles/pages/Alert.scss";

const Alert = () => {
  const [alert, setAlert]: any = useState([]);

  function getAlert() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/users/alert",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setAlert(res.data.data);
          console.log(res);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getAlert);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
      });
  }
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
    const alertList = getAlert();
    return () => alertList;
  }, []);

  return (
    <div className="alert">
      <div className="alert__header">
        <div className="alert__header__title">알림목록</div>
      </div>
      <ul className="alert__menu">
        <li className="alert__menu__item">알림({alert.length})</li>
        <li
          className="alert__menu__item"
          onClick={() => {
            deleteAlert();
          }}
        >
          모두읽음
        </li>
      </ul>
      <ul className="alert__list">
        {alert.map((item: any, index: number) => (
          <AlertItem
            key={`alert__list-${index}`}
            categoryCode={item.categoryCode}
            date={item.date}
            packageName={item.packageName}
            senderNickname={item.senderNickname}
            writerNickname={item.writerNickname}
            id={item.id}
            boardId={item.boardId}
            boardCategoryCode={item.boardCategoryCode}
          />
        ))}
      </ul>
    </div>
  );
};

export default Alert;
