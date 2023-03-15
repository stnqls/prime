import React, { useState } from "react";

function ReviewDetailItem(props) {
  const [modal, setModal] = useState(true);
  const showModal = () => {
    setModal(true);
    props.getReviewModal(modal);
  };

  let packagename = props.packageName;
  let rating = props.reviewRating;
  let description = props.reviewDescription;
  let memberId = props.memberId;
  let reviewId = props.reviewId;
  let subscriptionId = props.subscriptionId;
  const setDetail = () => {
    props.getDetail({
      packageName: packagename,
      reviewRating: rating,
      reviewDescription: description,
      memberId: memberId,
      reviewId: reviewId,
      subscriptionId: subscriptionId,
    });
  };

  return (
    <React.Fragment>
      <td className="reviewdetail__tbody__nickname"> {props.memberNickname}</td>
      <td className="reviewdetail__tbody__package"> {props.packageName}</td>
      <td className="reviewdetail__tbody__traderuid"> {props.reviewId}</td>
      <td className="reviewdetail__tbody__rating"> {props.reviewRating}</td>
      <td className="reviewdetail__tbody__date">{props.reviewDate}</td>
      <td className="reviewdetail__tbody__more">
        <img
          src="/assets/admin_more.png"
          alt="more"
          className="reviewdetail__tbody__more__img"
          onClick={() => {
            showModal();
            setDetail();
          }}
        />
      </td>
    </React.Fragment>
  );
}

export default ReviewDetailItem;
