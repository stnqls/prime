import { useEffect, useRef, useState } from "react";
import "./AdminMessageContents.scss";

const AdminMessageContents = (props: any) => {
  const message = props.message;
  const [trader, setTrader]: any = useState(props.traderId);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTrader(props.traderId);
    return setTrader(props.traderId);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  }, [message]);

  return (
    <div className="admin-message-contents">
      {message.map((item: any, index: number) => (
        <div
          className={
            trader === item.receiverId
              ? "admin-message-contents__content--receiver"
              : "admin-message-contents__content"
          }
          key={`messasge-${index}`}
          ref={scrollRef}
        >
          <div
            className={
              trader === item.receiverId
                ? "admin-message-contents__content--receiver__text"
                : "admin-message-contents__content__text"
            }
          >
            {item.content}
          </div>
          <div
            className={
              trader === item.receiverId
                ? "admin-message-contents__content--receiver__time"
                : "admin-message-contents__content__time"
            }
          >
            {item.date}
          </div>
          <div
            className={
              trader === item.receiverId
                ? "admin-message-contents__content--receiver__status"
                : "admin-message-contents__content__status"
            }
          >
            {item.status === 0 ? "안읽음" : "읽음"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMessageContents;
