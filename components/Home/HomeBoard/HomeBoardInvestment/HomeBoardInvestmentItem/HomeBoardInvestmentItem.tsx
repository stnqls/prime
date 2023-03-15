import React from "react";
import Router from "next/router";
import "./HomeBoardInvestmentItem.scss";

const HomeBoardInvestmentItem = (props: any) => {
  let thumbnail = props.thumbnail;
  return (
    <li
      className="home-board-investment-item"
      onClick={() => {
        setTimeout(() => {
          Router.push({
            pathname: "/readBoard",
            query: {
              id: props.id,
              categoryCode: 201,
            },
          });
        }, 1000);
      }}
    >
      <div className="home-board-investment-item__contents">
        <div className="home-board-investment-item__contents__title">
          {props.title}
        </div>
        <div className="home-board-investment-item__contents__thumbnail">
          <img src={thumbnail && thumbnail[0]} alt="thumbnail" />
        </div>
        <div className="home-board-investment-item__contents__user">
          <div className="home-board-investment-item__contents__user__avatar">
            <img src={props.user_avatar} alt="avatar" />
          </div>
          <div className="home-board-investment-item__contents__user__nickname">
            {props.user_nickname}
          </div>
          <div className="home-board-investment-item__contents__user__date">
            {props.date}
          </div>
        </div>
        {/* <div
          className="home-board-investment-item__contents__context"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div> */}
      </div>
    </li>
  );
};

export default HomeBoardInvestmentItem;
