import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import Router from "next/router";
import Lee from "../../../lib/Lee";
// import dynamic from "next/dynamic";

import "./CommunityBoard.scss";
import CommunityBoardItem from "./CommunityBoardItem";

// const CommunityBoardItem = dynamic(import("./CommunityBoardItem"), {
//   ssr: false,
// });
const CommunityBoard = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(101);
  const [boardIds, setBoardIds]: any = useState([]);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);

  function pageChange(page: any) {
    setPage(page);
  }

  function getMyBoard() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/users/community/boards?categoryCode=${category}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getMyBoard);
          } else if (res.data.errCode === "301") {
            alert("삭제된 게시물입니다.");
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("서버 오류가 발생하였습니다.");
      });
  }

  function deleteMyBoard() {
    if (boardIds.length === 0) {
      alert("삭제할 게시물을 선택해주세요.");
    } else {
      const headers: any = {
        authorization: window.sessionStorage.getItem("token"),
      };
      axios({
        method: "DELETE",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/community`,
        data: {
          categoryCode: category,
          boardIds: boardIds,
        },
        headers,
      })
        .then((res) => {
          if (res.data.success) {
            alert("게시글이 성공적으로 삭제되었습니다.");
            Router.reload();
          }
        })
        .catch((err) => {
          window.alert("서버 오류가 발생하였습니다.");
        });
    }
  }

  useEffect(() => {
    getMyBoard();
  }, [category]);

  return (
    <div className="community-board">
      <div className="community-board__title">게시글</div>
      <ul className="community-board__menu">
        <li
          className={`community-board__menu__list ${
            category === 101 && "clicked"
          }`}
          onClick={() => {
            setCategory(101);
          }}
        >
          트레이딩
        </li>
        <li
          className={`community-board__menu__list ${
            category === 201 && "clicked"
          }`}
          onClick={() => {
            setCategory(201);
          }}
        >
          매매분석법
        </li>
        <li
          className={`community-board__menu__list ${
            category === 301 && "clicked"
          }`}
          onClick={() => {
            setCategory(301);
          }}
        >
          자유게시판
        </li>
      </ul>
      <div
        className="community-board__delete"
        onClick={() => {
          deleteMyBoard();
        }}
      >
        삭제
      </div>
      {data.length > 0 ? (
        <table className="community-board__table">
          <thead className="community-board__table__thead">
            <tr className="community-board__table__thead__tr">
              <td></td>
              <td className="community-board__table__thead__title">제목</td>
              <td className="community-board__table__thead__date">작성일</td>
              <td className="community-board__table__thead__views">조회수</td>
              <td className="community-board__table__thead__likes">추천수</td>
            </tr>
          </thead>
          <tbody className="community-board__table__tbody">
            {data
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((data: any, index: number) => {
                return (
                  <CommunityBoardItem
                    key={`community-board-${index}`}
                    categoryCode={data.categoryCode}
                    title={data.title}
                    date={data.date}
                    view={data.view}
                    like={data.like}
                    boardId={data.id}
                    setBoardIds={setBoardIds}
                    boardIds={boardIds}
                  />
                );
              })}
          </tbody>
        </table>
      ) : (
        <div className="community-board__none">내가 쓴 게시물이 없습니다.</div>
      )}
      {data.length > 0 ? (
        <Pagination
          totalItemsCount={data.length}
          activePage={page}
          onChange={pageChange}
          itemsCountPerPage={item}
          firstPageText={""}
          lastPageText={""}
          nextPageText={""}
          prevPageText={""}
        />
      ) : null}
    </div>
  );
};

export default CommunityBoard;
