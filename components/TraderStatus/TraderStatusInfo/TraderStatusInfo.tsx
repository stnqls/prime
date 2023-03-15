import React from "react";

import "./TraderStatusInfo.scss";

const TraderStatusInfo = (props: any) => {
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
    <div className="trader-status-info" id="TraderStatusInfo">
      <div className="trader-status-info__contents">
        <ul className="trader-status-info__contents__lists">
          <li className="trader-status-info__contents__lists__list">
            <div className="trader-status-info__contents__lists__list__title">
              당월 수익률
            </div>
            <div
              className={`trader-status-info__contents__lists__list__value ${month_rate_stat}`}
            >
              {props.month_rate && props.month_rate !== "NaN"
                ? props.month_rate >= 0
                  ? `${props.month_rate}% ▲`
                  : `${props.month_rate}% ▼`
                : "0% -"}
            </div>
          </li>
          <li className="trader-status-info__contents__lists__list">
            <div className="trader-status-info__contents__lists__list__title">
              구독자 수
            </div>
            <div className="trader-status-info__contents__lists__list__value">
              {props.room_members}명
            </div>
          </li>
          <li className="trader-status-info__contents__lists__list">
            <div className="trader-status-info__contents__lists__list__title">
              누적 수익률
            </div>
            <div
              className={`trader-status-info__contents__lists__list__value ${total_rate_stat}`}
            >
              {props.total_rate && props.total_rate !== "NaN"
                ? props.total_rate >= 0
                  ? `${props.total_rate}% ▲`
                  : `${props.total_rate}% ▼`
                : "0% -"}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TraderStatusInfo;
