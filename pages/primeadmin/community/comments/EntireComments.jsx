import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import dynamic from "next/dynamic";
import AdminCommentsItem from "./AdminCommentsItem";
import Lee from "../../../../lib/Lee";

const BoardModal = dynamic(import("../board/boardModal/BoardModal"), {
  ssr: false,
});

function EntireComments(props) {
  let search = props.search;
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [modal, setModal] = useState(false);
  const [categoryCode, setCategoryCode] = useState("");
  const [boardId, setBoardId] = useState();

  function viewDetail(categoryCode, boardId) {
    setModal(true);
    getDetail(categoryCode, boardId);
  }

  function getDetail(code, id) {
    setCategoryCode(code);
    setBoardId(id);
  }

  function getData(page) {
    setPage(page);
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community/reply?page=${page}&isDeleted=false&categoryCode=${props.categoryCode}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setComments(res.data.data.replyArray);
          setTotalPage(res.data.data.totalReplyCnt);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getData);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("오류가 발생하였습니다.");
        console.log(err);
      });
  }

  const data = comments.filter((text) => {
    if (search === "") {
      return text;
    } else if (
      text.memberNickname.toLowerCase().includes(search.toLowerCase())
    ) {
      return text;
    }
  });

  useEffect(() => {
    getData(1);
  }, [props.categoryCode]);

  return (
    <React.Fragment>
      {data && data.length > 0 ? (
        <table className="admin-comments__content__body__table admin-comments__table">
          <thead className="admin-comments__table__head">
            <tr className="admin-comments__table__head__tr">
              <td className="admin-comments__table__head__tr__category">
                구분
              </td>
              <td className="admin-comments__table__head__tr__text">내용</td>
              <td className="admin-comments__table__head__tr__name">작성자</td>
              <td className="admin-comments__table__head__tr__uid">UID</td>
              <td className="admin-comments__table__head__tr__date">등록일</td>
              <td className="admin-comments__table__head__tr__delete">삭제</td>
            </tr>
          </thead>
          <tbody className="admin-comments__table__body">
            {data.map((data, index) => (
              <tr
                className="admin-comments__table__body__tr"
                key={`comment-${index}`}
              >
                <AdminCommentsItem
                  category={data.categoryCode}
                  content={data.content}
                  nickName={data.memberNickname}
                  id={data.memberId}
                  date={data.date}
                  isDeleted={data.isDeleted}
                  replyId={data.id}
                  boardId={data.boardId}
                  modal={viewDetail}
                />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="admin-comments__none">댓글이 존재하지 않습니다.</div>
      )}
      {data.length > 0 ? (
        <Pagination
          itemsCountPerPage={10}
          totalItemsCount={totalPage}
          activePage={page}
          onChange={getData}
          nextPageText={""}
          prevPageText={""}
        />
      ) : null}
      {modal && (
        <BoardModal
          setModal={setModal}
          categoryCode={categoryCode}
          boardId={boardId}
        />
      )}
    </React.Fragment>
  );
}

export default EntireComments;
