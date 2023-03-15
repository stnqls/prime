import React, { useEffect, useRef, useState } from "react";
import Lee from "../../lib/Lee";
import DelayLink from "../../lib/DelayLink";

import "./MobileMenu.scss";

import down from "../../public/assets/mobile/down@2x.png";
import line from "../../public/assets/mobile/line@2x.png";
import axios from "axios";

const MobileMenu = (props: any) => {
  const [login, setLogin]: any = useState();
  const [role, setRole]: any = useState();
  const [toggle, setToggle]: any = useState([false, false, false]);
  const [nickname, setNickname]: any = useState();
  const [email, setEmail]: any = useState();
  const [avatar, setAvatar]: any = useState();
  const [subscriptions, setSubscriptions]: any = useState([]);

  const changeToggle = (index: any) => {
    setToggle((prestate: any) => ({
      ...prestate,
      [index]: !prestate[index],
    }));
  };

  function getSubscribe() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/packages/subscribe",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setSubscriptions(res.data.data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getSubscribe);
          } else {
            alert("서버와 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  }

  useEffect(() => {
    if (Lee.checkLogin()) {
      setLogin(true);
      setNickname(window.sessionStorage.getItem("nickname"));
      setEmail(window.sessionStorage.getItem("email"));
      setAvatar(window.sessionStorage.getItem("avatar"));
      getSubscribe();
      if (window.sessionStorage.getItem("role") === "admin") {
        setLogin(false);
        window.sessionStorage.clear();
      }
      setRole(window.sessionStorage.getItem("role"));
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <React.Fragment>
      <div
        className="mobile-menu__hide"
        onClick={() => {
          props.openMenu(false);
          document.body.style.overflow = "unset";
        }}
      ></div>
      <div className="mobile-menu">
        <div className="mobile-menu__header">
          <div className="mobile-menu__header__icons">
            {/* <img
              src="/images/icons/mobile/icon_home.png"
              alt="home"
              className="mobile-menu__header__icons__home"
            /> */}
            <img
              src="/images/icons/alarm-w.png"
              alt="alert"
              className="mobile-menu__header__icons__alert"
            />
            <img
              src="/images/icons/icon_x.png"
              alt="close"
              className="mobile-menu__header__icons__close"
              onClick={() => {
                props.openMenu(false);
                document.body.style.overflow = "unset";
              }}
            />
          </div>
        </div>
        <div className="mobile-menu__body">
          {login ? (
            <div className="mobile-menu__body__user">
              <div className="mobile-menu__body__user__content">
                <div className="mobile-menu__body__user__content__top">
                  <img src={avatar} alt="userAvatar" />
                  <div className="mobile-menu__body__user__content__top__info">
                    <div className="mobile-menu__body__user__content__top__info__name">
                      {nickname}
                    </div>
                    <div className="mobile-menu__body__user__content__top__info__email">
                      {email}
                    </div>
                  </div>
                  <DelayLink
                    to="userModify"
                    delay={200}
                    onDelayStart={Lee.loadingStart}
                  >
                    <button
                      type="button"
                      className="mobile-menu__body__user__content__top__detail"
                    >
                      회원정보
                    </button>
                  </DelayLink>
                </div>
                <hr />
                <div className="mobile-menu__body__user__content__subscribes">
                  <span className="mobile-menu__body__user__content__subscribes__packageName">
                    구독 :
                  </span>
                  {subscriptions.map((subscription: any, idx: number) => {
                    return (
                      <span key={`${subscription.packageId} - ${idx}`}>
                        {subscription.packageName}
                      </span>
                    );
                  })}
                </div>
              </div>
              <ul className="mobile-menu__body__user__details__list">
                <li className="mobile-menu__body__user__details__list__item">
                  <DelayLink
                    to="userPackage"
                    delay={200}
                    onDelayStart={Lee.loadingStart}
                  >
                    <div className="mobile-menu__body__user__details__list__item__img">
                      <img
                        src="/images/icons/icon_subscribesDetail.png"
                        alt="subscribesDetail"
                      />
                    </div>
                    <div className="mobile-menu__body__user__details__list__item__text">
                      구독내역
                    </div>
                  </DelayLink>
                </li>
                <li className="mobile-menu__body__user__details__list__item">
                  <DelayLink
                    to="payment"
                    delay={200}
                    onDelayStart={Lee.loadingStart}
                  >
                    <div className="mobile-menu__body__user__details__list__item__img">
                      <img
                        src="/images/icons/icon_paymentDetail.png"
                        alt="paymentDetail"
                      />
                    </div>
                    <div className="mobile-menu__body__user__details__list__item__text">
                      결제내역
                    </div>
                  </DelayLink>
                </li>
                <li className="mobile-menu__body__user__details__list__item">
                  <div className="mobile-menu__body__user__details__list__item__img">
                    <img
                      src="/images/icons/icon_community.png"
                      alt="community"
                    />
                  </div>
                  <div className="mobile-menu__body__user__details__list__item__text">
                    커뮤니티
                  </div>
                </li>
                <li className="mobile-menu__body__user__details__list__item">
                  <div className="mobile-menu__body__user__details__list__item__img">
                    <img src="/images/icons/icon_inquiry.png" alt="1:1" />
                  </div>
                  <div className="mobile-menu__body__user__details__list__item__text">
                    쪽지함
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div className="mobile-menu__login">
              {/* <button type="button" className="mobile-menu__login__loginbtn">
                로그인
              </button> */}
              <DelayLink to="login" delay={200} onDelayStart={Lee.loadingStart}>
                <button type="button" className="mobile-menu__login__signinbtn">
                  로그인/회원가입
                </button>
              </DelayLink>
            </div>
          )}
          <ul className="mobile-menu__body__menulist">
            <li className="mobile-menu__body__menulist__items">
              <div
                className={`mobile-menu__body__menulist__items__title${
                  toggle[0] ? "--show" : ""
                } first-child`}
                onClick={() => {
                  changeToggle(0);
                }}
              >
                <span>전문가 찾기</span>
                <img src="/assets/mobile-down-g.png" alt="down" />
              </div>
              <ul
                className={`mobile-menu__body__menulist__items__sublist${
                  toggle[0] ? "" : "--none"
                }`}
              >
                <DelayLink
                  to="findTrader"
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <li className="mobile-menu__body__menulist__items__sublist__item">
                    트레이더
                  </li>
                </DelayLink>
                <DelayLink
                  to="review"
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <li className="mobile-menu__body__menulist__items__sublist__item">
                    이용후기
                  </li>
                </DelayLink>
              </ul>
            </li>
            <li className="mobile-menu__body__menulist__items">
              <div
                className="mobile-menu__body__menulist__items__title"
                onClick={() => {
                  alert("구현 예정입니다.");
                }}
              >
                <span>프라임 지표</span>
              </div>
            </li>
            <li className="mobile-menu__body__menulist__items">
              <div
                className={`mobile-menu__body__menulist__items__title${
                  toggle[1] ? "--show" : ""
                }`}
                onClick={() => {
                  changeToggle(1);
                }}
              >
                <span>커뮤니티</span>
                <img src="/assets/mobile-down-g.png" alt="down" />
              </div>
              <ul
                className={`mobile-menu__body__menulist__items__sublist${
                  toggle[1] ? "" : "--none"
                }`}
              >
                <DelayLink
                  to="tradingBoard"
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <li className="mobile-menu__body__menulist__items__sublist__item">
                    트레이딩
                  </li>
                </DelayLink>
                <DelayLink
                  to="tradingAnalysisBoard"
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <li className="mobile-menu__body__menulist__items__sublist__item">
                    매매분석법
                  </li>
                </DelayLink>
                <DelayLink
                  to="freeBoard"
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <li className="mobile-menu__body__menulist__items__sublist__item">
                    자유게시판
                  </li>
                </DelayLink>
              </ul>
            </li>
            <li className="mobile-menu__body__menulist__items">
              <div
                className={`mobile-menu__body__menulist__items__title${
                  toggle[2] ? "--show" : ""
                }`}
                onClick={() => {
                  changeToggle(2);
                }}
              >
                <span>고객센터</span>
                <img src="/assets/mobile-down-g.png" alt="down" />
              </div>
              <ul
                className={`mobile-menu__body__menulist__items__sublist${
                  toggle[2] ? "" : "--none"
                }`}
              >
                <DelayLink to="faq" delay={200} onDelayStart={Lee.loadingStart}>
                  <li className="mobile-menu__body__menulist__items__sublist__item">
                    FAQ
                  </li>
                </DelayLink>
                <DelayLink
                  to="Inquiry"
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <li className="mobile-menu__body__menulist__items__sublist__item">
                    1:1문의
                  </li>
                </DelayLink>
                <DelayLink
                  to="notice"
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <li className="mobile-menu__body__menulist__items__sublist__item">
                    공지사항
                  </li>
                </DelayLink>
              </ul>
            </li>
          </ul>
          <ul className="mobile-menu__body__snslist">
            <li className="mobile-menu__body__snslist__item">
              <img src="/images/icons/meta_b.png" alt="" />
            </li>
            <li className="mobile-menu__body__snslist__item">
              <img src="/images/icons/instagram_b.png" alt="" />
            </li>
            <li className="mobile-menu__body__snslist__item">
              <img src="/images/icons/twitter_b.png" alt="" />
            </li>
            <li className="mobile-menu__body__snslist__item">
              <img src="/images/icons/telegram_b.png" alt="" />
            </li>
            <li className="mobile-menu__body__snslist__item">
              <img src="/images/icons/naver_b.png" alt="" />
            </li>
          </ul>
          <ul className="mobile-menu__body__infolist">
            <DelayLink to="company" delay={200} onDelayStart={Lee.loadingStart}>
              <li className="mobile-menu__body__infolist__item">회사소개</li>
            </DelayLink>
            <DelayLink
              to="partnership"
              delay={200}
              onDelayStart={Lee.loadingStart}
            >
              <li className="mobile-menu__body__infolist__item">사업제휴</li>
            </DelayLink>
            <DelayLink
              to="recruitment"
              delay={200}
              onDelayStart={Lee.loadingStart}
            >
              <li className="mobile-menu__body__infolist__item">인재채용</li>
            </DelayLink>
            <DelayLink to="terms" delay={200} onDelayStart={Lee.loadingStart}>
              <li className="mobile-menu__body__infolist__item">이용약관</li>
            </DelayLink>
            <DelayLink to="privacy" delay={200} onDelayStart={Lee.loadingStart}>
              <li className="mobile-menu__body__infolist__item">
                개인정보처리방침
              </li>
            </DelayLink>
          </ul>
          <div className="mobile-menu__footer">
            <img src="/images/logos/logo-gray.png" alt="logo" />
            <div className="mobile-menu__footer__content">
              <div className="mobile-menu__footer__content__title">
                프라임인베스트먼트
              </div>
              <div className="mobile-menu__footer__content__text">
                Copyright © Primeinvestment Inc All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MobileMenu;
