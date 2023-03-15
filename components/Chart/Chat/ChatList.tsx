import {
  getDatabase,
  ref,
  onValue,
  query,
  limitToLast,
} from "firebase/database";
import { useEffect, useState, useRef } from "react";

import "./ChatList.scss";

const ChatList = () => {
  const db = getDatabase();
  const recentRef = query(ref(db, "chatting"), limitToLast(1));
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [bottom, setBottom] = useState(true);
  chatRef.current?.addEventListener("scroll", scroll);

  const [message, setMessage]: any = useState({
    avatar: "",
    content: "",
    type: "",
    nickname: "",
    date: "",
  });
  let lastMessage: any;
  let messageList: any = [];
  let [data, setData] = useState([]);

  useEffect(() => {
    onValue(recentRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        lastMessage = Object.values(data)[0];
        setMessage(lastMessage);
        messageList = messageList.concat(lastMessage);
        setData(messageList);
      }
    });
  }, []);

  useEffect(() => {
    if (bottom) {
      const windowY: any = window.scrollY;
      scrollRef.current?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
      window.scrollTo(0, windowY);
    }
    return () => {
      chatRef.current?.removeEventListener("scroll", scroll);
    };
  }, [data]);

  function scroll() {
    let scrollTop: any = chatRef.current?.scrollTop;
    let innerHeight: any = chatRef.current?.clientHeight;
    let scrollHeight: any = chatRef.current?.scrollHeight;
    if (Math.ceil(scrollTop + innerHeight) >= scrollHeight) {
      setBottom(true);
    } else {
      setBottom(false);
    }
  }

  return (
    <div className="chat-list" ref={chatRef}>
      {data &&
        data.map((item: any, index: number) => {
          return (
            <div
              className="chat-list__item"
              key={`chat-list-${index}`}
              ref={scrollRef}
            >
              <div className="chat-list__item__avatar">
                <img src={item.avatar} alt="uaer-avatar" />
              </div>
              <div
                className={
                  "chat-list__item__nick" +
                  (item.type === "admin" ? " admin" : "")
                }
              >
                {item.nickname}
              </div>
              <div
                className={
                  "chat-list__item__text" +
                  (item.type === "admin" ? " admin" : "")
                }
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
              <div className="chat-list__item__time">
                {item.date.slice(11, 16)}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ChatList;
