import React from "react";

import "./ViewTraderProfile.scss";

const ViewTraderProfile = (props: any) => {
  return (
    <div className="view-trader-profile" id="ViewTraderProfile">
      <div className="view-trader-profile__contents">
        <div className="view-trader-profile__contents__avatar">
          <img
            src={props.avatar}
            alt="avatar"
            className="view-trader-profile__contents__avatar__img"
          />
        </div>
        <div className="view-trader-profile__contents__info">
          <div className="view-trader-profile__contents__info__nickname">
            {props.nickname}
          </div>
          {props.tags && props.tags.length > 0 && (
            <div className="view-trader-profile__contents__info__tag">
              {props.tags.map((tag: any, index: number) => {
                return <span key={`tag-${index}`}>{"#" + tag}</span>;
              })}
            </div>
          )}
        </div>
      </div>
      <div className="view-trader-profile__introduce">{props.introduce}</div>
    </div>
  );
};

export default ViewTraderProfile;
