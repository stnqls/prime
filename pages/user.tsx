import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";
import Router, { useRouter } from "next/router";
import axios from "axios";

import "../styles/pages/user.scss";
import UserSidebar from "../components/User/UserSidebar/UserSidebar";
import UserModify from "../components/User/userModify";
import Alert from "./Alert";
import TraderApply from "../components/TraderStatus/TraderApply/TraderApply";
import TraderStatus from "./traderStatus";
import TraderPackage from "./traderPackage";
import TraderPick from "./traderPick";
import TraderStatusAdjustment from "../components/TraderStatus/TraderStatusAdjustment/TraderStatusAdjustment";
import UserPackage from "../components/UserPackage/userPackage";
import UserPick from "../components/User/UserPick/UserPick";
import Payment from "./payment";
import Messages from "./messages";
import CommunityBoard from "../components/Community/CommunityBoard/CommunityBoard";
import CommunityComments from "../components/Community/CommunityComments/CommunityComments";
import UserReview from "../components/User/UserReview/UserReview";
import UserInquiry from "./userInquiry";

const User: NextPage = () => {
  const [login, setLogin] = useState(false);
  const [role, setRole]: any = useState();

  useEffect(() => {
    // getReviews();
    // Lee.refreshToken();
    if (Lee.checkLogin()) {
      const Role = window.sessionStorage.getItem("role");
      setRole(Role);
      setLogin(true);
    } else {
      alert("로그인이 필요합니다.");
      Router.push("/login");
    }
  }, []);

  const router = useRouter();
  const page = router.query.page;

  return (
    <div className="user">
      <Head>
        <title>프라임 인베스트먼트 | 마이페이지</title>
      </Head>
      {login ? (
        <div className="user__contents parents">
          <UserSidebar role={role} />
          <div className="user__contents__body">
            {page === "userModify" && <UserModify />}
            {page === "traderApply" && <TraderApply />}
            {page === "traderStatus" && <TraderStatus />}
            {page === "traderPackage" && <TraderPackage />}
            {page === "traderPick" && <TraderPick />}
            {page === "traderAdjustment" && <TraderStatusAdjustment />}
            {page === "userPackage" && <UserPackage />}
            {page === "userPick" && <UserPick />}
            {page === "payment" && <Payment />}
            {page === "messages" && <Messages />}
            {page === "communityBoard" && <CommunityBoard />}
            {page === "communityComments" && <CommunityComments />}
            {page === "userReview" && <UserReview />}
            {page === "userInquiry" && <UserInquiry />}
            {page === "alert" && <Alert />}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default User;
