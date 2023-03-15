import React from "react";
import Lee from "../../../lib/Lee";

import "./RefundProduct.scss";

const RefundProduct = (props: any) => {
  return (
    <div className="refund-product parents" id="RefundProduct">
      <div className="refund-product__contents parents">
        <div className="refund-product__contents__title">환불요청 상품</div>
        <div className="refund-product__contents__item parents">
          <div className="refund-product__contents__item__trader">
            <div className="refund-product__contents__item__trader__avatar">
              <img src={props.trader_avatar} alt="avatar" />
            </div>
            <div className="refund-product__contents__item__trader__nickname">
              {props.trader_nickname}
            </div>
            <div className="refund-product__contents__item__trader__grade">
              {props.trader_grade}
            </div>
          </div>

          <div className="refund-product__contents__item__info">
            <div className="refund-product__contents__item__info__state">
              {props.state === "subs" ? (
                <div className="refund-product__contents__item__info__state-subs">
                  이용중
                </div>
              ) : (
                <div className="refund-product__contents__item__info__state-end">
                  이용종료
                </div>
              )}
            </div>
            <div className="refund-product__contents__item__info__title">
              {props.title}
            </div>
            <div className="refund-product__contents__item__info__price">
              {Lee.addComma(props.price)} KRW
            </div>
            <div className="refund-product__contents__item__info__date">
              <span>{props.start_date}</span>부터
              <br />
              <span>{props.end_date}</span>까지
            </div>
            <div className="refund-product__contents__item__info__tip">
              {props.state === "subs" ? (
                <div className="refund-product__contents__item__info__tip-subs">
                  현재 이용 중인 상품입니다.
                </div>
              ) : (
                <div className="refund-product__contents__item__info__tip-end">
                  기간이 종료되었습니다.
                </div>
              )}
            </div>
          </div>

          <div className="refund-product__contents__item__etc">
            <div className="refund-product__contents__item__etc__prime">
              <div className="refund-product__contents__item__etc__prime__text">
                프라임인베스트먼트
              </div>
            </div>
            <ul className="refund-product__contents__item__etc__barcode">
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>
            <div className="refund-product__contents__item__etc__date">
              <div className="refund-product__contents__item__etc__date__text">
                21.08.17 ~ 21.09.17
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundProduct;
