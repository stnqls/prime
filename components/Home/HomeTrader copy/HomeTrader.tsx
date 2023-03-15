import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import HomeTraderItem from "./HomeTraderItem/HomeTraderItem";

import "./HomeTrader.scss";

const HomeTrader = () => {
  const [searchText, setSearchText] = useState("");

  const datas = [
    {
      nickname: "KOREA TIGER",
      tags: ["BTC", "트레이더", "전문백수"],
      room_members: 1928,
      earnings_rate: 9.878,
      thumbnail:
        "https://images.unsplash.com/photo-1544168190-79c17527004f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      nickname: "BBC Edwards",
      tags: ["알트전문", "미친픽", "광신도"],
      room_members: 1928,
      earnings_rate: 9.878,
      thumbnail:
        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
    },
    {
      nickname: "KOREA 햇님",
      tags: ["BTCUSDT", "선물", "청산전문"],
      room_members: 1928,
      earnings_rate: 9.878,
      thumbnail:
        "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      nickname: "BBC James",
      tags: ["BTCUSDT", "걸크러쉬", "원더우먼"],
      room_members: 1928,
      earnings_rate: 9.878,
      thumbnail:
        "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
    },
    {
      nickname: "KOREA TIGER",
      tags: ["BTC", "트레이더", "전문백수"],
      room_members: 1928,
      earnings_rate: 9.878,
      thumbnail:
        "https://images.unsplash.com/photo-1544168190-79c17527004f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      nickname: "BBC Edwards",
      tags: ["알트전문", "미친픽", "광신도"],
      room_members: 1928,
      earnings_rate: 9.878,
      thumbnail:
        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
    },
    {
      nickname: "KOREA 햇님",
      tags: ["BTCUSDT", "선물", "청산전문"],
      room_members: 1928,
      earnings_rate: 9.878,
      thumbnail:
        "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      nickname: "BBC James",
      tags: ["BTCUSDT", "걸크러쉬", "원더우먼"],
      room_members: 1928,
      earnings_rate: 9.878,
      thumbnail:
        "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
    },
  ];

  let traders = datas.filter((val) => {
    if (searchText == "") {
      return val;
    } else if (val.nickname.toLowerCase().includes(searchText.toLowerCase())) {
      return val;
    }
  });

  return (
    <div className="home-trader parents" id="HomeTrader">
      <div className="home-trader__contents parents">
        <div className="home-trader__contents__title">
          국내 최고의 암호화폐 전문가들을 만나보세요
        </div>
        <div className="home-trader__contents__search parents">
          <ul className="home-trader__contents__search__sort">
            <li className="home-trader__contents__search__sort__list selected">
              종합순
            </li>
            <li className="home-trader__contents__search__sort__list">
              최근 2주 수익률
            </li>
            <li className="home-trader__contents__search__sort__list">
              종합 수익률 순
            </li>
            <li className="home-trader__contents__search__sort__list">
              방 인원순
            </li>
          </ul>
          <div className="home-trader__contents__search__input">
            <input
              type="text"
              placeholder="트레이더 이름"
              maxLength={24}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <img
              src="/images/icons/search-icon-blue.png"
              alt="search"
              className="home-trader__contents__search__input__icon"
            />
          </div>
        </div>
        <ul className="home-trader__contents__lists parents">
          {traders && traders.length > 0 ? (
            traders.map((trader, idx) => {
              return (
                <HomeTraderItem
                  key={`trader-${idx}`}
                  nickname={trader.nickname}
                  tags={trader.tags}
                  room_members={trader.room_members}
                  earnings_rate={trader.earnings_rate}
                  thumbnail={trader.thumbnail}
                />
              );
            })
          ) : (
            <div className="home-trader__contents__lists__null">
              {searchText}에 대한 트레이더가 존재하지 않습니다.
            </div>
          )}
        </ul>
        <div className="home-trader__contents__more parents">
          <div className="home-trader__contents__more__text">
            원하시는 트레이더가 없으신가요?
          </div>
          <div className="home-trader__contents__more__button">
            트레이더 더 보기
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTrader;
