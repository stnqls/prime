import React from "react";
import DelayLink from "../lib/DelayLink";
import Lee from "../lib/Lee";

import "../styles/pages/recruitment.scss";

function Recruitment() {
  return (
    <div className="recruitment">
      <div className="recruitment-header">
        <div className="inner">
          <div className="recruitment-header__content">
            <div className="recruitment-header__content__title">
              프라임인베스트먼트
              <span>누적 방문자 수 100만 돌파</span>
            </div>
            <div className="recruitment-header__content__subtitle">
              <span>PRIME</span>암호화폐 투자 자문 플랫폼으로써 입지를 다지고
              가치를 입증했습니다.
            </div>
            <div className="recruitment-header__content__apply">
              <div className="recruitment-header__content__apply__title">
                <img src="/assets/check-b.png" alt="check" />
                입사지원
              </div>
              <div className="recruitment-header__content__apply__subtitle">
                열정적으로 도전하고 혁신적으로 사고하는
                <br /> 인재를 모십니다.
              </div>
              <img
                src="/assets/arrowRight-g.png"
                alt="arrow"
                className="recruitment-header__content__apply__arrow"
              />
            </div>
          </div>
          <div className="recruitment-header__img">
            <div className="recruitment-header__img__number">100만</div>
            <img
              src="/images/illustration/recruitment_graph.png"
              alt="graph"
              className="recruitment-header__img__img"
            />
            <span>2020.12</span>
            <span>2021.03</span>
            <span>2021.06</span>
          </div>
        </div>
      </div>

      <div className="recruitment-body">
        <div className="recruitment-body__title">
          프라임인베스트먼트 <span>누적 투자액</span>
        </div>
        <div className="recruitment-body__subtitle">
          리딩 자문 서비스의 안정화 그리고 고도화에 중점을 둔 서비스
        </div>
        <div className="recruitment-body__img">
          <img
            src="/images/illustration/circle.png"
            alt="circle"
            className="recruitment-body__img__circle"
          />
          <div className="recruitment-body__img__number">
            280<span>억</span>
          </div>
          <DelayLink to="Inquiry" delay={200} onDelayStart={Lee.loadingStart}>
            <button className="recruitment-body__img__btn">
              <span>문의하기</span>
              <img src="/assets/arrowRight-b.png" alt=">" />
            </button>
          </DelayLink>
        </div>
      </div>
      <div className="recruitment-goal">
        <div className="recruitment-goal__mtitle">OUR VALUE</div>
        <div className="recruitment-goal__sectitle">
          프라임이 추구하는 목표는
          <br />
          <span>고객의 경제적 자유</span>입니다.
        </div>
        <ul className="recruitment-goal__list">
          <li className="recruitment-goal__list__item">
            <img src="/images/illustration/recruitment_icon1.png" alt="icon" />
            <div className="recruitment-goal__list__item__content">
              <div className="recruitment-goal__list__item__content__title">
                고객 중심주의
              </div>
              <div className="recruitment-goal__list__item__content__text">
                회사의 이익은 고객의 수익에 직결됩니다. 고객 중심 서비스는
                반드시 필요합니다.
              </div>
            </div>
          </li>
          <li className="recruitment-goal__list__item">
            <img src="/images/illustration/recruitment_icon2.png" alt="icon" />
            <div className="recruitment-goal__list__item__content">
              <div className="recruitment-goal__list__item__content__title">
                수익 중심주의
              </div>
              <div className="recruitment-goal__list__item__content__text">
                수단은 다양하지만 언제나 중점으로 두어야 하는 것은 투자
                이익입니다.
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="recruitment-footer">
        <div className="recruitment-footer__title">
          열정적으로 도전하고 혁신적으로 사고하는 인재를 모십니다.
        </div>
        <button className="recruitment-footer__btn">입사지원</button>
      </div>
    </div>
  );
}

export default Recruitment;
