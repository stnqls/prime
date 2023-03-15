import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import Lee from "../../../lib/Lee";
import ViewTraderPickItem from "./ViewTraderPickItem/ViewTraderPickItem";
import ViewTraderPickItemMobile from "./ViewTraderPickItem/ViewTraderPickItemMobile";
import "./ViewTraderPick.scss";

const ViewTraderPick = () => {
  const [picks, setPicks] = useState([]);
  const [uid, setUid] = useState();
  const [page, setPage] = useState(1);
  const [item] = useState(10);
  const [length, setLength] = useState(0);

  function getParameterByName(name: string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function getPicks(page: number) {
    setPage(page);
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/picks?page=${page}&uid=${getParameterByName(
        "uid"
      )}`,
    })
      .then((res) => {
        const data = res.data.data;
        if (res.data.success) {
          setPicks(data.picks);
          setLength(data.totalPickCnt);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getPicks);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("서버 오류가 발생하였습니다.");
      });
  }

  useEffect(() => {
    getPicks(1);
  }, [page]);

  return (
    <div className="view-trader-pick parents" id="ViewTraderPick">
      <div className="view-trader-pick__title">픽 리스트</div>
      <div className="view-trader-pick__contents">
        {picks && picks.length > 0 ? (
          <ul className="view-trader-pick__contents__table">
            <div className="view-trader-pick__contents__table__subject">
              <li className="view-trader-pick__contents__table__subject__package">
                패키지명
              </li>
              <li className="view-trader-pick__contents__table__subject__type">
                분류
              </li>
              <li className="view-trader-pick__contents__table__subject__coin">
                코인명
              </li>
              <li className="view-trader-pick__contents__table__subject__pair">
                페어
              </li>
              <li className="view-trader-pick__contents__table__subject__entry-price">
                진입가
              </li>
              <li className="view-trader-pick__contents__table__subject__target-price">
                타겟가
              </li>
              <li className="view-trader-pick__contents__table__subject__entry-date">
                진입시점
              </li>
              <li className="view-trader-pick__contents__table__subject__end-price">
                종료가
              </li>
              <li className="view-trader-pick__contents__table__subject__end-date">
                종료시점
              </li>
              <li className="view-trader-pick__contents__table__subject__profit-rate">
                손익률
              </li>
            </div>
            <ul className="view-trader-pick__contents__table__item">
              {picks
                .slice(item * (page - 1), item * (page - 1) + item)
                .map((pick: any, index: number) => {
                  return (
                    <ViewTraderPickItem
                      key={`pick-${index}`}
                      package={pick.packageName}
                      status={pick.isFinished}
                      type={pick.category}
                      coinKR={pick.coinNameKr}
                      coinEN={pick.coinNameEng}
                      pair={pick.pair}
                      entry_price={pick.entryPrice}
                      target_price={pick.targetPrice}
                      end_price={pick.endPrice}
                      entry_date={pick.entryDate}
                      end_date={pick.endDate}
                      profit_rate={pick.profitRate}
                      option={pick.option}
                      leverage={pick.leverage}
                    />
                  );
                })}
            </ul>
          </ul>
        ) : (
          <div className="view-trader-pick__contents__none">
            등록된 픽이 없습니다.
          </div>
        )}

        {picks && picks.length > 0 ? (
          <div className="view-trader-pick__contents__mtable">
            {picks
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((pick: any, index: number) => {
                return (
                  <ViewTraderPickItemMobile
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
              })}
          </div>
        ) : (
          <div className="view-trader-pick__contents__mnone">
            등록된 픽이 없습니다.
          </div>
        )}
        {picks && picks.length > 0 && (
          <Pagination
            totalItemsCount={length}
            activePage={page}
            onChange={getPicks}
            itemsCountPerPage={item}
            firstPageText={""}
            lastPageText={""}
            prevPageText={""} //이전을 나타낼 텍스트
            nextPageText={""} //다음을 나타낼 텍스트
          />
        )}
      </div>
    </div>
  );
};

export default ViewTraderPick;
