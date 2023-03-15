import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";
import dynamic from "next/dynamic";

import "./TraderStatusPackageItem.scss";

const TraderStatusPackageItemModal = dynamic(
  import("./TraderStatusPackageItemModal/TraderStatusPackageItemModal"),
  {
    ssr: false,
  }
);

const Portal = dynamic(import("../../../../lib/Portal"), {
  ssr: false,
});

const TraderStatusPackageItem = (props: any) => {
  const [view, setView] = useState(false);

  return (
    <>
      {view && (
        <Portal>
          <TraderStatusPackageItemModal
            setView={setView}
            traderName={props.traderName}
            thumbnail={props.thumbnail}
            packageName={props.packageName}
            packageDescription={props.packageDescription}
            traderAvatar={props.traderAvatar}
            price={props.price}
            traderId={props.traderId}
            packageId={props.packageId}
          />
        </Portal>
      )}
      <li
        className={`trader-status-package-item parents ${props.state}`}
        onClick={function () {
          setView(true);
        }}
      >
        <div className="trader-status-package-item__contents parents">
          <div className="trader-status-package-item__contents__thumbnail parents">
            <img src={props.thumbnail} alt="thumbnail" />
          </div>

          <div className="trader-status-package-item__contents__info parents">
            {/* <div className="trader-status-package-item__contents__info__trader parents">
            <div className="trader-status-package-item__contents__info__trader__avatar">
              <img src={props.trader_avatar} alt="avatar" />
            </div>
            <div className="trader-status-package-item__contents__info__trader__nickname">
              <span>트레이더</span>
              <br />
              {props.trader_name}
            </div>
          </div> */}

            <div className="trader-status-package-item__contents__info__title">
              {props.packageName}
            </div>
            <div className="trader-status-package-item__contents__info__paragraph">
              {props.packageDescription}
            </div>
            <div className="trader-status-package-item__contents__info__price">
              {Lee.addComma(props.price)} KRW
            </div>
            <div className="trader-status-package-item__contents__info__button">
              상세보기
            </div>
            {/* <div className="trader-status-package-item__contents__info__date">
            <span>{props.start_date}</span>부터
            <br />
            <span>{props.end_date}</span>까지
          </div> */}
          </div>
        </div>
      </li>
    </>
  );
};

export default TraderStatusPackageItem;
