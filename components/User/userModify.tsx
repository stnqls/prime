import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Lee from "../../lib/Lee";
import DelayLink from "../../lib/DelayLink";
import Router from "next/router";
import axios from "axios";

import "./userModify.scss";

const WithdrawModal = dynamic(import("./withdraw"), { ssr: false });

const UserModify: NextPage = () => {
  const [login, setLogin] = useState(false);
  const [nickname, setNickname]: any = useState();
  const [originalname, setOriginalname]: any = useState();
  const [changenickname, setChangenickname]: any = useState();
  const [avatar, setAvatar]: any = useState();
  const [email, setEmail]: any = useState();
  const [phone, setPhone]: any = useState("01012345678");
  const [name, setName]: any = useState("성함");
  const [introduce, setIntroduce]: any = useState();
  const [check, setCheck]: any = useState(false);
  const [isTrader, setIsTrader] = useState(false);
  const [tag, setTag]: any = useState("");
  const [tagArr, setTagArr]: any = useState([]);
  const [newtags, setNewtags]: any = useState([]);
  const [withdraw, setWithdraw] = useState(false);

  function getUserInfo() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/users`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setIntroduce(data.profIntroduction);
          setName(data.name);
          setPhone(data.phoneNumber);
          setTagArr(data.tags);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getUserInfo);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
        setCheck(false);
      });
  }

  useEffect(() => {
    if (Lee.checkLogin()) {
      setLogin(true);
      getUserInfo();
      setNickname(window.sessionStorage.getItem("nickname"));
      setOriginalname(window.sessionStorage.getItem("nickname"));
      setChangenickname(window.sessionStorage.getItem("nickname"));
      setEmail(window.sessionStorage.getItem("email"));
      setAvatar(window.sessionStorage.getItem("avatar"));
      if (window.sessionStorage.getItem("role") === "trader") {
        setIsTrader(true);
      }
    } else {
      alert("로그인이 필요합니다.");
      Router.push("/login");
    }
  }, []);

  let loginAnimationIndex = 0;

  function openModifyAvatar() {
    const modifyAvatar = Lee.get("ModifyAvatar");
    // document.body.style.overflow = "hidden";
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    if (loginAnimationIndex === 0) {
      loginAnimationIndex = 1;
      Lee.addClass(modifyAvatar, "active");
      setTimeout(() => {
        loginAnimationIndex = 0;
      }, 1000);
    }
  }

  // 아바타 선택창 닫기
  function closeModifyAvatar() {
    let registrationAvatarArea = Lee.get("ModifyAvatar");
    Lee.removeClass(registrationAvatarArea, "active");
    // document.body.style.overflow = "unset";
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  }

  // 아바타 선택시 함수
  function chooseAvatar(target: String) {
    const path: any = `/images/avatars/Memoji-${target}.png`;
    const userAvatar: HTMLImageElement = Lee.get(
      "userAvatar"
    ) as HTMLImageElement;
    userAvatar.src = path;
    setAvatar(path);
    closeModifyAvatar();
  }

  // 아바타 이미지 업로드
  function uploadAvatar(e: React.ChangeEvent<any>) {
    const userAvatar: HTMLImageElement = Lee.get(
      "userAvatar"
    ) as HTMLImageElement;
    if (e.target.files[0]) {
      if (e.target.files[0].size > 1 * 1024 * 1024) {
        alert("이미지 파일 용량이 너무 큽니다. (1mb 아래만 허용됩니다.)");
        e.target.value = "";
      } else {
        const file: any = URL.createObjectURL(e.target.files[0]);
        userAvatar.src = file;
        setAvatar(file);
        closeModifyAvatar();
        uploadStorage(e.target.files[0]);
      }
    }
  }

  function uploadStorage(file: any) {
    let formData = new FormData();
    formData.append("avatar", file);

    const uid: any = window.sessionStorage.getItem("uid");

    axios
      .post(
        "https://us-central1-prime-investment-web.cloudfunctions.net/api/storage/upload/avatar",
        formData,
        {
          headers: {
            uid: uid,
          },
        }
      )
      .then((response) => {
        setAvatar(response.data.data);
      })
      .catch((error) => {});
  }

  // 닉네임 예외 검사 및 중복체크
  function checkNickname(nickname: string) {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    setChangenickname(changenickname.trim());

    if (Lee.checkNickname(changenickname)) {
      if (nickname === originalname) {
        alert("기존 닉네임과 동일합니다.");
      } else if (!changenickname) {
        alert("닉네임을 입력해주세요.");
      } else {
        axios({
          method: "GET",
          url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/util/check-redundancy`,
          params: {
            nickname: changenickname.trim(),
          },
          headers,
        })
          .then((res) => {
            if (res.data.success) {
              setNickname(changenickname.trim());
              setCheck(true);
              alert("사용 가능한 닉네임입니다.");
            } else {
              if (res.data.errCode === "101") {
                Lee.refreshToken(setChangenickname);
              } else {
                alert("서버 통신 중 오류가 발생했습니다.");
              }
            }
          })
          .catch((err) => {
            window.alert("일시적인 오류입니다. 다시 시도해주세요.");
          });
      }
    } else {
      alert("허용되지 않는 닉네임입니다.");
    }
  }

  // 유저 정보 변경요청
  function submitNickname(nickname: string) {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    if (name && name !== "") {
      if (Lee.checkPhone(phone)) {
        if (check || changenickname.trim() === originalname) {
          axios({
            method: "PATCH",
            url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/users`,
            data: {
              name: name,
              nickname: nickname,
              profIntroduction: introduce,
              phoneNumber: phone.replace(/\-/g, ""),
              avatar: avatar,
              tags: tagArr,
            },
            headers,
          })
            .then((res) => {
              if (res.data.success) {
                window.sessionStorage.setItem("nickname", nickname);
                window.sessionStorage.setItem("avatar", avatar);
                window.sessionStorage.setItem(
                  "phone",
                  phone.replace(/\-/g, "")
                );
                window.sessionStorage.setItem("tags", JSON.stringify(tagArr));
                alert("회원정보 변경이 성공적으로 완료되었습니다.");

                Lee.loadingStart();

                setTimeout(() => {
                  Router.push("/user?page=userModify");
                }, 400);
              } else {
                if (res.data.errCode === "101") {
                  Lee.refreshToken(submitNickname);
                } else {
                  alert("서버 통신 중 오류가 발생했습니다.");
                }
              }
            })
            .catch((err) => {
              window.alert("일시적인 오류입니다. 다시 시도해주세요.");
            });
        } else {
          alert("닉네임 중복확인 버튼을 눌러주세요.");
        }
      } else {
        alert("올바른 휴대폰 번호를 입력해주세요.");
      }
    } else {
      alert("성함을 입력해주세요.");
    }
  }

  function pushTag(tag: any) {
    if (tagArr.length < 3) {
      if (tag.length > 1) {
        setNewtags(tagArr.push(tag));
      } else {
        alert("한글자 이상 입력하세요.");
      }
    } else {
      alert("태그는 총 3개까지 등록이 가능합니다.");
    }
  }

  useEffect(() => {
    setNewtags(tagArr);
  }, [tagArr]);

  function deleteTag(index: number) {
    setNewtags(tagArr.splice(index, 1));
  }

  return (
    <div className="user-modify">
      <Head>
        <title>프라임 인베스트먼트 | 회원정보</title>
      </Head>
      {login ? (
        <>
          <div id="ModifyAvatar">
            <div className="user-modify__choose__area">
              <div
                className="user-modify__choose__area__fade"
                onClick={closeModifyAvatar}
              />

              <div className="user-modify__choose__area__contents parents">
                <div className="user-modify__choose__area__contents__logo">
                  <img
                    src="/assets/x-sign.png"
                    alt="close"
                    className="user-modify__choose__area__contents__logo__back"
                    onClick={closeModifyAvatar}
                  />
                  아바타를 선택해주세요
                </div>
                <img
                  src="/assets/x-sign.png"
                  className="user-modify__choose__area__contents__close"
                  alt="x"
                  onClick={closeModifyAvatar}
                />
                <div className="user-modify__choose__area__contents__title">
                  원하시는 아바타를 선택해주세요
                </div>
                <div className="user-modify__choose__area__contents__avatars parents">
                  <div className="user-modify__choose__area__contents__avatars__edit">
                    <input
                      type="file"
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      name="avatar"
                      onChange={uploadAvatar}
                    />
                    <label htmlFor="imageUpload"></label>
                    <img src="/assets/upload-circle.png" alt="upload" />
                  </div>
                  <img
                    src="/images/avatars/Memoji-01.png"
                    alt="avatar-1"
                    onClick={function () {
                      chooseAvatar("01");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-02.png"
                    alt="avatar-2"
                    onClick={function () {
                      chooseAvatar("02");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-03.png"
                    alt="avatar-3"
                    onClick={function () {
                      chooseAvatar("03");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-04.png"
                    alt="avatar-4"
                    onClick={function () {
                      chooseAvatar("04");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-05.png"
                    alt="avatar-5"
                    onClick={function () {
                      chooseAvatar("05");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-06.png"
                    alt="avatar-6"
                    onClick={function () {
                      chooseAvatar("06");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-07.png"
                    alt="avatar-7"
                    onClick={function () {
                      chooseAvatar("07");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-08.png"
                    alt="avatar-8"
                    onClick={function () {
                      chooseAvatar("08");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-09.png"
                    alt="avatar-9"
                    onClick={function () {
                      chooseAvatar("09");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-10.png"
                    alt="avatar-10"
                    onClick={function () {
                      chooseAvatar("10");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-11.png"
                    alt="avatar-11"
                    onClick={function () {
                      chooseAvatar("11");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-12.png"
                    alt="avatar-12"
                    onClick={function () {
                      chooseAvatar("12");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-13.png"
                    alt="avatar-13"
                    onClick={function () {
                      chooseAvatar("13");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-14.png"
                    alt="avatar-14"
                    onClick={function () {
                      chooseAvatar("14");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-15.png"
                    alt="avatar-15"
                    onClick={function () {
                      chooseAvatar("15");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-16.png"
                    alt="avatar-16"
                    onClick={function () {
                      chooseAvatar("16");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-17.png"
                    alt="avatar-17"
                    onClick={function () {
                      chooseAvatar("17");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-18.png"
                    alt="avatar-18"
                    onClick={function () {
                      chooseAvatar("18");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-19.png"
                    alt="avatar-19"
                    onClick={function () {
                      chooseAvatar("19");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-20.png"
                    alt="avatar-21"
                    onClick={function () {
                      chooseAvatar("21");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-22.png"
                    alt="avatar-22"
                    onClick={function () {
                      chooseAvatar("22");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-23.png"
                    alt="avatar-23"
                    onClick={function () {
                      chooseAvatar("23");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-24.png"
                    alt="avatar-24"
                    onClick={function () {
                      chooseAvatar("24");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-25.png"
                    alt="avatar-25"
                    onClick={function () {
                      chooseAvatar("25");
                    }}
                  />
                  <img
                    src="/images/avatars/Memoji-26.png"
                    alt="avatar-26"
                    onClick={function () {
                      chooseAvatar("26");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="user-modify__contents">
            <div className="user-modify__contents__box">
              <div className="user-modify__contents__box__avatar">
                <div className="user-modify__contents__box__avatar__edit">
                  <input
                    type="file"
                    id="avatarUpload"
                    accept=".png, .jpg, .jpeg"
                  />
                  <label htmlFor="avatarUpload"></label>
                </div>
                <img
                  src={avatar}
                  alt="avatar"
                  id="userAvatar"
                  // onClick={openModifyAvatar}
                  onClick={function () {
                    // alert("아바타 변경은 추후 도입 예정입니다.");
                    openModifyAvatar();
                  }}
                />
              </div>
              <div className="user-modify__contents__box__subject">
                이메일 (변경불가)
              </div>
              <input
                type="email"
                className="user-modify__contents__box__email"
                value={email}
                disabled
              />
              <div className="user-modify__contents__box__subject">닉네임</div>
              <div className="user-modify__contents__box__nickname parents">
                <input
                  type="text"
                  className="user-modify__contents__box__nickname-input"
                  placeholder="닉네임을 입력주세요."
                  maxLength={8}
                  value={changenickname}
                  onChange={(e) => {
                    setChangenickname(e.target.value);
                    setCheck(false);
                  }}
                />
                <div
                  className="user-modify__contents__box__nickname-button"
                  onClick={function () {
                    checkNickname(changenickname.trim());
                  }}
                >
                  중복확인
                </div>
              </div>
              <div className="user-modify__contents__box__subject">성함</div>
              <input
                type="text"
                className="user-modify__contents__box__name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className="user-modify__contents__box__subject">
                전화번호
              </div>
              <input
                type="tel"
                className="user-modify__contents__box__phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              {isTrader && (
                <>
                  <div className="user-modify__contents__box__subject trader">
                    트레이더 태그 <span>(최대 3개까지 등록이 가능합니다.)</span>
                  </div>
                  <ul className="user-modify__contents__box__tag-list">
                    {tagArr &&
                      tagArr.length > 0 &&
                      tagArr.map((tag: any, index: number) => (
                        <li
                          className="user-modify__contents__box__tag-list__item"
                          key={`trader-tag-${index}`}
                          onClick={() => {
                            deleteTag(index);
                          }}
                        >
                          {tag}
                        </li>
                      ))}
                  </ul>
                  <div className="user-modify__contents__box__tag">
                    <input
                      type="text"
                      className="user-modify__contents__box__tag__input"
                      maxLength={8}
                      placeholder={"최대 8글자까지 입력이 가능합니다."}
                      value={tag}
                      onChange={(e) => {
                        setTag(e.target.value);
                      }}
                    />
                    <button
                      className="user-modify__contents__box__tag__btn"
                      onClick={() => {
                        pushTag(tag);
                        setTag("");
                      }}
                    >
                      추가하기
                    </button>
                  </div>
                  <div className="user-modify__contents__box__subject trader">
                    트레이더 소개글
                  </div>
                  <div className="user-modify__contents__box__introduce">
                    <textarea
                      className="user-modify__contents__box__introduce__textarea"
                      value={introduce}
                      maxLength={1000}
                      onChange={(e) => {
                        setIntroduce(e.target.value);
                      }}
                    />
                  </div>
                </>
              )}
              <div className="user-modify__contents__box__btns">
                <div
                  className="user-modify__contents__box__btns__submit"
                  onClick={function () {
                    submitNickname(nickname);
                  }}
                >
                  변경하기
                </div>
                <div
                  className="user-modify__contents__box__btns__withdraw"
                  onClick={() => {
                    setWithdraw(true);
                  }}
                >
                  탈퇴하기
                </div>
              </div>
            </div>
          </div>
          {withdraw && <WithdrawModal setWithdraw={setWithdraw} />}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserModify;
