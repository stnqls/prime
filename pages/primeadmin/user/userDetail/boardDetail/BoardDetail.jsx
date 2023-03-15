import React, { useState } from "react";
import axios from "axios";
import Lee from "../../../../../lib/Lee";
import BoardModal from "../../../community/board/boardModal/BoardModal";
import BoardDetailItem from "./BoardDetailItem";

import "./BoardDetail.scss";
import Pagination from "react-js-pagination";

const BoardDetail = (props) => {
  const board = props.props;
  const [modal, setModal] = useState(false);
  const [boardId, setBoardId] = useState();
  const [categoryCode, setCategoryCode] = useState();
  const [ids, setIds] = useState([]);
  const [page, setPage] = useState(1);
  const [item] = useState(7);

  function pageChange(page) {
    setPage(page);
  }

  function deleteBoard() {
    if (ids.length === 0) {
      alert("삭제할 게시물을 선택해 주세요.");
    } else {
      const headers = {
        authorization: window.sessionStorage.getItem("token"),
      };
      axios({
        method: "DELETE",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community`,
        headers,
        data: {
          categoryCode: categoryCode,
          boardIds: ids,
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert("게시글이 정상적으로 삭제되었습니다.");
            // window.location.reload();
          } else {
            if (res.data.errCode === "101") {
              Lee.refreshToken(deleteBoard);
            } else {
              alert("서버 통신 중 오류가 발생했습니다.");
            }
          }
        })
        .catch((err) => {
          alert("일시적인 오류입니다. 다시 시도해주세요.");
          console.log(err.response);
        });
    }
  }

  return (
    <div className="admin-board-detail">
      <button
        type="button"
        className="admin-board-detail__delete"
        onClick={() => {
          deleteBoard();
        }}
      >
        삭제하기
      </button>
      <table className="admin-board-detail__table">
        <thead className="admin-board-detail__table__head">
          <tr className="admin-board-detail__table__head__tr">
            <td></td>
            <td>구분</td>
            <td>제목</td>
            <td>등록일</td>
          </tr>
        </thead>
        <tbody className="admin-board-detail__table__body">
          {board &&
            board
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((data, index) => (
                <BoardDetailItem
                  key={`admin-board-detail-${index}`}
                  categoryCode={data.categoryCode}
                  title={data.title}
                  date={data.date}
                  id={data.id}
                  setBoardId={setBoardId}
                  setCategoryCode={setCategoryCode}
                  setModal={setModal}
                  setIds={setIds}
                  ids={ids}
                />
              ))}
        </tbody>
      </table>
      {board.length > 0 && (
        <Pagination
          totalItemsCount={board.length}
          activePage={page}
          onChange={pageChange}
          itemsCountPerPage={item}
          firstPageText={""}
          lastPageText={""}
          nextPageText={""}
          prevPageText={""}
        />
      )}

      {modal && (
        <BoardModal
          boardId={boardId}
          categoryCode={categoryCode}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default BoardDetail;
