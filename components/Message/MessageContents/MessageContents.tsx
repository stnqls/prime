import { useEffect, useRef, useState } from "react";
import "./MessageContents.scss";

const MessageContents = (props: any) => {
  const message = props.message;
  const [me, setMe]: any = useState();
  // const unread = message.findIndex((item: any) => item.status === 0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMe(window.sessionStorage.getItem("uid"));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
      // inline: "nearest",
    });
  }, [message]);

  return (
    <div className="message" id="message">
      {message.map((item: any, index: number) => (
        <div
          className={
            me === item.senderId
              ? "message__content"
              : "message__content--receiver"
          }
          key={`messasge-${index}`}
          id={"message__content"}
          ref={scrollRef}
        >
          <div
            className={
              me === item.senderId
                ? "message__content__text"
                : "message__content--receiver__text"
            }
          >
            {item.content}
          </div>
          <div
            className={
              me === item.senderId
                ? "message__content__time"
                : "message__content--receiver__time"
            }
          >
            {item.date}
          </div>
          <div
            className={
              me === item.senderId
                ? "message__content__status"
                : "message__content--receiver__status"
            }
          >
            {item.status === 0 ? "안읽음" : "읽음"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageContents;
