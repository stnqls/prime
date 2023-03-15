import axios from "axios";
import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import dynamic from "next/dynamic";
import Router from "next/router";

import "./UserReview.scss";
import Pagination from "react-js-pagination";

const UserReviewDetail = dynamic(
  import("../../Review/ReviewDetail/ReviewDetail"),
  { ssr: false }
);

const UserReviewItem = dynamic(import("./UserReviewItem/UserReviewItem"), {
  ssr: false,
});

const UserReview = () => {
  const [reviews, setReviews] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [reviewId, setReviewId] = useState();
  const [reviewIds, setReviewIds] = useState([]);
  const [page, setPage] = useState(1);
  const [item] = useState(5);

  function pageChange(page: any) {
    setPage(page);
  }

  function getReview() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/users/community/reviews`,
      headers,
    })
      .then((res) => {
        if (res.status === 200) {
          setReviews(res.data.data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getReview);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteReview() {
    if (reviewIds.length === 0) {
      alert("삭제할 이용후기를 선택해주세요.");
    } else {
      const headers: any = {
        authorization: window.sessionStorage.getItem("token"),
      };
      axios({
        method: "DELETE",
        url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/reviews",
        headers,
        data: {
          reviewIds: reviewIds,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            alert("리뷰가 성공적으로 삭제되었습니다.");
            Router.reload();
          }
        })
        .catch((err) => {
          alert("오류가 발생했습니다. 다시 시도해 주세요.");
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getReview();
  }, []);

  return (
    <div className="user-review">
      {viewModal && (
        <UserReviewDetail setViewDetail={setViewModal} id={reviewId} />
      )}

      <div className="user-review__title">이용후기</div>
      {reviews && reviews.length > 0 ? (
        <React.Fragment>
          <div
            className="user-review__delete"
            onClick={() => {
              deleteReview();
            }}
          >
            삭제
          </div>
          <table className="user-review__table">
            <thead className="user-review__table__thead">
              <tr className="user-review__table__thead__tr">
                <td></td>
                <td className="user-review__table__thead__package">
                  패키지 이름
                </td>
                <td className="user-review__table__thead__trader">트레이더</td>
                <td className="user-review__table__thead__rate">별점</td>
                <td className="user-review__table__thead__date">등록일</td>
              </tr>
            </thead>
            <tbody className="user-review__table__tbody">
              {reviews
                .slice(item * (page - 1), item * (page - 1) + item)
                .map((review: any, index: number) => {
                  return (
                    <UserReviewItem
                      key={`user-review-${index}`}
                      date={review.date}
                      description={review.description}
                      packageName={review.packageName}
                      rating={review.rating}
                      traderNickname={review.traderNickname}
                      id={review.id}
                      setViewModal={setViewModal}
                      setReviewId={setReviewId}
                      setReviewIds={setReviewIds}
                      reviewIds={reviewIds}
                    />
                  );
                })}
            </tbody>
          </table>
          <Pagination
            totalItemsCount={reviews.length}
            activePage={page}
            onChange={pageChange}
            itemsCountPerPage={item}
            firstPageText={""}
            lastPageText={""}
            nextPageText={""}
            prevPageText={""}
          />
        </React.Fragment>
      ) : (
        <div className="user-review__none">작성한 이용후기가 없습니다.</div>
      )}
    </div>
  );
};

export default UserReview;
