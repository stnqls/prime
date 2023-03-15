import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";

import "../styles/pages/find.scss";

const FindPW: NextPage = () => {
  function checkPW(target: string) {
    const PWInput: HTMLElement | null = Lee.get("PWInput");
    const PWTip: HTMLElement | null = Lee.get("PWTip");

    const PWREInput: any = Lee.get("PWREInput");
    const PWRETip: HTMLElement | null = Lee.get("PWRETip");

    const reg1 = /^[a-z0-9]{8,20}$/; // a-z 0-9 중에 8자리 부터 20자리만 허용
    const reg2 = /[a-z]/g;
    const reg3 = /[0-9]/g;

    if (reg1.test(target) && reg2.test(target) && reg3.test(target)) {
      Lee.removeClass(PWInput, "active");
      Lee.removeClass(PWTip, "active");

      Lee.addClass(PWInput, "check");
    } else {
      Lee.addClass(PWInput, "active");
      Lee.addClass(PWTip, "active");

      Lee.removeClass(PWInput, "check");
    }

    if (PWREInput.value.length > 0) {
      checkPWRE(PWREInput.value);
    } else {
      Lee.removeClass(PWREInput, "active");
      Lee.removeClass(PWRETip, "active");
    }
  }

  function checkPWRE(target: string) {
    const PWInput: any = Lee.get("PWInput");
    const PWREInput: HTMLElement | null = Lee.get("PWREInput");
    const PWRETip: HTMLElement | null = Lee.get("PWRETip");

    if (PWInput.value === target) {
      Lee.removeClass(PWREInput, "active");
      Lee.removeClass(PWRETip, "active");

      Lee.addClass(PWREInput, "check");
    } else {
      Lee.addClass(PWREInput, "active");
      Lee.addClass(PWRETip, "active");

      Lee.removeClass(PWREInput, "check");
    }
  }

  return (
    <div className="find">
      <Head>
        <title>프라임 인베스트먼트 | 비밀번호 재설정</title>
      </Head>
      <div className="find__contents parents">
        <div className="find__contents__title">비밀번호 재설정</div>
        <ul className="find__contents__inputs parents">
          <li
            className="find__contents__inputs__list password active"
            id="PWContext"
          >
            본인인증이 완료 되었습니다.
            <br />
            새로운 비밀번호를 설정해주시기 바랍니다.
            <div className="find__contents__inputs__list__passwords">
              <input
                type="password"
                className="find__contents__inputs__list__passwords__password"
                placeholder="비밀번호를 입력해주세요."
                id="PWInput"
                onChange={function (e) {
                  checkPW(e.target.value);
                }}
              />
              <div className="find__contents__inputs__list__tip" id="PWTip">
                비밀번호는 영문,숫자로 조합된 8자리 이상 20자리 이하로
                입력해주세요.
              </div>
              <input
                type="password"
                className="find__contents__inputs__list__passwords__password"
                placeholder="비밀번호를 다시 입력해주세요."
                id="PWREInput"
                onChange={function (e) {
                  checkPWRE(e.target.value);
                }}
              />
              <div className="find__contents__inputs__list__tip" id="PWRETip">
                입력하신 비밀번호가 일치하지 않습니다.
              </div>
            </div>
            <DelayLink
              to="login"
              delay={200}
              onDelayStart={function () {
                alert("비밀번호 설정이 완료되었습니다.");
                Lee.loadingStart;
              }}
            >
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

export default FindPW;
