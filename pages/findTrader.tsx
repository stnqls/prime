import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";

import FindTraderList from "../components/FindTrader/FindTraderList/FindTraderList";

const FindTrader: NextPage = () => {
  const [traders, setTraders]: any = useState([]);

  function getTraders() {
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/search
      `,
    })
      .then((res) => {
        setTraders(res.data.data);
      })
      .catch((err) => {
        window.alert("서버 오류가 발생하였습니다.");
      });
  }

  useEffect(() => {
    getTraders();
  }, []);

  return (
    <div className="find-trader">
      <Head>
        <title>프라임 인베스트먼트 | 트레이더 찾기</title>
      </Head>
      <div className="find-trader__contents parents">
        {traders && <FindTraderList traders={traders} />}
      </div>
    </div>
  );
};

export default FindTrader;
