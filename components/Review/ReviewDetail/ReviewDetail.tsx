import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import router from "next/router";
import DelayLink from "../../../lib/DelayLink";
import Lee from "../../../lib/Lee";

import "./ReviewDetail.scss";

const ReviewDetail = (props: any) => {
  const [review, setReview]: any = useState({
    packageName: "",
    traderAvatar: "",
    traderNickname: "",
    memberNickname: "",
    traderId: "",
  });
  const [modify, setModify] = useState(false);
  const [description, setDescription] = useState("");
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [rating, setRating]: any = useState(0);
  const [isMine, setIsMine] = useState();
  const [date, setDate] = useState();

  function starRate(rating: any) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={`total-review-detail-star${i}`}>
          <FaStar />
        </span>
      );
    }
    return stars;
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
  //리뷰 가져오기
  function getReviewDetail() {
    const headers: any = {
      authorization: Lee.checkLogin()
        ? window.sessionStorage.getItem("token")
        : "",
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews/${props.id}`,
      headers,
    })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          setReview(data);
          starClick(data.rating - 1);
          setIsMine(data.isMine);
          setDescription(data.description);
          setRating(data.rating);
          setDate(data.date);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getReviewDetail);
          } else {
            alert("에러가 발생했습니다. 다시 시도해주세요.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert("에러가 발생했습니다.");
      });
  }

  //리뷰 수정

  function modifyReviewDetail() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews/${props.id}`,
      headers,
      data: {
        rating: rating,
        description: description,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setDescription(res.data.data.description);
          setRating(res.data.data.rating);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(modifyReviewDetail);
          } else {
            alert("에러가 발생했습니다. 다시 시도해주세요.");
          }
        }
      })
      .catch((err) => {
        alert("에러가 발생했습니다.");
      });
  }

  //리뷰 삭제
  function deleteReview() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews`,
      headers,
      data: {
        reviewIds: [props.id],
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("이용후기가 삭제되었습니다.");
          router.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(deleteReview);
          } else {
            alert("에러가 발생했습니다. 다시 시도해주세요.");
          }
        }
      })
      .catch((err) => {
        alert("에러가 발생했습니다.");
      });
  }

  useEffect(() => {
    getReviewDetail();
  }, []);

  return (
    <React.Fragment>
      <div
        className="review-detail__cover"
        onClick={() => {
          props.setViewDetail(false);
        }}
      ></div>
      <div className="review-detail">
        <div className="review-detail__content">
          <img
            src="/assets/x-sign.png"
            alt="close"
            className="review-detail__content__close"
            onClick={() => {
              props.setViewDetail(false);
            }}
          />
          <div className="review-detail__content__package">
            {review.packageName}
          </div>
          <div className="review-detail__content__trader">
            <div className="review-detail__content__trader__name">
              <div className="review-detail__content__trader__name__avatar">
                <img src={review.traderAvatar} alt="traderAvatar" />
              </div>
              {review.traderNickname}
            </div>
            {/* <DelayLink
              to={`viewTrader?uid=${review.traderId}`}
              delay={200}
              onDelayStart={Lee.loadingStart}
            > */}
            {!modify && (
              <div
                className="review-detail__content__trader__btn"
                onClick={() => {
                  props.setViewDetail(false);
                  router.push(`viewTrader?uid=${review.traderId}`);
                }}
              >
                트레이더 정보
              </div>
            )}
            {/* </DelayLink> */}
          </div>
          {modify ? (
            <ul className="review-detail__content__star-modify">
              <li className="review-detail__content__star-modify__star">
                <FaStar
                  onClick={() => starClick(0)}
                  className={clicked[0] ? "clickedStar" : null || undefined}
                />
              </li>
              <li className="review-detail__content__star-modify__star">
                <FaStar
                  onClick={() => starClick(1)}
                  className={clicked[1] ? "clickedStar" : null || undefined}
                />
              </li>
              <li className="review-detail__content__star-modify__star">
                <FaStar
                  onClick={() => starClick(2)}
                  className={clicked[2] ? "clickedStar" : null || undefined}
                />
              </li>
              <li className="review-detail__content__star-modify__star">
                <FaStar
                  onClick={() => starClick(3)}
                  className={clicked[3] ? "clickedStar" : null || undefined}
                />
              </li>
              <li className="review-detail__content__star-modify__star">
                <FaStar
                  onClick={() => starClick(4)}
                  className={clicked[4] ? "clickedStar" : null || undefined}
                />
              </li>
            </ul>
          ) : (
            <div className="review-detail__content__star">
              {starRate(rating)}
            </div>
          )}
          {modify ? (
            <textarea
              name=""
              id=""
              className="review-detail__content__context-modify"
              defaultValue={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          ) : (
            <div className="review-detail__content__context">{description}</div>
          )}
          <div className="review-detail__content__write">
            <div className="review-detail__content__write__name">
              {review.memberNickname}
            </div>
            <div className="review-detail__content__write__date">{date}</div>
          </div>
          {isMine && (
            <ul className="review-detail__content__btns">
              {modify ? (
                <li
                  className="review-detail__content__btns__btn"
                  onClick={() => {
                    setModify(false);
                    modifyReviewDetail();
                  }}
                >
                  완료
                </li>
              ) : (
                <li
                  className="review-detail__content__btns__btn"
                  onClick={() => {
                    setModify(true);
                  }}
                >
                  수정
                </li>
              )}
              <li
                className="review-detail__content__btns__btn"
                onClick={() => {
                  deleteReview();
                }}
              >
                삭제
              </li>
            </ul>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReviewDetail;
