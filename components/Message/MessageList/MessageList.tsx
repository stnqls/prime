import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import Lee from "../../../lib/Lee";

import "./MessageList.scss";
import MessageListItem from "./MessageListItem/MessageListItem";

const MessageList = () => {
  const [message, setMessage] = useState([]);

  const [page, setPage] = useState(1);
  const [item, setItem] = useState(7);

  function pageChange(page: any) {
    setPage(page);
  }

  function getMessageList() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/messages/memberList",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setMessage(res.data.data);
        } else {
          if ((res.data.errCode = "101")) {
            Lee.refreshToken(getMessageList);
          } else {
            alert("서버와 통신중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  }

  useEffect(() => {
    getMessageList();
  }, []);

  return (
    <div className="message-list">
      <div className="message-list__content">
        <ul className="message-list__content__list">
          {message.length > 0 ? (
            message
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((item: any, index: number) => (
                <MessageListItem
                  avatar={item.avatar}
                  messageContent={item.messageContent}
                  messageDate={item.messageDate}
                  messageStatus={item.messageStatus}
                  nickname={item.nickname}
                  key={`message-${index}`}
                  traderId={item.id}
                  messageSenderId={item.messageSenderId}
                />
              ))
          ) : (
            <div className="message-list__content__none">
              쪽지함이 비어있습니다.
            </div>
          )}
        </ul>
        {message.length > 0 ? (
          <Pagination
            totalItemsCount={message.length}
            activePage={page}
            onChange={pageChange}
            itemsCountPerPage={item}
            firstPageText={""}
            lastPageText={""}
            nextPageText={""}
            prevPageText={""}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MessageList;
