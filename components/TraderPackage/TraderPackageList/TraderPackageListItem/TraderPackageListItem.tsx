import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";
import Router from "next/router";
import axios from "axios";
import dynamic from "next/dynamic";

import "./TraderPackageListItem.scss";

const TraderPackageListItemModal = dynamic(
  import("./TraderPackageListItemDetail/TraderPackageListItemDetail"),
  {
    ssr: false,
  }
);

const TraderPackageListItemModify = dynamic(
  import("./TraderPackageListItemModify/TraderPackageListItemModify"),
  {
    ssr: false,
  }
);

const Portal = dynamic(import("../../../../lib/Portal"), {
  ssr: false,
});

const TraderPackageListItem = (props: any) => {
  const [view, setView] = useState(false);
  const [modify, setModify] = useState(false);

  function removePacakge() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/packages/${props.packageId}
      `,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          alert("패키지가 종료되었습니다.");
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(removePacakge);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }

        Lee.loadingStart();

        setTimeout(() => {
          window.location.reload();
        }, 400);
      })
      .catch((err) => {
        if (err.response.data.errCode === 301) {
          alert("구독중인 회원이 있어 종료가 불가능 합니다.");
        } else if (err.response.data.errCode === 302) {
          alert("삭제할수있는 권한이 없습니다.");
        } else if (err.response.data.errCode === 303) {
          alert("오류가 발생했습니다.");
        } else if (err.response.data.errCode === 304) {
          alert("오류가 발생했습니다.");
        } else if (err.response.data.errCode === 305) {
          alert("오류가 발생했습니다.");
        } else {
          alert("일시적인 오류입니다. 다시 시도해주세요.");
        }
      });
  }

  return (
    <>
      {view && (
        <TraderPackageListItemModal
          setView={setView}
          traderName={props.traderName}
          packageName={props.packageName}
          packageDescription={props.packageDescription}
          traderAvatar={props.traderAvatar}
          price={props.price}
          traderId={props.traderId}
          packageId={props.packageId}
          start_date={props.start_date}
          isDeleted={props.isDeleted}
        />
      )}
      {modify && (
        <Portal>
          <TraderPackageListItemModify
            setView={setModify}
            traderName={props.traderName}
            packageName={props.packageName}
            packageDescription={props.packageDescription}
            traderAvatar={props.traderAvatar}
            price={props.price}
            traderId={props.traderId}
            packageId={props.packageId}
          />
        </Portal>
      )}
      <li className={`trader-package-list-item parents ${props.state}`}>
        <div className="trader-package-list-item__contents parents">
          <div className="trader-package-list-item__contents__status">
            {props.isDeleted ? "종료" : "진행중"}
          </div>
          <div className="trader-package-list-item__contents__info parents">
            <div className="trader-package-list-item__contents__info__title">
              {props.packageName}
            </div>

            <div className="trader-package-list-item__contents__info__date">
              {props.start_date.slice(0, 10)} ~{" "}
              {props.isDeleted ? props.end_date.slice(0, 10) : null}
            </div>
            <div className="trader-package-list-item__contents__info__price">
              {Lee.addComma(props.price)} KRW
            </div>
          </div>
          <div className="trader-package-list-item__contents__btns">
            {!props.isDeleted && (
              <div className="trader-package-list-item__contents__btns__subscribe">
                구독자 수 :{props.subscribersNum} 명
              </div>
            )}
            <ul className="trader-package-list-item__contents__btns__buttons parents">
              <li
                onClick={function () {
                  setView(true);
                }}
              >
                자세히
              </li>
              {!props.isDeleted && (
                <React.Fragment>
                  {/* <li
                    onClick={function () {
                      setModify(true);
                    }}
                  >
                    수정
                  </li> */}
                  <li onClick={removePacakge}>종료</li>
                </React.Fragment>
              )}
            </ul>
          </div>
          {/* <div className="trader-package-list-item__contents__info__date">
            <span>{props.start_date}</span>부터
            <br />
            <span>{props.end_date}</span>까지
          </div> */}
        </div>
      </li>
    </>
  );
};

export default TraderPackageListItem;
