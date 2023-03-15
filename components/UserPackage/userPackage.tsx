import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Lee from "../../lib/Lee";
import DelayLink from "../../lib/DelayLink";
import axios from "axios";
import Router from "next/router";

import UserPackageList from "./UserPackageList/UserPackageList";

import "./userPackage.scss";

const UserPackage: NextPage = () => {
  const [packages, setPackages]: any = useState([]);

  function getPackages() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/packages/subscribe`,
      headers,
    })
      .then((res) => {
        const data = res.data.data;
        if (res.data.success) {
          setPackages(data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getPackages);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("서버 오류가 발생하였습니다.");
      });
  }

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <div className="user-package">
      <Head>
        <title>프라임 인베스트먼트 | 구독 패키지 관리</title>
      </Head>
      <UserPackageList packages={packages} />
    </div>
  );
};

export default UserPackage;
