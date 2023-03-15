import React from "react";

import "./HomeBoardInvestmentItemMobile.scss";

const HomeBoardInvestmentItemMobile = (props: any) => {
  let thumbnail = props.thumbnail;

  return (
    <li className="home-board-investment-item-mobile">
      <div className="home-board-investment-item-mobile__thumbnail">
        <img src={thumbnail && thumbnail[0]} alt="thumbnail" />
      </div>
      <div className="home-board-investment-item-mobile__information">
        <div className="home-board-investment-item-mobile__information__title">
          {props.title}
        </div>
        <div
          className="home-board-investment-item-mobile__information__content"
          // dangerouslySetInnerHTML={{ __html: props.content }}
        >
          {props.content}
        </div>
      </div>
    </li>
  );
};

export default HomeBoardInvestmentItemMobile;
