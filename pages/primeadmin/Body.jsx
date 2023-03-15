import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Login from "./login/Login";
import User from "./user/User";
import Trader from "./trader/Trader";
import AdminTraderApply from "./trader/traderApply/AdminTraderApply";
import AdminSetting from "./adminSetting/AdminSetting";
import UserDeposit from "./deposit/userDeposit/UserDeposit";
import UserPaymentDetails from "./deposit/userPaymentDetails/UserPaymentDetails";
import UserRefund from "./deposit/userRefund/UserRefund";
import TraderPaymentDetails from "./deposit/traderPaymentDetails/TraderPaymentDetails";
import TraderPaymentRequest from "./deposit/traderPaymentRequest/TraderPaymentRequest";
import AdminBoard from "./community/board/AdminBoard";
import AdminComments from "./community/comments/AdminComments";
import AdminMessage from "./message/AdminMessage";
import Reviews from "./community/reviews/Reviews";
import Indicator from "./indicator/indicator";
import Faq from "./customer/adminfaq/AdminFaq";
import AdminInquiry from "./customer/admininquiry/AdminInquiry";
import AdminInquiryDetail from "./customer/admininquiry/AdminInquiryDetail";
import AdminNotice from "./customer/adminnotice/AdminNotice";

import "./Body.scss";
import AdminPartnership from "./customer/adminpartnership/AdminPartnership";

function Body() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (location.href.indexOf("/primeadmin?page=login") === -1) {
      if (window.sessionStorage.getItem("accessToken")) {
        setLogin(true);
      } else {
        setLogin(false);
        alert("로그인이 필요합니다.");
        location.href = "/primeadmin?page=login";
      }
    }
  });

  const router = useRouter();
  const page = router.query.page;

  let title;

  if (page === "user") {
    title = "일반 회원 관리";
  } else if (page === "trader") {
    title = "트레이더 관리";
  } else if (page === "adminTraderApply") {
    title = "트레이더 신청목록";
  } else if (page === "adminSetting") {
    title = "관리자 설정";
  } else if (page === "userDeposit") {
    title = "회원 입금 확인 요청";
  } else if (page === "userRefund") {
    title = "회원 환불 확인 요청";
  } else if (page === "userPaymentDetails") {
    title = "회원 결제 내역";
  } else if (page === "traderPaymentRequest") {
    title = "트레이더 정산 요청";
  } else if (page === "traderPaymentDetails") {
    title = "트레이더 정산 내역";
  } else if (page === "board") {
    title = "커뮤니티 게시판관리";
  } else if (page === "comments") {
    title = "커뮤니티 댓글관리";
  } else if (page === "adminFaq") {
    title = "고객센터 FAQ";
  } else if (page === "adminInquiry") {
    title = "고객센터 1:1문의";
  } else if (page === "adminInquiryDetail") {
    title = "1:1문의 상세보기";
  } else if (page === "adminPartnership") {
    title = "사업제휴";
  } else if (page === "adminNotice") {
    title = "고객센터 공지사항";
  } else if (page === "adminMessage") {
    title = "쪽지함";
  } else if (page === "login") {
    title = "관리자 로그인";
  } else if (page === "indicator") {
    title = "지표 설정";
  } else if (page === "reviews") {
    title = "커뮤니티 이용후기 관리";
  } else {
    title = "관리자 페이지";
  }

  return (
    <div className="body">
      {login && (
        <>
          <div className="body__sidebar">
            <Header title={title} />
            <Sidebar />
          </div>
          <div className="body__content">
            {page === "user" && <User />}
            {page === "trader" && <Trader />}
            {page === "adminTraderApply" && <AdminTraderApply />}
            {page === "adminSetting" && <AdminSetting />}
            {page === "userDeposit" && <UserDeposit />}
            {page === "userRefund" && <UserRefund />}
            {page === "userPaymentDetails" && <UserPaymentDetails />}
            {page === "traderPaymentRequest" && <TraderPaymentRequest />}
            {page === "traderPaymentDetails" && <TraderPaymentDetails />}
            {page === "board" && <AdminBoard />}
            {page === "comments" && <AdminComments />}
            {page === "adminFaq" && <Faq />}
            {page === "adminInquiry" && <AdminInquiry />}
            {page === "adminPartnership" && <AdminPartnership />}
            {page === "adminInquiryDetail" && <AdminInquiryDetail />}
            {page === "adminNotice" && <AdminNotice />}
            {page === "adminMessage" && <AdminMessage />}
            {page === "indicator" && <Indicator />}
            {page === "reviews" && <Reviews />}
          </div>
        </>
      )}
      {page === "login" && <Login />}
    </div>
  );
}

export default Body;
