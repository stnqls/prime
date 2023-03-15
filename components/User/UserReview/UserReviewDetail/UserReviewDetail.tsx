import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Lee from "../../../../lib/Lee";

import "./UserReviewDetail.scss";

const UserReviewDetail = (props: any) => {
  const [packageName, setPackageName] = useState();
  const [traderName, setTraderName] = useState();
  const [date, setDate] = useState();
  const [rating, setRating] = useState();
  const [description, setDescription] = useState();

  const [modifyText, setModifyText] = useState("");

  const [modify, setModify] = useState(false);

  function starRate(rating: any) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={`total-review-star${i}`} />);
    }
    return stars;
  }

  function getDetail() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews/${props.id}`,
      headers,
    })
      .then((res) => {
        if (res.status === 200) {
          setPackageName(res.data.data.packageName);
          setTraderName(res.data.data.traderNickname);
          setDate(res.data.data.date);
          setRating(res.data.data.rating);
          setDescription(res.data.data.description);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getDetail);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <React.Fragment>
      <div
        className="user-review-detail__cover"
        onClick={() => {
          props.setViewModal(false);
        }}
      ></div>
      <div className="user-review-detail">
        <img
          src="/assets/x-sign.png"
          alt="close"
          className="user-review-detail__close"
          onClick={() => {
            props.setViewModal(false);
          }}
        />
        <div className="user-review-detail__content">
          <div className="user-review-detail__content__info">
            <div className="user-review-detail__content__info__package">
              {packageName}
            </div>
            <div className="user-review-detail__content__info__trader">
              {traderName}
            </div>
            <div className="user-review-detail__content__info__date">
              {date}
            </div>
          </div>
          <div className="user-review-detail__content__context">
            <div className="user-review-detail__content__context__rate">
              {starRate(rating)}
            </div>
            {modify ? (
              <textarea
                className="user-review-detail__content__context__text"
                defaultValue={description}
                onChange={(e) => {
                  setModifyText(e.target.value);
                }}
                maxLength={1000}
              ></textarea>
            ) : (
              <div className="user-review-detail__content__context__text">
                {description}
              </div>
            )}
          </div>
          {modify ? (
            <div
              className="user-review-detail__content__modify"
              onClick={() => {
                setModify(!modify);
              }}
            >
              완료
            </div>
          ) : (
            <div
              className="user-review-detail__content__modify"
              onClick={() => {
                setModify(!modify);
              }}
            >
              수정
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserReviewDetail;
