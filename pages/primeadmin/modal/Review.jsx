import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Lee from "../../../lib/Lee";
import "./Review.scss";

function Review(props) {
  // 리뷰
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [rating, setRating] = useState(0);

  const [review, setReview] = useState();

  function starClick(index) {
    let clickStates = [...clicked];
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

  useEffect(() => {
    starClick(props.data.reviewRating - 1);
    setReview(props.data.reviewDescription);
    const scroll = window.scrollY;
    document.body.style.cssText = `
    position: fixed;
    top: -${scroll}px;
    overflow: hidden;
    width: 100%;
    height : auto;
    `;
    return () => {
      document.body.style.cssText = "";
      window.scrollTo(0, scroll);
    };
  }, []);

  // 리뷰 수정하기
  function modifyReview() {
    const headers = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/reviews/${props.data.reviewId}`,

      headers,
      data: {
        rating: rating,
        description: review,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setTimeout(() => {
            alert("리뷰가 성공적으로 수정되었습니다.");
            window.location.reload();
          }, 2000);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(modifyReview);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
        console.log(err);
      });
  }

  //리뷰 삭제하기
  function removeReview() {
    const headers = {
      authorization: window.sessionStorage.getItem("token"),
    };
    let data = {
      // memberId: props.memberId,
      // subscriptionId: [props.data.subscriptionId],
      reviewIds: [props.data.reviewId],
    };
    axios({
      method: "DELETE",
      url: ` https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/reviews`,
      headers,
      data: data,
    })
      .then((res) => {
        if (res.data.success) {
          alert("리뷰가 정상적으로 삭제되었습니다.");
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(removeReview);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }

        Lee.loadingStart();

        setTimeout(() => {
          window.location.reload();
        }, 400);
      })
      .catch((err) => {
        alert("일시적인 오류입니다. 다시 시도해 주세요.");
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <div className="wrapper">
        <div
          className="wrapper__close"
          onClick={() => {
            props.getReviewModal(false);
          }}
        />
        <div className="admin-review">
          <div className="admin-review__title">리뷰 상세정보</div>
          <div className="admin-review__content">
            <div className="admin-review__content__packagename">
              {props.data && props.data.packageName}
            </div>
            <ul className="admin-review__content__rating">
              <li>
                <FaStar
                  size="45px"
                  onClick={() => starClick(0)}
                  className={clicked[0] ? "clickedStar" : null}
                />
              </li>
              <li>
                <FaStar
                  size="45px"
                  onClick={() => starClick(1)}
                  className={clicked[1] ? "clickedStar" : null}
                />
              </li>
              <li>
                <FaStar
                  size="45px"
                  onClick={() => starClick(2)}
                  className={clicked[2] ? "clickedStar" : null}
                />
              </li>
              <li>
                <FaStar
                  size="45px"
                  onClick={() => starClick(3)}
                  className={clicked[3] ? "clickedStar" : null}
                />
              </li>
              <li>
                <FaStar
                  size="45px"
                  onClick={() => starClick(4)}
                  className={clicked[4] ? "clickedStar" : null}
                />
              </li>
            </ul>
            <div className="admin-review__content__text">
              <div className="admin-review__content__text__title">리뷰내용</div>
              <textarea
                className="admin-review__content__text__textarea"
                value={review}
                onChange={(e) => {
                  setReview(e.target.value);
                }}
              >
                {/* {props.data && props.data.reviewDescription} */}
              </textarea>
            </div>
            {!props.deleteBtn && (
              <div className="admin-review__content__btns">
                <button
                  type="button"
                  className="admin-review__content__btns__btn"
                  onClick={() => {
                    modifyReview();
                  }}
                >
                  수정하기
                </button>
                <button
                  type="button"
                  className="admin-review__content__btns__btn-delete"
                  onClick={() => {
                    removeReview();
                  }}
                >
                  삭제하기
                </button>
              </div>
            )}
            <img
              src="/assets/x-sign.png"
              alt="exit"
              className="admin-review__content__exit"
              onClick={() => {
                props.getReviewModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Review;
