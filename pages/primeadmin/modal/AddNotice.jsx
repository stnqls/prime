import axios from "axios";
import router from "next/router";
import React, { useState } from "react";
import Lee from "../../../lib/Lee";
import "./AddNotice.scss";

function AddNotice(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function addNotice() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "POST",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/notice",
      headers,
      data: {
        title: title,
        content: content,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("정상적으로 등록되었습니다."), router.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(addNotice);
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

  return (
    <React.Fragment>
      <div
        className="addnotice__wrapper"
        onClick={() => {
          props.setModal(false);
        }}
      ></div>
      <div className="addnotice">
        <div className="addnotice__header">
          <span className="addnotice__header__title">추가하기</span>
          <img
            src="/assets/x-sign.png"
            alt="close"
            className="addnotice__header__img"
            onClick={() => {
              props.setModal(false);
            }}
          />
        </div>
        <div className="addnotice__title">
          <span className="addnotice__title__span">제목</span>
          <input
            type="text"
            className="addnotice__title__input"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="addnotice__content">
          <span className="addnotice__content__span">답변</span>
          <textarea
            className="addnotice__content__input"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <button className="addnotice__btn" onClick={() => addNotice()}>
          추가하기
        </button>
      </div>
    </React.Fragment>
  );
}

export default AddNotice;
