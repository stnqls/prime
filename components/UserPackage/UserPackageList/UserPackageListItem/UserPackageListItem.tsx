import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";
import Router from "next/router";
import axios from "axios";
import dynamic from "next/dynamic";

const ViewTraderPackageMessageModal = dynamic(
  import(
    "../../../ViewTrader/ViewTraderPackage/ViewTraderPackageItem/ViewTraderPackageMessageModal/ViewTraderPackageMessageModal"
  ),
  {
    ssr: false,
  }
);

const UserPackageListItemModalDetail = dynamic(
  import(
    "../../../ViewTrader/ViewTraderPackage/ViewTraderPackageItem/ViewTraderPackageItemModal/ViewTraderPackageItemModal"
  ),
  {
    ssr: false,
  }
);

const ReviewDetail = dynamic(
  import("../../../Review/ReviewDetail/ReviewDetail"),
  {
    ssr: false,
  }
);

const PackageModalReviewWrite = dynamic(
  import("../../../Review/ReviewWrite/PackageModalReviewWrite"),
  {
    ssr: false,
  }
);

const Portal = dynamic(import("../../../../lib/Portal"), {
  ssr: false,
});

import "./UserPackageListItem.scss";

const UserPackageListItem = (props: any) => {
  const [viewDetail, setViewDetail] = useState(false);
  const [viewReview, setViewReview] = useState(false);
  const [viewWrite, setViewWrite] = useState(false);
  const [traderMessage, setTraderMessage] = useState(false);
  let purchaseDate = new Date(props.purchaseDate);
  let expireDate = new Date(props.expireDate);

  return (
    <>
      {traderMessage && (
        <Portal>
          <ViewTraderPackageMessageModal
            setView={setTraderMessage}
            traderAvatar={props.traderAvatar}
            traderName={props.traderName}
            traderId={props.traderId}
            packageName={props.packageName}
          />
        </Portal>
      )}
      {viewDetail && (
        <Portal>
          <UserPackageListItemModalDetail
            setView={setViewDetail}
            traderName={props.traderName}
            packageName={props.packageName}
            packageDescription={props.packageDescription}
            traderAvatar={props.traderAvatar}
            price={props.price}
            traderId={props.traderId}
            packageId={props.packageId}
            purchaseDate={props.purchaseDate}
            expireDate={props.expireDate}
            ispurchase={true}
          />
        </Portal>
      )}
      {viewReview && (
        <Portal>
          <ReviewDetail setViewDetail={setViewReview} id={props.reviewId} />
        </Portal>
      )}
      {viewWrite && (
        <Portal>
          <PackageModalReviewWrite
            setView={setViewWrite}
            traderName={props.traderName}
            packageName={props.packageName}
            packageDescription={props.packageDescription}
            traderAvatar={props.traderAvatar}
            price={props.price}
            traderId={props.traderId}
            packageId={props.packageId}
            isReviewed={props.isReviewed}
            reviewId={props.reviewId}
          />
        </Portal>
      )}
      <li className={`user-package-list-item parents ${props.state}`}>
        <div className="user-package-list-item__nickname">
          {props.traderName}
        </div>
        <div className="user-package-list-item__contents parents">
          <DelayLink
            to={`viewTrader?uid=${props.traderId}`}
            delay={200}
            onDelayStart={Lee.loadingStart}
          >
            <div className="user-package-list-item__contents__avatar">
              <img src={props.traderAvatar} alt="avatar" />
            </div>
          </DelayLink>

          <div className="user-package-list-item__contents__info">
            <div className="user-package-list-item__contents__info__package">
              {props.packageName}
            </div>

            <div className="user-package-list-item__contents__info__period">
              {Lee.addComma(props.price)} KRW | {purchaseDate.getFullYear()}.{" "}
              {purchaseDate.getMonth() + 1}.{purchaseDate.getDate()} ~{" "}
              {expireDate.getFullYear()}. {expireDate.getMonth() + 1}.
              {expireDate.getDate()}
            </div>
          </div>

          {/* <div className="user-package-list-item__contents__info__date">
            <span>{props.start_date}</span>부터
            <br />
            <span>{props.end_date}</span>까지
          </div> */}
        </div>
        <ul className="user-package-list-item__buttons parents">
          {/* <li>수정</li> */}
          <li
            onClick={() => {
              setTraderMessage(true);
            }}
          >
            트레이더 문의하기
          </li>
          <li
            onClick={function () {
              setViewDetail(true);
            }}
          >
            상세보기
          </li>
          {props.isReviewed ? (
            <li
              onClick={function () {
                setViewReview(true);
              }}
            >
              후기보기
            </li>
          ) : (
            <li
              onClick={function () {
                setViewWrite(true);
              }}
            >
              후기쓰기
            </li>
          )}
        </ul>
      </li>
    </>
  );
};

export default UserPackageListItem;
