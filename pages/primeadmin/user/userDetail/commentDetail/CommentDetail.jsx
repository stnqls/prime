import { useState } from "react";
import Pagination from "react-js-pagination";

import CommentDetailItem from "./CommentDetailItem";
import BoardModal from "../../../community/board/boardModal/BoardModal";
import "./CommentDetail.scss";
import axios from "axios";

const CommentDetail = (props) => {
  const comment = props.props;
  const [modal, setModal] = useState(false);
  const [boardId, setBoardId] = useState();
  const [categoryCode, setCategoryCode] = useState();
  const [ids, setIds] = useState([]);
  const [page, setPage] = useState(1);
  const [item] = useState(7);

  function pageChange(page) {
    setPage(page);
  }

  function deleteComment() {
    if (ids.length === 0) {
      alert("삭제할 게시물을 선택해 주세요.");
    } else {
      const headers = {
        authorization: window.sessionStorage.getItem("token"),
      };
      axios({
        method: "DELETE",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community/reply`,
        headers,
        data: {
          replyIds: ids,
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert("댓글이 정상적으로 삭제되었습니다.");
            console.log(res);
            // window.location.reload();
          } else {
            if (res.data.errCode === "101") {
              Lee.refreshToken(deleteComment);
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
    <div className="admin-comment-detail">
      <button
        type="button"
        className="admin-comment-detail__delete"
        onClick={() => {
          deleteComment();
        }}
      >
        삭제하기
      </button>
      <table className="admin-comment-detail__table">
        <thead className="admin-comment-detail__table__head">
          <tr className="admin-comment-detail__table__head__tr">
            <td></td>
            <td>구분</td>
            <td>내용</td>
            <td>등록일</td>
          </tr>
        </thead>
        <tbody className="admin-comment-detail__table__body">
          {comment &&
            comment.map((data, index) => (
              <CommentDetailItem
                key={`admin-comment-detail-${index}`}
                categoryCode={data.categoryCode}
                content={data.content}
                date={data.date}
                boardId={data.boardId}
                id={data.id}
                setBoardId={setBoardId}
                setCategoryCode={setCategoryCode}
                setModal={setModal}
                setIds={setIds}
                ids={ids}
                isDeleted={data.isDeleted}
              />
            ))}
        </tbody>
      </table>
      {comment.length > 0 && (
        <Pagination
          totalItemsCount={comment.length}
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

export default CommentDetail;
