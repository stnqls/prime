import React, { useEffect, useState } from "react";
import Router from "next/router";
import Lee from "../../../../../lib/Lee";
import DelayLink from "../../../../../lib/DelayLink";
import axios from "axios";

import "./ViewTraderPackageItemMethod.scss";

const ViewTraderPackageItemMethod = (props: any) => {
  return (
    <div
      className="view-trader-package-item-method"
      id="ViewTraderPackageItemMethod"
    >
      <div
        className="view-trader-package-item-method__hide"
        onClick={function () {
          props.setMethod(false);
        }}
      />
      <div className="view-trader-package-item-method__contents">
        <div className="view-trader-package-item-method__contents__category">
          결제수단 선택
        </div>

        <ul className="view-trader-package-item-method__contents__select">
          <li
            className="view-trader-package-item-method__contents__select__list"
            onClick={function () {
              props.setMethod(false);
              props.setBank(true);
            }}
          >
            계좌이체
          </li>
          <li
            className="view-trader-package-item-method__contents__select__list"
            onClick={function () {
              props.setMethod(false);
              props.setCard(true);
            }}
          >
            카드결제
          </li>
        </ul>

        <img
          className="view-trader-package-item-method__contents__close"
          src="/assets/x-sign.png"
          alt="x-sign"
          onClick={function () {
            props.setMethod(false);
          }}
        />
      </div>
    </div>
  );
};

export default ViewTraderPackageItemMethod;
