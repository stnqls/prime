import React, { useState, useEffect } from "react";
import axios from "axios";

import ReviewDetail from "./reviewDetail/ReviewDetail";
import SubscribeDetail from "./subscribeDetail/SubscribeDetail";
import TraderPick from "../../../../components/ViewTrader/ViewTraderPick/ViewTraderPick";
import PackageDetail from "./packageDetail/PackageDetail";
import AdminTraderPick from "./traderPick/AdminTraderPick";
import "./TraderDetail.scss";

function TraderDetail(props) {
  const [menu, setMenu] = useState(0);
  const [traderdetail, setTraderDetail] = useState([]);
  const [data, setData] = useState(traderdetail);
  const menuList = {
    0: <ReviewDetail props={data} />,
    1: <SubscribeDetail props={data} />,
    2: <TraderPick picks={traderdetail.picks} />,
    3: <SubscribeDetail props={data} />,
  };
  function getTraderDetail() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/traders/detail?uid=${props.traderId}`,
      headers,
    })
      .then((res) => {
        const data = res.data.data;
        setTraderDetail(data);
      })
      .catch((err) => {
        window.alert("에러");
      });
  }

  useEffect(() => {
    if (props.traderId) {
      getTraderDetail();
    }
  }, [props.traderId]);

  return (
    <div className="traderdetail">
      {/* <h1 className="traderdetail__title"></h1> */}
      <div className="traderdetail__content">
        <div className="traderdetail__content__header">
          <ul className="traderdetail__content__header__title">
            <li
              className={`traderdetail__content__header__title__item ${
                menuList[menu] === menuList[0] ? "active" : ""
              }`}
              onClick={() => {
                setMenu(0);
              }}
            >
              리뷰 내역
            </li>
            <li
              className={`traderdetail__content__header__title__item ${
                menuList[menu] === menuList[1] ? "active" : ""
              }`}
              onClick={() => {
                setMenu(1);
              }}
            >
              구독중인 내역
            </li>
            <li
              className={`traderdetail__content__header__title__item ${
                menuList[menu] === menuList[2] ? "active" : ""
              }`}
              onClick={() => {
                setMenu(2);
              }}
            >
              픽 내역
            </li>
            <li
              className={`traderdetail__content__header__title__item ${
                menuList[menu] === menuList[3] ? "active" : ""
              }`}
              onClick={() => {
                setMenu(3);
              }}
            >
              패키지 내역
            </li>
          </ul>
        </div>
        <div className="traderdetail__content__body">
          {menu === 0 && <ReviewDetail props={traderdetail.reviews} />}
          {menu === 1 && (
            <SubscribeDetail
              props={traderdetail.subscribers}
              name={traderdetail.nickname}
            />
          )}
          {menu === 2 && <AdminTraderPick picks={traderdetail.picks} />}
          {menu === 3 && <PackageDetail props={traderdetail.packages} />}
        </div>
      </div>
    </div>
  );
}
export default TraderDetail;
