import React from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./HomeTraderItem.scss";

function HomeTraderItem(props: any) {
  let status;

  if (props.earnings_rate > 0) {
    status = "over";
  } else if (props.earnings_rate === 0) {
    status = "basic";
  } else {
    status = "under";
  }
  return (
    <li className="home-trader-item">
      <DelayLink
        to={`viewTrader?uid=${props.traderId}`}
        delay={200}
        onDelayStart={Lee.loadingStart}
      >
        <div className="home-trader-item__contents">
          <div className="home-trader-item__contents__nickname">
            {props.nickname}
          </div>
          {props.tags.length > 0 ? (
            <div className="home-trader-item__contents__tags">
              {props.tags.map((tag: string, idx: number) => {
                return (
                  <div
                    className="home-trader-item__contents__tags__item"
                    key={`${tag}-${idx}`}
                  >
                    #{tag}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="home-trader-item__contents__tags--none"></div>
          )}
          <div className="home-trader-item__contents__thumbnail">
            <img src={props.avatar} alt="avatar" />
          </div>
          <div className="home-trader-item__contents__room-members">
            <div className="home-trader-item__contents__room-members__text">
              방인원
            </div>
            <div className="home-trader-item__contents__room-members__value">
              {props.room_members}명
            </div>
          </div>
          <div className="home-trader-item__contents__earnings-rate">
            <div className="home-trader-item__contents__earnings-rate__text">
              종합수익률
            </div>
            <div
              className={`home-trader-item__contents__earnings-rate__value ${status}`}
            >
              {props.earnings_rate}%
            </div>
          </div>
          <div className="home-trader-item__contents__detail">상세보기 +</div>
        </div>
      </DelayLink>
    </li>
  );
}

export default HomeTraderItem;
