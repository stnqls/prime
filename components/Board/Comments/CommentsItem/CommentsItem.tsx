import axios from "axios";
import { useEffect, useState } from "react";
import WriteReply from "../WriteReply";
import Lee from "../../../../lib/Lee";
import router from "next/router";

import "./CommentsItem.scss";

const CommentsItem = (props: any) => {
  const [commentbtn, setCommentbtn] = useState(false);
  const [clicked, setClicked] = useState([false, false, false]);
  const [depth, setDepth]: any = useState();
  const [modify, setModify] = useState(false);
  const [modifyText, setModifyText] = useState("");
  const [login, setLogin] = useState(false);
  const [uid, setUid]: any = useState();
  const replyId = props.replyId;

  function click(index: number) {
    setClicked((i) => ({
      ...i,
      [index]: !i[index],
    }));
  }

  function checkLogin() {
    if (Lee.checkLogin()) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  useEffect(() => {
    if (props.depth === 1) {
      setDepth("--depth");
    } else {
      setDepth("");
    }
    checkLogin();
    setUid(window.sessionStorage.getItem("uid"));
  }, []);

  function modifyComment() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/community/reply/${replyId}`,
      headers,
      data: {
        content: modifyText,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setTimeout(() => {
            alert("댓글이 정상적으로 수정되었습니다.");
            window.location.reload();
            setModify(!modify);
          }, 2000);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(modifyComment);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  function deleteComments() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/community/reply`,
      headers,
      data: {
        replyIds: [replyId],
      },
    })
      .then((res) => {
        if (res.data.success) {
          window.alert("정상적으로 삭제되었습니다.");
          setTimeout(() => {
            router.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해 주세요.");
      });
  }

  return (
    <div className={`comments-item${depth}`}>
      <div className={`comments-item${depth}__read`}>
        <div className={`comments-item${depth}__read__name`}>
          <img
            src="/assets/comment.png"
            alt="comments"
            className={`comments-item${depth}__read__name__icon`}
          />
          {props.memberNickname}
        </div>
        {modify ? (
          <div className={`comments-item${depth}__read__text`}>
            <textarea
              className={`comments-item${depth}__read__text__textarea`}
              onChange={(e) => setModifyText(e.target.value)}
              defaultValue={props.content}
            ></textarea>
            <button
              type="button"
              className={`comments-item${depth}__read__text__textarea__btn`}
              onClick={() => modifyComment()}
            >
              완료
            </button>
          </div>
        ) : (
          <div
            className={`comments-item${depth}__read__text ${
              props.isDeleted ? "deleted" : ""
            }`}
          >
            {props.isDeleted ? "삭제된 댓글입니다." : props.content}
          </div>
        )}
      </div>
      <div className={`comments-item${depth}__buttons`}>
        <div className={`comments-item${depth}__buttons__date`}>
          {props.date}
        </div>
        <ul className={`comments-item${depth}__buttons__list`}>
          {login
            ? !props.isDeleted && (
                <li
                  className={
                    clicked[0]
                      ? `comments-item${depth}__buttons__list__item--active ${depth}reply`
                      : `comments-item${depth}__buttons__list__item ${depth}reply`
                  }
                  onClick={() => {
                    if (Lee.checkLogin()) {
                      setCommentbtn(!commentbtn);
                      click(0);
                    } else {
                      alert("로그인 후 이용할 수 있습니다.");
                    }
                  }}
                >
                  댓글
                </li>
              )
            : null}
          {/* <li
            className={
              clicked[1]
                ? `comments-item${depth}__buttons__list__item--active ${depth}reply1`
                : `comments-item${depth}__buttons__list__item ${depth}reply1`
            }
            onClick={() => {
              click(1);
            }}
          >
            추천
          </li>
          <li
            className={
              clicked[2]
                ? `comments-item${depth}__buttons__list__item--active`
                : `comments-item${depth}__buttons__list__item`
            }
            onClick={() => {
              click(2);
            }}
          >
            신고
          </li> */}
          {props.isMyReply && (
            <>
              <li
                className={`comments-item${depth}__buttons__list__item`}
                onClick={() => {
                  if (Lee.checkLogin()) {
                    setModify(!modify);
                  } else {
                    alert("로그인 후 이용할 수 있습니다.");
                  }
                }}
              >
                수정
              </li>
              <li
                className={`comments-item${depth}__buttons__list__item`}
                onClick={() => {
                  if (Lee.checkLogin()) {
                    deleteComments();
                  } else {
                    alert("로그인 후 이용할 수 있습니다.");
                  }
                }}
              >
                삭제
              </li>
            </>
          )}
        </ul>
      </div>
      {commentbtn ? (
        <div className="comments-item__inner">
          <WriteReply props={props} />
        </div>
      ) : null}
    </div>
  );
};

export default CommentsItem;
