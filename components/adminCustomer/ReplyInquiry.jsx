import axios from "axios";
import React, { useState } from "react";
import Lee from "../../lib/Lee";
import "../../pages/primeadmin/modal/ReplyInquiry.scss";

function ReplyInquiry(props) {
  const data = props.data;
  const [answer, setAnswer] = useState();

  function answerInquiry() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/inquiry/${props.id}`,
      headers,
      data: {
        answer: answer,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("답변이 성공적으로 등록되었습니다.");
          props.setModal(false);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(answerInquiry);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생하였습니다.");
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <div
        className="reply-inquiry__wrapper"
        onClick={() => props.setModal(false)}
      ></div>
      <div className="reply-inquiry">
        <div className="reply-inquiry__info">
          <div className="reply-inquiry__info__name">
            이름 <span className="reply-inquiry__text">{data.name}</span>
          </div>
          <div className="reply-inquiry__info__email">
            이메일
            <span className="reply-inquiry__text">{data.email}</span>
          </div>
        </div>
        <div className="reply-inquiry__title">
          제목 <span className="reply-inquiry__text">{data.title}</span>
        </div>
        <textarea
          cols="30"
          rows="10"
          className="reply-inquiry__answer"
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        ></textarea>
        <button
          className="reply-inquiry__btn"
          onClick={() => {
            answerInquiry();
          }}
        >
          완료
        </button>
        <img
          src="/assets/x-sign.png"
          alt="close"
          className="reply-inquiry__close"
          onClick={() => {
            props.setModal(false);
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default ReplyInquiry;
