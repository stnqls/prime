import React from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./TraderStatusProfile.scss";

const TraderStatusProfile = (props: any) => {
  return (
    <div className="trader-status-profile" id="TraderStatusProfile">
      <div className="trader-status-profile__contents">
        <div className="trader-status-profile__contents__trader">
          <div className="trader-status-profile__contents__trader__avatar">
            <img src={props.avatar} alt="avatar" />
          </div>
          <div className="trader-status-profile__contents__trader__info">
            <div className="trader-status-profile__contents__trader__info__nickname">
              {props.nickname}
              <span>({props.email})</span>
            </div>
            {props.tags && props.tags.length > 0 && (
              <div className="trader-status-profile__contents__trader__info__tag">
                {props.tags.map((tag: any, index: number) => {
                  return <span key={`tag-${index}`}>{"# " + tag}</span>;
                })}
              </div>
            )}
          </div>
        </div>
        {props.introduce !== null && (
          <div className="trader-status-profile__contents__introduce">
            {props.introduce}
          </div>
        )}
        <DelayLink
          to="user?page=userModify"
          delay={200}
          onDelayStart={Lee.loadingStart}
        >
          <div className="trader-status-profile__contents__exit">
            프로필 변경
          </div>
        </DelayLink>
      </div>
    </div>
  );
};

export default TraderStatusProfile;
