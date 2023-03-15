import React from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./FindTraderListItem.scss";

function FindTraderListItem(props: any) {
  let status;

  if (props.earnings_rate > 0) {
    status = "over";
  } else if (props.earnings_rate === 0) {
    status = "basic";
  } else {
    status = "under";
  }

  return (
    <li className="find-trader-list-item">
      <DelayLink
        to={`viewTrader?uid=${props.traderId}`}
        delay={200}
        onDelayStart={Lee.loadingStart}
      >
        <div className="find-trader-list-item__contents">
          <div className="find-trader-list-item__contents__thumbnail">
            <img src={props.avatar} alt="thumbnail" />
          </div>
          <div className="find-trader-list-item__contents__nickname">
            {props.nickname}
          </div>
          {props.tags ? (
            <div className="find-trader-list-item__contents__tags">
              {props.tags.map((tag: string, idx: number) => {
                return <div key={`${tag}-${idx}`}>{"#" + tag}</div>;
              })}
            </div>
          ) : (
            <div className="find-trader-list-item__contents__tags--none"></div>
          )}
          <ul className="find-trader-list-item__contents__status">
            <li className="find-trader-list-item__contents__status__room-members">
              <div className="find-trader-list-item__contents__status__room-members__text">
                구독자 수
              </div>
              <div className="find-trader-list-item__contents__status__room-members__value">
                {props.room_members}명
              </div>
            </li>
            <li className="find-trader-list-item__contents__status__earnings-rate">
              <div className="find-trader-list-item__contents__status__earnings-rate__text">
                종합 수익률
              </div>
              <div
                className={`find-trader-list-item__contents__status__earnings-rate__value ${status}`}
              >
                {props.earnings_rate}%
                {status === "over" ? "▲" : status === "under" ? "▼" : "-"}
              </div>
            </li>
          </ul>
          <div className="find-trader-list-item__contents__detail">
            상세보기
          </div>
        </div>
      </DelayLink>
    </li>
  );
}

export default FindTraderListItem;
