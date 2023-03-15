import React from "react";
import Router from "next/router";
import DelayLink from "../../lib/DelayLink";
import Lee from "../../lib/Lee";

const NotificationItem = (props: any) => {
  let title;
  let categoryCode = props.categoryCode;
  let to = "";

  switch (categoryCode) {
    case 101:
      title = `${props.senderNickname} 님의 새 쪽지`;
      to = "user?page=messages";
      break;
    case 201:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 의 결제요청이 완료되었습니다.
        </React.Fragment>
      );
      to = "user?page=payment";
      break;
    case 202:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 의 구독이 시작되었습니다.
        </React.Fragment>
      );
      to = "user?page=userPackage";
      break;
    case 203:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 의 결제가 취소되었습니다.
        </React.Fragment>
      );
      to = "user?page=payment";
      break;
    case 207:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 의 환불요청이 완료되었습니다.
        </React.Fragment>
      );
      to = "user?page=payment";
      break;
    case 208:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 의 환불이 거절되었습니다.
        </React.Fragment>
      );
      to = "user?page=payment";
      break;
    case 209:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 의 환불이 완료되었습니다.
        </React.Fragment>
      );
      to = "user?page=payment";
      break;
    case 309:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 의 구독이 만료되었습니다..
        </React.Fragment>
      );
      to = "user?page=payment";
      break;
    case 401:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 의 정산이 완료되었습니다.
        </React.Fragment>
      );
      to = "user?page=traderAdjustment";
      break;
    case 402:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 의 정산이 거절되었습니다.
        </React.Fragment>
      );
      to = "user?page=traderAdjustment";
      break;
    case 501:
      title = `${props.writerNickname}님이 댓글을 남겼습니다.`;
      break;
    // case 502:
    //   title = `${props.writerNickname}님이 대댓글을 남겼습니다.`;
    //   break;
    case 601:
      title = `1:1문의에 답변이 등록되었습니다.`;
      to = "user?page=userInquiry";
      break;
    case 701:
      title = `트레이더 신청이 완료되었습니다.`;
      to = "user?page=traderStatus";
      break;
    case 702:
      title = `트레이더 신청이 승인되었습니다.`;
      to = "user?page=traderStatus";
      break;
    case 709:
      title = `트레이더 신청이 거절되었습니다.`;
      break;
    case 801:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 에 픽이 등록되었습니다.
        </React.Fragment>
      );
      to = "user?page=userPick";
      break;
    case 802:
      title = (
        <React.Fragment>
          패키지 '
          <span className="notification__list__item__wrap__title__package">
            {props.packageName}
          </span>
          ' 에 픽이 종료되었습니다.
        </React.Fragment>
      );

      to = "user?page=userPick";
      break;
  }

  return (
    <React.Fragment>
      {props.categoryCode === 501 ? (
        <li
          className="notification__list__item"
          onClick={() => {
            setTimeout(() => {
              Router.push({
                pathname: "/readBoard",
                query: {
                  id: props.boardId,
                  categoryCode: props.boardCategoryCode,
                },
              });
            }, 500);
          }}
        >
          <div className="notification__list__item__wrap">
            <div className="notification__list__item__wrap__check"></div>
            <div className="notification__List__item__wrap__title">{title}</div>
          </div>
          <div className="notification__list__item__wrap__time">
            {props.date}
          </div>
        </li>
      ) : (
        <DelayLink to={to} delay={500} onDelayStart={Lee.loadingStart}>
          <li className="notification__list__item">
            <div className="notification__list__item__wrap">
              <div className="notification__list__item__wrap__check"></div>
              <div className="notification__list__item__wrap__title">
                {title}
              </div>
            </div>
            <div className="notification__list__item__time">{props.date}</div>
          </li>
        </DelayLink>
      )}
    </React.Fragment>
  );
};

export default NotificationItem;
