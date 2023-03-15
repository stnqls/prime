import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import CommunityBoard from "../components/Community/CommunityBoard/CommunityBoard";
import CommunityComments from "../components/Community/CommunityComments/CommunityComments";
import Lee from "../lib/Lee";

import "../styles/pages/community.scss";

const Community: NextPage = () => {
  const [login, setLogin] = useState(false);
  const [menu, setMenu] = useState(0);

  useEffect(() => {
    if (Lee.checkLogin()) {
      setLogin(true);
    } else {
      alert("로그인이 필요합니다.");
      Router.push("/login");
    }
  }, []);

  return (
    <div className="community">
      <Head>
        <title>프라임 인베스트먼트 | 커뮤니티</title>
      </Head>
      {login && (
        <div className="community__contents parents">
          <ul className="community__contents__menu">
            <li
              className={
                menu === 0
                  ? "community__contents__menu__item--click"
                  : "community__contents__menu__item"
              }
              onClick={() => {
                setMenu(0);
              }}
            >
              내가 쓴 게시글
            </li>
            <li
              className={
                menu === 1
                  ? "community__contents__menu__item--click"
                  : "community__contents__menu__item"
              }
              onClick={() => {
                setMenu(1);
              }}
            >
              내가 쓴 댓글
            </li>
          </ul>
          {menu === 0 && <CommunityBoard />}
          {menu === 1 && <CommunityComments />}
        </div>
      )}
    </div>
  );
};

export default Community;
