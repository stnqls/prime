import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Cryptocurrency from "../components/Chart/Cryptocurrency";
import RealTimeChart from "../components/Chart/RealTime/RealTimeChart";
import TickerWidget from "../components/Chart/TickerWidget";
import Indic from "../components/Chart/Indic";
import ChartBJ from "../components/Chart/ChartBJ";
import Transfer from "../components/Chart/Bitcoin/Transfer";
import Conclude from "../components/Chart/Bitcoin/Conclude";
import Coinbase from "../components/Chart/Bitcoin/Coinbase";
import Ratio from "../components/Chart/Ratio";
import Chat from "../components/Chart/Chat/Chat";
import Twitter from "../components/Chart/Inform/Twitter";
import News from "../components/Chart/Inform/News";

import "../styles/pages/chart.scss";

const Chart = () => {
  const [referrals, setReferral] = useState<string[]>(["", "", "", "", ""]);
  let [isShow, setIsShow] = useState(false);

  async function getReferral() {
    const config: AxiosRequestConfig = {
      method: "get",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/indicator/referral",
    };
    try {
      const referralAxios = await axios(config);
      setReferral(referralAxios.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getData = getReferral();
    return () => {
      getData;
    };
  }, [referrals]);

  return (
    <div className="chart">
      <div className="chart__title">프라임 지표</div>
      <div className="chart__subtitle">
        실시간 지표와 정보를 통해 효과적으로 대응하세요
      </div>
      <div className="chart__contents">
        <div className="chart__contents__link">
          <span className="chart__contents__link__title">
            선물 거래소 가입 링크
          </span>
          <ul className="chart__contents__link__list">
            <li className="chart__contents__link__list__item">
              전세계 최고 할인
              <br />
              <span>최대 50%</span>
            </li>
            <li className="chart__contents__link__list__item">
              <a href={referrals[0]} target="_blank">
                <img src="/images/icons/binance.png" alt="binance" />
              </a>
            </li>
            <li className="chart__contents__link__list__item">
              <a href={referrals[1]} target="_blank">
                <img src="/images/icons/villbit.png" alt="villbit" />
              </a>
            </li>
            <li className="chart__contents__link__list__item">
              <a href={referrals[2]} target="_blank">
                <img src="/images/icons/bybit.png" alt="bybit" />
              </a>
            </li>
            <li className="chart__contents__link__list__item">
              <a href={referrals[3]} target="_blank">
                <img src="/images/icons/bitget.png" alt="bitget" />
              </a>
            </li>
            <li className="chart__contents__link__list__item">
              <a href={referrals[4]} target="_blank">
                <img src="/images/icons/runningFox.png" alt="runningFox" />
              </a>
            </li>
          </ul>
        </div>
        <div className="chart__contents__graph">
          <TickerWidget />
          <RealTimeChart />
        </div>
        <Indic />
        <ChartBJ />
        <div className="chart__contents__middle">
          <div className="chart__contents__middle__left">
            <div className="chart__contents__middle__left__top">
              <Transfer />
              <Conclude />
            </div>
            <Cryptocurrency />
          </div>
          <div className="chart__contents__middle__right">
            <Coinbase />
          </div>
        </div>

        <div className="chart__contents__bottom" id="bottom">
          <Twitter />
          <News />
          <Ratio />
        </div>
      </div>
      <div className="chart__contents__chat">
        <img
          src="/assets/chat.png"
          alt="chat"
          className="chart__contents__chat__img"
          onClick={() => {
            setIsShow(!isShow);
          }}
        />
        {isShow && <Chat isAdmin={false} show={isShow} />}
      </div>
    </div>
  );
};

export default Chart;
