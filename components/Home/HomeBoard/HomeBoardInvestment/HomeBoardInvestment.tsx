import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import DelayLink from "../../../../lib/DelayLink";
import Lee from "../../../../lib/Lee";
import HomeBoardInvestmentItem from "./HomeBoardInvestmentItem/HomeBoardInvestmentItem";
import HomeBoardInvestmentItemMobile from "./HomeBoardInvestmentItem/HomeBoardInvestmentItemMobile";

import "./HomeBoardInvestment.scss";

const HomeBoardInvestment = () => {
  const [investments, setInvestments] = useState([]);

  function getInvestment() {
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/community?categoryCode=201`,
    })
      .then((res) => {
        if (res.status === 200) {
          setInvestments(res.data.data.boardArray);
        } else {
          alert("서버통신의 오류가 발생했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getInvestment();
  }, []);
  return (
    <div className="home-board-investment parents" id="HomeBoardInvestment">
      <div className="home-board-investment__contents parents">
        <DelayLink
          to="tradingAnalysisBoard"
          delay={200}
          onDelayStart={Lee.loadingStart}
        >
          <div className="home-board-investment__contents__title">
            매매분석법
          </div>
        </DelayLink>
        <div className="home-board-investment__contents__more">
          더보기
          <img src="/assets/more.png" alt="more" />
        </div>
        <ul className="home-board-investment__contents__lists">
          {investments.map((investment: any, idx: number) => {
            if (idx < 3) {
              return (
                <HomeBoardInvestmentItem
                  key={`investment-${idx}`}
                  title={investment.title}
                  thumbnail={investment.imageUrlArray}
                  user_avatar={investment.avatar}
                  user_nickname={investment.memberNickname}
                  date={investment.date.slice(0, 10)}
                  content={investment.content}
                  id={investment.id}
                />
              );
            }
          })}
        </ul>
        <ul className="home-board-investment__contents__mlists">
          <Swiper slidesPerView={"auto"} spaceBetween={16} loop={false}>
            {investments.map((investment: any, idx: number) => {
              if (idx < 3) {
                return (
                  <SwiperSlide key={`investment-${idx}`}>
                    <HomeBoardInvestmentItemMobile
                      key={`investment-${idx}`}
                      title={investment.title}
                      thumbnail={investment.imageUrlArray}
                      user_avatar={investment.avatar}
                      user_nickname={investment.memberNickname}
                      date={investment.date.slice(0, 10)}
                      content={investment.content}
                      id={investment.id}
                    />
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        </ul>
      </div>
    </div>
  );
};

export default HomeBoardInvestment;
