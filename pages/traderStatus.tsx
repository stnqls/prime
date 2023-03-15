import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";
import Router from "next/router";
import axios from "axios";

import TraderStatusProfile from "../components/TraderStatus/TraderStatusProfile/TraderStatusProfile";
import TraderStatusInfo from "../components/TraderStatus/TraderStatusInfo/TraderStatusInfo";
import TraderStatusPick from "../components/TraderStatus/TraderStatusPick/TraderStatusPick";
import TraderStatusPackage from "../components/TraderStatus/TraderStatusPackage/TraderStatusPackage";
import TraderStatusSubscriber from "../components/TraderStatus/TraderStatusSubscriber/TraderStatusSubscriber";
import TraderStatusAdjustment from "../components/TraderStatus/TraderStatusAdjustment/TraderStatusAdjustment";

import "../styles/pages/traderStatus.scss";

const TraderStatus: NextPage = () => {
  const [login, setLogin] = useState(false);
  const [nickname, setNickname]: any = useState();
  const [email, setEmail]: any = useState();
  const [introduce, setIntroduce]: any = useState();
  const [avatar, setAvatar]: any = useState();
  const [role, setRole]: any = useState();
  const [picks, setPicks]: any = useState([]);
  const [packages, setPackages]: any = useState([]);
  const [subscribers, setSubscribers]: any = useState([]);
  // const [adjustments, setAdjustments]: any = useState([]);
  const [monthlyProfitRate, setMonthlyProfitRate]: any = useState([]);
  const [totalProfitRate, setTotalProfitRate]: any = useState([]);
  const [subscribersNum, setSubscribersNum]: any = useState(0);
  const [tags, setTags]: any = useState([]);

  function getTraderInfo() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/traders`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setIntroduce(data.profIntroduction);
          setPicks(data.picks);
          setPackages(data.packages);
          setSubscribers(data.subscribers);
          // setAdjustments(data.subscribers);
          setMonthlyProfitRate(data.profitRate.monthlyProfitRate);
          setTotalProfitRate(data.profitRate.totalProfitRate);
          setSubscribersNum(data.subscribersNum);
          setTags(data.tags);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getTraderInfo);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
        // setCheck(false);
      });
  }

  // function getAdjustments() {
  //   const headers: any = {
  //     authorization: window.sessionStorage.getItem("token"),
  //   };

  //   axios({
  //     method: "GET",
  //     url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/traders/withdrawals`,
  //     headers,
  //   })
  //     .then((res) => {
  //       if (res.data.success) {
  //         const data = res.data.data;
  //         setAdjustments(data);
  //       } else {
  //         if (res.data.errCode === "101") {
  //           Lee.refreshToken(getTraderInfo);
  //         } else {
  //           alert("서버 통신 중 오류가 발생했습니다.");
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       window.alert("일시적인 오류입니다. 다시 시도해주세요.");
  //       // setCheck(false);
  //     });
  // }

  useEffect(() => {
    if (Lee.checkLogin()) {
      setLogin(true);
      setNickname(window.sessionStorage.getItem("nickname"));
      setEmail(window.sessionStorage.getItem("email"));
      setAvatar(window.sessionStorage.getItem("avatar"));
      getTraderInfo();
      // getAdjustments();
    } else {
      alert("로그인이 필요합니다.");
      Router.push("/login");
    }
  }, []);

  return (
    <React.Fragment>
      {login && (
        <div className="trader-status">
          <Head>
            <title>프라임 인베스트먼트 | 트레이더 정보</title>
          </Head>
          <div className="trader-status__contents parents">
            <TraderStatusProfile
              nickname={nickname}
              tags={tags}
              introduce={introduce}
              email={email}
              avatar={avatar}
            />
            <TraderStatusInfo
              month_rate={monthlyProfitRate}
              total_rate={totalProfitRate}
              room_members={subscribersNum}
            />
          </div>
          <TraderStatusSubscriber packages={packages} />
        </div>
      )}
    </React.Fragment>
  );
};

export default TraderStatus;
