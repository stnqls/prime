import React, { useEffect, useState } from "react";
import Router from "next/router";
import Lee from "../../../../../lib/Lee";
import axios from "axios";

import "./TraderStatusPackageItemModal.scss";

const TraderStatusPackageItemModal = (props: any) => {
  return (
    <div
      className="trader-status-package-item-modal"
      id="TraderStatusPackageItemModal"
    >
      <div
        className="trader-status-package-item-modal__hide"
        onClick={function () {
          props.setView(false);
        }}
      />
      <div className="trader-status-package-item-modal__contents">
        <div className="trader-status-package-item-modal__contents__category">
          패키지 정보
        </div>

        <img
          className="trader-status-package-item-modal__contents__close"
          src="/images/icons/x-sign.png"
          alt="x-sign"
          onClick={function () {
            props.setView(false);
          }}
        />

        <div className="trader-status-package-item-modal__contents__thumbnail">
          <img src={props.thumbnail} />
        </div>

        <div className="trader-status-package-item-modal__contents__context parents">
          <div className="trader-status-package-item-modal__contents__context__package parents">
            <div className="trader-status-package-item-modal__contents__context__package__subject">
              패키지 이름
            </div>
            <div className="trader-status-package-item-modal__contents__context__package__name">
              {props.packageName}
            </div>
            <div className="trader-status-package-item-modal__contents__context__package__subject">
              패키지 설명
            </div>
            <div className="trader-status-package-item-modal__contents__context__package__description">
              {props.packageDescription}
            </div>
            <div className="trader-status-package-item-modal__contents__context__package__subject">
              패키지 가격
            </div>
            <div className="trader-status-package-item-modal__contents__context__package__description">
              {Lee.addComma(props.price)}KRW
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraderStatusPackageItemModal;
