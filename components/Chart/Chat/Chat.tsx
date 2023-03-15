import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Lee from "../../../lib/Lee";

// import ChatList from "./ChatList";
import "./Chat.scss";

const ChatList = dynamic(import("./ChatList"), {
  ssr: false,
});

const Chat = (props: any) => {
  const [avatar, setAvatar]: any = useState();
  const [nickname, setNickname]: any = useState();
  const [content, setContent] = useState("");
  const [type, setType]: any = useState();

  function write() {
    if (content === "") {
      alert("내용을 입력해 주세요");
    } else {
      const headers: any = {
        authorization: props.isAdmin
          ? window.sessionStorage.getItem("accessToken")
          : window.sessionStorage.getItem("token"),
      };
      axios({
        method: "POST",
        url: props.isAdmin
          ? "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/chatting"
          : "https://us-central1-prime-investment-web.cloudfunctions.net/api/chatting",
        headers,
        data: {
          avatar: avatar,
          nickname: nickname,
          content: content,
          type: type === "member" ? "user" : "trader",
        },
      })
        .then((res) => {
          setContent("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    const random = Math.floor(Math.random() * (1000000 - 1) + 100000);
    window.sessionStorage.setItem("guest", String(random));
    if (Lee.checkLogin()) {
      setAvatar(window.sessionStorage.getItem("avatar"));
      setNickname(window.sessionStorage.getItem("nickname"));
      setType(window.sessionStorage.getItem("role"));
    } else {
      setAvatar("/images/avatars/Memoji-01.png");
      setNickname("G" + window.sessionStorage.getItem("guest"));
      setType("member");
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={props.show ? "chat" : "chat--none"}>
      <div className="chat__title">실시간 채팅</div>
      <ChatList />
      <div className="chat__write">
        <textarea
          className="chat__write__input"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.shiftKey) {
              return;
            } else if (e.key === "Enter") {
              e.preventDefault();
              write();
            }
          }}
          maxLength={200}
        />
        <img
          src="/images/icons/chat-btn.png"
          alt="send"
          className="chat__write__send"
          onClick={() => {
            write();
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
