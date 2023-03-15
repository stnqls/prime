import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.scss";

function Login() {
  const [login, setLogin] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  function doLogin() {
    const email = id + "@prime.com";
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        window.sessionStorage.clear();
        window.sessionStorage.setItem("uid", user.uid);
        window.sessionStorage.setItem("accessToken", user.accessToken);
        window.sessionStorage.setItem(
          "refresh",
          user.stsTokenManager.refreshToken
        );
        window.sessionStorage.setItem("name", user.displayName);
        window.sessionStorage.setItem("role", "admin");

        setTimeout(() => {
          location.href = "/primeadmin?page=user";
        }, 200);
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/user-not-found") {
          alert("해당 아이디를 찾을 수 없습니다.");
        } else if (errorCode === "auth/wrong-password") {
          alert("비밀번호가 올바르지 않습니다.");
        } else {
          alert("서버 통신 중 오류가 발생했습니다.");
        }
      });
  }

  useEffect(() => {
    if (window.sessionStorage.getItem("accessToken")) {
      setLogin(true);
      alert("이미 로그인 중입니다.");
      setTimeout(() => {
        location.href = "/primeadmin?page=user";
      }, 200);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div className="admin-login">
      {!login && (
        <>
          <div className="admin-login__title">로그인</div>
          <form className="admin-login__list">
            <input
              type="text"
              className="admin-login__list__id"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={function (e) {
                setId(e.target.value);
              }}
              autoFocus
            />
            <input
              type="password"
              className="admin-login__list__pw"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={function (e) {
                setPassword(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.code === "Enter") {
                  doLogin();
                }
              }}
              autoComplete="off"
            />
          </form>
          <button type="button" className="admin-login__btn" onClick={doLogin}>
            로그인
          </button>
        </>
      )}
    </div>
  );
}
export default Login;
