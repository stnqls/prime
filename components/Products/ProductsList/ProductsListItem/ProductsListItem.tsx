import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./ProductsListItem.scss";

const ProductsListItem = (props: any) => {
  return (
    <li className={`products-list-item parents ${props.state}`}>
      <div className="products-list-item__contents parents">
        <div className="products-list-item__contents__thumbnail parents">
          <img src={props.thumbnail} alt="thumbnail" />
        </div>

        <div className="products-list-item__contents__info parents">
          <div className="products-list-item__contents__info__trader parents">
            <div className="products-list-item__contents__info__trader__avatar">
              <img src={props.trader_avatar} alt="avatar" />
            </div>
            <div className="products-list-item__contents__info__trader__nickname">
              <span>트레이더</span>
              <br />
              {props.trader_name}
            </div>
          </div>

          <div className="products-list-item__contents__info__title">
            {props.title}
          </div>
          <div className="products-list-item__contents__info__paragraph">
            {props.paragraph}
          </div>
          <div className="products-list-item__contents__info__price">
            {Lee.addComma(props.price)} KRW
          </div>
          <div className="products-list-item__contents__info__button">
            구독하기
          </div>
          {/* <div className="products-list-item__contents__info__date">
            <span>{props.start_date}</span>부터
            <br />
            <span>{props.end_date}</span>까지
          </div> */}
        </div>
      </div>
    </li>
  );
};

export default ProductsListItem;
