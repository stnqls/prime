import React from "react";
import "moment/locale/ko";

const NewsItem = (props: any) => {
  return (
    <li className="news__list__item">
      <div className="news__list__item__time">{props.date.slice(11, 16)}</div>
      {props.link ? (
        <a href={props.link} target="_blank">
          <div className="news__list__item__title">
            {props.title}
            <img src="/images/icons/link.png" alt="link" />
            <span>원문보기</span>
          </div>
        </a>
      ) : (
        <div className="news__list__item__title  ">{props.title}</div>
      )}
    </li>
  );
};

export default NewsItem;
