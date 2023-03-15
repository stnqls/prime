import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";

import "../styles/pages/find.scss";

const FindID: NextPage = () => {
  const datas: Array<any> = [
    {
      username: "USERNAME",
      email: "hello@user.com",
    },
  ];

  const username: string = datas[0].username;
  const email: string = datas[0].email;

  let IDButton: HTMLElement | null;
  let PWButton: HTMLElement | null;
  let IDContext: HTMLElement | null;
  let PWContext: HTMLElement | null;

  useEffect(() => {
    IDButton = Lee.get("IDButton");
    PWButton = Lee.get("PWButton");
    IDContext = Lee.get("IDContext");
    PWContext = Lee.get("PWContext");
  });

  function selectID() {
    Lee.addClass(IDButton, "active");
    Lee.addClass(IDContext, "active");

    Lee.removeClass(PWButton, "active");
    Lee.removeClass(PWContext, "active");
  }

  function selectPW() {
    Lee.addClass(PWButton, "active");
    Lee.addClass(PWContext, "active");

    Lee.removeClass(IDButton, "active");
    Lee.removeClass(IDContext, "active");
  }

  function checkEmail(target: string) {
    const IDInput: HTMLElement | null = Lee.get("IDInput");
    const IDTip: HTMLElement | null = Lee.get("IDTip");

    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (reg_email.test(target)) {
      Lee.removeClass(IDInput, "active");
      Lee.removeClass(IDTip, "active");

      Lee.addClass(IDInput, "check");
    } else {
      Lee.addClass(IDInput, "active");
      Lee.addClass(IDTip, "active");

      Lee.removeClass(IDInput, "check");
    }
  }

  return (
    <div className="find">
      <Head>
        <title>프라임 인베스트먼트 | 아이디 찾기</title>
      </Head>
      <div className="find__contents parents">
        <ul className="find__contents__lists parents">
          <li
            className="find__contents__lists__list active"
            id="IDButton"
            onClick={function () {
              selectID();
            }}
          >
            아이디 찾기
          </li>
          <li
            className="find__contents__lists__list"
            id="PWButton"
            onClick={function () {
              selectPW();
            }}
          >
            비밀번호 찾기
          </li>
        </ul>
        <ul className="find__contents__inputs parents">
          {datas.length > 0 ? (
            <li className="find__contents__inputs__list active" id="IDContext">
              <span>{username}</span> 님의 아이디(이메일)은
              <br />
              <span>{email}</span> 입니다.
              <br />
              <DelayLink to="login" delay={200} onDelayStart={Lee.loadingStart}>
                <div className="find__contents__button">로그인</div>
              </DelayLink>
            </li>
          ) : (
            <li className="find__contents__inputs__list active" id="IDContext">
              <span>{username}</span> 님으로 가입된 정보가 존재하지 않습니다.
              <br />
              <br />
              <DelayLink
                to="registration"
                delay={200}
                onDelayStart={Lee.loadingStart}
              >
                <span>회원가입</span>
              </DelayLink>
              을 해주시기 바랍니다.
              <br />
              <DelayLink to="login" delay={200} onDelayStart={Lee.loadingStart}>
                <div className="find__contents__button">로그인</div>
              </DelayLink>
            </li>
          )}

          <li className="find__contents__inputs__list" id="PWContext">
            가입한 이메일을 입력하시고 휴대폰 인증을 통해
            <br />
            비밀번호 찾기를 진행하세요.
            <input
              type="email"
              className="find__contents__inputs__list__email"
              placeholder="hello@prime.com"
              id="IDInput"
              onChange={function (e) {
                checkEmail(e.target.value);
              }}
            />
            <div className="find__contents__inputs__list__tip" id="IDTip">
              알맞은 이메일 형식으로 입력해주세요.
            </div>
            <DelayLink to="findPW" delay={200} onDelayStart={Lee.loadingStart}>
              <div className="find__contents__button">
                본인 명의 휴대폰 인증
              </div>
            </DelayLink>
          </li>
        </ul>
        <div className="find__contents__registration">
          <DelayLink
            to="registration"
            delay={200}
            onDelayStart={Lee.loadingStart}
          >
            <div className="find__contents__registration__text">
              아직 회원이 아니신가요? <span>회원가입</span>
            </div>
          </DelayLink>
        </div>
      </div>
    </div>
  );
};

export default FindID;
