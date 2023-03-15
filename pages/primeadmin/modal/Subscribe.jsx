import React, { useEffect } from "react";
import "./Subscribe.scss";
import Lee from "../../../lib/Lee";

function Subscribe(props) {
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;
    height : auto;
    `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="wrapper">
        <div
          className="wrapper__close"
          onClick={() => {
            props.getSubscribeModal(false);
          }}
        />
        <div className="subscribe">
          <div className="subscribe__title">구독 상세정보</div>
          <div className="subscribe__content">
            <div className="subscribe__content__tradername">
              트레이더 닉네임 :
              {props.data.traderName ? props.data.traderName : props.traderName}
            </div>
            <div className="subscribe__content__packagename">
              패키지 이름 : {props.data && props.data.packageName}
            </div>
            <div className="subscribe__content__packageprice">
              가격 : {Lee.addComma(props.data && props.data.packagePrice)}원
            </div>
            <div className="subscribe__content__text">
              <div className="subscribe__content__text__title">패키지 설명</div>
              <div className="subscribe__content__text__textarea">
                {props.data && props.data.description}
              </div>
            </div>
            <button
              type="button"
              className="subscribe__content__btn"
              onClick={() => {
                props.getSubscribeModal(false);
              }}
            >
              확인
            </button>
            <img
              src="/assets/x-sign.png"
              alt="exit"
              className="subscribe__content__exit"
              onClick={() => {
                props.getSubscribeModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Subscribe;
