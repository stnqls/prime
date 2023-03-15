import React, { useState, useEffect } from "react";
import AdminCommentsItem from "./AdminCommentsItem";
import axios from "axios";
import Pagination from "react-js-pagination";
import Lee from "../../../../lib/Lee";
import BoardModal from "../board/boardModal/BoardModal";

function DeleteComments(props) {
  let search = props.search;
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [categoryCode, setCategoryCode] = useState();
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
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community/reply?page=${page}&isDeleted=true&categoryCode=${categoryCode}`,
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
            alert("서버통신 중 오류가 발생했습니다.");
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
  }, []);

  return (
    <React.Fragment>
      {modal && (
        <BoardModal
          setModal={setModal}
          categoryCode={categoryCode}
          boardId={boardId}
        />
      )}
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
            </tr>
          </thead>
          <tbody className="admin-comments__table__body">
            {data.map((data, index) => (
              <tr
                className="admin-comments__table__body__tr"
                key={`deleteComment-${index}`}
                // onClick={() => {
                //   viewDetail();
                //   getDetail(data.categoryCode, data.boardId);
                // }}
              >
                <AdminCommentsItem
                  category={data.categoryCode}
                  content={data.content}
                  nickName={data.memberNickname}
                  id={data.memberId}
                  date={data.date}
                  isDeleted={data.isDeleted}
                  boardId={data.boardId}
                  modal={viewDetail}
                />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="admin-comments__none">
          삭제된 댓글이 존재하지 않습니다.
        </div>
      )}
      {data.length > 0 ? (
        <Pagination
          totalItemsCount={totalPage}
          activePage={page}
          onChange={getData}
          nextPageText={""}
          prevPageText={""}
        />
      ) : null}
    </React.Fragment>
  );
}

export default DeleteComments;
