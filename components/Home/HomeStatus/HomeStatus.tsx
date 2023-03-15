import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import HomeStatusPartner from "./HomeStatusPartner/HomeStatusPartner";

import "./HomeStatus.scss";

const HomeStatus = () => {
  const traders: number = 1328;
  const investers: number = 29398;
  const now: Date = new Date();
  const date: string = `${now.getFullYear()}년 ${
    now.getMonth() + 1
  }월 ${now.getDate()}일`;

  const partners: Array<any> = [
    {
      partner: "파트너1",
      url: "/images/partners/samsung-wellstory-partner.png",
    },
    {
      partner: "파트너2",
      url: "/images/partners/lotte-international-partner.png",
    },
    {
      partner: "파트너3",
      url: "/images/partners/lotte-shopping-partner.png",
    },
    {
      partner: "파트너4",
      url: "/images/partners/gs25-partner.png",
    },
    {
      partner: "파트너5",
      url: "/images/partners/seven-eleven-partner.png",
    },
  ];

  return (
    <div className="home-status parents" id="HomeStatus">
      <div className="home-status__background">
        <img
          src="https://images.unsplash.com/photo-1583752028088-91e3e9880b46?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="background"
        />
      </div>
      <div className="home-status__contents parents">
        <div className="home-status__contents__slogan">Our Partners</div>
        <div className="home-status__contents__status">
          프라임은 <span>{Lee.addComma(traders)}명</span>
          의 트레이더와
          <br />
          <span>{Lee.addComma(investers)}명</span>의 투자자가 함께하고 있습니다.
        </div>
        <div className="home-status__contents__date">{date} 기준</div>
      </div>
      <HomeStatusPartner partners={partners} />
    </div>
  );
};

export default HomeStatus;
