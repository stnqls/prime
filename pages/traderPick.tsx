import type { NextPage } from "next";
import React from "react";
import Head from "next/head";

import TraderPickList from "../components/TraderPick/TraderPickList/TraderPickList";

import "../styles/pages/traderPick.scss";

const TraderPick: NextPage = () => {
  return (
    <div className="trader-pick">
      <Head>
        <title>프라임 인베스트먼트 | 픽리스트</title>
      </Head>
      <TraderPickList />
    </div>
  );
};

export default TraderPick;
