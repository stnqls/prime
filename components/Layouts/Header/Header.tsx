import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import Notification from "../../Notify/Notification";
import blueLogo from "../../../public/images/logos/logo-blue.png";
import whiteLogo from "../../../public/images/logos/logo-white2.png";

import "./Header.scss";

const MobileMenu = dynamic(import("../../MoblieMenu/MobileMenu"), {
  ssr: false,
});

Router.events.on("routeChangeComplete", (url) => {
  window.sessionStorage.setItem(
    "prevPath",
    window.sessionStorage.getItem("currentPath") || "/"
  );
  if (url !== "/login") {
    window.sessionStorage.setItem("currentPath", url);
  }
});

const Header = (props: any) => {
  const [login, setLogin] = useState(false);
  const [role, setRole]: any = useState();
  const [logo, setLogo]: any = useState(blueLogo);
  const [alert, setAlert]: any = useState([]);
  const [hover, setHover]: any = useState([]);
  const [openAlert, setOpenAlert] = useState(false);

  const [mobileMenu, setMobileMenu]: any = useState(false);
  let hoverLength = Lee.gets("header__contents__account__list").length;
  const newHover = Array(hoverLength).fill(false);
  const router = useRouter();

  function openMenu(status: boolean) {
    document.body.style.overflow = "hidden";
    setMobileMenu(status);
  }

  function hoverEvent(index: number) {
    newHover[index] = true;
    setHover(newHover);
  }

  function LeaveEvent(index: number) {
    newHover[index] = false;
    setHover(newHover);
  }

  useEffect(() => {
    const Header: HTMLElement | null = Lee.get("Header");
    const Document: HTMLElement | null = Lee.get("Document");

    if (Lee.checkLogin()) {
      setLogin(true);

      if (window.sessionStorage.getItem("role") === "admin") {
        setLogin(false);
        window.sessionStorage.clear();
      }
      setRole(window.sessionStorage.getItem("role"));
    } else {
      setLogin(false);
    }

    Lee.loadingFinish();

    if (window.location.pathname === "/") {
      Lee.removeClass(Header, "layout1");
      Lee.removeClass(Document, "layout1");
      scrollDetect();
      window.addEventListener("scroll", scrollDetect);
    } else {
      Lee.addClass(Header, "layout1");
      Lee.addClass(Document, "layout1");
      setLogo(blueLogo);
    }
    if (router.asPath === "/chart") {
      Lee.removeClass(Header, "layout1");
      Lee.removeClass(Document, "layout1");
      Lee.addClass(Header, "dark");
      setLogo(whiteLogo);
    } else {
      Lee.removeClass(Header, "dark");
      Lee.removeClass(Document, "dark");
      setLogo(blueLogo);
    }

    return () => {
      window.removeEventListener("scroll", scrollDetect);
    };
  });

  function scrollDetect() {
    const Header: HTMLElement | null = Lee.get("Header");
    if (window.scrollY > 10) {
      Lee.addClass(Header, "layout1");
    } else {
      Lee.removeClass(Header, "layout1");
    }
  }

  function getAlert() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/users/alert",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setAlert(res.data.data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getAlert);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
      });
  }

  useEffect(() => {
    if (Lee.checkLogin()) {
      getAlert();
    }
  }, []);

  function changeImg(e: any) {
    e.target.addEventListener();
  }

  return (
    <div className="header" id="Header">
      <div className="header__contents">
        <div className="header__contents__logo">
          <DelayLink to="" delay={200} onDelayStart={Lee.loadingStart}>
            <img
              src={logo}
              alt="logo"
              className="header__contents__logo__img"
            />
          </DelayLink>
        </div>

        <ul className="header__contents__menu">
          <li className="header__contents__menu__list">
            <DelayLink
              to="findTrader"
              delay={200}
              onDelayStart={Lee.loadingStart}
            >
              <div className="header__contents__menu__list__subject">
                전문가찾기
              </div>
            </DelayLink>
          </li>
          <DelayLink to="chart" delay={200} onDelayStart={Lee.loadingStart}>
            <li className="header__contents__menu__list">
              <div className="header__contents__menu__list__subject">
                프라임지표
              </div>
            </li>
          </DelayLink>
          <li className="header__contents__menu__list">
            <DelayLink
              to="tradingBoard"
              delay={200}
              onDelayStart={Lee.loadingStart}
            >
              <div className="header__contents__menu__list__subject">
                커뮤니티
              </div>
            </DelayLink>
            <ul className="header__contents__menu__list__drop">
              <DelayLink
                to="tradingBoard"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li className="header__contents__menu__list__drop__list">
                  트레이딩
                </li>
              </DelayLink>
              <DelayLink
                to="tradingAnalysisBoard"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li className="header__contents__menu__list__drop__list">
                  매매분석법
                </li>
              </DelayLink>
              <DelayLink
                to="freeBoard"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li className="header__contents__menu__list__drop__list">
                  자유게시판
                </li>
              </DelayLink>
              <DelayLink
                to="review"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li className="header__contents__menu__list__drop__list">
                  이용후기
                </li>
              </DelayLink>
            </ul>
          </li>
          <li className="header__contents__menu__list">
            <DelayLink to="faq" delay={200} onDelayStart={Lee.loadingStart}>
              <div className="header__contents__menu__list__subject">
                고객센터
              </div>
            </DelayLink>
            <ul className="header__contents__menu__list__drop">
              <DelayLink to="faq" delay={200} onDelayStart={Lee.loadingStart}>
                <li className="header__contents__menu__list__drop__list">
                  FAQ
                </li>
              </DelayLink>
              <DelayLink
                to="Inquiry"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li className="header__contents__menu__list__drop__list">
                  1:1문의
                </li>
              </DelayLink>
              <DelayLink
                to="notice"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li className="header__contents__menu__list__drop__list">
                  공지사항
                </li>
              </DelayLink>
            </ul>
          </li>
        </ul>

        <ul className="header__contents__account">
          {login ? (
            <>
              {/* <DelayLink
                to="user?page=alert"
                delay={200}
                onDelayStart={Lee.loadingStart}
              > */}
              <li
                className="header__contents__account__list"
                onMouseOver={() => {
                  hoverEvent(0);
                  setOpenAlert(true);
                }}
                onMouseLeave={() => {
                  LeaveEvent(0);
                  setOpenAlert(false);
                }}
              >
                <img
                  src={
                    hover[0]
                      ? "/images/icons/alarm-b.png"
                      : "/images/icons/alarm-g.png"
                  }
                  alt="notifyLogo"
                />
                {alert.length > 0 && (
                  <div className="header__contents__account__list__alert"></div>
                )}
                {openAlert && (
                  <div className="header__contents__account__list__notification">
                    <Notification alert={alert} />
                  </div>
                )}
              </li>
              {/* </DelayLink> */}
              {role === "trader" ? (
                <DelayLink
                  to="user?page=traderStatus"
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <li
                    className="header__contents__account__list"
                    onMouseOver={() => {
                      hoverEvent(hoverLength - 2);
                    }}
                    onMouseLeave={() => {
                      LeaveEvent(hoverLength - 2);
                    }}
                  >
                    <img
                      src={
                        hover[hoverLength - 2]
                          ? "/images/icons/trader-b.png"
                          : "/images/icons/trader-g.png"
                      }
                      alt="traderLogo"
                      title="트레이더프로필"
                    />
                  </li>
                </DelayLink>
              ) : null}
              <DelayLink
                to="user?page=userModify"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li
                  className="header__contents__account__list"
                  onMouseOver={() => {
                    hoverEvent(hoverLength - 1);
                  }}
                  onMouseLeave={() => {
                    LeaveEvent(hoverLength - 1);
                  }}
                >
                  <img
                    src={
                      hover[hoverLength - 1]
                        ? "/images/icons/user-b.png"
                        : "/images/icons/user-g.png"
                    }
                    alt="myPageLogo"
                    title="마이페이지"
                  />
                </li>
              </DelayLink>
              {/* <a href="https://kauth.kakao.com/oauth/logout?client_id=9809758f76a70c3100227ce7feaec6b2&logout_redirect_uri=https://primeinvestment.kr/logout"> */}
              <a href="https://kauth.kakao.com/oauth/logout?client_id=9809758f76a70c3100227ce7feaec6b2&logout_redirect_uri=http://localhost:3000/logout">
                <li
                  className="header__contents__account__list"
                  onMouseOver={() => {
                    hoverEvent(hoverLength);
                  }}
                  onMouseLeave={() => {
                    LeaveEvent(hoverLength);
                  }}
                >
                  <img
                    src={
                      hover[hoverLength]
                        ? "/images/icons/logout-b.png"
                        : "/images/icons/logout-g.png"
                    }
                    alt="logout Logo"
                  />
                </li>
              </a>
            </>
          ) : (
            <DelayLink to="login" delay={200} onDelayStart={Lee.loadingStart}>
              <li className="header__contents__account__list">
                로그인/회원가입
              </li>
            </DelayLink>
          )}
        </ul>
        <div className="header__contents__mwrap">
          <DelayLink to="" delay={200} onDelayStart={Lee.loadingStart}>
            <img
              src="/images/logos/mobile-logo.png"
              alt="logo"
              className="header__contents__mwrap__mlogo"
            />
          </DelayLink>
          {props.title !== "" && (
            <div className="header__contents__mtitle">{props.title}</div>
          )}
          <img
            src="/images/icons/hambuger.png"
            alt="menu"
            className="header__contents__mwrap__mmenu"
            onClick={() => openMenu(true)}
          />
          {mobileMenu ? <MobileMenu openMenu={openMenu} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
