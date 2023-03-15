import axios from "axios";
import React from "react";
import Lee from "../../../../lib/Lee";

function AdminCommentsItem(props) {
  const replyId = props.replyId;
  let category;
  switch (props.category) {
    case 101:
      category = "트레이딩";
      break;
    case 201:
      category = "매매분석법";
      break;
    case 301:
      category = "자유게시판";
      break;
  }

  function deleteComment() {
    const headers = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community/reply`,
      headers,
      data: {
        replyIds: [replyId],
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("댓글이 정상적으로 삭제되었습니다.");
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(deleteComment);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
        setTimeout(() => {
          window.location.reload();
        }, 400);
      })
      .catch((err) => {
        alert("일시적인 오류입니다. 다시 시도해주세요.");
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <td
        className="admin-comments__table__body__category"
        onClick={() => {
          props.modal(props.category, props.boardId);
        }}
      >
        {category}
      </td>
      <td
        className="admin-comments__table__body__text"
        onClick={() => {
          props.modal(props.category, props.boardId);
        }}
      >
        <div className="admin-comments__table__body__ellipsis">
          {props.content}
        </div>
      </td>
      <td
        className="admin-comments__table__body__name"
        onClick={() => {
          props.modal(props.category, props.boardId);
        }}
      >
        {props.nickName}
      </td>
      <td
        className="admin-comments__table__body__uid"
        onClick={() => {
          props.modal(props.category, props.boardId);
        }}
      >
        {props.id}
      </td>
      <td
        className="admin-comments__table__body__date"
        onClick={() => {
          props.modal(props.category, props.boardId);
        }}
      >
        {props.date}
      </td>
      {props.isDeleted === true ? null : (
        <td className="admin-comments__table__body__delete">
          <button
            className="admin-comments__table__body__delete__btn table__btn__red"
            onClick={() => {
              if (confirm("삭제하시겠습니까?")) deleteComment();
            }}
          >
            삭제
          </button>
        </td>
      )}
    </React.Fragment>
  );
}

export default AdminCommentsItem;
