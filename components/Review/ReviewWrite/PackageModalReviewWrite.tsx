import React, { useEffect, useState } from "react";
import Router from "next/router";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import axios from "axios";
import { FaStar } from "react-icons/fa";

import "./PackageModalReviewWrite.scss";

const PackageModalReviewWrite = (props: any) => {
  const [process, setProcess] = useState(false);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [rating, setRating]: any = useState(0);
  const [count, setCount] = useState(0);
  const [description, setDescription]: any = useState();

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
      ".package-modal-review-write__contents__textarea"
    );
    const output: any = document.querySelector(
      ".package-modal-review-write__contents__textarea__count__number"
    );
    textArea.addEventListener("input", count);
    function count(e: any) {
      textArea = e.target;
      const num = textArea.textLength;
      output.value = num;
    }
    setCount(output.value);
  }

  const checkReview = () => {
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
  };

  const submitReview = () => {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "POST",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews`,
      headers,
      data: {
        traderId: props.traderId,
        rating: rating,
        description: description,
        subscriptionId: props.packageId,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setProcess(true);
          setTimeout(() => {
            alert("후기가 정상적으로 등록되었습니다.");
            window.location.reload();
          }, 2000);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(submitReview);
          } else if (res.data.errCode === "002") {
            alert("리뷰 작성 기간이 만료되었습니다.");
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  };

  return (
    <div
      className="package-modal-review-write"
      id="UserPackageListItemModalReview"
    >
      {process && (
        <div className="package-modal-review-write__process">
          <div className="package-modal-review-write__process__contents">
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
            <div className="package-modal-review-write__process__contents__text">
              패키지 후기를 등록하고 있습니다.
            </div>
          </div>
        </div>
      )}

      <div
        className="package-modal-review-write__hide"
        onClick={function () {
          props.setView(false);
        }}
      />
      <div className="package-modal-review-write__contents">
        <img
          className="package-modal-review-write__contents__close"
          src="/assets/x-sign.png"
          alt="x-sign"
          onClick={function () {
            props.setView(false);
          }}
        />

        <div className="package-modal-review-write__contents__package">
          {props.packageName}
        </div>
        <div className="package-modal-review-write__contents__trader">
          <div className="package-modal-review-write__contents__trader__avatar">
            <img src={props.traderAvatar} alt="avatar" />
          </div>
          <div className="package-modal-review-write__contents__trader__nickname">
            {props.traderName}
          </div>
        </div>

        <div className="package-modal-review-write__contents__star">
          <ul className="package-modal-review-write__contents__star__list">
            <li>
              <FaStar
                size="43px"
                onClick={() => starClick(0)}
                className={clicked[0] ? "clickedStar" : null || undefined}
              />
            </li>
            <li>
              <FaStar
                size="43px"
                onClick={() => starClick(1)}
                className={clicked[1] ? "clickedStar" : null || undefined}
              />
            </li>
            <li>
              <FaStar
                size="43px"
                onClick={() => starClick(2)}
                className={clicked[2] ? "clickedStar" : null || undefined}
              />
            </li>
            <li>
              <FaStar
                size="43px"
                onClick={() => starClick(3)}
                className={clicked[3] ? "clickedStar" : null || undefined}
              />
            </li>
            <li>
              <FaStar
                size="43px"
                onClick={() => starClick(4)}
                className={clicked[4] ? "clickedStar" : null || undefined}
              />
            </li>
          </ul>
        </div>

        <div className="package-modal-review-write__contents__textarea">
          <textarea
            placeholder="이용하신 패키지에 대한 후기를 작성해주세요."
            maxLength={199}
            onKeyUp={counting}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <p className="package-modal-review-write__contents__textarea__count">
            (
            <output className="package-modal-review-write__contents__textarea__count__number">
              {count}
            </output>
            /200)
          </p>
        </div>

        <div
          className="package-modal-review-write__contents__submit"
          onClick={checkReview}
        >
          등록하기
        </div>
      </div>
    </div>
  );
};

export default PackageModalReviewWrite;
