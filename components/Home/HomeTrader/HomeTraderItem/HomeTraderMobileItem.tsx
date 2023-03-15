import React from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./HomeTraderMobileItem.scss";

function HomeTraderMobileItem(props: any) {
  let status;

  if (props.earnings_rate > 0) {
    status = "over";
  } else if (props.earnings_rate === 0) {
    status = "basic";
  } else {
    status = "under";
  }
  return (
    <li className="home-trader-mobile-item">
      <DelayLink
        to={`viewTrader?uid=${props.traderId}`}
        delay={200}
        onDelayStart={Lee.loadingStart}
      >
        <div className="home-trader-mobile-item__contents">
          <div className="home-trader-mobile-item__contents__thumbnail">
            <img src={props.avatar} alt="avatar" />
          </div>
          <div className="home-trader-mobile-item__contents__information parents">
            <div className="home-trader-mobile-item__contents__information__nickname">
              {props.nickname}
            </div>
            {props.tags ? (
              <div className="home-trader-mobile-item__contents__information__tags">
                {props.tags.map((tag: string, idx: number) => {
                  return (
                    <div
                      className="home-trader-mobile-item__contents__information__tags__item"
                      key={`${tag}-${idx}`}
                    >
                      #{tag}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="home-trader-mobile-item__contents__information__tags--none"></div>
            )}
            <ul className="home-trader-mobile-item__contents__information__status parents">
              <li className="home-trader-mobile-item__contents__information__status__room-members">
                <div className="home-trader-mobile-item__contents__information__status__room-members__text">
                  구독자수
                </div>
                <div className="home-trader-mobile-item__contents__information__status__room-members__value">
                  {props.room_members}명
                </div>
              </li>
              <li className="home-trader-mobile-item__contents__information__status__earnings-rate">
                <div className="home-trader-mobile-item__contents__information__status__earnings-rate__text">
                  종합수익률
                </div>
                <div
                  className={`home-trader-mobile-item__contents__information__status__earnings-rate__value ${status}`}
                >
                  {props.earnings_rate}%
                  {status === "over" ? "▲" : status === "under" ? "▼" : "-"}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </DelayLink>
    </li>
  );
}

export default HomeTraderMobileItem;
