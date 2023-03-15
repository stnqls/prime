import React from "react";
import Lee from "../../../../lib/Lee";

import "./TraderStatusPickItem.scss";

const TraderStatusPickItem = (props: any) => {
  let rate_detect;
  let price_detect;

  if (props.profit_rate > 0) {
    rate_detect = "over";
  } else if (props.profit_rate < 0) {
    rate_detect = "under";
  } else {
    rate_detect = "normal";
  }

  if (props.end_price > props.entry_price) {
    price_detect = "over";
  } else if (props.end_price && props.end_price < props.entry_price) {
    price_detect = "under";
  } else {
    price_detect = "normal";
  }

  return (
    <li className={`trader-status-pick-item ${props.status}`}>
      <div className="trader-status-pick-item__contents">
        <ul className="trader-status-pick-item__contents__list parents">
          <li className="trader-status-pick-item__contents__list__type">
            {props.type}
          </li>
          <li className="trader-status-pick-item__contents__list__coin">
            {props.coinKR}
            <br />
            <span>
              {props.coinEN} | {props.fair}
            </span>
          </li>
          <li className="trader-status-pick-item__contents__list__entry-price">
            {Lee.addComma(props.entry_price)}
          </li>
          <li className="trader-status-pick-item__contents__list__target-price">
            {Lee.addComma(props.target_price)}
          </li>
          <li
            className={`trader-status-pick-item__contents__list__end-price ${price_detect}`}
          >
            {props.end_price ? Lee.addComma(props.end_price) : "진행 중"}
          </li>
          <li className="trader-status-pick-item__contents__list__entry-date">
            {props.entry_date}
          </li>
          <li className="trader-status-pick-item__contents__list__end-date">
            {props.end_date ? props.end_date : "진행 중"}
          </li>
          <li
            className={`trader-status-pick-item__contents__list__profit-rate ${rate_detect}`}
          >
            {props.end_date ? `${props.profit_rate}%` : "진행 중"}
            <span className="trader-status-pick-item__contents__list__end-price__up">
              ▲
            </span>
            <span className="trader-status-pick-item__contents__list__end-price__down">
              ▼
            </span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default TraderStatusPickItem;
