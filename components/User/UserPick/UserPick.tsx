import axios from "axios";
import { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import Pagination from "react-js-pagination";

import UserPickItem from "./UserPickItem";
import "./UserPick.scss";

const UserPick = () => {
  const [packageId, setPackageId] = useState("");
  const [packages, setPackages] = useState([]);
  const [picks, setPicks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  function getUserPick(page: number) {
    setPage(page);
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/packages/subscribe/pick?packageId=${packageId}&page=${page}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setPicks(res.data.data.picks);
          setTotalPage(res.data.data.totalPickCnt);
          if (res.data.data.packages.length > packages.length) {
            setPackages(res.data.data.packages);
          }
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getUserPick);
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
    getUserPick(1);
  }, [packageId]);
  return (
    <div className="user-pick">
      <div className="user-pick__header">
        <div className="user-pick__header__title">픽 리스트</div>
      </div>
      <select
        className="user-pick__header__sort"
        onChange={(e) => {
          setPackageId(e.target.value);
        }}
      >
        <option className="user-pick__header__sort__list" value={""}>
          전체
        </option>
        {packages.map((_package: any, index: number) => (
          <option
            className="user-pick__header__sort__list"
            key={`uer-pick-package-list-${index}`}
            value={_package.packageId}
          >
            {_package.packageName}
          </option>
        ))}
      </select>
      <div className="user-pick__body">
        <div className="user-pick__body__table">
          <ul className="user-pick__body__table__head">
            <li className="user-pick__body__table__head__package">패키지명</li>
            <li className="user-pick__body__table__head__category">분류</li>
            <li className="user-pick__body__table__head__coin">코인명</li>
            <li className="user-pick__body__table__head__entryprice">진입가</li>
            <li className="user-pick__body__table__head__targetprice">
              타겟가
            </li>
            <li className="user-pick__body__table__head__entrydate">
              진입시점
            </li>
            <li className="user-pick__body__table__head__endprice">종료가</li>
            <li className="user-pick__body__table__head__enddate">종료시점</li>
            <li className="user-pick__body__table__head__profitrate">손익율</li>
          </ul>
          {picks.length > 0 ? (
            picks.map((pick: any, index: number) => (
              <ul
                className={
                  pick.isFinished
                    ? "user-pick__body__table__body--finished"
                    : "user-pick__body__table__body"
                }
                key={`user-pick-list-${index}`}
              >
                <UserPickItem
                  packageName={pick.packageName}
                  category={pick.category}
                  coinNameKr={pick.coinNameKr}
                  coinNameEng={pick.coinNameEng}
                  pair={pick.pair}
                  leverage={pick.leverage}
                  option={pick.option}
                  entryPrice={pick.entryPrice}
                  targetPrice={pick.targetPrice}
                  entryDate={pick.entryDate}
                  endDate={pick.endDate}
                  endPrice={pick.endPrice}
                  profitRate={pick.profitRate}
                  isFinished={pick.isFinished}
                />
              </ul>
            ))
          ) : (
            <div className="user-pick__body__none">등록된 픽이 없습니다.</div>
          )}
        </div>

        {totalPage > 0 && (
          <Pagination
            totalItemsCount={totalPage}
            activePage={page}
            onChange={getUserPick}
            nextPageText={""}
            prevPageText={""}
            itemsCountPerPage={6}
          />
        )}
      </div>
    </div>
  );
};

export default UserPick;
