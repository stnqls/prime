import React from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./HomeTraderItem.scss";

function HomeTraderItem(props: any) {
  return (
    <li className="home-trader-item">
      <div className="home-trader-item__contents">
        <div className="home-trader-item__contents__thumbnail">
          <img src={props.thumbnail} alt="thumbnail" />
        </div>
        <div className="home-trader-item__contents__information parents">
          <div className="home-trader-item__contents__information__nickname">
            {props.nickname}
          </div>
          <span className="home-trader-item__contents__information__tags">
            {props.tags.map((tag: string, idx: number) => {
              return <span key={`${tag}-${idx}`}>#{tag}</span>;
            })}
          </span>
          <ul className="home-trader-item__contents__information__status parents">
            <li className="home-trader-item__contents__information__status__room-members">
              <div className="home-trader-item__contents__information__status__room-members__text">
                방 인원
              </div>
              <div className="home-trader-item__contents__information__status__room-members__value">
                {Lee.addComma(props.room_members)}명
              </div>
            </li>
            <li className="home-trader-item__contents__information__status__earnings-rate">
              <div className="home-trader-item__contents__information__status__earnings-rate__text">
                종합수익률
              </div>
              <div className="home-trader-item__contents__information__status__earnings-rate__value">
                {props.earnings_rate}%
              </div>
            </li>
          </ul>
        </div>

        <div className="home-trader-item__contents__go">
          <div className="home-trader-item__contents__go__text">상세 보기</div>
        </div>
      </div>
    </li>
  );
}

export default HomeTraderItem;
