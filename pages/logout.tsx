import React, { useEffect } from "react";
import Router from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Lee from "../lib/Lee";
import axios from "axios";

import "../styles/pages/auth.scss";

const Logout: NextPage = () => {
  useEffect(() => {
    window.sessionStorage.clear();
    alert("정상적으로 로그아웃 되었습니다.");
    Router.push("/");
  }, []);

  return <></>;
};

export default Logout;
