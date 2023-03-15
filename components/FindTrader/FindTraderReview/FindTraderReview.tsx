import React, { useEffect, useState } from "react";
import Head from "next/head";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import { Swiper, SwiperSlide } from "swiper/react";

import FindTraderReviewItem from "./FindTraderReviewItem/FindTraderReviewItem";

import "./FindTraderReview.scss";
import "../../../styles/swiper.scss";
import "../../../styles/swiperPagination.scss";

const FindTraderReview = (props: any) => {
  const [mobile, setMobile]: any = useState();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <div className="find-trader-review parents">
      {mobile ? (
        <div className="find-trader-review__contents parents">
          <div className="find-trader-review__contents__slogan">
            Trader Reviews
          </div>
          <div className="find-trader-review__contents__title">
            프라임 멤버의 생생한 후기를 만나보세요
          </div>
          <DelayLink to={`review`} delay={200} onDelayStart={Lee.loadingStart}>
            <div className="find-trader-review__contents__more">
              더보기
              <img src="/images/more2.png" alt="more" />
            </div>
          </DelayLink>
          <ul className="find-trader-review__contents__lists parents">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={0}
              loop={false}
              pagination={{
                clickable: true,
              }}
              className="mobileTraderReview"
            >
              {props.reviews.length > 0 ? (
                props.reviews.map((review: any, idx: number) => {
                  return (
                    <SwiperSlide key={`viewTrader-review-${idx}`}>
                      <FindTraderReviewItem
                        nickname={review.nickname}
                        avatar={review.avatar}
                        trader_nickname={review.trader_nickname}
                        rate={review.rate}
                        paragraph={review.paragraph}
                      />
                    </SwiperSlide>
                  );
                })
              ) : (
                <div className="find-trader-review__contents__lists__null">
                  이용후기가 존재하지 않습니다.
                </div>
              )}
            </Swiper>
          </ul>
        </div>
      ) : (
        <div className="find-trader-review__contents parents">
          <div className="find-trader-review__contents__slogan">
            Trader Reviews
          </div>
          <div className="find-trader-review__contents__title">
            프라임 멤버의 생생한 후기를 만나보세요
          </div>
          <ul className="find-trader-review__contents__lists parents">
            {props.reviews.length > 0 ? (
              props.reviews.map((review: any, idx: number) => {
                return (
                  <FindTraderReviewItem
                    key={`trader-review-${idx}`}
                    nickname={review.nickname}
                    avatar={review.avatar}
                    trader_nickname={review.trader_nickname}
                    rate={review.rate}
                    paragraph={review.paragraph}
                  />
                );
              })
            ) : (
              <div className="find-trader-review__contents__lists__null">
                이용후기가 존재하지 않습니다.
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindTraderReview;
