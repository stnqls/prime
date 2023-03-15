import React from "react";

import "./RefundPrice.scss";

const RefundPrice = () => {
  return (
    <div className="refund-price" id="RefundPrice">
      <div className="refund-price__contents parents">
        <div className="refund-price__contents__title">환불예정 금액</div>

        <div className="refund-price__contents__total">
          <div className="refund-price__contents__total__text">
            환불상품 구매금액
          </div>
          <div className="refund-price__contents__total__box">
            <div className="refund-price__contents__total__box__value">
              200,000 KRW
            </div>
          </div>
        </div>

        <div className="refund-price__contents__math">
          <div className="refund-price__contents__math__text">x</div>
        </div>

        <div className="refund-price__contents__total">
          <div className="refund-price__contents__total__text">이용 기간</div>
          <div className="refund-price__contents__total__box">
            <div className="refund-price__contents__total__box__value">
              30 - 4
              <div className="refund-price__contents__total__box__value-bar" />
              30
            </div>
          </div>
        </div>

        <div className="refund-price__contents__math">
          <div className="refund-price__contents__math__text">=</div>
        </div>

        <div className="refund-price__contents__total">
          <div className="refund-price__contents__total__text">
            환불예정 금액
          </div>
          <div className="refund-price__contents__total__box">
            <div className="refund-price__contents__total__box__value">
              <span>177,000 KRW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPrice;
