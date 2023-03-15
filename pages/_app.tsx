import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { init as fireabseInit } from "../firebase";
import { useRouter } from "next/router";
import React from "react";

import "../styles/styles.scss";
import "../styles/pages/Paginate.scss";

const Header = dynamic(import("../components/Layouts/Header/Header"), {
  ssr: false,
});

const Footer = dynamic(import("../components/Layouts/Footer/Footer"), {
  ssr: false,
});

fireabseInit();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pathname: any = router.pathname;
  let title = "";
  if (pathname === "/company") {
    title = "회사소개";
  } else if (pathname === "/recruitment") {
    title = "인재채용";
  } else if (pathname === "/partnership") {
    title = "사업제휴";
  } else if (pathname === "/faq") {
    title = "FAQ";
  } else if (pathname === "/Inquiry") {
    title = "1:1문의";
  } else if (pathname === "/notice") {
    title = "공지사항";
  } else if (pathname === "/tradingBoard") {
    title = "트레이딩";
  } else if (pathname === "/tradingAnalysisBoard") {
    title = "매매분석법";
  } else if (pathname === "/freeBoard") {
    title = "자유게시판";
  } else if (pathname === "/findTrader") {
    title = "트레이더";
  } else {
    title = "";
  }

  return (
    <div id="primeApp">
      {pathname.indexOf("/primeadmin") === -1 ? (
        <div id="Document" className="parents fade">
          <Header title={title} />
          <Component {...pageProps} />
          <Footer />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
};

export default MyApp;
