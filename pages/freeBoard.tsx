import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Lee from "../lib/Lee";
import Pagination from "react-js-pagination";

import Board from "../components/Board/Board";
// import "../styles/pages/trading.scss";

const FreeBoard: NextPage = () => {
  const [data, setData] = useState([]);
  const [noticedata, setNoticedata] = useState([]);
  const [fixeddata, setFixeddata] = useState([]);

  const [activePage, setActivePage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [order, setOrder] = useState("date");
  const [search, setSearch] = useState("");

  const getOrder = (order: any) => {
    setOrder(order);
  };

  const getText = (text: any) => {
    setSearch(text);
  };

  function getData(pageNumber: any) {
    setActivePage(pageNumber);
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/community?categoryCode=301&page=${pageNumber}&order=${order}&search=${search}`,
    })
      .then((res) => {
        if (res.data.success) {
          setTotalPage(res.data.data.totalBoardCnt);
          setData(res.data.data.boardArray);
          setNoticedata(res.data.data.noticeArray);
          setFixeddata(res.data.data.fixedArray);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getData);
          }
          alert("서버 통신 중 오류가 발생했습니다.");
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
        console.log(err);
      });
  }

  useEffect(() => {
    getData(0);
    setActivePage(1);
  }, [order, search]);

  let index =
    totalPage - (activePage - 1) * (30 - noticedata.length - fixeddata.length);

  return (
    <div className="trading">
      <Head>
        <title>프라임 인베스트먼트</title>
      </Head>
      <Board
        data={data}
        notice={noticedata}
        fixed={fixeddata}
        title={"Free Board"}
        code={301}
        noticeCode={401}
        total={totalPage}
        index={activePage === 1 ? totalPage : index}
        getOrder={getOrder}
        getText={getText}
      />
      {(fixeddata.length || data.length) > 0 && (
        <Pagination
          totalItemsCount={totalPage}
          activePage={activePage}
          onChange={getData} //페이지가 바뀔때 핸들링해줄 함수
          itemsCountPerPage={30}
          prevPageText={""} //이전을 나타낼 텍스트
          nextPageText={""}
        />
      )}
    </div>
  );
};

export default FreeBoard;
