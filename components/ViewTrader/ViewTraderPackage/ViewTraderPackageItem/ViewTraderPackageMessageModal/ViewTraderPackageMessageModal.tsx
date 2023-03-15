import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Lee from "../../../../../lib/Lee";
import MessageContents from "../../../../Message/MessageContents/MessageContents";

import "./ViewTraderPackageMessageModal.scss";

const ViewTraderPackageItemModal = (props: any) => {
  const [clear, setClear] = useState(props.clear);
  const [text, setText] = useState(
    clear ? "" : `"${props.packageName}"에 대한 문의가 있습니다.`
  );
  const [message, setMessage] = useState([]);
  const textRef = useRef<HTMLTextAreaElement>(null);

  function reset() {
    setText("");
  }

  function sendMessage() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "POST",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/messages",
      data: {
        receiverId: props.traderId,
        content: text,
      },
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          getMessage();
          reset();
        } else {
          if ((res.data.errCode = "101")) {
            Lee.refreshToken(sendMessage);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  }

  function getMessage() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/messages?otherMemberId=${props.traderId}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setMessage(res.data.data);
        } else {
          if ((res.data.errCode = "101")) {
            Lee.refreshToken(getMessage);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  }

  useEffect(() => {
    getMessage();
    textRef.current?.focus();
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <React.Fragment>
      <div
        className="view-trader-package-message-modal__hide"
        onClick={function () {
          props.setView(false);
          document.body.style.overflow = "unset";
        }}
      />
      <div className="view-trader-package-message-modal">
        <div className="view-trader-package-message-modal__contents">
          <div className="view-trader-package-message-modal__contents__trader">
            <div className="view-trader-package-message-modal__contents__trader__avatar">
              <img src={props.traderAvatar} alt="avatar" />
            </div>
            <div className="view-trader-package-message-modal__contents__trader__nickname">
              {props.traderName}
            </div>
          </div>
          <img
            className="view-trader-package-message-modal__contents__close"
            src="/assets/x-sign.png"
            alt="x-sign"
            onClick={function () {
              props.setView(false);
              document.body.style.overflow = "unset";
            }}
          />
          <div className="view-trader-package-message-modal__contents__texts">
            <MessageContents message={message} />
          </div>
          <div className="view-trader-package-message-modal__contents__send">
            <div className="view-trader-package-message-modal__contents__send__wrap">
              <textarea
                className="view-trader-package-message-modal__contents__send__text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                ref={textRef}
              />
              <img
                src="/images/icons/chat.png"
                alt="send"
                className="view-trader-package-message-modal__contents__send__btn"
                onClick={() => {
                  sendMessage();
                  textRef.current?.focus();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewTraderPackageItemModal;
