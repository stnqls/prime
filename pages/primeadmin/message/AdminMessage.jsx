import React, { useState } from "react";

import AdminMessageList from "./messageList/AdminMessageList";
import "./AdminMessage.scss";

function AdminMessage() {
  const [search, setSearch] = useState("");

  return (
    <div className="admin-message">
      <div className="admin-message__content">
        <div className="admin-message__content__header">
          <input
            type="text"
            placeholder="트레이더 이름으로 검색하기"
            className="admin-message__content__header__search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="admin-message__content__body">
          <AdminMessageList search={search} />
        </div>
      </div>
    </div>
  );
}

export default AdminMessage;
