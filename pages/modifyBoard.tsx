import React, { useState, useEffect } from "react";
import axios from "axios";
import Lee from "../lib/Lee";
import Router, { useRouter } from "next/router";

import "../styles/pages/writeBoard.scss";
import dynamic from "next/dynamic";

const ModifyEditor = dynamic(
  () => import("../components/Editor/ModifyEditor"),
  {
    ssr: false,
  }
);

const modifyBoard = () => {
  const modifyData = useRouter();
  const modifyCategory: any = modifyData.query.categoryCode;
  const modifyBoardId: any = modifyData.query.id;

  const [title, setTitle]: any = useState("");
  const [content, setContent]: any = useState();
  const [image, setImage] = useState([]);

  function getParameterByID(ID: string) {
    ID = ID.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + ID + "=([^&#]*)"),
      results: any = regex.exec(location.search);
    let resultsID = results.input.substring(4, 24);
    return results == null ? "" : resultsID;
  }

  function getParameterByCode(code: string) {
    code = code.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + code + "=([^&#]*)"),
      results: any = regex.exec(location.search);
    let resultsCode = results[1];
    return results == null ? "" : resultsCode;
  }

  function getBoard() {
    const headers: any = {
      authorization: Lee.checkLogin()
        ? window.sessionStorage.getItem("token")
        : "",
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/community/${getParameterByID(
        "categoryCode"
      )}?categoryCode=${getParameterByCode("categoryCode")}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setContent(data.content);
          setTitle(data.title);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getBoard);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해 주세요.");
        console.log(err);
      });
  }

  function modify() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "PATCH",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/community",
      headers,
      data: {
        categoryCode: modifyCategory,
        boardId: modifyBoardId,
        title: title,
        content: content,
        imageUrlArray: image,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setTimeout(() => {
            alert("게시글이 성공적으로 수정되었습니다.");
            Router.back();
          }, 1000);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(modify);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  useEffect(() => {
    getBoard();
  }, []);

  function getContent(data: any) {
    setContent(data);
  }
  const getImage = (image: any) => {
    setImage(image);
  };
  return (
    <div className="writeboard">
      <div className="writeboard__content">
        <h1 className="writeboard__content__h1">글쓰기</h1>
        <button
          type="button"
          className="writeboard__content__submit"
          onClick={() => modify()}
        >
          수정
        </button>
      </div>
      <input
        type="text"
        className="writeboard__title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select name="board" className="writeboard__selectboard" disabled>
        <option value="101" className="writeboard__selectboard__option">
          트레이딩
        </option>
        <option value="201" className="writeboard__selectboard__option">
          매매분석법
        </option>
        <option value="301" className="writeboard__selectboard__option">
          자유게시판
        </option>
      </select>
      <ModifyEditor
        data={content}
        getContent={getContent}
        getImage={getImage}
      />
    </div>
  );
};

export default modifyBoard;
