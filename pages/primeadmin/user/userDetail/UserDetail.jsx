import React, { useState, useEffect } from "react";
import axios from "axios";
import Lee from "../../../../lib/Lee";

import ReviewDetail from "./reviewDetail/ReviewDetail";
import SubscribeDetail from "./subscribeDetail/SubscribeDetail";
import BoardDetail from "./boardDetail/BoardDetail";
import CommentDetail from "./commentDetail/CommentDetail";

import "./UserDetail.scss";

function UserDetail(props) {
  const [menu, setMenu] = useState(0);
  const [userReview, setUserReview] = useState([]);
  const [userSubscribe, setUserSubscribe] = useState([]);
  const [userBoards, setUserBoards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userComments, setUserComments] = useState([]);
  // const [data, setData] = useState(userdetail);
  // const menuList = {
  //   0: <ReviewDetail props={data} />,
  //   1: <SubscribeDetail props={data} />,
  // };

  function getUserDetail() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/users/detail?uid=${props.userId}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setUserReview(data.reviews);
          setUserSubscribe(data.subscriptions);
          setUserBoards(data.boards);
          setUserComments(data.replies);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getUserDetail);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("에러");
      });
  }

  let filterReview = userReview.filter((val) => {
    if (searchText == "") {
      return val;
    } else if (
      val.traderNickname.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return val;
    } else if (
      val.packageName.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return val;
    }
  });

  let filterSubscribe = userSubscribe.filter((val) => {
    if (searchText == "") {
      return val;
    } else if (
      val.traderNickname.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return val;
    } else if (
      val.packageName.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return val;
    }
  });

  useEffect(() => {
    if (props.userId) {
      getUserDetail();
    }
  }, [props.userId]);

  return (
    <div className="userdetail">
      <div className="userdetail__content">
        <div className="userdetail__content__header">
          <ul className="userdetail__content__header__title">
            <li
              className={`userdetail__content__header__title__item ${
                menu === 0 ? "active" : ""
              }`}
              onClick={() => {
                setMenu(0);
              }}
            >
              리뷰 내역
            </li>
            <li
              className={`userdetail__content__header__title__item ${
                menu === 1 ? "active" : ""
              }`}
              onClick={() => {
                setMenu(1);
              }}
            >
              구독 내역
            </li>
            <li
              onClick={() => {
                setMenu(2);
              }}
              className={`userdetail__content__header__title__item ${
                menu === 2 ? "active" : ""
              }`}
            >
              게시글 내역
            </li>
            <li
              onClick={() => {
                setMenu(3);
              }}
              className={`userdetail__content__header__title__item ${
                menu === 3 ? "active" : ""
              }`}
            >
              댓글 내역
            </li>
          </ul>
          <div className="userdetail__content__header__search">
            <input
              type="text"
              className="userlist__content__header__search__input"
              placeholder="검색하기"
              value={searchText}
              onChange={function (e) {
                setSearchText(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="userdetail__content__body">
          {menu === 0 && (
            <ReviewDetail
              props={filterReview}
              memberId={filterReview.uid}
              length={userReview.length}
            />
          )}
          {menu === 1 && (
            <SubscribeDetail
              props={filterSubscribe}
              length={userSubscribe.length}
            />
          )}
          {menu === 2 && <BoardDetail props={userBoards} />}
          {menu === 3 && <CommentDetail props={userComments} />}
        </div>
      </div>
    </div>
  );
}
export default UserDetail;
