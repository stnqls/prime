import React, { useEffect, useState, useRef } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import PaymentListItem from "./PaymentListItem/PaymentListItem";
import Pagination from "react-js-pagination";

import "./PaymentList.scss";

const PaymentList = (props: any) => {
  const payments: any = props.payments;
  const [page, setPage] = useState(1);
  const [item] = useState(5);
  const parentElement: any = useRef(null);

  function pageChange(page: any) {
    setPage(page);
  }

  useEffect(() => {
    let top = parentElement;
    window.scrollTo(0, top.current.offsetTop);
  }, [page]);

  return (
    <div className="payment-list parents" id="PaymentList" ref={parentElement}>
      <ul className="payment__count">
        <li className="payment__count__list">
          <div className="payment__count__list__done">
            <img src="/images/icons/icon_done.png" alt="" />
            <span>결제완료</span>
          </div>
          <div className="payment__count__list__num">{props.totalPayment}</div>
        </li>
        <li className="payment__count__list">
          <div className="payment__count__list__done">
            <img src="/images/icons/icon_change.png" alt="" />
            <span>환불완료</span>
          </div>
          <div className="payment__count__list__num">{props.totalRefund}</div>
        </li>
      </ul>
      <div className="payment-list__contents">
        {payments && payments.length > 0 ? (
          <>
            <ul className="payment-list__contents__lists">
              {payments
                .slice(item * (page - 1), item * (page - 1) + item)
                .map((payment: any, index: number) => {
                  return (
                    <PaymentListItem
                      key={`payment-${index}`}
                      expireDate={payment.expireDate}
                      paymentId={payment.id}
                      isReviewExpDate={payment.isReviewExpDate}
                      packageDescription={payment.packageDescription}
                      packageName={payment.packageName}
                      price={payment.price}
                      purchaseDate={payment.purchaseDate}
                      start_date={payment.start_date}
                      end_date={payment.end_date}
                      traderId={payment.traderId}
                      traderNickname={payment.traderNickname}
                      traderAvatar={payment.traderAvatar}
                      status={payment.status}
                      refundAmount={payment.refundAmount}
                      refundDate={payment.refundDate}
                      subscriptionId={payment.subscriptionId}
                      isReviewed={payment.isReviewed}
                      reviewId={payment.reviewId}
                    />
                  );
                })}
            </ul>
            {payments.length > 0 ? (
              <Pagination
                totalItemsCount={payments.length}
                activePage={page}
                onChange={pageChange}
                itemsCountPerPage={item}
                firstPageText={""}
                lastPageText={""}
                nextPageText={""}
                prevPageText={""}
              />
            ) : null}
            {/* <div className="payment-list__contents__more">
              <div className="payment-list__contents__more__paragraph">
                아직 함께하지 못한 다른 트레이더도 확인해보세요!
              </div>
              <div className="payment-list__contents__more__button">
                <DelayLink
                  to={`findTrader`}
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <div className="payment-list__contents__more__button__text">
                    다른 트레이더 확인
                  </div>
                </DelayLink>
              </div>
            </div> */}
          </>
        ) : (
          <div className="payment-list__contents__none parents">
            <div className="payment-list__contents__none__title">
              결제 내역이 없습니다.
            </div>
            <div className="payment-list__contents__none__mtitle">
              결제한 내역이 없습니다.
            </div>
            <div className="payment-list__contents__none__paragraph">
              프라임인베스트먼트가 선정한 트레이더를 확인해보세요!
            </div>
            <div className="payment-list__contents__none__button">
              <DelayLink
                to={`findTrader`}
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <div className="payment-list__contents__none__button__text">
                  트레이더 찾기
                </div>
              </DelayLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentList;
