import React from "react";
import DelayLink from "../../../../../lib/DelayLink";
import Lee from "../../../../../lib/Lee";

import "./HomeBoardNoticeItem.scss";

const HomeBoardNoticeItem = (props: any) => {
  return (
    <li className="home-board-notice-item">
      <DelayLink to={`notice`} delay={200} onDelayStart={Lee.loadingStart}>
        <div className="home-board-notice-item__contents">
          <div className="home-board-notice-item__contents__icon"></div>
          <div className="home-board-notice-item__contents__title">
            {props.title}
          </div>
          <div className="home-board-notice-item__contents__information">
            {props.content}
          </div>
        </div>
      </DelayLink>
    </li>
  );
};

export default HomeBoardNoticeItem;
