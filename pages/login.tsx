import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Lee from "../lib/Lee";

import "../styles/pages/login.scss";
import router from "next/router";

const Login: NextPage = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (Lee.checkLogin()) {
      setLogin(false);
      alert("이미 로그인 상태입니다.");
      Router.push("/");
    } else {
      setLogin(true);
    }
  }, []);

  return (
    <div className="login">
      <Head>
        <title>프라임 인베스트먼트 | 로그인</title>
      </Head>
      <div className="login__fade" />
      {login && (
        <div className="login__contents parents">
          <div className="login__contents__box parents">
            <div className="login__contents__box__form">
              <div className="login__contents__box__form__title">로그인</div>
              {/* <a href="https://kauth.kakao.com/oauth/authorize?client_id=9809758f76a70c3100227ce7feaec6b2&redirect_uri=https://primeinvestment.kr/auth&response_type=code"> */}
              <a href="https://kauth.kakao.com/oauth/authorize?client_id=9809758f76a70c3100227ce7feaec6b2&redirect_uri=http://localhost:3000/auth&response_type=code">
                <div className="login__contents__box__form__kakao">
                  카카오톡 계정으로 로그인
                </div>
              </a>
              <div className="login__contents__box__form__paragraph">
                프라임인베스트먼트는 카카오톡 아이디로
                <br />
                로그인 후 이용하실 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
