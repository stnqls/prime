import React from "react";
import DelayLink from "../../../lib/DelayLink";
import Lee from "../../../lib/Lee";
import Router from "next/router";
import ReviewListItem from "../../Review/ReviewList/ReviewListItem/ReviewListItem";

import "./ViewTraderReview.scss";

const ViewTraderReview = (props: any) => {
  const reviews = props.reviews;
  return (
    <div className="view-trader-review" id="ViewTraderReview">
      <div className="view-trader-review__title">
        리뷰
        {reviews.length > 0 && (
          <div
            className="view-trader-review__title__more"
            onClick={() => {
              Router.push({
                pathname: "/review",
                query: {
                  search: props.traderId,
                  name: props.traderName,
                },
              });
            }}
          >
            더보기
          </div>
        )}
      </div>
      <div className="view-trader-review__contents">
        {reviews && reviews.length > 0 ? (
          <ul className="view-trader-review__contents__list">
            {reviews.map((review: any, index: number) => {
              if (index < 4) {
                return (
                  <div
                    className="view-trader-review__contents__list__item"
                    key={`trader-Review-${index}`}
                  >
                    <ReviewListItem
                      date={review.date}
                      description={review.description}
                      traderNickname={review.traderNickname}
                      traderAvatar={review.traderAvatar}
                      rating={review.rating}
                      packageName={review.packageName}
                      id={review.id}
                    />
                  </div>
                );
              }
            })}
          </ul>
        ) : (
          <div className="view-trader-review__contents__none parents">
            등록된 리뷰가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTraderReview;
