import React, { useState, useEffect } from "react";
import axios from "axios";
import Lee from "../../../lib/Lee";
import Router from "next/router";

import TraderStatusAdjustmentList from "./TraderStatusAdjustmentList/TraderStatusAdjustmentList";
import TraderStatusAdjustmentDetail from "./TraderStatusAdjustmentDetail/TraderStatusAdjustmentDetail";

import "./TraderStatusAdjustment.scss";

const TraderStatusAdjustment = () => {
  const [login, setLogin] = useState(false);
  const [adjustments, setAdjustments]: any = useState([]);
  const [history, setHistory]: any = useState([]);
  const [total, setTotal] = useState();
  const [menu, setMenu] = useState(0);

  function getAdjustments() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/traders/withdrawals`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setAdjustments(data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getAdjustments);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  function getHistory() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/traders/withdrawals/history`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setHistory(data.histories);
          setTotal(data.totalAmount);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getHistory);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  useEffect(() => {
    if (Lee.checkLogin()) {
      setLogin(true);
      getAdjustments();
      getHistory();
    } else {
      alert("로그인이 필요합니다.");
      Router.push("/login");
    }
  }, []);

  return (
    <div
      className="trader-status-adjustment parents"
      id="TraderStatusAdjustment"
    >
      <div className="trader-status-adjustment__title">정산 리스트</div>
      <ul className="trader-status-adjustment__sort">
        <li
          className={
            menu === 0
              ? "trader-status-adjustment__sort__list--click"
              : "trader-status-adjustment__sort__list"
          }
          onClick={() => {
            setMenu(0);
          }}
        >
          정산가능리스트
        </li>
        <span>&#183;</span>
        <li
          className={
            menu === 1
              ? "trader-status-adjustment__sort__list--click"
              : "trader-status-adjustment__sort__list"
          }
          onClick={() => {
            setMenu(1);
          }}
        >
          정산 내역
        </li>
      </ul>
      <div className="trader-status-adjustment__total">
        총 정산 금액 : {total === 0 ? 0 : Lee.addComma(total)} 원
      </div>

      <div className="trader-status-adjustment__body">
        {menu === 0 && <TraderStatusAdjustmentList adjustments={adjustments} />}
        {menu === 1 && <TraderStatusAdjustmentDetail history={history} />}
      </div>
    </div>
  );
};

export default TraderStatusAdjustment;
