import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";
import dynamic from "next/dynamic";
import axios from "axios";
import moment from "moment";

import "./PaymentListItem.scss";

const PaymentListItemModalDetail = dynamic(
  import(
    "../../../ViewTrader/ViewTraderPackage/ViewTraderPackageItem/ViewTraderPackageItemModal/ViewTraderPackageItemModal"
  ),
  {
    ssr: false,
  }
);

const PaymentListItemModalRefund = dynamic(
  import(
    "./PaymentListItemModal/PaymentListItemModalRefund/PaymentListItemModalRefund"
  ),
  {
    ssr: false,
  }
);

const PaymentListItemModalReview = dynamic(
  import("../../../Review/ReviewWrite/PackageModalReviewWrite"),
  {
    ssr: false,
  }
);

const PaymentListItemModalModify = dynamic(
  import("../../../Review/ReviewDetail/ReviewDetail"),
  {
    ssr: false,
  }
);

const Portal = dynamic(import("../../../../lib/Portal"), {
  ssr: false,
});

const PaymentListItem = (props: any) => {
  // const [viewDetail, setViewDetail] = useState(false);
  const [viewRefund, setViewRefund] = useState(false);
  const [viewReview, setViewReview] = useState(false);
  const [viewModify, setViewModify] = useState(false);

  let purchaseDate = new Date(props.purchaseDate);
  let expireDate = new Date(props.expireDate);

  return (
    <>
      {/* {viewDetail && (
        <Portal>
          <PaymentListItemModalDetail
            setView={setViewDetail}
            traderName={props.traderNickname}
            thumbnail={props.thumbnail}
            packageName={props.packageName}
            packageDescription={props.packageDescription}
            traderAvatar={props.traderAvatar}
            price={props.price}
            traderId={props.traderId}
            packageId={props.packageId}
          />
        </Portal>
      )} */}

      {viewRefund && (
        <Portal>
          <PaymentListItemModalRefund
            setView={setViewRefund}
            paymentId={props.paymentId}
            traderName={props.traderNickname}
            packageName={props.packageName}
            packageDescription={props.packageDescription}
            traderAvatar={props.traderAvatar}
            price={props.price}
            traderId={props.traderId}
            packageId={props.packageId}
            purchaseDate={props.purchaseDate}
          />
        </Portal>
      )}
      {viewReview && (
        <PaymentListItemModalReview
          setView={setViewReview}
          traderName={props.traderNickname}
          packageName={props.packageName}
          packageDescription={props.packageDescription}
          traderAvatar={props.traderAvatar}
          price={props.price}
          traderId={props.traderId}
          packageId={props.subscriptionId}
        />
      )}
      {viewModify && (
        <PaymentListItemModalModify
          setViewDetail={setViewModify}
          traderNickname={props.traderNickname}
          packageName={props.packageName}
          packageDescription={props.packageDescription}
          traderAvatar={props.traderAvatar}
          price={props.price}
          traderId={props.traderId}
          packageId={props.subscriptionId}
          isReviewed={props.isReviewed}
          reviewId={props.reviewId}
          id={props.reviewId}
        />
      )}
      <li className={`payment-list-item parents ${props.state}`}>
        <div className="payment-list-item__state">
          {props.status === 0 ? (
            <div className="payment-list-item__state-subs">결제확인중</div>
          ) : props.status === 1 || props.status === 4 || props.status === 5 ? (
            <div className="payment-list-item__state-subs">결제완료</div>
          ) : props.status === 2 ? (
            <div className="payment-list-item__state-refund">환불요청</div>
          ) : props.status === 3 ? (
            <div className="payment-list-item__state-refund">환불완료</div>
          ) : props.status === 9 ? (
            <div className="payment-list-item__state-refund">결제취소</div>
          ) : (
            ""
          )}
        </div>
        <div
          className="payment-list-item__contents parents"
          // onClick={function () {
          //   setViewDetail(true);
          // }}
        >
          <div className="payment-list-item__contents__avatar">
            <img src={props.traderAvatar} alt="avatar" />
          </div>

          <div className="payment-list-item__contents__info">
            <div className="payment-list-item__contents__info__title">
              {props.packageName}
            </div>
            <div className="payment-list-item__contents__info__price">
              {Lee.addComma(props.price)} KRW
              {(props.status === 1 ||
                props.status === 4 ||
                props.status === 5) && (
                <span className="payment-list-item__contents__info__date">
                  {purchaseDate.getFullYear()}. {purchaseDate.getMonth() + 1}.
                  {purchaseDate.getDate()} ~ {expireDate.getFullYear()}.{" "}
                  {expireDate.getMonth() + 1}.{expireDate.getDate()}
                </span>
              )}
            </div>

            <div className="payment-list-item__contents__info__nickname">
              {props.traderNickname}
            </div>
          </div>
        </div>
        <div className="payment-list-item__button parents">
          <div className="payment-list-item__tip">
            {props.status === 0 ? (
              <div className="payment-list-item__button__tip-subs">
                담당자가 결제 요청을 확인 중입니다.
              </div>
            ) : props.status === 1 ||
              props.status === 4 ||
              props.status === 5 ? (
              <div className="payment-list-item__button__tip-subs">
                결제가 정상적으로 완료되었습니다.({props.purchaseDate})
              </div>
            ) : props.status === 2 ? (
              <div className="payment-list-item__button__tip-refund">
                담당자가 환불 요청을 확인 중입니다.
              </div>
            ) : props.status === 3 ? (
              <div className="payment-list-item__button__tip-refund">
                환불일시 : {props.refundDate} 환불금액 :{" "}
                {Lee.addComma(props.refundAmount)} KRW <br />
                결제 환불처리가 완료되었습니다.
              </div>
            ) : props.status === 9 ? (
              <div className="payment-list-item__button__tip-refund">
                결제가 취소되었습니다.
              </div>
            ) : (
              ""
            )}
          </div>
          <ul className="payment-list-item__button__lists parents">
            {!props.isReviewExpDate && !props.isReviewed && (
              <li className="payment-list-item__button__lists__review">
                <div
                  className="payment-list-item__button__lists__qna__text"
                  onClick={function () {
                    setViewReview(true);
                  }}
                >
                  후기작성
                </div>
              </li>
            )}
            {!props.isReviewExpDate && props.isReviewed && (
              <li className="payment-list-item__button__lists__review">
                <div
                  className="payment-list-item__button__lists__qna__text"
                  onClick={function () {
                    setViewModify(true);
                  }}
                >
                  후기보기
                </div>
              </li>
            )}

            {props.status !== 2 &&
              props.status !== 3 &&
              Number(moment().format("YYYYMMDD")) <
                Number(moment(expireDate).format("YYYYMMDD")) && (
                <li className="payment-list-item__button__lists__refund">
                  <div
                    className="payment-list-item__button__lists__refund__text"
                    onClick={function () {
                      setViewRefund(true);
                    }}
                  >
                    환불하기
                  </div>
                </li>
              )}
            <li className="payment-list-item__button__lists__qna">
              <DelayLink
                to={`Inquiry`}
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <div
                  className="payment-list-item__button__lists__qna__text"
                  // onClick={function () {
                  //   setViewAsk(true);
                  // }}
                >
                  문의하기
                </div>
              </DelayLink>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
};

export default PaymentListItem;
