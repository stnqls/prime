import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Router, { useRouter } from "next/router";

import ViewTraderProfile from "../components/ViewTrader/ViewTraderProfile/ViewTraderProfile";
import ViewTraderInfo from "../components/ViewTrader/ViewTraderInfo/ViewTraderInfo";
import ViewTraderPackage from "../components/ViewTrader/ViewTraderPackage/ViewTraderPackage";
import ViewTraderPick from "../components/ViewTrader/ViewTraderPick/ViewTraderPick";
import ViewTraderReview from "../components/ViewTrader/ViewTraderReview/ViewTraderReview";

import "../styles/pages/viewTrader.scss";

const ViewTrader: NextPage = () => {
  const [traderId, setTraderId]: any = useState();
  const [avatar, setAvatar]: any = useState();
  const [nickname, setNickname]: any = useState();
  const [email, setEmail]: any = useState();
  const [roomMembers, setRoomMembers]: any = useState();
  const [introduce, setIntroduce]: any = useState();
  const [packages, setPackages]: any = useState([]);
  const [reviews, setReviews]: any = useState([]);
  const [monthlyProfitRate, setMonthlyProfitRate]: any = useState();
  const [totalProfitRate, setTotalProfitRate]: any = useState();
  const [tags, setTags]: any = useState([]);

  function getParameterByName(name: string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function getInfos() {
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/search/detail?uid=${getParameterByName(
        "uid"
      )}
      `,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setTraderId(data.id);
          setAvatar(data.avatar);
          setNickname(data.nickname);
          setEmail(data.email);
          setPackages(data.packages);
          setIntroduce(data.profIntroduction);
          setRoomMembers(data.subscribersNum);
          setMonthlyProfitRate(data.profitRate.monthlyProfitRate);
          setTotalProfitRate(data.profitRate.totalProfitRate);
          setTags(data.tags);
        } else {
          window.alert("해당 트레이너가 존재하지 않습니다.");
        }
      })
      .catch((err) => {
        window.alert("서버 오류가 발생하였습니다.");
        Router.push("/");
      });
  }

  function getReviews() {
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews?search=${getParameterByName(
        "uid"
      )}&sort=ratingDesc`,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setReviews(data.reviews);
        } else {
          window.alert("리뷰 조회 중 오류가 발생했습니다.");
        }
      })
      .catch((err) => {
        window.alert("리뷰 조회 중 오류가 발생했습니다.");
      });
  }

  useEffect(() => {
    const getinfo = getInfos();
    const getreview = getReviews();
    return () => {
      getinfo;
      getreview;
    };
  }, []);
  return (
    <div className="view-trader">
      <Head>
        <title>프라임 인베스트먼트 | 트레이더</title>
      </Head>
      <div className="view-trader__contents">
        <div className="view-trader__contents__box">
          <div className="view-trader__contents__box__top parents">
            <ViewTraderProfile
              nickname={nickname}
              tags={tags}
              introduce={introduce}
              email={email}
              avatar={avatar}
            />
            <div className="view-trader__contents__box__top__info">
              <ViewTraderInfo
                month_rate={monthlyProfitRate}
                total_rate={totalProfitRate}
                room_members={roomMembers}
              />
            </div>
          </div>
          <ViewTraderPackage
            packages={packages}
            traderId={traderId}
            traderName={nickname}
            traderAvatar={avatar}
          />
          <ViewTraderPick />
          <ViewTraderReview
            reviews={reviews}
            traderId={traderId}
            traderName={nickname}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTrader;
