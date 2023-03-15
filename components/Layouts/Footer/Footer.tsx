import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./Footer.scss";

const Footer = () => {
  const [mobile, setMobile]: any = useState();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <div className="footer" id="Footer">
      {mobile ? (
        <div className="footer__mcontents parents">
          <div className="footer__mcontents__name">프라임인베스트먼트</div>
          <div className="footer__mcontents__copyright">
            Copyright © Primeinvestment Inc All rights reserved.
          </div>
          <ul className="footer__mcontents__menu">
            <DelayLink to="company" delay={200} onDelayStart={Lee.loadingStart}>
              <li className="footer__mcontents__menu__list">회사소개</li>
            </DelayLink>
            <DelayLink
              to="partnership"
              delay={200}
              onDelayStart={Lee.loadingStart}
            >
              <li className="footer__mcontents__menu__list">사업제휴</li>
            </DelayLink>
            <DelayLink
              to="recruitment"
              delay={200}
              onDelayStart={Lee.loadingStart}
            >
              <li className="footer__mcontents__menu__list">인재체용</li>
            </DelayLink>
          </ul>
          <ul className="footer__mcontents__menu__bottom">
            <DelayLink to="terms" delay={200} onDelayStart={Lee.loadingStart}>
              <li className="footer__mcontents__menu__bottom__list">
                이용약관
              </li>
            </DelayLink>
            <DelayLink to="privacy" delay={200} onDelayStart={Lee.loadingStart}>
              <li className="footer__mcontents__menu__bottom__list">
                개인정보처리방침
              </li>
            </DelayLink>
          </ul>
          <ul className="footer__mcontents__information">
            <li className="footer__mcontents__information__list">
              대표자명 : 마준원
            </li>
            <li className="footer__mcontents__information__list">
              사업자등록번호: 273-87-02058
            </li>
            <li className="footer__mcontents__information__list">
              대표전화: 02-557-6599
            </li>
            <li className="footer__mcontents__information__list">
              주소: 서울특별시 강북구 도봉로 191, 4층 445호(미아동, 상아빌딩)
            </li>
          </ul>
          <hr className="footer__mcontents__hr" />
          <ul className="footer__mcontents__sns">
            <li className="footer__mcontents__sns__list">
              <img src="/images/icons/meta_w.png" alt="facebook" />
            </li>
            <li className="footer__mcontents__sns__list">
              <img src="/images/icons/instagram_w.png" alt="instagram" />
            </li>
            <li className="footer__mcontents__sns__list">
              <img src="/images/icons/twitter_w.png" alt="twitter" />
            </li>
            <li className="footer__mcontents__sns__list">
              <img src="/images/icons/telegram_w.png" alt="telegram" />
            </li>
            <li className="footer__mcontents__sns__list">
              <img src="/images/icons/naver_w.png" alt="blog" />
            </li>
          </ul>
        </div>
      ) : (
        <div className="footer__contents parents">
          <img
            src="/images/logos/footer-logo.png"
            alt="logo"
            className="footer__contents__logo"
          />
          <div className="footer__contents__info">
            <ul className="footer__contents__info__menu">
              <DelayLink
                to="company"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li className="footer__contents__info__menu__list first">
                  회사소개
                </li>
              </DelayLink>
              <DelayLink to="terms" delay={200} onDelayStart={Lee.loadingStart}>
                <li className="footer__contents__info__menu__list">이용약관</li>
              </DelayLink>
              <DelayLink
                to="privacy"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li className="footer__contents__info__menu__list">
                  개인정보처리방침
                </li>
              </DelayLink>
              <DelayLink
                to="recruitment"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li className="footer__contents__info__menu__list">인재채용</li>
              </DelayLink>
              <DelayLink
                to="partnership"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <li className="footer__contents__info__menu__list">사업제휴</li>
              </DelayLink>
            </ul>
            <ul className="footer__contents__info__company">
              <li className="footer__contents__info__company__list">
                프라임인베스트먼트
              </li>
              <li className="footer__contents__info__company__list">
                대표자명: 마준원
              </li>
              <li className="footer__contents__info__company__list">
                사업자등록번호: 273-87-02058
              </li>
              <li className="footer__contents__info__company__list">
                주소: 서울특별시 강북구 도봉로 191, 4층 445호(미아동, 상아빌딩)
              </li>
            </ul>
            <ul className="footer__contents__info__number">
              <li className="footer__contents__info__number__list">
                대표전화: 02-557-6599
              </li>
              <li className="footer__contents__info__number__list">
                팩스번호 : 070-000-0000
              </li>
              <li className="footer__contents__info__number__list">
                고객센터 업무시간 : 10:00 ~ 19:00
              </li>
            </ul>
            <div className="footer__contents__info__copyright">
              Copyright © Primeinvestment Inc. All rights reserved.
            </div>
          </div>
          <ul className="footer__contents__sns">
            <li className="footer__contents__sns__list">
              <img src="/images/icons/meta_w.png" alt="meta" />
            </li>
            <li className="footer__contents__sns__list">
              <img src="/images/icons/instagram_w.png" alt="instagram" />
            </li>
            <li className="footer__contents__sns__list">
              <img src="/images/icons/twitter_w.png" alt="instagram" />
            </li>
            <li className="footer__contents__sns__list">
              <img src="/images/icons/telegram_w.png" alt="twitter" />
            </li>
            <li className="footer__contents__sns__list">
              <img src="/images/icons/naver_w.png" alt="blog" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Footer;
