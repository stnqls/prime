import React, { useEffect, useState } from "react";
import Router from "next/router";
import Lee from "../../../../../lib/Lee";
import dynamic from "next/dynamic";

import "./ViewTraderPackageItemModal.scss";

const ViewTraderPackageMessageModal = dynamic(
  import("../ViewTraderPackageMessageModal/ViewTraderPackageMessageModal"),
  {
    ssr: false,
  }
);

const ViewTraderPackageItemModal = (props: any) => {
  const [uid, setUid]: any = useState("");
  const [view, setView] = useState(false);

  const paymentPackage = () => {
    if (Lee.checkLogin()) {
      if (props.traderId !== window.sessionStorage.getItem("uid")) {
        props.setView(false);
        props.setMethod(true);
      } else {
        alert("본인 패키지는 구독하실 수 없습니다.");
      }
    } else {
      alert("로그인 후 이용하실 수 있습니다.");
      Router.push("/login");
    }
  };

  const traderMessage = () => {
    if (Lee.checkLogin()) {
      if (props.traderId !== window.sessionStorage.getItem("uid")) {
        setView(true);
      } else {
        alert("본인 패키지는 구독하실 수 없습니다.");
      }
    } else {
      alert("로그인 후 이용하실 수 있습니다.");
      Router.push("/login");
    }
  };

  useEffect(() => {
    setUid(window.sessionStorage.getItem("uid"));
  }, []);

  return (
    <React.Fragment>
      <div
        className="view-trader-package-item-modal"
        id="ViewTraderPackageItemModal"
      >
        <div
          className="view-trader-package-item-modal__hide"
          onClick={function () {
            props.setView(false);
          }}
        />
        <div className="view-trader-package-item-modal__contents">
          <img
            className="view-trader-package-item-modal__contents__close"
            src="/assets/x-sign.png"
            alt="x-sign"
            onClick={function () {
              props.setView(false);
            }}
          />

          <div className="view-trader-package-item-modal__contents__context">
            <div className="view-trader-package-item-modal__contents__context__trader">
              <div className="view-trader-package-item-modal__contents__context__trader__avatar">
                <img src={props.traderAvatar} alt="avatar" />
              </div>
              <div className="view-trader-package-item-modal__contents__context__trader__nickname">
                {props.traderName}
              </div>
              {props.traderId !== uid && (
                <div
                  className="view-trader-package-item-modal__contents__context__trader__message"
                  onClick={() => {
                    traderMessage();
                  }}
                >
                  쪽지하기
                  <img src="/assets/message.png" alt="message" />
                </div>
              )}
            </div>
            <div className="view-trader-package-item-modal__contents__context__package">
              <div className="view-trader-package-item-modal__contents__context__package__name">
                {props.packageName}
              </div>
              <div className="view-trader-package-item-modal__contents__context__package__description">
                {props.packageDescription}
              </div>
            </div>
          </div>

          <div className="view-trader-package-item-modal__contents__subscribe">
            <div className="view-trader-package-item-modal__contents__subscribe__price">
              월 {Lee.addComma(props.price)}
            </div>
            {!props.ispurchase && props.traderId !== uid && (
              <div
                className="view-trader-package-item-modal__contents__subscribe__btn"
                onClick={function () {
                  paymentPackage();
                }}
              >
                결제하기
              </div>
            )}
          </div>
        </div>
      </div>
      {view && (
        <ViewTraderPackageMessageModal
          setView={setView}
          traderName={props.traderName}
          traderAvatar={props.traderAvatar}
          packageName={props.packageName}
          traderId={props.traderId}
        />
      )}
    </React.Fragment>
  );
};

export default ViewTraderPackageItemModal;
