import React from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import TraderStatusPickItem from "./TraderStatusPickItem/TraderStatusPickItem";

import "./TraderStatusPick.scss";

const TraderStatusPick = (props: any) => {
  const picks = props.picks;

  if (picks) {
    picks.sort(function (a: any, b: any) {
      return a.entryDate > b.entryDate ? -1 : a.entryDate < b.entryDate ? 1 : 0;
    });
  }

  return (
    <div className="trader-status-pick parents" id="TraderStatusPick">
      <div className="trader-status-pick__contents">
        <div className="trader-status-pick__contents__button">
          <DelayLink
            to="traderPick"
            delay={200}
            onDelayStart={Lee.loadingStart}
          >
            <li className="trader-status-pick__contents__button__modify">
              수정하기
            </li>
          </DelayLink>
        </div>
        {picks && picks.length > 0 ? (
          <div className="trader-status-pick__contents__table parents">
            <ul className="trader-status-pick__contents__table__subject parents">
              <li className="trader-status-pick__contents__table__subject__type">
                분류
              </li>
              <li className="trader-status-pick__contents__table__subject__coin">
                코인명
              </li>
              <li className="trader-status-pick__contents__table__subject__entry-price">
                진입가
              </li>
              <li className="trader-status-pick__contents__table__subject__target-price">
                타겟가
              </li>
              <li className="trader-status-pick__contents__table__subject__end-price">
                종료가
              </li>
              <li className="trader-status-pick__contents__table__subject__entry-date">
                진입시점
              </li>
              <li className="trader-status-pick__contents__table__subject__end-date">
                종료시점
              </li>
              <li className="trader-status-pick__contents__table__subject__profit-rate">
                손익률
              </li>
            </ul>
            <ul className="trader-status-pick__contents__table__item parents">
              {picks.map((pick: any, index: number) => {
                if (index < 10) {
                  return (
                    <TraderStatusPickItem
                      key={`pick-${index}`}
                      status={pick.isFinished}
                      type={pick.category}
                      coinKR={pick.coinNameKr}
                      coinEN={pick.coinNameEng}
                      fair={pick.pair}
                      entry_price={pick.entryPrice}
                      target_price={pick.targetPrice}
                      end_price={pick.endPrice}
                      entry_date={pick.entryDate}
                      end_date={pick.endDate}
                      profit_rate={pick.profitRate}
                    />
                  );
                }
              })}
            </ul>
          </div>
        ) : (
          <div className="trader-status-pick__contents__none">
            등록한 픽이 존재하지 않습니다.
          </div>
        )}
        {/* <div className="trader-status-pick__contents__paging">
          <span className="trader-status-pick__contents__paging__prev">◀</span>
          <span className="now">1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span className="trader-status-pick__contents__paging__next">▶</span>
        </div> */}
      </div>
    </div>
  );
};

export default TraderStatusPick;
