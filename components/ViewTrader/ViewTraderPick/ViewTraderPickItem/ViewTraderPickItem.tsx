import React from "react";
import Lee from "../../../../lib/Lee";

import "./ViewTraderPickItem.scss";

const ViewTraderPickItem = (props: any) => {
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

  let profitRate;
  if (props.profit_rate > 0) {
    profitRate = "▲";
  } else if (props.profit_rate < 0) {
    profitRate = "▼";
  } else {
    profitRate = "-";
  }

  return (
    <li className={`view-trader-pick-item ${props.status}`}>
      <ul className="view-trader-pick-item__contents__list">
        <li className="view-trader-pick-item__contents__list__package">
          {props.package}
        </li>
        <li className="view-trader-pick-item__contents__list__type">
          {props.type === "spot" ? "현물" : "선물"}
        </li>
        <li className="view-trader-pick-item__contents__list__coin">
          {props.coinKR}({props.coinEN})
        </li>
        {props.type === "futures" ? (
          <li className="view-trader-pick-item__contents__list__pair">
            <div>{props.pair}</div>
            <div>
              {props.option} X{props.leverage}
            </div>
          </li>
        ) : (
          <li className="view-trader-pick-item__contents__list__pair">
            {props.pair}
          </li>
        )}
        <li className="view-trader-pick-item__contents__list__entry-price">
          {Lee.addComma(props.entry_price)}
        </li>
        <li className="view-trader-pick-item__contents__list__target-price">
          {Lee.addComma(props.target_price)}
        </li>
        <li className="view-trader-pick-item__contents__list__entry-date">
          {props.entry_date && props.entry_date.slice(2, 19)}
        </li>
        <li
          className={`view-trader-pick-item__contents__list__end-price ${price_detect}`}
        >
          {props.end_price ? Lee.addComma(props.end_price) : "진행 중"}
        </li>
        <li className="view-trader-pick-item__contents__list__end-date">
          {props.end_date ? props.end_date.slice(2, 19) : "진행 중"}
        </li>
        <li
          className={`view-trader-pick-item__contents__list__profit-rate ${rate_detect}`}
        >
          {props.profit_rate}% {profitRate}
        </li>
      </ul>
    </li>
  );
};

export default ViewTraderPickItem;
