import type { NextPage } from "next";
import Head from "next/head";

import HomeSlider from "../components/Home/HomeSlider/HomeSlider";
import HomeTrader from "../components/Home/HomeTrader/HomeTrader";
import HomeApplication from "../components/Home/HomeApplication/HomeApplication";
// import HomeStatus from "../components/Home/HomeStatus/HomeStatus";
import HomeBoard from "../components/Home/HomeBoard/HomeBoard";

import "../styles/pages/home.scss";
import HomeBoardNotice from "../components/Home/HomeBoard/HomeBoardNotice/HomeBoardNotice";

const Home: NextPage = () => {
  return (
    <div className="home">
      <Head>
        <title>프라임 인베스트먼트</title>
      </Head>
      <div className="home__contents parents">
        <HomeSlider />
        <HomeBoardNotice />
        <HomeTrader />
        <HomeApplication />
        {/* <HomeStatus /> */}
        <HomeBoard />
      </div>
    </div>
  );
};

export default Home;
