import axios from "axios";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Lee from "../../../../../lib/Lee";

import BoardModalComment from "./BoardModalComment";
import "./BoardModal.scss";

function BoardModal(props) {
  const [categoryCode, setCategoryCode] = useState(props.categoryCode);
  const [boardId, setBoardId] = useState(props.boardId);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);

  function getContent() {
    return { __html: data.content };
  }

  function getBoardData() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community/${boardId}?categoryCode=${categoryCode}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setComment(res.data.data.replyArray);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getBoardData);
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

  function fixedBoard() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "POST",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community/fix/${boardId}`,
      headers,
      data: {
        categoryCode: categoryCode,
      },
    })
      .then((res) => {
        if (res.data.success) {
          window.alert("고정게시글로 등록이 완료되었습니다.");
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(fixedBoard);
          } else if (res.data.errCode === 202) {
            alert("이미 고정된 게시글 입니다.");
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

  function cancelFixedBoard() {
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
          window.alert("고정게시글취소가 완료되었습니다.");
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
      authorization: window.sessionStorage.getItem("accessToken"),
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
          window.alert("게시글이 성공적으로 삭제되었습니다.");
          router.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(deleteBoard);
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

  useEffect(() => {
    getBoardData();
    setCategoryCode(props.categoryCode);
    setBoardId(props.boardId);
  }, []);

  return (
    <React.Fragment>
      <div
        className="boardmodal__bg"
        onClick={() => {
          props.setModal(false);
        }}
      ></div>
      <div className="boardmodal">
        <div className="boardmodal__title">게시글 정보</div>
        <div
          className="boardmodal__x"
          onClick={() => {
            props.setModal(false);
          }}
        >
          <img src="/assets/x-sign.png" alt="close" />
        </div>
        <div className="boardmodal__header">
          <div className="boardmodal__header__info">
            <div className="boardmodal__header__info__title">
              제목 : {data.title}
            </div>
            <div className="boardmodal__header__info__name">
              작성자 : {data.memberNickname}
            </div>
            <div className="boardmodal__header__info__date">
              등록일 : {data.date}
            </div>
          </div>
          <div className="boardmodal__header__count">
            <span className="boardmodal__header__count__view">
              조회수 : {data.view}
            </span>
            <span className="boardmodal__header__count__like">
              추천수 : {data.like}
            </span>
            {!data.isDeleted && (
              <React.Fragment>
                {data.isFixed ? (
                  <button
                    type="button"
                    className="boardmodal__delete table__btn"
                    onClick={() => {
                      if (confirm("고정게시물을 취소하시겠습니까?")) {
                        cancelFixedBoard();
                      }
                    }}
                  >
                    고정취소
                  </button>
                ) : (
                  <button
                    type="button"
                    className="boardmodal__delete table__btn"
                    onClick={() => {
                      if (confirm("고정게시물로 등록하시겠습니까?")) {
                        fixedBoard();
                      }
                    }}
                  >
                    고정
                  </button>
                )}
                <button
                  type="button"
                  className="boardmodal__delete table__btn__red"
                  onClick={() => {
                    if (confirm("게시물을 삭제하시겠습니까?")) {
                      deleteBoard();
                    }
                  }}
                >
                  삭제
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
        <div
          className="boardmodal__body"
          dangerouslySetInnerHTML={getContent()}
        ></div>
        <div className="boardmodal__comments">
          <div className="boardmodal__comments__title">댓글</div>
          {comment.length > 0
            ? comment.map((item, index) => {
                return (
                  <BoardModalComment
                    key={`comment-${index}`}
                    content={item.content}
                    date={item.date}
                    depth={item.depth}
                    isDeleted={item.isDeleted}
                    nickname={item.memberNickname}
                    id={item.id}
                  />
                );
              })
            : "등록된 댓글이 없습니다."}
        </div>
      </div>
    </React.Fragment>
  );
}

export default BoardModal;
