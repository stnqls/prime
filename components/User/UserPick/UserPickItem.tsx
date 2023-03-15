import React from "react";
import Lee from "../../../lib/Lee";

const UserPickItem = (pick: any) => {
  let category = "";
  let rate_detect;

  if (pick.category === "spot") {
    category = "현물";
  } else {
    category = "선물";
  }

  if (pick.profitRate > 0) {
    rate_detect = "over";
  } else if (pick.profitRate < 0) {
    rate_detect = "under";
  } else {
    rate_detect = "normal";
  }

  return (
    <React.Fragment>
      <li className="user-pick__body__table__body__package">
        {pick.packageName}
      </li>
      <li className="user-pick__body__table__body__category">{category}</li>
      {pick.category === "spot" ? (
        <li className="user-pick__body__table__body__coin">
          <div>
            {pick.coinNameKr}({pick.coinNameEng})
          </div>
          <div>{pick.pair}</div>
        </li>
      ) : (
        <li className="user-pick__body__table__body__coin">
          <div>
            {pick.coinNameKr}({pick.coinNameEng})
          </div>
          <div>
            {pick.pair} | {pick.option}
            <span className="user-pick__body__table__body__coin__leverage">
              {pick.leverage}
            </span>
          </div>
        </li>
      )}
      <li className="user-pick__body__table__body__entryprice">
        {Lee.addComma(pick.entryPrice)}
      </li>
      <li className="user-pick__body__table__body__targetprice">
        {Lee.addComma(pick.targetPrice)}
      </li>
      <li className="user-pick__body__table__body__entrydate">
        {pick.entryDate.slice(2, 19)}
      </li>
      <li className={`user-pick__body__table__body__endprice ${rate_detect}`}>
        {pick.isFinished ? Lee.addComma(pick.endPrice) : "진행중"}
      </li>
      <li className="user-pick__body__table__body__enddate">
        {pick.isFinished ? pick.endDate.slice(2, 19) : "진행중"}
      </li>
      <li className={`user-pick__body__table__body__profitrate ${rate_detect}`}>
        {pick.profitRate}%
      </li>
    </React.Fragment>
  );
};

export default UserPickItem;
