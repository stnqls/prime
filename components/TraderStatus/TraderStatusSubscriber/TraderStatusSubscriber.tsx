import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import Lee from "../../../lib/Lee";

import TraderStatusSubscriberItem from "./TraderStatusSubscriberItem/TraderStatusSubscriberItem";
import "./TraderStatusSubscriber.scss";

const TraderStatusSubscriber = (props: any) => {
  const packages = props.packages.length === 0 ? [] : props.packages;
  const [packageId, setPackageId] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [subscriberLength, setSubscribersLength] = useState(0);
  const [page, setPage] = useState(1);
  const [item] = useState(5);
  const [menu, setMenu] = useState(0);

  function pageChange(page: any) {
    setPage(page);
  }

  function getSubscriber() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/traders/subscribers?packageId=${packageId}`,
      headers,
    })
      .then((res) => {
        if (res.status === 200) {
          setSubscribers(res.data.data);
          if (res.data.errCode === "101") {
            Lee.refreshToken(getSubscriber);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        // alert("오류가 발생했습니다.");
      });
  }

  const selectMenu = (target: number) => {
    const items = Lee.gets("trader-status-subscriber__contents__menu__item");
    const item = Lee.get(`menu${target}`);

    for (let i = 0; i < items.length; i++) {
      Lee.removeClass(items[i], "selected");
    }

    Lee.addClass(item, "selected");
    setMenu(target);
  };

  useEffect(() => {
    getSubscriber();
  }, [packageId]);

  return (
    <div
      className="trader-status-subscriber parents"
      id="TraderStatusSubscriber"
    >
      <div className="trader-status-subscriber__contents">
        <div className="trader-status-subscriber__contents__title">
          구독자 리스트
        </div>
        <ul className="trader-status-subscriber__contents__menu">
          {packages &&
            packages.length > 0 &&
            packages.map((item: any, index: number) => {
              if (!item.isDeleted) {
                return (
                  <li
                    key={`trader-status-subscriber-${index}`}
                    className="trader-status-subscriber__contents__menu__item"
                    id={`menu${index}`}
                    onClick={() => {
                      setPackageId(item.id);
                      selectMenu(index);
                    }}
                  >
                    {item.packageName}
                  </li>
                );
              }
            })}
        </ul>
        {subscribers && subscribers.length > 0 ? (
          <div className="trader-status-subscriber__contents__table parents">
            <ul className="trader-status-subscriber__contents__table__subject parents">
              <li className="trader-status-subscriber__contents__table__subject__nickname">
                닉네임
              </li>
              <li className="trader-status-subscriber__contents__table__subject__product-name">
                구독 상품명
              </li>
              <li className="trader-status-subscriber__contents__table__subject__product-price">
                상품 가격
              </li>
              <li className="trader-status-subscriber__contents__table__subject__end-date">
                구독 만료 시점
              </li>
            </ul>
            <ul className="trader-status-subscriber__contents__table__item parents">
              {subscribers.map((subscriber: any, index: number) => {
                if (index < 5) {
                  return (
                    <TraderStatusSubscriberItem
                      key={`subscriber-${index}`}
                      nickname={subscriber.nickname}
                      packageName={subscriber.packageName}
                      product_price={subscriber.price}
                      payment_status={subscriber.payment_status}
                      expireDate={subscriber.expireDate}
                    />
                  );
                }
              })}
            </ul>
          </div>
        ) : (
          <div className="trader-status-subscriber__contents__none">
            구독자 리스트가 존재하지 않습니다.
          </div>
        )}
        {subscribers.length > 0 ? (
          <Pagination
            totalItemsCount={subscribers.length}
            activePage={page}
            onChange={pageChange}
            itemsCountPerPage={item}
            firstPageText={""}
            lastPageText={""}
            nextPageText={""}
            prevPageText={""}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TraderStatusSubscriber;
