import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";
import dynamic from "next/dynamic";

import "./ReviewListItem.scss";

const ReviewDetail = dynamic(import("../../ReviewDetail/ReviewDetail"), {
  ssr: false,
});

function ReviewListItem(props: any) {
  const [mobile, setMobile]: any = useState();
  const [viewDetail, setViewDetail] = useState(false);

  function starRate(rating: any) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={`total-review-item-star${i}`}>
          <FaStar />
        </span>
      );
    }
    return stars;
  }

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <React.Fragment>
      {viewDetail && (
        <ReviewDetail setViewDetail={setViewDetail} id={props.id} />
      )}
      <li className="review-list-item">
        {mobile ? (
          <div className="review-list-item__contents">
            <div className="review-list-item__contents__customer parents">
              <div className="review-list-item__contents__customer__info">
                <div className="review-list-item__contents__customer__info__avatar">
                  <img src={props.traderAvatar} alt="avatar" />
                </div>
                <div className="review-list-item__contents__customer__info__detail">
                  <div className="review-list-item__contents__customer__info__detail__date">
                    {props.date.slice(0, 11)}
                  </div>
                  <div className="review-list-item__contents__customer__info__detail__nickname">
                    {props.traderNickname}
                  </div>
                </div>
              </div>
              <div className="review-list-item__contents__customer__paragraph">
                {props.description}
              </div>
            </div>

            <DelayLink
              to={`viewTrader?uid=${props.traderId}`}
              delay={200}
              onDelayStart={Lee.loadingStart}
            >
              <div className="review-list-item__contents__trader parents">
                <div className="review-list-item__contents__trader__info">
                  <div className="review-list-item__contents__trader__info__product">
                    {props.packageName}
                  </div>
                  <div className="review-list-item__contents__trader__info__nickname">
                    {props.traderNickname}
                  </div>
                </div>
                <div className="review-list-item__contents__trader__avatar">
                  <img src={props.traderAvatar} alt="avatar" />
                </div>
                <div className="review-list-item__contents__trader__star">
                  {starRate(props.rating)}
                </div>
              </div>
            </DelayLink>
          </div>
        ) : (
          <div
            className="review-list-item__contents"
            onClick={() => {
              setViewDetail(true);
            }}
          >
            <div className="review-list-item__contents__trader">
              <div className="review-list-item__contents__trader__product">
                {props.packageName}
              </div>
              <div className="review-list-item__contents__trader__info">
                <div className="review-list-item__contents__trader__info__avatar">
                  <img src={props.traderAvatar} alt="avatar" />
                </div>
                <div className="review-list-item__contents__trader__info__nickname">
                  {props.traderNickname}
                </div>
              </div>
            </div>
            <div className="review-list-item__contents__context">
              <div className="review-list-item__contents__context__star">
                {starRate(props.rating)}
              </div>
              <div className="review-list-item__contents__context__paragraph">
                {props.description}
              </div>
            </div>
            <div className="review-list-item__contents__date">
              <span>{props.memberNickname}</span>
              <span>{props.date.slice(0, 10)}</span>
            </div>
            <div className="review-list-item__contents__detail">상세보기</div>
          </div>
        )}
      </li>
    </React.Fragment>
  );
}

export default ReviewListItem;
