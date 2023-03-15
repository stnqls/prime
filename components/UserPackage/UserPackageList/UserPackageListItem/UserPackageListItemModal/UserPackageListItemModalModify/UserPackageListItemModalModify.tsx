import React, { useEffect, useState } from "react";
import Router from "next/router";
import Lee from "../../../../../../lib/Lee";
import DelayLink from "../../../../../../lib/DelayLink";
import axios from "axios";
import { FaStar } from "react-icons/fa";

import "./UserPackageListItemModalModify.scss";

const UserPackageListItemModalModify = (props: any) => {
  const [process, setProcess] = useState(false);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [rating, setRating]: any = useState(0);
  const [count, setCount] = useState(0);
  const [description, setDescription]: any = useState();

  useEffect(() => {
    getReviewDetail();
  }, []);

  function getReviewDetail() {
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews/${props.reviewId}
      `,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          starClick(data.rating - 1);
          setDescription(data.description);
          setCount(data.description.length);
        } else {
          alert("후기에 대한 정보를 불러올 수 없습니다.");
        }
      })
      .catch((err) => {
        window.alert("서버 오류가 발생하였습니다.");
      });
  }

  function starClick(index: any) {
    let clickStates = [...clicked];
    setRating(0);
    let count = 0;

    if (index === 0 && clickStates[0] && !clickStates[1]) {
      clickStates[0] = !true;
    } else {
      for (let i = 0; i < 5; i++) {
        if (i <= index) {
          clickStates[i] = true;
          count++;
        } else {
          clickStates[i] = false;
        }
      }
    }
    setRating(count);
    setClicked(clickStates);
  }

  function counting() {
    let textArea: any = document.querySelector(
      ".user-package-list-item-modal-modify__contents__textarea textarea"
    );
    const output: any = document.querySelector(
      ".user-package-list-item-modal-modify__contents__textarea__count__number"
    );
    textArea.addEventListener("input", count);
    function count(e: any) {
      textArea = e.target;
      const num = textArea.textLength;
      output.value = num;
    }
    setCount(output.value);
  }

  function checkReview() {
    if (Lee.checkLogin()) {
      if (!rating || rating === 0) {
        alert("별점이 입력되지 않았습니다 별을 선택해주세요.");
      } else {
        if (
          description === null ||
          description === "" ||
          description === undefined
        ) {
          alert("패키지에 대한 후기를 작성해주세요.");
        } else {
          submitReview();
        }
      }
    }
  }

  function submitReview() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews/${props.reviewId}`,
      headers,
      data: {
        rating: rating,
        description: description,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setProcess(true);
          setTimeout(() => {
            alert("후기가 정상적으로 수정되었습니다.");
            window.location.reload();
          }, 2000);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(submitReview);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  function removeReview() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews/${props.reviewId}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setProcess(true);
          setTimeout(() => {
            alert("후기가 정상적으로 삭제되었습니다.");
            window.location.reload();
          }, 2000);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(removeReview);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  return (
    <div
      className="user-package-list-item-modal-modify"
      id="UserPackageListItemModalModify"
    >
      {process && (
        <div className="user-package-list-item-modal-modify__process">
          <div className="user-package-list-item-modal-modify__process__contents">
            <svg>
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="red"
                strokeDasharray="78.5 235.5"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="blue"
                strokeDasharray="62.8 188.8"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                stroke="green"
                strokeDasharray="47.1 141.3"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <div className="user-package-list-item-modal-modify__process__contents__text">
              요청하신 데이터를 처리 중입니다.
            </div>
          </div>
        </div>
      )}

      <div
        className="user-package-list-item-modal-modify__hide"
        onClick={function () {
          props.setView(false);
        }}
      />
      <div className="user-package-list-item-modal-modify__contents">
        <div className="user-package-list-item-modal-modify__contents__category">
          후기 수정
        </div>

        <img
          className="user-package-list-item-modal-modify__contents__close"
          src="/assets/x-sign.png"
          alt="x-sign"
          onClick={function () {
            props.setView(false);
          }}
        />

        <div className="user-package-list-item-modal-modify__contents__context parents">
          <div className="user-package-list-item-modal-modify__contents__context__trader">
            <div className="user-package-list-item-modal-modify__contents__context__trader__avatar">
              <img src={props.traderAvatar} alt="avatar" />
            </div>
            <div className="user-package-list-item-modal-modify__contents__context__trader__info">
              <div className="user-package-list-item-modal-modify__contents__context__trader__info__nickname">
                {props.traderName}
              </div>
              <div className="user-package-list-item-modal-modify__contents__context__trader__info__package">
                {/* {props.packageName} */}
                트레이더에게 후기를 남깁니다.
              </div>
            </div>
          </div>
        </div>

        <div className="service-container__write write">
          <ul className="write__star">
            <li>
              <FaStar
                size="35px"
                onClick={() => starClick(0)}
                className={clicked[0] ? "clickedStar" : null || undefined}
              />
            </li>
            <li>
              <FaStar
                size="35px"
                onClick={() => starClick(1)}
                className={clicked[1] ? "clickedStar" : null || undefined}
              />
            </li>
            <li>
              <FaStar
                size="35px"
                onClick={() => starClick(2)}
                className={clicked[2] ? "clickedStar" : null || undefined}
              />
            </li>
            <li>
              <FaStar
                size="35px"
                onClick={() => starClick(3)}
                className={clicked[3] ? "clickedStar" : null || undefined}
              />
            </li>
            <li>
              <FaStar
                size="35px"
                onClick={() => starClick(4)}
                className={clicked[4] ? "clickedStar" : null || undefined}
              />
            </li>
          </ul>
        </div>

        <div className="user-package-list-item-modal-modify__contents__textarea parents">
          <textarea
            placeholder="이용하신 패키지에 대한 후기를 작성해주세요."
            maxLength={199}
            onKeyUp={counting}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <p className="user-package-list-item-modal-modify__contents__textarea__count">
            (
            <output className="user-package-list-item-modal-modify__contents__textarea__count__number">
              {count}
            </output>
            /200)
          </p>
        </div>

        <div
          className="user-package-list-item-modal-modify__contents__submit"
          onClick={checkReview}
        >
          등록하기
        </div>

        <div
          className="user-package-list-item-modal-modify__contents__remove"
          onClick={removeReview}
        >
          삭제하기
        </div>
      </div>
    </div>
  );
};

export default UserPackageListItemModalModify;
