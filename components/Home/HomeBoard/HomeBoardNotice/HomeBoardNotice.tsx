import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import DelayLink from "../../../../lib/DelayLink";
import Lee from "../../../../lib/Lee";

import HomeBoardNoticeItem from "./HomeBoardNoticeItem/HomeBoardNoticeItem";

import "./HomeBoardNotice.scss";

const HomeBoardNotice = () => {
  const [notice, setNotice] = useState([]);

  function getNotice() {
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/customers/notice`,
    })
      .then((res: any) => {
        if (res.status === 200) {
          setNotice(res.data.data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getNotice);
          }
          alert("서버 통신 중 오류가 발생했습니다.");
        }
      })
      .catch(() => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  useEffect(() => {
    getNotice();
    return () => {
      getNotice;
    };
  }, []);
  return (
    <div className="home-board-notice" id="HomeBoardNotice">
      <div className="home-board-notice__contents">
        <div className="home-board-notice__contents__title">공지</div>
        <ul className="home-board-notice__contents__lists">
          <Swiper
            direction={"vertical"}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            loop={true}
            loopAdditionalSlides={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            simulateTouch={false}
          >
            {notice.map((notice: any, idx: number) => {
              if (idx <= 2) {
                return (
                  <SwiperSlide key={`notice-${idx}`}>
                    <HomeBoardNoticeItem
                      title={notice.title}
                      content={notice.content}
                    />
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        </ul>
        <DelayLink to="notice" delay={200} onDelayStart={Lee.loadingStart}>
          <div className="home-board-notice__contents__more">더보기</div>
        </DelayLink>

        {/* <ul className="home-board-notice__contents__lists">
          <Swiper
            direction={"vertical"}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            loop={true}
            loopAdditionalSlides={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {notice.map((notice: any, idx: number) => {
              if (idx <= 2) {
                return (
                  <SwiperSlide key={`notice-${idx}`}>
                    <HomeBoardNoticeItem title={notice.title} />
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        </ul> */}
        {/* <ul className="home-board-notice__contents__mlists">
          <Swiper slidesPerView={"auto"} spaceBetween={16} loop={false}>
            {notice.map((notice, idx) => {
              return (
                <SwiperSlide key={`notice-${idx}`}>
                  <HomeBoardNoticeItemMobile
                    key={`notice-${idx}`}
                    title={notice.title}
                    thumbnail={notice.thumbnail}
                    content={notice.content}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ul> */}
      </div>
    </div>
  );
};

export default HomeBoardNotice;
