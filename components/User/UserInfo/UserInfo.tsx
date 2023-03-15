import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./UserInfo.scss";

const UserInfo = (props: any) => {
  const [tags, setTags] = useState([]);
  const [role, setRole]: any = useState();

  useEffect(() => {
    if (!props.tags) {
      setTags(JSON.parse(props.tags));
    }
    setRole(window.sessionStorage.getItem("role"));
  }, []);

  return (
    <div className="user-info parents" id="UserInfo">
      <div className="user-info__contents parents">
        <div className="user-info__contents__report">
          <div className="user-info__contents__report__hello">
            <div className="user-info__contents__report__hello__avatar">
              <img src={props.avatar} alt="avatar" />
            </div>
            <div className="user-info__contents__report__hello__nickname">
              {props.nickname}
            </div>
            <div className="user-info__contents__report__hello__email">
              {props.email}
            </div>
            <div className="user-info__contents__report__hello__phone">
              {props.phone}
            </div>
            {tags && role === "trader" ? (
              <div className="user-info__contents__report__hello__tag">
                {tags.length > 0 &&
                  tags.map((tag: string, index: number) => (
                    <span key={`trader-tag-${index}`}>{"# " + tag}</span>
                  ))}
              </div>
            ) : null}

            <DelayLink
              to="withdraw"
              delay={200}
              onDelayStart={Lee.loadingStart}
            >
              <div className="user-info__contents__report__hello__exit">
                회원탈퇴
              </div>
            </DelayLink>
          </div>
        </div>

        <ul className="user-info__contents__menus">
          <DelayLink
            to="userModify"
            delay={200}
            onDelayStart={Lee.loadingStart}
          >
            <li className="user-info__contents__menus__list">
              <div className="user-info__contents__menus__list__icon">
                <img
                  src="/images/illustration/illustration-2.png"
                  alt="background"
                />
              </div>
              <div className="user-info__contents__menus__list__text">
                <div className="user-info__contents__menus__list__text__title">
                  회원정보
                </div>
                <div className="user-info__contents__menus__list__text__paragraph">
                  회원님의 정보를 수정합니다.
                </div>
              </div>
              <div className="user-info__contents__menus__list__button">
                바로가기
              </div>
            </li>
          </DelayLink>
          <DelayLink
            to="userPackage"
            delay={200}
            onDelayStart={Lee.loadingStart}
          >
            <li className="user-info__contents__menus__list">
              <div className="user-info__contents__menus__list__icon">
                <img
                  src="/images/illustration/illustration-3.png"
                  alt="background"
                />
              </div>
              <div className="user-info__contents__menus__list__text">
                <div className="user-info__contents__menus__list__text__title">
                  구독내역
                </div>
                <div className="user-info__contents__menus__list__text__paragraph">
                  회원님이 구독하신 패키지를 조회합니다.
                </div>
              </div>
              <div className="user-info__contents__menus__list__button">
                바로가기
              </div>
            </li>
          </DelayLink>
          <DelayLink to="payment" delay={200} onDelayStart={Lee.loadingStart}>
            <li className="user-info__contents__menus__list">
              <div className="user-info__contents__menus__list__icon">
                <img
                  src="/images/illustration/illustration-5.png"
                  alt="background"
                />
              </div>
              <div className="user-info__contents__menus__list__text">
                <div className="user-info__contents__menus__list__text__title">
                  결제내역
                </div>
                <div className="user-info__contents__menus__list__text__paragraph">
                  회원님의 결제 요청 및 내역을 확인합니다.
                </div>
              </div>
              <div className="user-info__contents__menus__list__button">
                바로가기
              </div>
            </li>
          </DelayLink>

          {props.role === "trader" && (
            <DelayLink
              to="traderStatus"
              delay={200}
              onDelayStart={Lee.loadingStart}
            >
              <li className="user-info__contents__menus__list">
                <div className="user-info__contents__menus__list__icon">
                  <img
                    src="/images/illustration/illustration-6.png"
                    alt="background"
                  />
                </div>
                <div className="user-info__contents__menus__list__text">
                  <div className="user-info__contents__menus__list__text__title">
                    트레이더 프로필
                  </div>
                  <div className="user-info__contents__menus__list__text__paragraph">
                    트레이더 정보를 조회하거나 수정합니다.
                  </div>
                </div>
                <div className="user-info__contents__menus__list__button">
                  바로가기
                </div>
              </li>
            </DelayLink>
          )}
          <DelayLink to="community" delay={200} onDelayStart={Lee.loadingStart}>
            <li className="user-info__contents__menus__list">
              <div className="user-info__contents__menus__list__icon">
                <img
                  src="/images/illustration/illustration-1.png"
                  alt="background"
                />
              </div>
              <div className="user-info__contents__menus__list__text">
                <div className="user-info__contents__menus__list__text__title">
                  커뮤니티
                </div>
                <div className="user-info__contents__menus__list__text__paragraph">
                  회원님의 게시글과 댓글을 조회합니다.
                </div>
              </div>
              <div className="user-info__contents__menus__list__button">
                바로가기
              </div>
            </li>
          </DelayLink>
          <DelayLink to="messages" delay={500} onDelayStart={Lee.loadingStart}>
            <li className="user-info__contents__menus__list">
              <div className="user-info__contents__menus__list__icon">
                <img
                  src="/images/illustration/illustration-4.png"
                  alt="background"
                />
              </div>
              <div className="user-info__contents__menus__list__text">
                <div className="user-info__contents__menus__list__text__title">
                  {/* 문의내역 */}
                  쪽지함
                </div>
                <div className="user-info__contents__menus__list__text__paragraph">
                  {/* 회원님이 문의하신 내역을 조회합니다. */}
                  회원님의 쪽지를 조회합니다.
                </div>
              </div>
              <div className="user-info__contents__menus__list__button">
                바로가기
              </div>
            </li>
          </DelayLink>
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
