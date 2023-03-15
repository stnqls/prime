import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";
import axios from "axios";
import Router from "next/router";

import "./TraderPickListItem.scss";

const TraderPickListItem = (props: any) => {
  let rate_detect;
  let price_detect;
  let status;

  if (!props.isFinished) {
    status = "proceeding";
  }

  if (props.profitRate > 0) {
    rate_detect = "over";
  } else if (props.profitRate < 0) {
    rate_detect = "under";
  } else {
    rate_detect = "normal";
  }

  if (props.endPrice > props.entryPrice) {
    price_detect = "over";
  } else if (props.endPrice && props.endPrice < props.entryPrice) {
    price_detect = "under";
  } else {
    price_detect = "normal";
  }

  function endPick() {
    const endPrice: any = prompt("해당 코인의 종료가를 입력해주세요.", "");

    if (endPrice !== null && endPrice > 0) {
      const headers: any = {
        authorization: window.sessionStorage.getItem("token"),
      };

      axios({
        method: "POST",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/picks/end`,
        headers,
        data: {
          pickId: props.pickId,
          endPrice: endPrice,
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert("픽이 정상적으로 종료되었습니다.");
            location.reload();
          } else {
            if (res.data.errCode === "101") {
              Lee.refreshToken(endPick);
            } else {
              alert("서버 통신 중 오류가 발생했습니다.");
            }
          }
        })
        .catch((err) => {
          alert("서버 통신 중 오류가 발생했습니다.");
        });
    }
    if (endPrice === "" || endPrice === "0") {
      alert("올바른 종료가를 입력해주세요.");
      endPick();
    }
  }

  function cancelPick() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/picks/${props.pickId}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          alert("픽이 정상적으로 삭제되었습니다.");
          location.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(cancelPick);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("서버 통신 중 오류가 발생했습니다.");
      });
  }

  return (
    <li className={`trader-pick-list-item ${status}`}>
      <ul className="trader-pick-list-item__list">
        <li className="trader-pick-list-item__list__package">
          {props.packageName}
        </li>
        <li className="trader-pick-list-item__list__type">
          {props.category === "futures" ? "선물" : "현물"}
        </li>
        {props.category === "futures" ? (
          <li className="trader-pick-list-item__list__coin">
            <div>
              {props.coinNameKr}({props.coinNameEng})
            </div>
            <div>
              {props.pair} | {props.option}
              <span className="trader-pick-list-item__list__coin__leverage">
                {props.leverage}
              </span>
            </div>
          </li>
        ) : (
          <li className="trader-pick-list-item__list__coin">
            <div>
              {props.coinNameKr}({props.coinNameEng})
            </div>
            <div>{props.pair}</div>
          </li>
        )}
        <li className="trader-pick-list-item__list__entry-price">
          {Lee.addComma(props.entryPrice)}
        </li>
        <li className="trader-pick-list-item__list__target-price">
          {Lee.addComma(props.targetPrice)}
        </li>
        <li className="trader-pick-list-item__list__entry-date">
          {props.entryDate && props.entryDate.slice(2, 19)}
        </li>
        <li className={`trader-pick-list-item__list__end-price ${rate_detect}`}>
          {props.endPrice ? Lee.addComma(props.endPrice) : "진행 중"}
        </li>
        <li className="trader-pick-list-item__list__end-date">
          {props.endDate ? props.endDate.slice(2, 19) : "진행 중"}
        </li>
        <li
          className={`trader-pick-list-item__list__profit-rate ${rate_detect}`}
        >
          {props.endDate ? `${props.profitRate}%` : "진행 중"}
        </li>
        <li className="trader-pick-list-item__list__action">
          {status === "proceeding" && (
            <ul className="trader-pick-list-item__list__action__button">
              <li onClick={cancelPick}>삭제</li>
              <li onClick={endPick}>종료</li>
            </ul>
          )}
        </li>
      </ul>
    </li>
  );
};

export default TraderPickListItem;
