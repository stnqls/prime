import React from "react";

import TraderStatusSettlementItem from "./TraderStatusSettlementItem/TraderStatusSettlementItem";

import "./TraderStatusSettlement.scss";

const TraderStatusSettlement = (props: any) => {
  const settlements = props.settlements;

  return (
    <div
      className="trader-status-settlement parents"
      id="TraderStatusSettlement"
    >
      <div className="trader-status-settlement__contents">
        <div className="trader-status-settlement__contents__title">
          당월 정산 내역
        </div>
        <div className="trader-status-settlement__contents__button">
          {/* <li className="trader-status-settlement__contents__button__add">
            이번 달 전체 보기
          </li>
          <li className="trader-status-settlement__contents__button__modify">
            엑셀 시트로 보기
          </li> */}
        </div>
        {settlements && (
          <div className="trader-status-settlement__contents__table parents">
            <ul className="trader-status-settlement__contents__table__subject parents">
              <li className="trader-status-settlement__contents__table__subject__nickname">
                닉네임
              </li>
              <li className="trader-status-settlement__contents__table__subject__email">
                이메일
              </li>
              <li className="trader-status-settlement__contents__table__subject__payment-price">
                결제금액
              </li>
              <li className="trader-status-settlement__contents__table__subject__settlement-price">
                정산금
              </li>
              <li className="trader-status-settlement__contents__table__subject__payment-status">
                당월 결제 여부
              </li>
            </ul>
            <ul className="trader-status-settlement__contents__table__item parents">
              {settlements.map((settlement: any, index: number) => {
                if (index < 5) {
                  return (
                    <TraderStatusSettlementItem
                      key={`settlement-${index}`}
                      nickname={settlement.nickname}
                      email={settlement.email}
                      payment_price={settlement.payment_price}
                      settlement_price={settlement.settlement_price}
                      payment_status={settlement.payment_status}
                    />
                  );
                }
              })}
            </ul>
          </div>
        )}
        <div className="trader-status-settlement__contents__paging">
          <span className="trader-status-settlement__contents__paging__prev">
            ◀
          </span>
          <span className="now">1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span className="trader-status-settlement__contents__paging__next">
            ▶
          </span>
        </div>
      </div>
    </div>
  );
};

export default TraderStatusSettlement;
