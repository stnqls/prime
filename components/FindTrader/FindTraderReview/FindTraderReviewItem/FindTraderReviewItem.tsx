import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./FindTraderReviewItem.scss";

function FindTraderReviewItem(props: any) {
  const [mobile, setMobile]: any = useState();

  function starRate() {
    const stars = [];

    for (let i = 0; i < props.rate; i++) {
      stars.push(
        <span key={`star-${i}`}>
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
    <li className="find-trader-review-item">
      <div className="find-trader-review-item__contents">
        {mobile ? (
          <div className="find-trader-review-item__contents__trader-nickname">
            패키지 이름
            <span>{props.trader_nickname}</span>
            <br />
          </div>
        ) : (
          <div className="find-trader-review-item__contents__trader-nickname">
            {props.trader_nickname}
            <br />
            <span>상품 후기</span>
          </div>
        )}
        <div className="find-trader-review-item__contents__star">
          {starRate()}
        </div>
        <div className="find-trader-review-item__contents__avatar">
          <img src={props.avatar} alt="avatar" />
        </div>
        <div className="find-trader-review-item__contents__nickname">
          {props.nickname}
        </div>
        <div className="find-trader-review-item__contents__paragraph">
          {props.paragraph}
        </div>
      </div>
    </li>
  );
}

export default FindTraderReviewItem;
