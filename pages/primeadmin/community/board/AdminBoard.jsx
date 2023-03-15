import React, { useState, useEffect } from "react";
import Entire from "./Entire";

import "./Adminboard.scss";

function Adminboard() {
  const [toggle, setToggle] = useState(0);
  const [categoryCode, setCategoryCode] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="admin-board">
      <div className="admin-board__content">
        <div className="admin-board__content__header">
          <ul className="admin-board__content__header__title">
            <li
              className={
                toggle === 0
                  ? "admin-board__content__header__title__item--click"
                  : "admin-board__content__header__title__item"
              }
              onClick={() => {
                setToggle(0);
                setCategoryCode("");
              }}
            >
              전체보기
            </li>
            <li
              className={
                toggle === 1
                  ? "admin-board__content__header__title__item--click"
                  : "admin-board__content__header__title__item"
              }
              onClick={() => {
                setToggle(1);
                setCategoryCode(101);
              }}
            >
              트레이딩
            </li>
            <li
              className={
                toggle === 2
                  ? "admin-board__content__header__title__item--click"
                  : "admin-board__content__header__title__item"
              }
              onClick={() => {
                setToggle(2);
                setCategoryCode(201);
              }}
            >
              매매분석법
            </li>
            <li
              className={
                toggle === 3
                  ? "admin-board__content__header__title__item--click"
                  : "admin-board__content__header__title__item"
              }
              onClick={() => {
                setToggle(3);
                setCategoryCode(301);
              }}
            >
              자유게시판
            </li>
            <li
              className={
                toggle === 4
                  ? "admin-board__content__header__title__item--click"
                  : "admin-board__content__header__title__item"
              }
              onClick={() => {
                setToggle(4);
                setCategoryCode(801);
              }}
            >
              고정 게시판
            </li>
            <li
              className={
                toggle === 5
                  ? "admin-board__content__header__title__item--click"
                  : "admin-board__content__header__title__item"
              }
              onClick={() => {
                setToggle(5);
                setCategoryCode(901);
              }}
            >
              삭제된 게시판
            </li>
          </ul>
          <div className="admin-board__content__header__search">
            <input
              type="text"
              className="admin-board__content__header__search__input"
              placeholder="검색하기"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="admin-board__content__body">
          {toggle === 0 && (
            <Entire categoryCode={categoryCode} search={search} />
          )}
          {toggle === 1 && (
            <Entire categoryCode={categoryCode} search={search} />
          )}
          {toggle === 2 && (
            <Entire categoryCode={categoryCode} search={search} />
          )}
          {toggle === 3 && (
            <Entire categoryCode={categoryCode} search={search} />
          )}
          {toggle === 4 && (
            <Entire
              categoryCode={categoryCode}
              search={search}
              isFixed={true}
            />
          )}
          {toggle === 5 && (
            <Entire categoryCode={categoryCode} search={search} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Adminboard;
