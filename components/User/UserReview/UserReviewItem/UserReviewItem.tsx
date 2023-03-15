import React from "react";
import { FaStar } from "react-icons/fa";

const UserReviewItem = (props: any) => {
  function starRate() {
    const stars = [];
    for (let i = 0; i < props.rating; i++) {
      stars.push(<FaStar key={`total-review-star-${i}`} />);
    }
    return stars;
  }

  return (
    <React.Fragment>
      <tr className="user-review__table__tbody__tr">
        <td>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                props.setReviewIds(props.reviewIds.concat(props.id));
              } else {
                props.setReviewIds(
                  props.reviewIds.filter((id: any) => id !== props.id)
                );
              }
            }}
          />
        </td>
        <td
          className="user-review__table__tbody__tr__package"
          onClick={() => {
            props.setViewModal(true);
            props.setReviewId(props.id);
          }}
        >
          {props.packageName}
        </td>
        <td
          className="user-review__table__tbody__tr__trader"
          onClick={() => {
            props.setViewModal(true);
            props.setReviewId(props.id);
          }}
        >
          {props.traderNickname}
        </td>

        <td
          className="user-review__table__tbody__tr__rate"
          onClick={() => {
            props.setViewModal(true);
            props.setReviewId(props.id);
          }}
        >
          {starRate()}
        </td>
        <td
          className="user-review__table__tbody__tr__date"
          onClick={() => {
            props.setViewModal(true);
            props.setReviewId(props.id);
          }}
        >
          {props.date}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default UserReviewItem;
