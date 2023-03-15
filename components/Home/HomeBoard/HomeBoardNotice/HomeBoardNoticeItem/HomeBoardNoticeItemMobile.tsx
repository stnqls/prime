import React from "react";
import DelayLink from "../../../../../lib/DelayLink";
import Lee from "../../../../../lib/Lee";

import "./HomeBoardNoticeItemMobile.scss";

const HomeBoardNoticeItemMobile = (props: any) => {
  return (
    <DelayLink to={`notice`} delay={200} onDelayStart={Lee.loadingStart}>
      <li className="home-board-notice-item-mobile">
        {/* <div className="home-board-notice-item-mobile__thumbnail">
        <img src={props.thumbnail} alt="thumbnail" />
      </div> */}
        <div className="home-board-notice-item-mobile__information">
          <div className="home-board-notice-item-mobile__information__title">
            {props.title}
          </div>
          <div className="home-board-notice-item-mobile__information__date">
            {props.date.slice(0, 10)}
          </div>
          {/* <div className="home-board-notice-item-mobile__information__content">
          {props.content}
        </div> */}
        </div>
      </li>
    </DelayLink>
  );
};

export default HomeBoardNoticeItemMobile;
