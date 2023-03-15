import React, { useEffect, useState } from "react";
import Router from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Lee from "../lib/Lee";
import axios from "axios";
import { getAuth, signInWithCustomToken } from "firebase/auth";

import "../styles/pages/auth.scss";
import "../styles/pages/registration.scss";

const Auth: NextPage = () => {
  const auth = getAuth();

  const [registration, setRegistration] = useState(true);
  const [uid, setUid]: any = useState();
  const [name, setName]: any = useState();
  const [phone, setPhone]: any = useState();
  const [nickname, setNickname]: any = useState();
  const [registnickname, setRegistnickname]: any = useState();
  const [email, setEmail]: any = useState();
  const [avatar, setAvatar]: any = useState();
  const [role, setRole]: any = useState();
  const [check, setCheck]: any = useState(false);
  const [tags, setTage]: any = useState([]);

  const kakaoLogin = (code: any) => {
    axios({
      method: "GET",
      // url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/login/kakao?code=${code}`,
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/login/kakao/dev?code=${code}`,
    })
      .then((res) => {
        setUid(res.data.data.uid);
        setNickname(res.data.data.nickname);
        setEmail(res.data.data.email);
        setRole(res.data.data.role);
        setAvatar(res.data.data.avatar);
        setTage(res.data.data.tags);
        if (!res.data.data.register) {
          Lee.loadingStart();

          setTimeout(() => {
            setRegistration(false);
            Lee.loadingFinish();
          }, 400);
        } else {
          // window.sessionStorage.clear();
          window.sessionStorage.setItem("uid", res.data.data.uid);
          window.sessionStorage.setItem("nickname", res.data.data.nickname);
          window.sessionStorage.setItem("phone", res.data.data.phoneNumber);
          window.sessionStorage.setItem("email", res.data.data.email);
          window.sessionStorage.setItem("role", res.data.data.role);
          window.sessionStorage.setItem("avatar", res.data.data.avatar);
          window.sessionStorage.setItem(
            "tags",
            JSON.stringify(res.data.data.tags)
          );

          signInWithCustomToken(auth, res.headers.authorization)
            .then((userCredential: any) => {
              // Signed in

              window.sessionStorage.setItem(
                "token",
                userCredential._tokenResponse.idToken
              );

              window.sessionStorage.setItem(
                "refresh",
                userCredential._tokenResponse.refreshToken
              );

              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ...
            });

          Lee.loadingStart();

          setTimeout(() => {
            const link = window.sessionStorage.getItem("prevPath") || "/";
            Router.push(link);
          }, 400);
        }
      })
      .catch((err) => {
        window.alert("로그인에 실패하였습니다.");
        Router.push("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };

  const applyRegistration = () => {
    if (check) {
      if (name && name !== "") {
        if (Lee.checkPhone(phone)) {
          axios({
            method: "POST",
            url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/register`,
            data: {
              uid: uid,
              nickname: nickname,
              email: email,
              role: role,
              avatar: avatar,
              name: name,
              phoneNumber: phone,
            },
          })
            .then((res) => {
              if (res.data.success) {
                alert(
                  "회원가입이 정상적으로 완료되었습니다. 해당 계정으로 로그인을 진행해주세요."
                );
              } else {
                alert("회원가입에 실패했습니다.");
              }

              Lee.loadingStart();

              setTimeout(() => {
                Router.push("/login");
              }, 400);
            })

            .catch((err) => {
              window.alert("로그인에 실패하였습니다.");
              Router.push("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
            });
        } else {
          alert("올바른 휴대폰 번호를 입력해주세요.");
        }
      } else {
        alert("성함을 입력해주세요.");
      }
    } else {
      alert("닉네임 중복확인을 해주시기 바랍니다.");
    }
  };

  const checkNickname = (registnickname: string) => {
    setRegistnickname(registnickname.trim());

    if (!registnickname) {
      alert("닉네임을 입력해주세요.");
    } else if (!Lee.checkNickname(registnickname.trim())) {
      alert("허용되지 않은 닉네임 형식입니다.");
    } else {
      axios({
        method: "GET",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/util/check-redundancy`,
        params: {
          nickname: registnickname.trim(),
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert("사용 가능한 닉네임입니다.");
            setNickname(registnickname.trim());
            setCheck(true);
          } else {
            alert("이미 존재하는 닉네임입니다.");
            setCheck(false);
          }
        })
        .catch((err) => {
          window.alert("일시적인 오류입니다. 다시 시도해주세요.");
          setCheck(false);
        });
    }
  };

  useEffect(() => {
    if (Lee.checkLogin()) {
      alert("잘못된 접근입니다.");
      Router.push("/");
    } else {
      const code = new URL(window.location.href).searchParams.get("code");
      kakaoLogin(code);
    }
  }, []);

  return (
    <>
      {registration ? (
        <div className="auth">
          <Head>
            <title>프라임 인베스트먼트 | 로그인</title>
          </Head>
          <div className="auth__fade" />
          <div className="auth__contents parents">
            <svg>
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="red"
                strokeDasharray="78.5 235.5"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="blue"
                strokeDasharray="62.8 188.8"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                stroke="green"
                strokeDasharray="47.1 141.3"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <div className="auth__contents__title">
              계정 정보를 확인 중입니다.
            </div>
          </div>
        </div>
      ) : (
        <div className="registration">
          <Head>
            <title>프라임 인베스트먼트 | 회원가입</title>
          </Head>
          <div className="registration__contents parents">
            <div className="registration__contents__form parents">
              <div className="registration__contents__form__title">
                회원가입
              </div>
              <div className="registration__contents__form__notice parents">
                성함과 연락처를 올바르게 입력하지 않을 경우 서비스를 정상적으로
                이용하실 수 없습니다.
              </div>
              <div className="registration__contents__form__nickname parents">
                <input
                  type="text"
                  className="registration__contents__form__name-input"
                  placeholder="성함을 입력하세요."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  maxLength={8}
                />
                <input
                  type="tel"
                  className="registration__contents__form__phone-input"
                  placeholder="휴대폰 번호를 입력하세요."
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="registration__contents__form__nickname-input"
                  placeholder="사용하실 닉네임을 입력하세요."
                  value={registnickname}
                  onChange={(e) => {
                    setRegistnickname(e.target.value);
                    setCheck(false);
                  }}
                  maxLength={15}
                />
                <div
                  className="registration__contents__form__nickname-button"
                  onClick={function () {
                    checkNickname(registnickname);
                  }}
                >
                  중복확인
                </div>
              </div>
              <label className="container-checkbox">
                <input type="checkbox" />
                본인은 만 14세 이상이며, 이용약관, 개인정보 제 3자 제공,
                개인정보 수집 및 이용, 개인정보 처리방침 내용을 확인하였으며,
                이에 동의합니다.
                <span className="checkmark"></span>
              </label>
              <div
                className="registration__contents__form__submit"
                onClick={applyRegistration}
              >
                가입하기
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
