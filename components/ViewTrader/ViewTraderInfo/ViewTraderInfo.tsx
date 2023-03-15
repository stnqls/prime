import React from "react";

import "./ViewTraderInfo.scss";

const ViewTraderInfo = (props: any) => {
  let total_rate_stat;
  let month_rate_stat;

  if (props.total_rate > 0) {
    total_rate_stat = "over";
  } else if (props.total_rate < 0) {
    total_rate_stat = "under";
  } else {
    total_rate_stat = "normal";
  }

  if (props.month_rate > 0) {
    month_rate_stat = "over";
  } else if (props.month_rate < 0) {
    month_rate_stat = "under";
  } else {
    month_rate_stat = "normal";
  }

  return (
    <div className="view-trader-info parents" id="ViewTraderInfo">
      <div className="view-trader-info__contents">
        <ul className="view-trader-info__contents__lists">
          <li className="view-trader-info__contents__lists__list">
            <div className="view-trader-info__contents__lists__list__title">
              당월 수익률
            </div>
            <div
              className={`view-trader-info__contents__lists__list__value ${month_rate_stat}`}
            >
              {props.month_rate > 0
                ? `${props.month_rate}% ▲`
                : props.month_rate < 0
                ? `${props.month_rate}% ▼`
                : "0% -"}
            </div>
          </li>
          <li className="view-trader-info__contents__lists__list">
            <div className="view-trader-info__contents__lists__list__title">
              누적 수익률
            </div>
            <div
              className={`view-trader-info__contents__lists__list__value ${total_rate_stat}`}
            >
              {props.total_rate > 0
                ? `${props.total_rate}% ▲`
                : props.total_rate < 0
                ? `${props.total_rate}% ▼`
                : "0% -"}
            </div>
          </li>
          <li className="view-trader-info__contents__lists__list">
            <div className="view-trader-info__contents__lists__list__title">
              방 인원
            </div>
            <div className="view-trader-info__contents__lists__list__value">
              {props.room_members}명
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewTraderInfo;
