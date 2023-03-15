import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";
import Router from "next/router";
import axios from "axios";

import PayemtList from "../components/Payment/PaymentList/PaymentList";

import "../styles/pages/payment.scss";

const Payment: NextPage = () => {
  const [payments, setPayments]: any = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalRefund, setTotalRefund] = useState(0);

  function getPayments() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/payments`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setPayments(res.data.data.payments);
          setTotalPayment(res.data.data.totalPayment);
          setTotalRefund(res.data.data.totalRefund);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getPayments);
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
    getPayments();
  }, []);

  return (
    <div className="payment">
      <Head>
        <title>프라임 인베스트먼트 | 결제내역</title>
      </Head>
      <PayemtList
        payments={payments}
        totalRefund={totalRefund}
        totalPayment={totalPayment}
      />
    </div>
  );
};

export default Payment;
