import React, { useState } from "react";
import Pagination from "react-js-pagination";

import TraderStatusAdjustmentDetailItem from "./TraderStatusAdjustmentDetailItem/TraderStatusAdjustmentDetailItem";

import "./TraderStatusAdjustmentDetail.scss";

const TraderStatusAdjustmentList = (props: any) => {
  const history = props.history;
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(7);

  function pageChange(page: any) {
    setPage(page);
  }

  return (
    <div className="trader-status-adjustment-detail parents">
      {history && history.length > 0 ? (
        <div className="trader-status-adjustment-detail__table parents">
          <ul className="trader-status-adjustment-detail__table__subject parents">
            <li className="trader-status-adjustment-detail__table__subject__nickname">
              닉네임
            </li>
            <li className="trader-status-adjustment-detail__table__subject__product-name">
              구독 상품명
            </li>
            <li className="trader-status-adjustment-detail__table__subject__product-price">
              상품 가격
            </li>
            <li className="trader-status-adjustment-detail__table__subject__end-date">
              정산 시점
            </li>
            <li className="trader-status-adjustment-detail__table__subject__refund-price">
              정산 (예상)금액
            </li>
            <li className="trader-status-adjustment-detail__table__subject__submit">
              상태
            </li>
          </ul>
          <ul className="trader-status-adjustment-detail__table__item parents">
            {history
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((history: any, index: number) => {
                return (
                  <TraderStatusAdjustmentDetailItem
                    key={`history-${index}`}
                    nickname={history.memberNickname}
                    packageName={history.packageName}
                    product_price={history.price}
                    withdrawalAmount={history.withdrawalAmount}
                    expireDate={history.date}
                    status={history.status}
                  />
                );
              })}
          </ul>
        </div>
      ) : (
        <div className="trader-status-adjustment-detail__none">
          정산내역이 존재하지 않습니다.
        </div>
      )}
      {history.length > 0 ? (
        <Pagination
          totalItemsCount={history.length}
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
