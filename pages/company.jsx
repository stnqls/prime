import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import DelayLink from "../lib/DelayLink";
import Lee from "../lib/Lee";
import rightBlue from "../public/assets/arrowRight-skyblue.png";
import rightWhite from "../public/assets/arrowRight-w.png";

import "../styles/pages/company.scss";
import "../styles/swiper.scss";

function IntroduceCompany() {
  const [isHover, setIsHover] = useState(false);

  const data = [
    {
      title: "프라임 지표",
      subtitle: "방대한 데이터 중에서도 필요한 데이터에 집중해야 합니다.",
      img: "/images/illustration/company_icon1.png",
    },
    {
      title: "전문가 찾기",
      subtitle: "정보는 누구에게나 동등하게 주어져야 합니다.",
      img: "/images/illustration/company_icon2.png",
    },
    {
      title: "검증된 업체",
      subtitle: "투자자의 자본을 지킬 수 있는 사람이 전문가 입니다.",
      img: "/images/illustration/company_icon3.png",
    },
    {
      title: "새것에 원칙을 더한 플랫폼",
      subtitle: "투자자의 원칙은 자산의 형태가 변해도 본질은 변하지 않습니다.",
      img: "/images/illustration/company_icon4.png",
    },
  ];

  return (
    <div className="company">
      <div className="company-header">
        <div className="inner">
          <div className="company-header__content">
            <div className="company-header__content__title">
              내가 잘 모르는
              <div className="company-header__content__title-bold">
                암호화폐 투자 방법이 없을까?
              </div>
            </div>
            <div className="company-header__content__mtitle">
              내가 잘 모르는 암호화폐 투자 방법이 없을까?
            </div>
            <div className="company-header__content__img">
              <img
                src="/images/illustration/company_file.png"
                alt="img_file"
                className="company-header__content__img__img"
              />
              <DelayLink
                to="Inquiry"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <button
                  className="company-header__content__img__btn"
                  onMouseOver={() => {
                    setIsHover(true);
                  }}
                  onMouseOut={() => {
                    setIsHover(false);
                  }}
                >
                  <span>문의하기</span>
                  <img
                    src={isHover ? rightWhite : rightBlue}
                    alt=">"
                    className="company-header__content__img__btn__arrow"
                  />
                  <img
                    src={rightWhite}
                    alt=">"
                    className="company-header__content__img__btn__marrow"
                  />
                </button>
              </DelayLink>
            </div>
            <div className="company-header__content__subtitle">
              <div className="company-header__content__subtitle__prime">
                PRIME
              </div>
              <span className="company-header__content__subtitle__text">
                정보의 비대칭성으로 일어나는 현상보다는 본질에 집중합니다.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="company-count">
        <ul className="company-count__list">
          <li className="company-count__list__item">
            <div className="company-count__list__item__title">
              누적 가입자 수
            </div>
            <div className="company-count__list__item__number">
              12,000명
              <div className="company-count__list__item__arrowUP"></div>
            </div>
          </li>
          <li className="company-count__list__item">
            <div className="company-count__list__item__title">
              누적 투자금액
            </div>
            <div className="company-count__list__item__number">
              12,000명
              <div className="company-count__list__item__arrowUP"></div>
            </div>
          </li>
          <li className="company-count__list__item">
            <div className="company-count__list__item__title">
              전문 트레이더 수
            </div>
            <div className="company-count__list__item__number">
              12,000명
              <div className="company-count__list__item__arrowUP"></div>
            </div>
          </li>
          <li className="company-count__list__item">
            <div className="company-count__list__item__title">
              일일 방문자 수
            </div>
            <div className="company-count__list__item__number">
              7,800명
              <div className="company-count__list__item__arrowUP"></div>
            </div>
          </li>
        </ul>
      </div>

      <div className="company-body">
        <div className="inner">
          <div className="company-body__title">
            프라임이 선도하는 <span>암호화폐 투자</span>
          </div>
          <div className="company-body__subtitle">
            암호화폐 투자 자문 플랫폼으로써 입지를 다지고 가치를 입증했습니다.
          </div>
          <ul className="company-body__list">
            {data.map((item, index) => (
              <li
                className="company-body__list__item"
                key={`company-body-list-${index}`}
              >
                <div className="company-body__list__item__title">
                  {item.title}
                </div>
                <div className="company-body__list__item__subtitle">
                  {item.subtitle}
                </div>
                <img
                  src={item.img}
                  alt="imgs"
                  className="company-body__list__item__img"
                />
              </li>
            ))}
          </ul>

          <ul className="company-body__mlist">
            <Swiper
              slidesPerView={2}
              spaceBetween={16}
              navigation={false}
              loop={false}
              className="myMoblieSwiper"
            >
              {data.map((item, index) => (
                <SwiperSlide key={`company-body-mlist-${index}`}>
                  <li className="company-body__mlist__item">
                    <div className="company-body__mlist__item__title">
                      {item.title}
                    </div>
                    <div className="company-body__mlist__item__subtitle">
                      {item.subtitle}
                    </div>
                    <img
                      src={item.img}
                      alt="imgs"
                      className="company-body__mlist__item__img"
                    />
                  </li>
                </SwiperSlide>
              ))}
            </Swiper>
          </ul>
        </div>
      </div>

      <div className="company-footer">
        <div className="inner">
          <div className="company-footer__title">
            문의사항을 남겨주세요. 프라임인베스트먼트는 고객여러분들의 목소리를
            듣겠습니다.
          </div>
          <DelayLink to="Inquiry" delay={200} onDelayStart={Lee.loadingStart}>
            <button className="company-footer__btn">문의하기</button>
          </DelayLink>
        </div>
      </div>
    </div>
  );
}

export default IntroduceCompany;
