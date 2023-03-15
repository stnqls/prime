import React, { useEffect, useState } from "react";
import Router from "next/router";
import Lee from "../../../../../../lib/Lee";
import DelayLink from "../../../../../../lib/DelayLink";
import axios from "axios";

import "./PaymentListItemModalDetail.scss";

const PaymentListItemModalDetail = (props: any) => {
  return (
    <div
      className="payment-list-item-modal-detail"
      id="PaymentListItemModalDetail"
    >
      <div
        className="payment-list-item-modal-detail__hide"
        onClick={function () {
          props.setView(false);
        }}
      />
      <div className="payment-list-item-modal-detail__contents">
        <div className="payment-list-item-modal-detail__contents__category">
          패키지 정보
        </div>

        <img
          className="payment-list-item-modal-detail__contents__close"
          src="/images/icons/x-sign.png"
          alt="x-sign"
          onClick={function () {
            props.setView(false);
          }}
        />

        <div className="payment-list-item-modal-detail__contents__thumbnail">
          <img src={props.thumbnail} />
        </div>

        <div className="payment-list-item-modal-detail__contents__context parents">
          <div className="payment-list-item-modal-detail__contents__context__trader parents">
            <div className="payment-list-item-modal-detail__contents__context__trader__subject">
              트레이더 정보
            </div>
            <div className="payment-list-item-modal-detail__contents__context__trader__info">
              <div className="payment-list-item-modal-detail__contents__context__trader__info__avatar">
                <img src={props.traderAvatar} alt="avatar" />
              </div>
              <div className="payment-list-item-modal-detail__contents__context__trader__info__nickname">
                {props.traderNickname}
              </div>
            </div>
          </div>

          <div className="payment-list-item-modal-detail__contents__context__package parents">
            <div className="payment-list-item-modal-detail__contents__context__package__subject">
              패키지 이름
            </div>
            <div className="payment-list-item-modal-detail__contents__context__package__name">
              {props.packageName}
            </div>
            <div className="payment-list-item-modal-detail__contents__context__package__subject">
              패키지 설명
            </div>
            <div className="payment-list-item-modal-detail__contents__context__package__description">
              {props.packageDescription}
            </div>
            <div className="payment-list-item-modal-detail__contents__context__package__subject">
              패키지 가격
            </div>
            <div className="payment-list-item-modal-detail__contents__context__package__description">
              {Lee.addComma(props.price)}KRW
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentListItemModalDetail;
