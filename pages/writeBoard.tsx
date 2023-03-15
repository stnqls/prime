import React, { useState, useEffect } from "react";
import axios from "axios";
import Lee from "../lib/Lee";
import Router, { useRouter } from "next/router";
import dynamic from "next/dynamic";

import "../styles/pages/writeBoard.scss";

const NewEditor = dynamic(() => import("../components/Editor/NewEditor"), {
  ssr: false,
});

const writeBoard = () => {
  const boardCode = useRouter();
  const boardCategoryCode = boardCode.query.categoryCode;

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData]: any = useState("");
  const [title, setTitle]: any = useState("");
  const [categoryCode, setCategoryCode]: any = useState(boardCategoryCode);
  const [option, setOption]: any = useState(101);
  const [image, setImage] = useState([]);

  const getData = (data: any) => {
    setData(data);
  };
  const getImage = (image: any) => {
    setImage(image);
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    setOption(boardCategoryCode);
  }, [option]);

  useEffect(() => {
    setCategoryCode(boardCategoryCode);
  }, [boardCategoryCode]);

  function submit() {
    if (categoryCode === "101") {
      setCategoryCode("101");
    } else if (categoryCode === "201") {
      if (image.length === 0) {
        alert("1개이상의 이미지파일이 필요합니다.");
      } else {
        setCategoryCode("201");
      }
    } else if (categoryCode === "301") {
      setCategoryCode("301");
    }
    if ((title === "" && data === "") || title === "" || data === "") {
      window.alert("제목 또는 내용을 입력해주세요.");
    } else {
      const headers: any = {
        authorization: window.sessionStorage.getItem("token"),
      };
      axios({
        method: "POST",
        url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/community",
        headers,
        data: {
          title: title,
          content: data,
          categoryCode: categoryCode,
          imageUrlArray: image,
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert("글이 정상적으로 등록되었습니다.");
            Router.back();
          } else {
            if (res.data.errCode === "101") {
              Lee.refreshToken(submit);
            } else {
              alert("서버 통신 중 오류가 발생했습니다.");
            }
          }
        })
        .catch((err) => {
          window.alert("일시적인 오류입니다. 다시 시도해주세요.");
          console.log(err);
        });
    }
  }

  function getValue(value: any) {
    setCategoryCode(value);
  }
  return (
    <div className="writeboard">
      <div className="writeboard__ad">광고</div>
      <div className="writeboard__content">
        <h1 className="writeboard__content__h1">글쓰기</h1>
        <button
          type="button"
          className="writeboard__content__submit"
          onClick={submit}
        >
          등록
        </button>
      </div>
      <input
        type="text"
        className="writeboard__title"
        onChange={(e) => setTitle(e.target.value)}
        maxLength={20}
        placeholder="제목을 입력해주세요."
      />
      {/* <select
        name="board"
        className="writeboard__selectboard"
        id="categoryCodeSelect"
        onChange={(e) => getValue(e.target.value)}
        defaultValue={categoryCode}
      >
        <option value="101">트레이딩</option>
        <option value="201">매매분석법</option>
        <option value="301">자유게시판</option>
      </select> */}
      <NewEditor getData={getData} getImage={getImage} />
    </div>
  );
};

export default writeBoard;
