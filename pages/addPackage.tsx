import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";
import Router from "next/router";
import axios from "axios";

import "../styles/pages/addPackage.scss";

const AddPackage = (props: any) => {
  const [nickname, setNickname]: any = useState();
  const [packageName, setPackageName]: any = useState();
  const [price, setPrice]: any = useState();
  const [packageDescription, setPackageDescription]: any = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setNickname(window.sessionStorage.getItem("nickname"));
  }, []);

  function addPackage() {
    if (nickname && packageName && price > 0 && packageDescription) {
      const headers: any = {
        authorization: window.sessionStorage.getItem("token"),
      };

      axios({
        method: "POST",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/packages`,
        headers,
        data: {
          packageName: packageName,
          packageDescription: packageDescription,
          price: price,
          thumbnail:
            "https://images.pexels.com/photos/8370331/pexels-photo-8370331.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        },
      })
        .then((res) => {
          if (res.data.success) {
            Lee.loadingStart();
            props.setViewModal(false);
            Router.reload();
            window.alert("패키지가 정상적으로 등록되었습니다.");
          } else {
            if (res.data.errCode === "101") {
              Lee.refreshToken(addPackage);
            } else if (res.data.errCode === "205") {
              alert("패키지설명은 최대 1,000자까지 입력이 가능합니다.");
            } else {
              alert("서버 통신 중 오류가 발생했습니다.");
            }
          }
        })
        .catch((err) => {
          window.alert("일시적인 오류입니다. 다시 시도해주세요.");
        });
    } else {
      alert("모든 항목을 입력해주시기 바랍니다.");
    }
  }

  function counting() {
    let textArea: any = document.querySelector(
      ".add-package__contents__input__package-description"
    );
    const output: any = document.querySelector(
      ".add-package__contents__input__count__number"
    );
    textArea.addEventListener("input", count);
    function count(e: any) {
      textArea = e.target;
      const num = textArea.textLength;
      output.value = num;
    }
    setCount(output.value);
  }

  return (
    <React.Fragment>
      <div
        className="add-package__hide"
        onClick={() => {
          props.setViewModal(false);
        }}
      ></div>
      <div className="add-package">
        <img
          src="/assets/x-sign.png"
          alt="close"
          className="add-package__close"
          onClick={() => {
            props.setViewModal(false);
          }}
        />
        <div className="add-package__contents">
          <div className="add-package__contents__title">등록하기</div>
          <div className="add-package__contents__subtitle">
            * 등록 후 패키지 이름과 패키지 설명은 변경이 불가능 합니다.
          </div>
          <div className="add-package__contents__input">
            <div className="add-package__contents__input__subject">금액</div>
            <input
              type="number"
              className="add-package__contents__input__price"
              placeholder="200,000"
              id="PriceInput"
              pattern="0-100000000"
              defaultValue={price}
              onChange={function (e) {
                setPrice(e.target.value);
              }}
            />
            <span>KRW</span>
          </div>
          <div className="add-package__contents__input">
            <div className="add-package__contents__input__subject">
              패키지이름
            </div>
            <input
              type="text"
              className="add-package__contents__input__package-name"
              placeholder="상품이름을 입력해주세요."
              maxLength={10}
              id="PackageNameInput"
              defaultValue={packageName}
              onChange={function (e) {
                setPackageName(e.target.value);
              }}
            />
          </div>
          <div className="add-package__contents__input">
            <div className="add-package__contents__input__subject">
              패키지설명
              <p className="add-package__contents__input__count">
                (
                <output className="add-package__contents__input__count__number">
                  {count}
                </output>
                /1,000)
              </p>
            </div>
            <textarea
              className="add-package__contents__input__package-description"
              placeholder="상품에 대한 설명을 입력해주세요."
              id="PackageDescriptionInput"
              defaultValue={packageDescription}
              maxLength={999}
              onChange={function (e) {
                setPackageDescription(e.target.value);
              }}
              onKeyUp={counting}
            />
          </div>
          <div
            className="add-package__contents__submit"
            onClick={() => {
              if (
                confirm(
                  "등록 후 패키지 이름과 설명은 변경이 불가능 합니다. \n등록하시겠습니까?"
                )
              ) {
                addPackage();
              }
            }}
          >
            등록하기
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddPackage;
