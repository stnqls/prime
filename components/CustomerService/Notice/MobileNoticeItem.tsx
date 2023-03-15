import React, { useState } from "react";

const MobileNoticeItem = (props: any) => {
  let category = props.categoryCode;
  switch (category) {
    case 101:
      category = "공통";
      break;
    case 102:
      category = "일반";
      break;
    case 103:
      category = "트레이더";
      break;
  }
  const [toggle, setToggle] = useState(false);

  return (
    <div className="notice__mcontent__list">
      <div
        className="notice__mcontent__list__item"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <div className="notice__mcontent__list__item__category">[공지]</div>
        <div className="notice__mcontent__list__item__titles">
          <div className="notice__mcontent__list__item__titles__title">
            {props.title}
          </div>
          <div className="notice__mcontent__list__item__titles__date">
            {props.date}
          </div>
        </div>
        <img
          src={
            toggle ? "/assets/mobile-line-g.png" : "/assets/mobile-down-g.png"
          }
          alt="arrow"
          className="notice__mcontent__list__item__arrow"
        />
      </div>
      <div
        className={
          toggle
            ? "notice__mcontent__list__an"
            : "notice__mcontent__list__an--none"
        }
      >
        {props.content}
      </div>
    </div>
  );
};

export default MobileNoticeItem;
