import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import Lee from "../../../../../lib/Lee";

function BoardItem(props) {
  const [boardId, setBoardId] = useState();
  const [categoryCode, setCategoryCode] = useState();
  const [deleted, setDeleted] = useState();

  let category;
  switch (props.categoryCode) {
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

  function cancelFixedBoard(categoryCode) {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community/fix/${boardId}`,
      headers,
      data: {
        categoryCode: categoryCode,
      },
    })
      .then((res) => {
        if (res.data.success) {
          window.alert("고정게시글이 취소되었습니다.");
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(cancelFixedBoard);
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

  function deleteBoard() {
    const headers = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community`,
      headers,
      data: {
        categoryCode: categoryCode,
        boardIds: [boardId],
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("게시글이 정상적으로 삭제되었습니다.");
          Router.reload();
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
        console.log(err);
      });
  }

  useEffect(() => {
    setBoardId(props.boardId);
    setCategoryCode(props.categoryCode);
  }, []);

  useEffect(() => {
    if (props.isDeleted) {
      setDeleted(true);
    } else {
      setDeleted(false);
    }
  }, [props.isDeleted]);

  return (
    <React.Fragment>
      <tr className="board__table__body__tr">
        <td
          className="board__table__body__category"
          onClick={() => {
            props.getDetail(props.boardId, props.categoryCode);
            props.setModal(true);
          }}
        >
          {category}
        </td>
        <td
          className="board__table__body__title"
          onClick={() => {
            props.getDetail(props.boardId, props.categoryCode);
            props.setModal(true);
          }}
        >
          {props.title}
        </td>
        <td
          className="board__table__body__name"
          onClick={() => {
            props.getDetail(props.boardId, props.categoryCode);
            props.setModal(true);
          }}
        >
          {props.name}
        </td>
        <td
          className="board__table__body__id"
          onClick={() => {
            props.getDetail(props.boardId, props.categoryCode);
            props.setModal(true);
          }}
        >
          {props.id}
        </td>
        <td
          className="board__table__body__date"
          onClick={() => {
            props.getDetail(props.boardId, props.categoryCode);
            props.setModal(true);
          }}
        >
          {props.date}
        </td>
        {deleted ? null : (
          <td className="board__table__body__delete">
            <button
              type="button"
              className="board__table__body__delete__btn table__btn__red"
              onClick={() => {
                if (props.isFixed) {
                  if (confirm("고정게시물을 취소하시겠습니까?")) {
                    cancelFixedBoard(props.categoryCode);
                  }
                } else {
                  if (confirm("삭제하시겠습니까?")) deleteBoard();
                }
              }}
            >
              {props.isFixed ? "취소" : "삭제"}
            </button>
          </td>
        )}
      </tr>
    </React.Fragment>
  );
}

export default BoardItem;
