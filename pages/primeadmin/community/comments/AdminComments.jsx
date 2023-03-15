import React, { useState } from "react";
import EntireComments from "./EntireComments";
import DeleteComments from "./DeleteComments";

import "./AdminComments.scss";

function AdminComments() {
  const [toggle, setToggle] = useState(0);
  const [categoryCode, setCategoryCode] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="admin-comments">
      <div className="admin-comments__content">
        <div className="admin-comments__content__header">
          <ul className="admin-comments__content__header__title">
            <li
              className={
                toggle === 0
                  ? "admin-comments__content__header__title__item--click"
                  : "admin-comments__content__header__title__item"
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
                  ? "admin-comments__content__header__title__item--click"
                  : "admin-comments__content__header__title__item"
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
                  ? "admin-comments__content__header__title__item--click"
                  : "admin-comments__content__header__title__item"
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
                  ? "admin-comments__content__header__title__item--click"
                  : "admin-comments__content__header__title__item"
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
                  ? "admin-comments__content__header__title__item--click"
                  : "admin-comments__content__header__title__item"
              }
              onClick={() => {
                setToggle(4);
              }}
            >
              삭제된 댓글
            </li>
          </ul>
          <div className="admin-comments__content__header__search">
            <input
              type="text"
              className="admin-comments__content__header__search__input"
              placeholder="닉네임으로 검색하기"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="admin-comments__content__body">
          {toggle === 0 && (
            <EntireComments search={search} categoryCode={categoryCode} />
          )}
          {toggle === 1 && (
            <EntireComments search={search} categoryCode={categoryCode} />
          )}
          {toggle === 2 && (
            <EntireComments search={search} categoryCode={categoryCode} />
          )}
          {toggle === 3 && (
            <EntireComments search={search} categoryCode={categoryCode} />
          )}
          {toggle === 4 && <DeleteComments search={search} />}
        </div>
      </div>
    </div>
  );
}

export default AdminComments;
