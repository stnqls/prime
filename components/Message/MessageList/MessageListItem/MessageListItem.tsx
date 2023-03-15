import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ViewTraderPackageItemModal = dynamic(
  import(
    "../../../ViewTrader/ViewTraderPackage/ViewTraderPackageItem/ViewTraderPackageMessageModal/ViewTraderPackageMessageModal"
  ),
  {
    ssr: false,
  }
);

const MessageListItem = (props: any) => {
  const [view, setView] = useState(false);
  const [clear, setClear] = useState(true);
  const [me, setMe]: any = useState();

  useEffect(() => {
    setMe(window.sessionStorage.getItem("uid"));
  }, []);

  return (
    <React.Fragment>
      {view && (
        <ViewTraderPackageItemModal
          setView={setView}
          traderAvatar={props.avatar}
          traderName={props.nickname}
          traderId={props.traderId}
          clear={clear}
        />
      )}
      <li
        className={
          me !== props.messageSenderId && props.messageStatus === 0
            ? "message-list__content__list__item--new"
            : "message-list__content__list__item"
        }
        onClick={() => {
          setView(true);
        }}
      >
        <div className="message-list__content__list__item__user">
          <div className="message-list__content__list__item__user__avatar">
            <img src={props.avatar} alt="avatar" />
          </div>
          <div className="message-list__content__list__item__user__name">
            {props.nickname}
            <div
              className={
                me !== props.messageSenderId && props.messageStatus === 0
                  ? "message-list__content__list__item--new__user__name__alert"
                  : "message-list__content__list__item__user__name__alert"
              }
            ></div>
          </div>
        </div>
        <div className="message-list__content__list__item__text">
          {props.messageContent}
        </div>
        <div className="message-list__content__list__item__time">
          {props.messageDate}
        </div>
      </li>
    </React.Fragment>
  );
};

export default MessageListItem;
