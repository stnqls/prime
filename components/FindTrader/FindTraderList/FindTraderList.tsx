import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import Lee from "../../../lib/Lee";

import FindTraderListItem from "./FindTraderListItem/FindTraderListItem";
import "./FindTraderList.scss";

const FindTraderList = (props: any) => {
  const [traders, setTraders]: any = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortStatus, setSortStatus] = useState(0);
  const [mobile, setMobile]: any = useState();
  const [msearch, setMsearch] = useState(false);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(12);

  function pageChange(page: any) {
    setPage(page);
  }

  function nameFilter() {
    const filterTraders = props.traders.filter((val: any) => {
      if (searchText == "") {
        return val;
      } else if (
        val.nickname.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return val;
      }
    });

    setTraders(filterTraders);

    if (sortStatus === 0) {
      const sortTraders = filterTraders.sort(function (a: any, b: any) {
        return b.totalProfitRate - a.totalProfitRate;
      });

      setTraders(sortTraders);
    } else if (sortStatus === 1) {
      const sortTraders = filterTraders.sort(function (a: any, b: any) {
        return b.totalProfitRate - a.totalProfitRate;
      });

      setTraders(sortTraders);
    } else if (sortStatus === 2) {
      const sortTraders = filterTraders.sort(function (a: any, b: any) {
        return b.subscribersNum - a.subscribersNum;
      });

      setTraders(sortTraders);
    }
  }

  const selectSort = (target: number) => {
    const items = Lee.gets("find-trader-list__contents__search__sort__list");
    const item = Lee.get(`sort${target}`);

    for (let i = 0; i < items.length; i++) {
      Lee.removeClass(items[i], "selected");
    }

    Lee.addClass(item, "selected");
    setSortStatus(target);
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    setTraders(props.traders);
  }, [props.traders]);

  useEffect(() => {
    nameFilter();
  }, [searchText, sortStatus]);

  useEffect(() => {
    if (msearch === true) {
      const scroll = window.scrollY;
      document.body.style.cssText = `
    position: fixed;
    top: -${scroll}px;
    overflow: hidden;
    width: 100%;
    height: auto;
  `;
      return () => {
        document.body.style.cssText = "";
        window.scrollTo(0, scroll);
      };
    }
  }, [msearch]);

  return (
    <div className="find-trader-list parents" id="FindTraderList">
      <div className="find-trader-list__contents parents">
        <div className="find-trader-list__contents__slogan">
          Professional Traders
        </div>
        <div className="find-trader-list__contents__title">
          국내 최고의 암호화폐 전문가들을 만나보세요
        </div>
        <div className="find-trader-list__contents__search parents">
          <ul className="find-trader-list__contents__search__sort">
            <li
              className="find-trader-list__contents__search__sort__list"
              id="sort1"
              onClick={function () {
                selectSort(1);
              }}
            >
              종합 수익률 순
            </li>
            <li
              className="find-trader-list__contents__search__sort__list"
              id="sort2"
              onClick={function () {
                selectSort(2);
              }}
            >
              구독자 많은 순
            </li>
          </ul>
          <div className="find-trader-list__contents__search__input">
            <input
              type="text"
              placeholder="트레이더 이름"
              maxLength={24}
              onChange={(e) => {
                setSearchText(e.target.value);
                nameFilter();
              }}
            />
            <img
              src="/assets/search-g.png"
              alt="search"
              className="find-trader-list__contents__search__input__icon"
            />
          </div>
        </div>
        <ul className="find-trader-list__contents__lists parents">
          {traders && traders.length > 0 ? (
            traders
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((trader: any, idx: number) => {
                return (
                  <FindTraderListItem
                    key={`find-trader-${idx}`}
                    nickname={trader.nickname}
                    avatar={trader.avatar}
                    tags={trader.tags}
                    room_members={trader.subscribersNum}
                    earnings_rate={trader.totalProfitRate}
                    thumbnail={trader.thumbnail}
                    traderId={trader.id}
                  />
                );
              })
          ) : (
            <div className="find-trader-list__contents__lists__null">
              <img
                src="/assets/nonexistent.png"
                alt=""
                className="find-trader-list__contents__lists__null__img"
              />
              <div className="find-trader-list__contents__lists__null__text">
                "<span>[{searchText}]</span>
                "에 대한 검색 결과가 없습니다.
              </div>
            </div>
          )}
        </ul>
        {traders && traders.length > 0 && (
          <Pagination
            totalItemsCount={traders.length}
            activePage={page}
            onChange={pageChange}
            itemsCountPerPage={item}
            firstPageText={""}
            lastPageText={""}
            nextPageText={""}
            prevPageText={""}
          />
        )}
      </div>
    </div>
  );
};

export default FindTraderList;
