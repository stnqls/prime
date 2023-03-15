import React, { useState } from "react";

const MobileFaqItem = (props: any) => {
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
    <React.Fragment>
      <div className="faq__mbody__list">
        <div
          className="faq__mbody__list__item"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <div className="faq__mbody__list__item__category">[{category}]</div>
          <div className="faq__mbody__list__item__title">{props.title}</div>
          <img
            className="faq__mbody__list__item__arrow"
            src={
              toggle ? "/assets/mobile-line-g.png" : "/assets/mobile-down-g.png"
            }
            alt="arrow"
          />
        </div>
        <div
          className={
            toggle ? "faq__mbody__list__an--show" : "faq__mbody__list__an"
          }
        >
          {props.content}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MobileFaqItem;
