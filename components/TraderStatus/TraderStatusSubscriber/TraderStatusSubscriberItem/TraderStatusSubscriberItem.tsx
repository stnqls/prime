import React from "react";
import Lee from "../../../../lib/Lee";

import "./TraderStatusSubscriberItem.scss";

const TraderStatusSubscriberItem = (props: any) => {
  return (
    <li className={`trader-status-subscriber-item ${props.status}`}>
      <div className="trader-status-subscriber-item__contents">
        <ul className="trader-status-subscriber-item__contents__list parents">
          <li className="trader-status-subscriber-item__contents__list__nickname">
            {props.nickname}
          </li>
          <li className="trader-status-subscriber-item__contents__list__product-name">
            {props.packageName}
          </li>
          <li className="trader-status-subscriber-item__contents__list__product-price">
            {Lee.addComma(props.product_price)}원
          </li>

          <li className="trader-status-subscriber-item__contents__list__end-date">
            {props.expireDate.slice(0, 10)}
          </li>
        </ul>
      </div>
    </li>
  );
};

export default TraderStatusSubscriberItem;
