import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Router from "next/router";
import axios from "axios";
import Head from "next/head";
import Lee from "../lib/Lee";

import "../styles/pages/Inquiry.scss";

const Inquiry: NextPage = () => {
  const [count, setCount] = useState(0);
  const [required, setRequired] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const phoneRef: any = useRef();
  const [login, setLogin] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [uploadFile, setUploadFile] = useState([]);
  let [imageUrl, setImageUrl] = useState([]);

  function counting() {
    let textArea: any = document.querySelector(
      ".inquiry__form__content__text__input"
    );
    const output: any = document.querySelector(
      ".inquiry__form__content__text__count__result"
    );
    textArea.addEventListener("input", count);
    function count(e: any) {
      textArea = e.target;
      const num = textArea.textLength;
      output.value = num;
    }
    setCount(output.value);
  }

  function change() {
    const requiredInput: any = document.querySelectorAll(".requiredInput");

    counting();
    for (let i = 0; i < requiredInput.length; i++) {
      if (
        requiredInput[i].value !== undefined &&
        requiredInput[i].value.length >= 1
      ) {
        if (i === requiredInput.length - 1) {
          setRequired(false);
        }
        continue;
      } else {
        setRequired(true);
        break;
      }
    }
  }

  // function checkEmail() {
  //   const checkEmail =
  //     /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  //   if (email !== null) {
  //     if (checkEmail.test(email) === true) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // }

  // function handlePhone(e: any) {
  //   const value = phoneRef.current.value.replace(/\D+/g, "");
  //   const numberLength = 11;

  //   let result;
  //   result = "";

  //   for (let i = 0; i < value.length && i < numberLength; i++) {
  //     switch (i) {
  //       case 3:
  //         result += "-";
  //         break;
  //       case 7:
  //         result += "-";
  //         break;
  //       default:
  //         break;
  //     }
  //     result += value[i];
  //   }
  //   phoneRef.current.value = result;
  //   setPhone(e.target.value);
  // }

  function upload(e: React.ChangeEvent<any>) {
    if (e.target.files[0]) {
      if (e.target.files[0].size > 1 * 1024 * 1024) {
        alert("이미지 파일 용량이 너무 큽니다. (1mb 아래만 허용됩니다.)");
        e.target.value = "";
      } else {
        // const file: any = URL.createObjectURL(e.target.files[0]);
        uploadStorage(e.target.files[0]);
      }
    }
  }

  function uploadStorage(file: any) {
    let formData = new FormData();
    formData.append("inquiry", file);
    const uid: any = window.sessionStorage.getItem("uid");

    axios
      .post(
        "https://us-central1-prime-investment-web.cloudfunctions.net/api/storage/upload/inquiry",
        formData,
        {
          headers: {
            uid: uid,
          },
        }
      )
      .then((res) => {
        const imgFile = res.data.data;
        imageUrl = imageUrl.concat(imgFile);
        setImageUrl(imageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function writeInquiry() {
    if (categoryCode === "") {
      alert("문의 유형을 선택해 주세요.");
    } else {
      const headers: any = {
        ...(window.sessionStorage.getItem("token") && {
          authorization: window.sessionStorage.getItem("token"),
        }),
      };
      axios({
        method: "POST",
        url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/customers/inquiry",
        headers,
        data: {
          categoryCode: categoryCode,
          name: name,
          email: email,
          phoneNumber: phone,
          title: title,
          content: content,
          imageUrl: imageUrl,
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert("정상적으로 등록되었습니다.");
            Router.reload();
          } else {
            if (res.data.errCode == "101") {
              Lee.refreshToken(writeInquiry);
            } else {
              alert("서버통신 중 오류가 발생했습니다.");
            }
          }
        })
        .catch((err) => {
          alert("일시적인 오류입니다. 다시 시도해주세요.");
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (Lee.checkLogin()) {
      setLogin(true);
      const email: any = window.sessionStorage.getItem("email");
      const nickname: any = window.sessionStorage.getItem("nickname");
      const phone: any = window.sessionStorage.getItem("phone");
      setEmail(email);
      setName(nickname);
      setPhone(phone);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div className="inquiry">
      <Head>
        <title>프라임 인베스트먼트 | 1:1문의</title>
      </Head>
      <div className="inquiry__ad">광고</div>

      <ul className="inquiry__category">
        <li
          className="inquiry__category__item"
          onClick={() => {
            Router.push("/faq");
          }}
        >
          FAQ
        </li>
        <li
          className="inquiry__category__item--click"
          onClick={() => {
            Router.push("/Inquiry");
          }}
        >
          1:1문의
        </li>
        <li
          className="inquiry__category__item"
          onClick={() => {
            Router.push("/notice");
          }}
        >
          공지사항
        </li>
      </ul>

      <div className="inquiry__description">
        <div className="inquiry__description__title">
          1:1 문의로 빠른 답변과 응대 해드리겠습니다.
        </div>
        <ul className="inquiry__description__subtitle">
          <li className="inquiry__description__subtitle__item">
            &#183;업무시간 내 작성하시면 처리 현황을 확인하실 수 있습니다.
          </li>
          <li className="inquiry__description__subtitle__item">
            &#183;주말 및 공휴일에 보내주신 문의 메일은 운영시간 내 순차적으로
            신속하게 답변해드리도록 하겠습니다.
          </li>
        </ul>
      </div>

      <div className="inquiry__necessary">
        *입력 항목은 필수 입력 항목입니다.
      </div>

      <div className="inquiry__form">
        <div className="inquiry__form__userinfo">
          <div className="inquiry__form__userinfo__name">
            <span className="inquiry__form__category">이름*</span>
            <input
              type="text"
              className="inquiry__form__userinfo__input requiredInput"
              defaultValue={name}
              onKeyUp={() => change()}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="inquiry__form__userinfo__email">
            <span className="inquiry__form__category">이메일*</span>
            <input
              type="text"
              className="inquiry__form__userinfo__input requiredInput"
              onKeyUp={() => change()}
              defaultValue={email}
              onChange={(e: any) => {
                let mail = e.target.value;
                setEmail(mail);
              }}
            />
          </div>
          <div className="inquiry__form__userinfo__phone">
            <span className="inquiry__form__category">연락처*</span>
            <input
              type="text"
              className="inquiry__form__userinfo__input requiredInput"
              defaultValue={phone}
              onKeyUp={() => change()}
              maxLength={13}
              onChange={(e) => Lee.handlePhone(phoneRef, e)}
              placeholder="010부터 입력해주세요"
              ref={phoneRef}
            />
          </div>
        </div>
        <div className="inquiry__form__content">
          <div className="inquiry__form__content__category">
            <span className="inquiry__form__category">문의 유형*</span>
            <label className="inquiry__form__content__category__item requiredInput">
              <input
                type="radio"
                name="inquiry-radio"
                id="201"
                onChange={(e: any) => {
                  setCategoryCode(e.target.id);
                }}
              />
              <span></span>
              <label htmlFor="201">일반회원 이용 불편 및 문의</label>
            </label>

            <label className="inquiry__form__content__category__item requiredInput">
              <input
                type="radio"
                name="inquiry-radio"
                id="202"
                onChange={(e: any) => {
                  setCategoryCode(e.target.id);
                }}
              />
              <span></span>
              <label htmlFor="202">트레이더 회원 이용 불편 및 문의</label>
            </label>

            <select
              name=""
              id=""
              className="inquiry__form__content__category__mlist"
            >
              <option value="">일반회원 이용 불편 및 문의</option>
              <option value="">트레이더회원 이용 불편 및 문의</option>
            </select>
          </div>

          <div className="inquiry__form__content__title">
            <span className="inquiry__form__category">제목*</span>
            <input
              type="text"
              className="inquiry__form__content__title__input requiredInput"
              placeholder="제목을 입력해 주세요"
              maxLength={30}
              onKeyUp={() => change()}
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="inquiry__form__content__text">
            <span className="inquiry__form__category">내용*</span>
            <textarea
              className="inquiry__form__content__text__input requiredInput"
              placeholder="내용을 입력해 주세요"
              onKeyUp={() => change()}
              onChange={(e: any) => setContent(e.target.value)}
            ></textarea>
            <p className="inquiry__form__content__text__count">
              (
              <output className="inquiry__form__content__text__count__result">
                {count}
              </output>
              /1,000)
            </p>
          </div>
        </div>

        <div className="inquiry__form__file">
          <div className="inquiry__form__file__btn">
            <img
              src="/assets/upload.png"
              alt="imgUpload"
              className="inquiry__form__file__btn__mimg"
            />
            <label htmlFor="file">파일첨부</label>
            <input
              type="file"
              id="file"
              multiple={true}
              onChange={(e) => {
                if (uploadFile.length > 2) {
                  alert("파일은 3개까지 등록 가능합니다.");
                } else {
                  let FileName: any = e.target.value;
                  setUploadFile(uploadFile.concat(FileName));
                  upload(e);
                }
              }}
            />
          </div>
          <div className="inquiry__form__file__des">
            *JPG, GIF, PNG, BMP 파일 3개까지 등록 가능합니다. (5MB 미만)
          </div>
        </div>
        <ul className="inquiry__form__file__file-name">
          {uploadFile.map((file: any, index: number) => (
            <li
              className="inquiry__form__file__file-name__item"
              key={`inquiry-file-list-${index}`}
            >
              {file}
            </li>
          ))}
        </ul>
      </div>

      <div className="inquiry__footer">
        <h1 className="inquiry__footer__title">
          개인정보 수집 및 이용 안내 동의
        </h1>
        <ul className="inquiry__footer__desc">
          <li className="inquiry__footer__desc__item">
            &#183; 수집 목적: 고객센터 1:1문의 상담을 위한 정보 수집 및 이용
          </li>
          <li className="inquiry__footer__desc__item">
            &#183; 기타 : 동의를 거부할 수 있으며, 동의 거부시 1:1 고객문의를
            하실 수 없습니다. <br />
            <blockquote>
              기타 개인 정보처리에 관한 사항은 프라임인베스트먼트 홈페이지
              "개인정보 처리방침"을 참조하십시오.
            </blockquote>
          </li>
          <li
            className="inquiry__footer__desc__item"
            onClick={() => {
              setIsChecked(!isChecked);
            }}
          >
            <img
              src={isChecked ? "/assets/check.png" : "/assets/check_x.png"}
              alt="check"
            />
            개인정보 수집 및 이용에 동의합니다.
          </li>
        </ul>
      </div>
      <button
        type="button"
        className={required ? "inquiry__btn inquiry__btn--on" : "inquiry__btn "}
        onClick={() => {
          if (required) {
            if (Lee.checkEmail(email)) {
              writeInquiry();
            } else {
              alert("이메일 형식이 올바르지 않습니다.");
            }
          } else {
            alert("빈칸을 채워주세요.");
          }
        }}
      >
        등록
      </button>
    </div>
  );
};

export default Inquiry;
