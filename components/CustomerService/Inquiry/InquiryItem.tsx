import { useState } from "react";

const InquiryItem = (props: any) => {
  const [open, setOpen] = useState(false);

  let status = props.status;
  let category = props.categoryCode;

  switch (status) {
    case 0:
    case 1:
      status = "관리자 확인중";
      break;
    case 2:
      status = "답변 완료";
      break;
  }

  switch (category) {
    case "201":
      category = "일반회원문의";
      break;
    case "202":
      category = "트레이더문의";
      break;
  }

  return (
    <li
      className="user-inquiry__list__item"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <div className="user-inquiry__list__item__content">
        <div className="user-inquiry__list__item__content__info">
          <div className="user-inquiry__list__item__content__info__title">
            [{category}] {props.title}
          </div>
          <div
            className={`user-inquiry__list__item__content__info__status user-inquiry-${props.status}`}
          >
            {status}
          </div>
        </div>
        <div
          className={`user-inquiry__list__item__content__text ${
            open ? "show" : ""
          }`}
        >
          {props.content}
        </div>
        {props.status === 2 && (
          <div
            className={`user-inquiry__list__item__content__answer ${
              open ? "show" : ""
            }`}
          >
            <div className="user-inquiry__list__item__content__answer__text">
              {props.answer}
            </div>
            <div className="user-inquiry__list__item__content__answer__date">
              {props.answerDate.slice(0, 10)}
            </div>
          </div>
        )}
      </div>
      <div className="user-inquiry__list__item__date">
        {props.date.slice(0, 10)}
      </div>
    </li>
  );
};

export default InquiryItem;
