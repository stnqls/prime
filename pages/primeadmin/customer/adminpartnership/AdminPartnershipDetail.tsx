import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminPartnershipDetail.scss";

const AdminPartnershipDetail = (props: any) => {
  const [answer, setAnswer] = useState(false);
  const [id, setId] = useState(props.id);
  const [data, setData]: any = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [modifyAnswer, setModifyAnswer] = useState("");

  function getPartnerDetail() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/partner/${id}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setAnswerText(res.data.data.answer);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function partnerAnswer() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/partner/${id}`,
      headers,
      data: {
        answer: modifyAnswer,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setAnswerText(res.data.data.answer);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setId(props.id);
    getPartnerDetail();
  }, [id]);

  return (
    <React.Fragment>
      <div
        className="admin-partnership-detail-cover"
        onClick={() => {
          props.setOpenmodal(false);
        }}
      ></div>
      <div className="admin-partnership-detail">
        <img
          src="/assets/x-sign.png"
          alt="close"
          className="admin-partnership-detail__close"
          onClick={() => {
            props.setOpenmodal(false);
          }}
        />
        <div className="admin-partnership-detail__info">
          <div className="admin-partnership-detail__info__name">
            이름
            <span className="admin-partnership-detail__text">{data.name}</span>
          </div>
          <div className="admin-partnership-detail__info__email">
            이메일
            <span className="admin-partnership-detail__text">{data.email}</span>
          </div>
          <div className="admin-partnership-detail__info__phone">
            연락처
            <span className="admin-partnership-detail__text">
              {data.phoneNumber}
            </span>
          </div>
        </div>
        <div className="admin-partnership-detail__content">
          <div className="admin-partnership-detail__content__title">
            제목
            <div className="admin-partnership-detail__content__title__text">
              {data.title}
            </div>
          </div>
          <div className="admin-partnership-detail__content">내용</div>
          <div className="admin-partnership-detail__content__text">
            {data.content}
          </div>
          {answer ? (
            <button
              type="button"
              className="admin-partnership-detail__replybtn"
              onClick={() => {
                setAnswer(!answer);
                if (modifyAnswer.trim() === "") {
                  alert("내용을 입력하세요.");
                } else {
                  partnerAnswer();
                }
              }}
            >
              답변 완료
            </button>
          ) : (
            <button
              type="button"
              className="admin-partnership-detail__replybtn"
              onClick={() => {
                setAnswer(!answer);
              }}
            >
              답장하기
            </button>
          )}
        </div>
        {answer ? (
          <textarea
            className="admin-partnership-detail__answer"
            onChange={(e) => {
              setModifyAnswer(e.target.value);
            }}
            defaultValue={data.answer}
          ></textarea>
        ) : (
          <div className="admin-partnership-detail__answer-ready">
            {answerText}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AdminPartnershipDetail;
