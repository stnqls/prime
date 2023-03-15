import dynamic from "next/dynamic";
import React, { useState } from "react";
import "./ReviewsTable.scss";

const ReviewDetail = dynamic(import("../../modal/Review"), { ssr: false });

const ReviewsTable = (props: any) => {
  const review = props.reviews;
  const [reviewModal, setReviewModal] = useState(false);
  const [memberId, setMemberId] = useState();
  const [data, setData] = useState({});

  const getReviewModal = (modal: boolean) => {
    setReviewModal(modal);
  };

  return (
    <React.Fragment>
      {reviewModal && (
        <ReviewDetail
          getReviewModal={getReviewModal}
          memberId={memberId}
          data={data}
          deleteBtn={props.menu === 1 ? true : false}
        />
      )}
      <table className="admin-reviews-table">
        <thead className="admin-reviews-table__thead">
          <tr className="admin-reviews-table__thead__tr">
            {props.menu === 0 && <td></td>}
            <td>패키지 이름</td>
            <td>트레이더 닉네임</td>
            <td>별점</td>
            <td>멤버 닉네임</td>
            <td>등록일</td>
          </tr>
        </thead>

        <tbody className="admin-reviews-table__tbody">
          {review &&
            review.map((item: any, index: number) => (
              <tr
                className="admin-reviews-table__tbody__tr"
                key={`admin-review-${index}`}
              >
                {props.menu === 0 && (
                  <td>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.setReviewIds(props.reviewIds.concat(item.id));
                        } else {
                          props.setReviewIds(
                            props.reviewIds.filter((id: any) => id !== item.id)
                          );
                        }
                      }}
                    />
                  </td>
                )}
                <td
                  onClick={() => {
                    setMemberId(item.memberId);
                    setData({
                      packageName: item.packageName,
                      reviewRating: item.rating,
                      reviewDescription: item.description,
                      reviewId: item.id,
                      subscriptionId: item.subscriptionId,
                    });
                    setReviewModal(true);
                  }}
                >
                  {item.packageName}
                </td>
                <td
                  onClick={() => {
                    setMemberId(item.memberId);
                    setData({
                      packageName: item.packageName,
                      reviewRating: item.rating,
                      reviewDescription: item.description,
                      reviewId: item.id,
                      subscriptionId: item.subscriptionId,
                    });
                    setReviewModal(true);
                  }}
                >
                  {item.traderNickname}
                </td>
                <td
                  onClick={() => {
                    setMemberId(item.memberId);
                    setData({
                      packageName: item.packageName,
                      reviewRating: item.rating,
                      reviewDescription: item.description,
                      reviewId: item.id,
                      subscriptionId: item.subscriptionId,
                    });
                    setReviewModal(true);
                  }}
                >
                  {item.rating}
                </td>
                <td
                  onClick={() => {
                    setMemberId(item.memberId);
                    setData({
                      packageName: item.packageName,
                      reviewRating: item.rating,
                      reviewDescription: item.description,
                      reviewId: item.id,
                      subscriptionId: item.subscriptionId,
                    });
                    setReviewModal(true);
                  }}
                >
                  {item.memberNickname}
                </td>
                <td
                  onClick={() => {
                    setMemberId(item.memberId);
                    setData({
                      packageName: item.packageName,
                      reviewRating: item.rating,
                      reviewDescription: item.description,
                      reviewId: item.id,
                      subscriptionId: item.subscriptionId,
                    });
                    setReviewModal(true);
                  }}
                >
                  {item.date}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ReviewsTable;
