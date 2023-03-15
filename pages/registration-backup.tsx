import type { NextPage } from "next";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";

import "../styles/pages/registration.scss";

const Registration: NextPage = () => {
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
    <div className="registration">
      <Head>
        <title>프라임 인베스트먼트 | 회원가입</title>
      </Head>
      <div className="registration__contents parents">
        <div className="registration__contents__form parents">
          <div className="registration__contents__form__title">회원가입</div>
          <input
            type="email"
            className="registration__contents__form__email"
            placeholder="이메일을 입력하세요."
            id="IDInput"
            onChange={function (e) {
              checkEmail(e.target.value);
            }}
          />
          <div className="registration__contents__form__tip" id="IDTip">
            알맞은 이메일 형식으로 입력해주세요.
          </div>
          <input
            type="password"
            className="registration__contents__form__password"
            placeholder="비밀번호를 입력하세요."
            id="PWInput"
            onChange={function (e) {
              checkPW(e.target.value);
            }}
          />
          <div className="registration__contents__form__tip" id="PWTip">
            비밀번호는 영문,숫자로 조합된 8자리 이상 20자리 이하로 입력해주세요.
          </div>
          <input
            type="password"
            className="registration__contents__form__passwordRe"
            placeholder="비밀번호를 한 번 더 입력하세요."
            id="PWREInput"
            onChange={function (e) {
              checkPWRE(e.target.value);
            }}
          />
          <div className="registration__contents__form__tip" id="PWRETip">
            입력하신 비밀번호가 일치하지 않습니다.
          </div>
          <label className="container-checkbox">
            <input type="checkbox" />
            본인은 만 14세 이상이며, 이용약관, 개인정보 제 3자 제공, 개인정보
            수집 및 이용, 개인정보 처리방침 내용을 확인하였으며, 이에
            동의합니다.
            <span className="checkmark"></span>
          </label>
          <div className="registration__contents__form__certificate">
            본인인증
          </div>
          <div className="registration__contents__form__submit">가입하기</div>
          <div className="registration__contents__form__login">
            <DelayLink to="login" delay={200} onDelayStart={Lee.loadingStart}>
              <div className="registration__contents__form__login__text">
                이미 계정이 있으신가요? <span>로그인</span>
              </div>
            </DelayLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
