import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";

import RefundNotice from "../components/Refund/RefundNotice/RefundNotice";
import RefundProduct from "../components/Refund/RefundProduct/RefundProduct";
import RefundPrice from "../components/Refund/RefundPrice/RefundPrice";

import "../styles/pages/refund.scss";

const Payment: NextPage = (props: any) => {
  const datas = [
    {
      refund: [
        {
          title: "박스매매 전문, 안정적인 수익",
          price: 200000,
          start_date: "2021년 08월 17일",
          end_date: "2021년 09월 17일",
          trader_name: "KOREA TIGER",
          trader_avatar:
            "https://images.unsplash.com/photo-1544168190-79c17527004f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          trader_grade: "BRONZE",
          state: "subs",
        },
      ],
    },
  ];

  const title: string = datas[0].refund[0].title;
  const price: number = datas[0].refund[0].price;
  const start_date: string = datas[0].refund[0].start_date;
  const end_date: string = datas[0].refund[0].end_date;
  const trader_grade: string = datas[0].refund[0].trader_grade;
  const trader_avatar: string = datas[0].refund[0].trader_avatar;
  const trader_nickname: string = datas[0].refund[0].trader_name;
  const state: string = datas[0].refund[0].state;

  return (
    <div className="refund">
      <Head>
        <title>프라임 인베스트먼트 | 환불하기</title>
      </Head>
      <div className="refund__contents parents">
        <div className="refund__contents__box parents">
          <div className="refund__contents__box__title">환불하기</div>
          <RefundNotice />
          <RefundProduct
            title={title}
            price={price}
            start_date={start_date}
            end_date={end_date}
            trader_avatar={trader_avatar}
            trader_nickname={trader_nickname}
            trader_grade={trader_grade}
            state={state}
          />
          <RefundPrice />

          <div className="refund__contents__box__button">환불요청</div>

          <div className="refund__contents__box__cancel">
            <DelayLink to="payment" delay={200} onDelayStart={Lee.loadingStart}>
              <div className="refund__contents__box__cancel__text">
                계속 이용하실 예정이신가요? <span>돌아가기</span>
              </div>
            </DelayLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
