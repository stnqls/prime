import React, { useEffect, useState } from "react";
import axios from "axios";
import Lee from "../../../lib/Lee";
import Pagination from "react-js-pagination";
import Router from "next/router";
import Link from "next/link";

import "./BoardList.scss";
import "../../../styles/pages/Paginate.scss";
import BoardItem from "../BoardItem/BoardItem";

const BoardList = (props: any) => {
  const page = Number(props.activePage);
  const [data, setData] = useState([]);
  const [noticedata, setNoticedata] = useState([]);
  const [fixeddata, setFixeddata] = useState([]);

  const [activePage, setActivePage] = useState(page);
  const [totalPage, setTotalPage] = useState(0);

  function getData() {
    // setActivePage(pageNumber);
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/community?categoryCode=${props.categoryCode}&page=${props.activePage}&order=date&search=`,
    })
      .then((res: any) => {
        if (res.data.success) {
          setTotalPage(res.data.data.totalBoardCnt);
          setNoticedata(res.data.data.noticeArray);
          setFixeddata(res.data.data.fixedArray);
          setData(res.data.data.boardArray);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getData);
          }
          alert("서버 통신 중 오류가 발생했습니다.");
        }
      })
      .catch((err: any) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }
  useEffect(() => {
    getData();
    setActivePage(1);
  }, []);

  let startindex =
    totalPage - (activePage - 1) * (30 - noticedata.length - fixeddata.length);

  return (
    <React.Fragment>
      <table className="board-list">
        <thead className="board-list__head">
          <tr className="board-list__head__tr">
            <td>No</td>
            <td>제목</td>
            <td>작성자</td>
            <td>등록일</td>
            <td>조회수</td>
            <td>추천수</td>
          </tr>
        </thead>
        <tbody className="board-list__body">
          {noticedata.map((notice: any, index: number) => {
            return (
              <Link
                href={`/readBoard?id=${notice.id}&categoryCode=401&notice=true`}
                key={`board-list-notice-${index}`}
              >
                <tr
                  className={`board-list__body__tr-notice`}
                  onClick={() => {
                    setTimeout(() => {
                      Router.push({
                        pathname: "/readBoard",
                        query: {
                          id: notice.id,
                          categoryCode: 401,
                          notice: true,
                        },
                      });
                    }, 1000);
                  }}
                >
                  <td className="board-list__body__tr-notice__no">공지</td>
                  <td className="board-list__body__tr-notice__title">
                    {notice.title}
                  </td>
                  <td>{notice.adminName}</td>
                  <td>{notice.date.slice(0, -9)}</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </Link>
            );
          })}
          {fixeddata.map((fix: any, index: number) => {
            return (
              <tr
                key={`board-list-fixed-${index}`}
                className={`board-list__body__tr-fixed`}
                onClick={() => {
                  Router.push({
                    pathname: "/readBoard",
                    query: {
                      id: fix.id,
                      categoryCode: props.categoryCode,
                    },
                  });
                }}
              >
                <td className="board-list__body__tr-fixed__no">HOT</td>
                <td className="board-list__body__tr-fixed__title">
                  {fix.title}
                </td>
                <td>{fix.memberNickname}</td>
                <td>{fix.date.slice(0, -9)}</td>
                <td>{fix.view}</td>
                <td>{fix.like}</td>
              </tr>
            );
          })}
          {data.map((items: any, index: number) => {
            return (
              <tr
                key={`data-${index}`}
                className="board-list__body__tr"
                onClick={() => {
                  Router.push({
                    pathname: "/readBoard",
                    query: {
                      id: items.id,
                      categoryCode: props.categoryCode,
                    },
                  });
                }}
              >
                {/* <td>{startindex}</td>
                <td className="board-list__body__tr__title">{items.title}</td>
                <td>{items.memberNickname}</td>
                <td>{items.date.slice(0, -9)}</td>
                <td>{items.view}</td>
                <td>{items.like}</td> */}
                <BoardItem
                  no={startindex - index}
                  title={items.title}
                  writer={items.memberNickname}
                  views={items.view}
                  updated={items.date.slice(0, -9)}
                  recommended={items.like}
                  id={items.id}
                  replyCnt={items.replyCnt}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        totalItemsCount={totalPage}
        activePage={activePage}
        onChange={getData} //페이지가 바뀔때 핸들링해줄 함수
        itemsCountPerPage={30}
        prevPageText={""} //이전을 나타낼 텍스트
        nextPageText={""}
      />
    </React.Fragment>
  );
};

export default BoardList;
