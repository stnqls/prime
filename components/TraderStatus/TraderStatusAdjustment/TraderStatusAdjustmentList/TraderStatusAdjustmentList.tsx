import React, { useState } from "react";
import Pagination from "react-js-pagination";

import TraderStatusAdjustmentListItem from "./TraderStatusAdjustmentListItem/TraderStatusAdjustmentListItem";

import "./TraderStatusAdjustmentList.scss";

const TraderStatusAdjustmentList = (props: any) => {
  const adjustments = props.adjustments;
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(7);

  function pageChange(page: any) {
    setPage(page);
  }

  return (
    <div
      className="trader-status-adjustment-list parents"
      id="TraderStatusAdjustment"
    >
      {adjustments && adjustments.length > 0 ? (
        <div className="trader-status-adjustment-list__table parents">
          <ul className="trader-status-adjustment-list__table__subject parents">
            <li className="trader-status-adjustment-list__table__subject__nickname">
              닉네임
            </li>
            <li className="trader-status-adjustment-list__table__subject__product-name">
              구독 상품명
            </li>
            <li className="trader-status-adjustment-list__table__subject__product-price">
              상품 가격
            </li>
            <li className="trader-status-adjustment-list__table__subject__end-date">
              구독 만료 시점
            </li>
            <li className="trader-status-adjustment-list__table__subject__refund-price">
              정산 예상금액
            </li>
            <li className="trader-status-adjustment-list__table__subject__submit">
              정산요청
            </li>
          </ul>
          <ul className="trader-status-adjustment-list__table__item">
            {adjustments
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((adjustment: any, index: number) => {
                return (
                  <TraderStatusAdjustmentListItem
                    key={`adjustment-${index}`}
                    nickname={adjustment.memberNickname}
                    packageName={adjustment.packageName}
                    product_price={adjustment.price}
                    payment_status={adjustment.payment_status}
                    end_date={adjustment.end_date}
                    expireDate={adjustment.expireDate}
                    paymentId={adjustment.paymentId}
                    refundAmount={adjustment.refundAmount}
                    status={adjustment.status}
                  />
                );
              })}
          </ul>
        </div>
      ) : (
        <div className="trader-status-adjustment-list__none">
          정산 가능한 리스트가 존재하지 않습니다.
        </div>
      )}
      {adjustments.length > 0 ? (
        <Pagination
          totalItemsCount={adjustments.length}
          activePage={page}
          onChange={pageChange}
          itemsCountPerPage={item}
          firstPageText={""}
          lastPageText={""}
          nextPageText={""}
          prevPageText={""}
        />
      ) : null}
    </div>
  );
};

export default TraderStatusAdjustmentList;
