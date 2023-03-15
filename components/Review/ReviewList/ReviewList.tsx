import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import Pagination from "react-js-pagination";
import axios from "axios";
import router, { useRouter } from "next/router";

import ReviewListItem from "./ReviewListItem/ReviewListItem";
import "./ReviewList.scss";

const ReviewList = () => {
  const query = useRouter();
  const [traderId, setTraderId] = useState(query.query.search);
  const [traderNickname]: any = useState(query.query.name);

  const [reviews, setReviews]: any = useState([]);
  const [totalReview, setTotalReview] = useState(0);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(8);
  const [sortStatus, setSortStatus] = useState("");

  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [searchWord, setSearchWord]: any = useState([]);
  let filterSearchWord: Array<string> = [""];

  function getReviews(page: any) {
    setPage(page);

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews?search=${search}&page=${page}&sort=${sortStatus}`,
    })
      .then((res) => {
        if (res.data.success) {
          setReviews(res.data.data.reviews);
          setTotalReview(res.data.data.totalReviewCnt);
        } else {
          alert("서버 통신 중 오류가 발생했습니다.");
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  // 자동완성 데이터 가져오기
  function getSearchWord() {
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews/search-word",
    })
      .then((res) => {
        if (res.data.success) {
          setSearchWord(res.data.data);
        } else {
          alert("서버통신중 오류가 발생했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("오류가 발생했습니다.");
      });
  }
  // 자동완성 목록 필터링하기
  filterSearchWord = searchWord.filter((i: any) => {
    if (inputText === "") {
      return "";
    } else if (i.toLowerCase().includes(inputText.toLowerCase())) {
      return i;
    }
  });

  useEffect(() => {
    getReviews(1);
  }, [sortStatus, search]);

  useEffect(() => {
    selectSort(1);
    getSearchWord();
    if (traderId !== undefined) {
      setSearch(traderNickname);
      setTraderId(traderId);
    }
  }, []);

  useEffect(() => {
    if (!query.query.search) {
      setSearch("");
    }
    if (!traderId) {
      setTraderId("");
    }
  }, [query.asPath]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const selectSort = (target: number) => {
    const items = Lee.gets("review-list__contents__search__sort__list");
    const item = Lee.get(`sort${target}`);

    for (let i = 0; i < items.length; i++) {
      Lee.removeClass(items[i], "selected");
    }

    Lee.addClass(item, "selected");
  };

  return (
    <div className="review-list parents" id="ReviewList">
      <div className="review-list__contents parents">
        <div className="review-list__contents__title">
          <span>{totalReview}개</span>의 생생한 후기를 만나보세요
        </div>
        <div className="review-list__contents__mtitle">Traders Reviews</div>
        <div className="review-list__contents__msubtitle">
          프라임 멤버의 생생한 후기를 만나보세요
        </div>
        <div className="review-list__contents__search">
          <ul className="review-list__contents__search__sort">
            <li
              className="review-list__contents__search__sort__list"
              id="sort1"
              onClick={function () {
                selectSort(1);
                setSortStatus("");
              }}
            >
              최신순
            </li>
            <li
              className="review-list__contents__search__sort__list"
              id="sort2"
              onClick={function () {
                selectSort(2);
                setSortStatus("ratingDesc");
              }}
            >
              별점 높은순
            </li>
            <li
              className="review-list__contents__search__sort__list"
              id="sort3"
              onClick={function () {
                selectSort(3);
                setSortStatus("ratingAsc");
              }}
            >
              별점 낮은순
            </li>
          </ul>
          <div className="review-list__contents__search__text">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              defaultValue={traderId !== "" ? traderNickname : ""}
              className="review-list__contents__search__text__input"
              onChange={(e) => {
                let text = e.target.value;
                setInputText(text);
              }}
              onKeyPress={(e) => {
                e.key == "Enter" ? setSearch(inputText) : "";
              }}
            />
            <img
              src="/assets/search-g.png"
              alt="search"
              className="review-list__contents__search__text__input__icon"
              onClick={() => {
                setSearch(inputText);
              }}
            />
          </div>
        </div>
        <ul className={"review-list__contents__search__word"}>
          {filterSearchWord.map((item: string, index: number) => {
            if (index < 3) {
              return (
                <li
                  className="review-list__contents__search__word__item"
                  key={`review-search-list-${index}`}
                  onClick={() => {
                    setSearch(item.trim());
                  }}
                >
                  <div className="review-list__contents__search__word__item__img">
                    <img src="/assets/search-w.png" alt="search" />
                  </div>
                  <span>{item}</span>
                </li>
              );
            }
          })}
        </ul>
        <ul className="review-list__contents__lists">
          {reviews && reviews.length > 0 ? (
            reviews.map((review: any, idx: number) => {
              return (
                <ReviewListItem
                  key={`total-reviews-${idx}`}
                  memberNickname={review.memberNickname}
                  memberAvatar={review.memberAvatar}
                  traderId={review.traderId}
                  traderNickname={review.traderNickname}
                  traderAvatar={review.traderAvatar}
                  rating={review.rating}
                  description={review.description}
                  date={review.date}
                  packageName={review.packageName}
                  id={review.id}
                />
              );
            })
          ) : (
            <div className="review-list__contents__lists__null">
              이용후기가 존재하지 않습니다.
            </div>
          )}
        </ul>
      </div>
      {reviews && totalReview > 0 && (
        <Pagination
          totalItemsCount={totalReview}
          activePage={page}
          onChange={getReviews}
          itemsCountPerPage={item}
          firstPageText={""}
          lastPageText={""}
          nextPageText={""}
          prevPageText={""}
        />
      )}
    </div>
  );
};

export default ReviewList;
