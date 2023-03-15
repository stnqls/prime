import axios from "axios";
import { useEffect, useState } from "react";
import router from "next/router";
import Lee from "../../../../lib/Lee";
import ReviewsTable from "./ReviewsTable";

import "./Reviews.scss";
import Pagination from "react-js-pagination";

const Reviews = () => {
  const [menu, setMenu] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewIds, setReviewIds] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  function getReviews(page: number) {
    setPage(page);
    const headers: any = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/reviews`,
      params: {
        search: search,
        page: page,
        isDeleted: menu === 0 ? false : true,
      },
      headers,
    })
      .then((res) => {
        if (res.status === 200) {
          setReviews(res.data.data.reviews);
          setTotalPage(res.data.data.totalReviewCnt);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getReviews);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteReviews() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "DELETE",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/reviews",
      headers,
      data: {
        reviewIds: reviewIds,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("이용후기가 성공적으로 삭제되었습니다.");
          router.reload();
        }
      })
      .catch((err) => {
        alert("에러가 발생했습니다.");
      });
  }

  useEffect(() => {
    getReviews(1);
    setPage(1);
  }, [search, menu]);

  return (
    <div className="admin-reviews">
      <div className="admin-reviews__content">
        <div className="admin-reviews__content__header">
          <ul className="admin-reviews__content__header__menu">
            <li
              className={`admin-reviews__content__header__menu__item${
                menu === 0 ? "--click" : ""
              }`}
              onClick={() => {
                setMenu(0);
              }}
            >
              전체보기
            </li>
            <li
              className={`admin-reviews__content__header__menu__item${
                menu === 1 ? "--click" : ""
              }`}
              onClick={() => {
                setMenu(1);
              }}
            >
              삭제된리뷰보기
            </li>
          </ul>
          <div className="admin-reviews__content__header__search">
            {menu === 0 && (
              <>
                <button
                  className="admin-reviews__content__header__search__delete"
                  onClick={() => {
                    deleteReviews();
                  }}
                >
                  삭제하기
                </button>
                <input
                  type="text"
                  className="admin-reviews__content__header__search__input"
                  placeholder="검색어를 입력하세요"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </>
            )}
          </div>
        </div>
        <div className="admin-reviews__content__body">
          <ReviewsTable
            menu={menu}
            reviews={reviews}
            setReviewIds={setReviewIds}
            reviewIds={reviewIds}
          />
        </div>
        <Pagination
          totalItemsCount={totalPage}
          onChange={getReviews}
          activePage={page}
          firstPageText={""}
          lastPageText={""}
          nextPageText={""}
          prevPageText={""}
        />
      </div>
    </div>
  );
};

export default Reviews;
