import React, { useState } from "react";
import axios from "axios";
import "./AddFaq.scss";
import router from "next/router";

function AddFaq(props) {
  const [categoryCode, setCategoryCode] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function addFaq() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "POST",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/faq",
      headers,
      data: {
        categoryCode: categoryCode,
        title: title,
        content: content,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("정상적으로 등록되었습니다.");
          router.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(addFaq);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("오류가 발생하였습니다.");
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <div
        className="addfaq__wrapper"
        onClick={() => {
          props.setModal(false);
        }}
      ></div>
      <div className="addfaq">
        <div className="addfaq__header">
          <span className="addfaq__header__title">추가하기</span>
          <img
            className="addfaq__header__img"
            src="/assets/x-sign.png"
            alt="close"
            onClick={() => {
              props.setModal(false);
            }}
          />
        </div>
        <form className="addfaq__option">
          <input
            type="radio"
            name="option"
            id="common"
            onChange={() => {
              setCategoryCode(101);
            }}
          />
          <label htmlFor="common">공통</label>
          <input
            type="radio"
            name="option"
            id="member"
            onChange={() => {
              setCategoryCode(102);
            }}
          />
          <label htmlFor="member">회원</label>
          <input
            type="radio"
            name="option"
            id="trader"
            onChange={() => {
              setCategoryCode(103);
            }}
          />
          <label htmlFor="trader">트레이더</label>
        </form>
        <div className="addfaq__title">
          <span className="addfaq__title__span">제목</span>
          <input
            type="text"
            className="addfaq__title__input"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="addfaq__content">
          <span className="addfaq__content__span">답변</span>
          <textarea
            className="addfaq__content__input"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          className="addfaq__btn"
          onClick={() => {
            addFaq();
          }}
        >
          추가하기
        </button>
      </div>
    </React.Fragment>
  );
}

export default AddFaq;
