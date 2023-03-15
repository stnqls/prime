import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";
import DelayLink from "../../lib/DelayLink";
import Lee from "../../lib/Lee";

const AlertItem = (props: any) => {
  let title = "";
  let categoryCode = props.categoryCode;
  let to = "";
  const [id, setId] = useState(props.id);

  function deleteAlert() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/users/alert?alertId=${id}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          Router.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(deleteAlert);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
      });
  }

  switch (categoryCode) {
    case 101:
      title = `${props.senderNickname} 님의 새 쪽지`;
      to = "user?page=messages";
      break;
    case 201:
      title = `패키지 "${props.packageName}"의 결제요청이 완료되었습니다.`;
      to = "user?page=payment";
      break;
    case 202:
      title = `패키지 "${props.packageName}"의 구독이 시작되었습니다.`;
      to = "user?page=userPackage";
      break;
    case 203:
      title = `패키지 "${props.packageName}"의 결제가 취소되었습니다.`;
      to = "user?page=payment";
      break;
    case 207:
      title = `패키지 "${props.packageName}"의 환불요청이 완료되었습니다.`;
      to = "user?page=payment";
      break;
    case 208:
      title = `패키지 "${props.packageName}"의 환불이 거절되었습니다.`;
      to = "user?page=payment";
      break;
    case 209:
      title = `패키지 "${props.packageName}"의 환불이 완료되었습니다.`;
      to = "user?page=payment";
      break;
    case 309:
      title = `패키지 "${props.packageName}"의 구독이 만료되었습니다.`;
      to = "user?page=payment";
      break;
    case 401:
      title = `패키지 "${props.packageName}"의 정산이 완료되었습니다.`;
      to = "user?page=traderAdjustment";
      break;
    case 402:
      title = `패키지 "${props.packageName}"의 정산이 거절되었습니다.`;
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
      title = `패키지 "${props.packageName}"에 새로운 픽이 등록되었습니다.`;
      to = "user?page=userPick";
      break;
    case 802:
      title = `패키지 "${props.packageName}"에 픽이 종료되었습니다.`;
      to = "user?page=userPick";
      break;
  }

  return (
    <React.Fragment>
      {props.categoryCode === 501 ? (
        <li className="alert__list__item">
          <div className="alert__list__item__status"></div>
          <div
            className="alert__list__item__info"
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
            <div className="alert__list__item__info__title">{title}</div>
            <div className="alert__list__item__info__date">{props.date}</div>
          </div>
          <div
            className="alert__list__item__delete"
            onClick={() => {
              setId(props.id);
              deleteAlert();
            }}
          >
            <img src="/assets/x-sign.png" alt="close" />
          </div>
        </li>
      ) : (
        <li className="alert__list__item">
          <div className="alert__list__item__status"></div>
          <DelayLink to={to} delay={500} onDelayStart={Lee.loadingStart}>
            <div className="alert__list__item__info">
              <div className="alert__list__item__info__title">{title}</div>
              <div className="alert__list__item__info__date">{props.date}</div>
            </div>
          </DelayLink>
          <div
            className="alert__list__item__delete"
            onClick={() => {
              setId(props.id);
              deleteAlert();
            }}
          >
            <img src="/assets/x-sign.png" alt="close" />
          </div>
        </li>
      )}
    </React.Fragment>
  );
};

export default AlertItem;
