import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "./AdminTraderPick.scss";

const AdminTraderPick = (props: any) => {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);
  function pageChange(page: any) {
    setPage(page);
  }

  return (
    <React.Fragment>
      <table className="admin-trader-pick">
        <thead className="admin-trader-pick__thead">
          <tr className="admin-trader-pick__thead__tr">
            <td>분류</td>
            <td>코인명</td>
            <td>페어</td>
            <td>진입가</td>
            <td>타겟가</td>
            <td>진입시점</td>
            <td>종료가</td>
            <td>종료시점</td>
            <td>손익률</td>
          </tr>
        </thead>
        <tbody className="admin-trader-pick__tbody">
          {props.picks
            .slice(item * (page - 1), item * (page - 1) + item)
            .map((pick: any, index: number) => (
              <tr
                className="admin-trader-pick__tbody__tr"
                key={`admin-trader-pick-${index}`}
              >
                <td>{pick.category}</td>
                <td>{pick.coinNameKr}</td>
                <td>{pick.pair}</td>
                <td>{pick.enteryPrice}</td>
                <td>{pick.targetPrice}</td>
                <td>{pick.entryDate}</td>
                <td>{pick.isFinished ? pick.endPrice : "-"}</td>
                <td>{pick.isFinished ? pick.endDate : "-"}</td>
                <td>{pick.isFinished ? pick.profitRate : "-"}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        totalItemsCount={props.picks.length}
        activePage={page}
        onChange={pageChange}
        itemsCountPerPage={item}
        firstPageText={""}
        lastPageText={""}
        prevPageText={""} //이전을 나타낼 텍스트
        nextPageText={""} //다음을 나타낼 텍스트
      />
    </React.Fragment>
  );
};

export default AdminTraderPick;
