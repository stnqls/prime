import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import { Swiper, SwiperSlide } from "swiper/react";
import DelayLink from "../../../lib/DelayLink";

import SwiperCore, { EffectFade, Autoplay, Pagination } from "swiper";

SwiperCore.use([EffectFade, Autoplay, Pagination]);

import "./HomeApplication.scss";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";

const HomeApplication = () => {
  return (
    <div className="home-application parents" id="HomeApplication">
      <div className="home-application__contents parents">
        <div className="home-application__contents__slogan">
          누구나 <span>쉽고</span>
          <br />
          <span>안전</span>하게
        </div>
        <div className="home-application__contents__title">
          <span>Investment & Crypto Currency</span>
          <br />
          프라임 인베스트먼트
        </div>
        <div className="home-application__contents__paragraph">
          누구나 쉽고 안전하게 <span>투자할 수 있도록</span>
        </div>
        <div className="home-application__contents__store">
          <img src="/images/icons/google-play-button.png" alt="android" />
        </div>
        <div className="home-application__contents__mockup">
          <div className="mobile-phone">
            <div className="screen"></div>
          </div>
          <div className="brove">
            <span className="speaker"></span>
          </div>
          <ul className="home-application__contents__mockup__lists parents">
            <Swiper
              spaceBetween={0}
              navigation={true}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="home-application__contents__mockup__lists__list">
                  <img
                    src="https://images.unsplash.com/photo-1631931413024-38ed4229d10d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"
                    alt="mockup"
                    className="home-application__contents__mockup__lists__list__image"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="home-application__contents__mockup__lists__list">
                  <img
                    src="https://images.unsplash.com/photo-1631935091182-a7795017ce5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=633&q=80"
                    alt="mockup"
                    className="home-application__contents__mockup__lists__list__image"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </ul>
        </div>
        <div className="home-application__contents__contact">문의하기</div>
      </div>
    </div>
  );
};

export default HomeApplication;
