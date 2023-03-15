import React, { useEffect, useState } from "react";
import "./Header.scss";
import Link from "next/link";

function Header(props) {
  const [login, setLogin] = useState(false);

  const [toggle, showToggle] = useState(false);
  const show = () => {
    showToggle(!toggle);
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("accessToken")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  function logout() {
    window.sessionStorage.clear();
    alert("정상적으로 로그아웃 되었습니다.");
    setLogin(false);
    location.href = "/primeadmin?page=login";
  }

  return (
    <div className="admin-header">
      <div className="admin-header__title">{props.title}</div>
      <div className="admin-header__info">
        {/* <img
          src="/images/icon_bell.png"
          alt=""
          className="admin-header__info__alert"
        /> */}

        <div className="admin-header__info__user" onClick={show}>
          {login ? (
            <div className="admin-header__info__user__name">
              <span> {window.sessionStorage.getItem("name")}님</span>{" "}
              <span onClick={logout}>로그아웃</span>
              {/* <ul
                className={`admin-header__info__user__name__list ${
                  toggle ? "show" : ""
                }`}
              >
                <li className="admin-header__info__user__name__list__item">
                  로그아웃
                </li>
              </ul> */}
            </div>
          ) : (
            <Link href="/primeadmin?page=login">
              <div className="admin-header__info__user__name">
                로그인이 필요합니다.
              </div>
            </Link>
          )}
          {/* <div className="admin-header__info__user__contain">
            <div className="admin-header__info__user__contain__img"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
