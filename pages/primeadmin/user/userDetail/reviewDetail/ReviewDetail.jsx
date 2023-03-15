import React, { useState } from "react";
import Pagination from "react-js-pagination";
import dynamic from "next/dynamic";

import ReviewDetailItem from "./ReviewDetailItem";
import "./ReviewDetail.scss";

const Review = dynamic(import("../../../modal/Review"), { ssr: false });

function ReviewDetail(props) {
  let data = props.props;
  let length = props.length;

  const [reviewModal, setReviewModal] = useState();
  const [detail, setDetail] = useState({});
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);

  const getReviewModal = (modal) => {
    setReviewModal(modal);
  };

  const getDetail = (props) => {
    setDetail(props);
  };

  function pageChange(page) {
    setPage(page);
  }

  return (
    <React.Fragment>
      {reviewModal && (
        <Review
          getReviewModal={getReviewModal}
          data={detail}
          memberId={props.memberId}
        />
      )}
      {data && data.length > 0 ? (
        <table className="reviewdetail">
          <thead className="reviewdetail__thead">
            <tr className="reviewdetail__thead__tr">
              <td className="reviewdetail__thead__tr__tradernickname">
                트레이더 닉네임
              </td>
              <td className="reviewdetail__thead__tr__package"> 패키지명</td>
              <td className="reviewdetail__thead__tr__traderuid">
                트레이더UID
              </td>
              <td className="reviewdetail__thead__tr__rating">평점</td>
              <td className="reviewdetail__thead__tr__date">작성일</td>
              <td className="reviewdetail__thead__tr__more">상세보기</td>
            </tr>
          </thead>
          <tbody className="reviewdetail__tbody">
            {data
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((index, number) => (
                <tr
                  className="reviewdetail__tbody__tr"
                  key={`user-review-${number}`}
                >
                  <ReviewDetailItem
                    getReviewModal={getReviewModal}
                    getDetail={getDetail}
                    traderNickname={index.traderNickname}
                    traderId={index.traderId}
                    packageName={index.packageName}
                    reviewRating={index.reviewRating}
                    reviewDate={index.reviewDate}
                    reviewDescription={index.reviewDescription}
                    reviewId={index.reviewId}
                    subscriptionId={index.subscriptionId}
                  />
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="reviewdetail__none">작성한 리뷰가 없습니다.</div>
      )}
      {data && data.length > 0 && (
        <Pagination
          totalItemsCount={length}
          activePage={page}
          onChange={pageChange}
          itemsCountPerPage={item}
          firstPageText={""}
          lastPageText={""}
          prevPageText={""} //이전을 나타낼 텍스트
          nextPageText={""} //다음을 나타낼 텍스트
        />
      )}
    </React.Fragment>
  );
}

export default ReviewDetail;
