import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import Lee from "../lib/Lee";

import "../styles/pages/partnership.scss";

function Partnership() {
  const [count, setCount] = useState(0);
  const [countTitle, setCountTitle] = useState(0);
  const [isChecked, setIsChecked] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [required, setRequired] = useState(false);

  function counting(e: any) {
    const textArea = e.target;
    const length = textArea.textLength;
    setCount(length);
  }
  function countingTitle(e: any) {
    const textArea = e.target;
    const length = textArea.textLength;
    setCountTitle(length);
  }

  // function change() {
  //   const requiredInput: any = document.querySelectorAll(".requiredInput");

  //
  //   for (let i = 0; i < requiredInput.length; i++) {
  //     if (
  //       requiredInput[i].value !== undefined &&
  //       requiredInput[i].value.length >= 1
  //     ) {
  //       if (i === requiredInput.length - 1) {
  //         setRequired(false);
  //       }
  //       continue;
  //     } else {
  //       setRequired(true);
  //       break;
  //     }
  //   }
  // }

  // 사업제휴 등록하기
  function submitPartner() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "POST",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/customers/partner",
      headers,
      data: {
        title: title,
        content: content,
        name: name,
        phoneNumber: phoneNumber,
        email: email,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("정상적으로 등록되었습니다.");
          Router.reload();
        } else {
          if (res.data.errCode == "101") {
            Lee.refreshToken(submitPartner);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("빈칸을 채워주세요.");
        } else {
          alert("일시적인 오류입니다. 다시 시도해주세요.");
        }
      });
  }

  return (
    <div className="partnership">
      <div className="inner">
        <div className="partnership__title">사업제휴</div>
        <div className="partnership__user">
          <div className="partnership__user__name">
            <label htmlFor="" className="partnership__label">
              이름
              <span className="partnership__necessary">*</span>
              <div className="partnership__user__name__mex">
                *입력 항목은 필수 입력 항목입니다.
              </div>
            </label>
            <input
              type="text"
              className="partnership__user__input requiredInput"
              placeholder="성함을 정확히 기재해 주세요."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="partnership__user__phone">
            <label htmlFor="" className="partnership__label">
              연락처
              <span className="partnership__necessary">*</span>
            </label>
            <input
              type="text"
              className="partnership__user__input requiredInput"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              maxLength={13}
            />
          </div>
          <div className="partnership__user__email">
            <label htmlFor="" className="partnership__label">
              이메일
              <span className="partnership__necessary">*</span>
            </label>
            <input
              type="text"
              className="partnership__user__input requiredInput"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="partnership__container">
          <div className="partnership__container__title">
            <label htmlFor="" className="partnership__label">
              제목
              <span className="partnership__necessary">*</span>
            </label>
            <textarea
              placeholder="제목을 입력해 주세요."
              maxLength={30}
              className="partnership__container__title__input requiredInput"
              onKeyUp={(e) => {
                countingTitle(e);
              }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <p className="partnership__container__title__count">
              <output className="ps__text__textarea__result">
                {countTitle}
              </output>
              /30
            </p>
          </div>
          <div className="partnership__container__text">
            <label htmlFor="" className=" partnership__label">
              내용
              <span className="partnership__necessary">*</span>
            </label>
            <textarea
              className="partnership__container__text__textarea requiredInput"
              onKeyUp={(e) => {
                counting(e);
              }}
              maxLength={1000}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder="내용을 입력해 주세요."
            ></textarea>
            <p className="partnership__container__text__textarea__count">
              <output className="ps__text__textarea__result">{count}</output>
              /1,000
            </p>
          </div>
        </div>
        <div
          className="partnership__agree"
          onClick={() => {
            setIsChecked(!isChecked);
          }}
        >
          <img
            src={isChecked ? "/assets/check.png" : "/assets/check_x.png"}
            alt="check"
          />
          <div className="partnership__agree__text">
            프라임인베스트먼트 <span>개인정보수집및이용</span>의 내용을
            확인하였으며, 이에 동의합니다.
          </div>
        </div>
        <button
          className="partnership__btn"
          onClick={() => {
            submitPartner();
          }}
        >
          등록
        </button>
      </div>
    </div>
  );
}

export default Partnership;
