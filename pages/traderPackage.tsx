import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";
import axios from "axios";
import Router from "next/router";

import TraderPackageList from "../components/TraderPackage/TraderPackageList/TraderPackageList";
import AddPackage from "./addPackage";

import "../styles/pages/traderPackage.scss";

const TraderPackage: NextPage = () => {
  const [packages, setPackages]: any = useState([]);
  const [deletedPackages, setDeletedPackages]: any = useState([]);
  const [viewModal, setViewModal] = useState(false);

  function getPackages() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/packages`,
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

  function getDeletedPackages() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/packages?isDeleted=true`,
      headers,
    })
      .then((res) => {
        const data = res.data.data;
        if (res.data.success) {
          setDeletedPackages(data);
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
    getDeletedPackages();
  }, []);

  return (
    <div className="trader-package">
      <Head>
        <title>프라임 인베스트먼트 | 패키지 관리</title>
      </Head>
      {viewModal && <AddPackage setViewModal={setViewModal} />}
      <div className="trader-package__header">
        <div className="trader-package__header__title">패키지 관리</div>
        <div
          className="trader-package__header__add"
          onClick={() => {
            setViewModal(true);
          }}
        >
          등록하기
        </div>
      </div>
      <TraderPackageList
        packages={packages}
        deletedPackages={deletedPackages}
      />
    </div>
  );
};

export default TraderPackage;
