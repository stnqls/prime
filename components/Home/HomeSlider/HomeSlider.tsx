import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import { Swiper, SwiperSlide } from "swiper/react";
import DelayLink from "../../../lib/DelayLink";

import HomeSliderItem from "./HomeSliderItem/HomeSliderItem";

import SwiperCore, {
  EffectFade,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper";

import "../../../styles/swiper.scss";
import "../../../styles/effect-fade.scss";
import "../../../styles/swiperPagination.scss";
import "../../../styles/navigation.scss";
import "./HomeSlider.scss";

SwiperCore.use([EffectFade, Autoplay, Pagination, Navigation]);
const HomeSlider = () => {
  const [total, setTotal]: any = useState();

  useEffect(() => {
    const sliderLength: number = Lee.gets("home-slider-item").length - 2;

    if (sliderLength < 10) {
      setTotal("0" + sliderLength);
    } else {
      setTotal(sliderLength);
    }
  }, []);

  return (
    <div className="home-slider parents" id="HomeSlider">
      <div className="home-slider__contents parents">
        {/* <div className="home-slider__contents__total">
          <div className="home-slider__contents__total__number">{total}</div>
        </div> */}
        <ul className="home-slider__contents__lists parents">
          <HomeSliderItem
            idx={1}
            title="프라임과 함께하는 안전한 암호 화폐 거래"
            paragraph="프라임이 당신의 안전한 암호 화폐 거래를 위해 자체적으로 지정한 트레이더를 소개합니다."
            button={[["지금 바로가기", "findTrader"]]}
            thumbnail="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
          />
          <HomeSliderItem
            idx={2}
            title="전문가가 알려주는 암호화폐 트레이딩"
            paragraph="수익 인증 시스템을 도입하여 신뢰를 가진 전문가가 당신에게 트레이딩 정보를 제공합니다."
            button={[["분석법 보기", "tradingAnalysisBoard"]]}
            thumbnail="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
          />
          <HomeSliderItem
            idx={3}
            title="암호화폐 전문 트레이더 이신가요?"
            paragraph="암호 화폐 전문 트레이더 이신가요? 프라임과 함께 다양한 분들에게 정보를 제공하고 공유해보세요."
            button={[
              ["전문가 등록", "user?page=traderApply"],
              ["프라임 지표", "chart"],
            ]}
            thumbnail="https://images.pexels.com/photos/6000128/pexels-photo-6000128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
          />
        </ul>
        <ul className="home-slider__contents__mlists">
          <Swiper
            spaceBetween={0}
            effect="fade"
            pagination={{ clickable: true }}
            // navigation
            loop={true}
            allowTouchMove={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <HomeSliderItem
                idx={1}
                title="안전한 암호 화폐 거래"
                paragraph="프라임이 당신의 안전한 암호 화폐 거래를 위해 자체적으로 지정한 트레이더를 소개합니다."
                button={[["지금 바로가기", "findTrader"]]}
                thumbnail="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
              />
            </SwiperSlide>
            <SwiperSlide>
              <HomeSliderItem
                idx={2}
                title="전문가가 알려주는 트레이딩"
                paragraph="수익 인증 시스템을 도입하여 신뢰를 가진 전문가가 당신에게 트레이딩 정보를 제공합니다."
                button={[
                  ["현물 거래", "findTrader"],
                  ["선물 거래", "findTrader"],
                ]}
                thumbnail="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
              />
            </SwiperSlide>
            <SwiperSlide>
              <HomeSliderItem
                idx={3}
                title="전문 트레이더 영입"
                paragraph="암호 화폐 전문 트레이더 이신가요? 프라임과 함께 다양한 분들에게 정보를 제공하고 공유해보세요."
                button={[
                  ["전문가 등록", "findTrader"],
                  ["프라임 지표", "findTrader"],
                ]}
                thumbnail="https://images.pexels.com/photos/6000128/pexels-photo-6000128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
              />
            </SwiperSlide>
          </Swiper>
        </ul>
      </div>
    </div>
  );
};

export default HomeSlider;
