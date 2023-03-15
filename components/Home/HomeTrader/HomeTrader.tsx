import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import axios from "axios";

import SwiperCore, { Pagination, Navigation } from "swiper";

import HomeTraderItem from "./HomeTraderItem/HomeTraderItem";
import HomeTraderMobileItem from "./HomeTraderItem/HomeTraderMobileItem";

import "./HomeTrader.scss";

SwiperCore.use([Pagination, Navigation]);

const HomeTrader = () => {
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
    <div className="home-trader parents" id="HomeTrader">
      <div className="home-trader__contents parents">
        <div className="home-trader__contents__mslogan">
          Professional Traders
        </div>
        <div className="home-trader__contents__mtitle">
          국내 최고의 암호화폐 전문가들을 만나보세요
        </div>
        <div className="home-trader__contents__title">
          암호화폐 투자 <br />
          검증된 전문가와 함께하세요
        </div>

        <DelayLink
          to={`findTrader`}
          delay={200}
          onDelayStart={Lee.loadingStart}
        >
          <div className="home-trader__contents__more">더보기</div>
        </DelayLink>

        <div className="home-trader__contents__subject parents">
          <DelayLink
            to={`findTrader`}
            delay={200}
            onDelayStart={Lee.loadingStart}
          >
            <div className="home-trader__contents__more">더보기</div>

            <div className="home-trader__contents__subject__mmore">
              더 보기
              <img src="/assets/more.png" alt="more" />
            </div>
          </DelayLink>
        </div>
        <div className="home-trader__contents__illustration">
          <img
            src="/images/illustration/illustration-6.png"
            alt="illustration"
          />
        </div>

        {traders && traders.length > 0 && (
          <ul className="home-trader__contents__lists parents">
            <Swiper
              slidesPerView={4}
              spaceBetween={40}
              navigation={true}
              pagination={{ clickable: true }}
              loop={false}
              className="mySwiper"
            >
              {traders.map((trader: any, idx: any) => {
                return (
                  idx < 6 && (
                    <SwiperSlide key={`trader-${idx}`}>
                      <HomeTraderItem
                        key={`trader-${idx}`}
                        nickname={trader.nickname}
                        avatar={trader.avatar}
                        tags={trader.tags}
                        room_members={trader.subscribersNum}
                        earnings_rate={trader.totalProfitRate}
                        thumbnail={trader.thumbnail}
                        traderId={trader.id}
                      />
                    </SwiperSlide>
                  )
                );
              })}
            </Swiper>
          </ul>
        )}
        {traders && traders.length > 0 && (
          <ul className="home-trader__contents__mlists">
            <Swiper
              slidesPerView={"auto"}
              // loopFillGroupWithBlank={true}
              spaceBetween={16}
              pagination={{
                clickable: true,
              }}
              className="myMoblieSwiper"
            >
              {traders.map((trader: any, idx: any) => {
                return (
                  <SwiperSlide key={`trader-${idx}`}>
                    <HomeTraderMobileItem
                      key={`trader-${idx}`}
                      nickname={trader.nickname}
                      avatar={trader.avatar}
                      tags={trader.tags}
                      room_members={trader.subscribersNum}
                      earnings_rate={trader.totalProfitRate}
                      thumbnail={trader.thumbnail}
                      traderId={trader.id}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomeTrader;
