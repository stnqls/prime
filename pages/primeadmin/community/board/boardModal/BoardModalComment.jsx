import axios from "axios";
import React, { useState, useEffect } from "react";
import "./BoardModalComment.scss";

function BoardModalComment(props) {
  const [isDeleted, setIsDeleted] = useState();
  const [depth, setDepth] = useState();

  useEffect(() => {
    if (props.depth === 1) {
      setDepth("--depth");
    } else {
      setDepth("");
    }
    setIsDeleted(props.isDeleted);
  }, []);

  function deleteComment() {
    const id = props.id;
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community/reply`,
      headers,
      data: {
        replyIds: [id],
      },
    })
      .then((res) => {
        if (res.data.success) {
          window.alert("댓글이 성공적으로 삭제되었습니다.");
          setIsDeleted(true);
        }
      })
      .catch((err) => {
        window.alert("오류가 발생하였습니다.");
        console.log(err);
      });
  }

  return (
    <div className={`boardmodalcomment${depth}`}>
      <div className={`boardmodalcomment${depth}__content`}>
        <div className={`boardmodalcomment${depth}__content__info`}>
          <div className={`boardmodalcomment${depth}__content__info__name`}>
            {props.nickname}
            {isDeleted === true ? (
              <span className={isDeleted === true ? `isDeleted` : ``}>
                (삭제된 댓글입니다.)
              </span>
            ) : null}
          </div>
          <div className={`boardmodalcomment${depth}__content__info__date`}>
            {props.date}
          </div>
        </div>

        <div className={`boardmodalcomment${depth}__content__text`}>
          {props.content}
        </div>
        <button
          type="button"
          className={
            isDeleted === true
              ? `boardmodalcomment${depth}__content__delete isDeleted__btn`
              : `boardmodalcomment${depth}__content__delete`
          }
          onClick={() => {
            deleteComment();
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default BoardModalComment;
