import axios from "axios";
import { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import Pagination from "react-js-pagination";
import Router from "next/router";

import CommunityCommentsItem from "./CommunityCommentsItem";
import "./CommunityComments.scss";

const CommunityComments = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(101);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(12);
  const [replyIds, setReplyIds] = useState([]);

  function pageChange(page: any) {
    setPage(page);
  }

  function getMyComment() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/users/community/replies?categoryCode=${category}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getMyComment);
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

  function deleteMyComments() {
    if (replyIds.length === 0) {
      alert("삭제할 댓글을 선택해주세요.");
    } else {
      const headers: any = {
        authorization: window.sessionStorage.getItem("token"),
      };
      axios({
        method: "DELETE",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/community/reply`,
        headers,
        data: {
          replyIds: replyIds,
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert("댓글이 성공적으로 삭제되었습니다.");
            Router.reload();
          }
        })
        .catch((err) => {
          window.alert("서버 오류가 발생하였습니다.");
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getMyComment();
  }, [category]);

  return (
    <div className="community-comments">
      <div className="community-comments__title">댓글</div>
      <ul className="community-comments__menu">
        <li
          className={`community-comments__menu__list ${
            category === 101 && "clicked"
          }`}
          onClick={() => {
            setCategory(101);
          }}
        >
          트레이딩
        </li>
        <li
          className={`community-comments__menu__list ${
            category === 201 && "clicked"
          }`}
          onClick={() => {
            setCategory(201);
          }}
        >
          매매분석법
        </li>
        <li
          className={`community-comments__menu__list ${
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
        className="community-comments__delete"
        onClick={() => {
          deleteMyComments();
        }}
      >
        삭제
      </div>
      {data.length > 0 ? (
        <table className="community-comments__table">
          <thead className="community-comments__table__thead">
            <tr className="community-comments__table__thead__tr">
              <td></td>
              <td className="community-comments__table__thead__title">댓글</td>
              <td className="community-comments__table__thead__date">작성일</td>
            </tr>
          </thead>
          <tbody className="community-comments__table__tbody">
            {data
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((data: any, index: number) => (
                <CommunityCommentsItem
                  key={`community-comments-${index}`}
                  categoryCode={data.categoryCode}
                  content={data.content}
                  date={data.date}
                  boardId={data.boardId}
                  replyId={data.id}
                  setReplyIds={setReplyIds}
                  replyIds={replyIds}
                />
              ))}
          </tbody>
        </table>
      ) : (
        <div className="community-comments__none">내가 쓴 댓글이 없습니다.</div>
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
export default CommunityComments;
