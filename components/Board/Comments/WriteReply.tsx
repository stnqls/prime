import { useEffect, useState } from "react";
import axios from "axios";
import Lee from "../../../lib/Lee";
import router from "next/router";

import "./WriteReply.scss";

const WriteReply = (props: any) => {
  const [text, setText]: any = useState();
  const [nickname, setNickname]: any = useState();

  function writeReply() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "POST",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/community/reply",
      headers,
      data: {
        categoryCode: props.props.categoryCode,
        boardId: props.props.boardId,
        content: text,
        bundleId: props.props.bundleId,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("정상적으로 등록되었습니다.");
          setText(" ");
          router.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(writeReply);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("서버 통신 중 오류가 발생했습니다.");
      });
  }

  function content(text: any) {
    setText(text);
  }

  useEffect(() => {
    content;
  }, [text]);

  useEffect(() => {
    setNickname(window.sessionStorage.getItem("nickname"));
  }, []);

  return (
    <div className="reply__write">
      <div className="reply__write__box">
        <div className="reply__write__box__name">{nickname}</div>
        {/* <span
          id="textarea"
          role="textbox"
          className="reply__write__box__text"
          contentEditable
        ></span> */}
        <textarea
          role="textbox"
          className="reply__write__box__text"
          placeholder="내용을 입력하세요"
          onChange={(e) => content(e.target.value)}
        ></textarea>
        <button
          type="button"
          className="reply__write__box__submit"
          onClick={() => writeReply()}
        >
          등록
        </button>
      </div>
      <textarea
        role="textbox"
        className="reply__write__mtext"
        placeholder="내용을 입력하세요"
        onChange={(e) => content(e.target.value)}
      ></textarea>
      <button
        type="button"
        className="reply__write__msubmit"
        onClick={() => writeReply()}
      >
        등록
      </button>
    </div>
  );
};

export default WriteReply;
