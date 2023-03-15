import React from "react";
import "./Package.scss";
import Lee from "../../../lib/Lee";

function Package(props) {
  return (
    <React.Fragment>
      <div className="wrapper">
        <div
          className="wrapper__close"
          onClick={() => {
            props.getPackageModal(false);
          }}
        />
        <div className="package">
          <div className="package__title">구독 상세정보</div>
          <div className="package__content">
            <div className="package__content__packagename">
              패키지 이름 : {props.data && props.data.packageName}
            </div>
            <div className="package__content__packageprice">
              가격 : {Lee.addComma(props.data && props.data.packagePrice)}원
            </div>
            <div className="package__content__text">
              <div className="package__content__text__title">패키지 설명</div>
              <div className="package__content__text__textarea">
                {props.data && props.data.description}
              </div>
            </div>
            <button
              type="button"
              className="package__content__btn"
              onClick={() => {
                props.getPackageModal(false);
              }}
            >
              확인
            </button>
            <img
              src="/assets/x-sign.png"
              alt="exit"
              className="package__content__exit"
              onClick={() => {
                props.getPackageModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Package;
