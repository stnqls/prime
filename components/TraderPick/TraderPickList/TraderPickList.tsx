import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import TraderPickListItem from "./TraderPickListItem/TraderPickListItem";
import Pagination from "react-js-pagination";
import dynamic from "next/dynamic";
import axios from "axios";

import "./TraderPickList.scss";

const AddPickModal = dynamic(import("../AddPick/addPick"), { ssr: false });

const TraderPickList = () => {
  const [packages, setPackages] = useState([]);
  const [picks, setPicks]: any = useState([]);

  const [addpick, setAddpick] = useState(false);
  const [length, setLength] = useState(0);
  const [packageId, setPackageId]: any = useState("");
  const [page, setPage] = useState(1);
  const [item] = useState(6);

  function getPicks(page: number) {
    setPage(page);
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/picks?page=${page}&packageId=${packageId}`,
      headers,
    })
      .then((res) => {
        const data = res.data.data;
        if (res.data.success) {
          setPicks(data.picks);
          setLength(data.totalPickCnt);
          if (data.packages.length > packages.length) {
            setPackages(data.packages);
          }
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
  }, [packageId]);

  return (
    <React.Fragment>
      <div className="trader-pick-list parents" id="TraderPickList">
        <div className="trader-pick-list__header">
          <div className="trader-pick-list__header__title">픽 관리</div>
          <div
            className="trader-pick-list__header__add"
            onClick={() => {
              setAddpick(true);
            }}
          >
            픽 등록하기
          </div>
        </div>

        {picks.length > 0 ? (
          <React.Fragment>
            <select
              className="trader-pick-list__sort"
              onChange={(e) => {
                setPackageId(e.target.value);
              }}
            >
              <option value="">전체</option>
              {packages.map((_package: any, index: number) => {
                return (
                  !_package.isDeleted && (
                    <option
                      className="user-pick__header__sort__list"
                      key={`uer-pick-package-list-${index}`}
                      value={_package.packageId}
                    >
                      {_package.packageName}
                    </option>
                  )
                );
              })}
            </select>
            <div className="trader-pick-list__table">
              <ul className="trader-pick-list__table__subject">
                <li className="trader-pick-list__table__subject__package">
                  패키지명
                </li>
                <li className="trader-pick-list__table__subject__type">분류</li>
                <li className="trader-pick-list__table__subject__coin">
                  코인명
                </li>
                <li className="trader-pick-list__table__subject__entry-price">
                  진입가
                </li>
                <li className="trader-pick-list__table__subject__target-price">
                  타겟가
                </li>
                <li className="trader-pick-list__table__subject__entry-date">
                  진입시점
                </li>
                <li className="trader-pick-list__table__subject__end-price">
                  종료가
                </li>
                <li className="trader-pick-list__table__subject__end-date">
                  종료시점
                </li>
                <li className="trader-pick-list__table__subject__profit-rate">
                  손익률
                </li>
                <li className="trader-pick-list__table__subject__action"></li>
              </ul>
              <ul className="trader-pick-list__table__item">
                {picks.map((pick: any, index: number) => {
                  if (index < 10) {
                    return (
                      <TraderPickListItem
                        key={`pick-${index}`}
                        category={pick.category}
                        coinNameEng={pick.coinNameEng}
                        coinNameKr={pick.coinNameKr}
                        entryDate={pick.entryDate}
                        entryPrice={pick.entryPrice}
                        pickId={pick.id}
                        isFinished={pick.isFinished}
                        leverage={pick.leverage}
                        option={pick.option}
                        packageId={pick.packageId}
                        packageName={pick.packageName}
                        pair={pick.pair}
                        profitRate={pick.profitRate}
                        targetPrice={pick.targetPrice}
                        endDate={pick.endDate}
                        endPrice={pick.endPrice}
                      />
                    );
                  }
                })}
              </ul>
            </div>
          </React.Fragment>
        ) : (
          <div className="trader-pick-list__none">
            등록된 픽이 없습니다. <br />
            픽을 등록해 주세요.
          </div>
        )}
        {picks.length > 0 && (
          <Pagination
            totalItemsCount={length}
            activePage={page}
            onChange={getPicks}
            itemsCountPerPage={item}
            firstPageText={""}
            lastPageText={""}
            nextPageText={""}
            prevPageText={""}
          />
        )}
      </div>
      {addpick && <AddPickModal setView={setAddpick} />}
    </React.Fragment>
  );
};

export default TraderPickList;
