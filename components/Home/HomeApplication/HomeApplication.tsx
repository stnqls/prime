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
          Investment &#38; Crypto Currency
        </div>
        <div className="home-application__contents__title">
          프라임인베스트먼트
        </div>
        <div className="home-application__contents__paragraph">
          누구나 쉽고 안전하게 <br /> 투자할 수 있도록
        </div>
        <img
          src="/images/illustration/web-phone.png"
          alt="phoneImg"
          className="home-application__contents__img"
        />
        <div className="home-application__contents__mtitle">
          Easy and Safety
        </div>
        <div className="home-application__contents__mparagraph">
          누구나 쉽고 안전하게 투자할 수 있도록
        </div>
        {/* <div className="home-application__contents__subject parents">
          <div className="home-application__contents__subject__text">
            지금 앱 다운로드 받으시고 간편하게 이용하세요!
          </div>
        </div> */}
        {/* <div className="home-application__contents__store">
          <img src="/images/icons/google-play-button.png" alt="android" />
          <img src="/images/icons/app-store.png" alt="ios" />
        </div> */}
        <div className="home-application__contents__illustration">
          <img
            src="/images/illustration/illustration-1.png"
            alt="illustration"
          />
        </div>
        <img
          src="/images/illustration/mobile-phone.png"
          alt="phone"
          className="home-application__contents__phoneimg"
        />
        <div className="home-application__contents__mockup"></div>
      </div>
    </div>
  );
};

export default HomeApplication;
