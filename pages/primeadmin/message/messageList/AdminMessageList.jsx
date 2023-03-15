import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import Lee from "../../../../lib/Lee";
import MessageModal from "../../modal/MessageModal";

import "./AdminMessageList.scss";

function AdminMessageList(props) {
  const [trader, setTrader] = useState([]);
  const [member, setMember] = useState([]);
  const [search, setSearch] = useState("");
  const [traderId, setTraderId] = useState();
  const [memberId, setMemberId] = useState("");
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);
  const [click, setClick] = useState(0);
  const [memberName, setMemberName] = useState("");
  const [traderName, setTraderName] = useState("");

  function changeClick(index) {
    const newArr = Array(trader.length).fill(false);
    newArr[index] = true;
    setClick(newArr);
  }

  function pageChange(page) {
    setPage(page);
  }

  function getTraderList() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/traders",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setTrader(res.data.data);
        } else {
          if ((res.data.errCode = "101")) {
            Lee.refreshToken(getTraderList);
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

  function getMemberList(traderId) {
    setTraderId(traderId);
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/messages/memberList?traderId=${traderId}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setMember(res.data.data);
        } else {
          if ((res.data.errCode = "101")) {
            Lee.refreshToken(getMemberList);
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
    getTraderList();
  }, []);

  useEffect(() => {
    setSearch(props.search);
    return setSearch(props.search);
  });

  return (
    <React.Fragment>
      {modal && (
        <MessageModal
          traderId={traderId}
          memberId={memberId}
          setModal={setModal}
          traderName={traderName}
          memberName={memberName}
        />
      )}
      <ul className="admin-message-list__trader-list">
        {trader
          .slice(item * (page - 1), item * (page - 1) + item)
          .map((trader, index) => (
            <li
              className={
                click[index]
                  ? "admin-message-list__trader-list__item--click"
                  : "admin-message-list__trader-list__item"
              }
              key={`admin-message-trader-${index}`}
              onClick={() => {
                getMemberList(trader.uid);
                changeClick(index);
                setTraderName(trader.name);
              }}
            >
              <img
                src={trader.avatar}
                alt="traderAvatar"
                className="admin-message-list__trader-list__item__img"
              />
              <span className="admin-message-list__trader-list__item__name">
                {trader.name}
              </span>
            </li>
          ))}
        {trader.length > 0 && (
          <Pagination
            totalItemsCount={trader.length}
            activePage={page}
            onChange={pageChange}
            itemsCountPerPage={item}
            firstPageText={""}
            lastPageText={""}
            prevPageText={""}
            nextPageText={""}
          />
        )}
      </ul>

      <ul className="admin-message-list__user-list">
        {member.length > 0 ? (
          member
            .slice(item * (page - 1), item * (page - 1) + item)
            .map((member, index) => (
              <li
                className="admin-message-list__user-list__item"
                key={`admin-message-user-${index}`}
                onClick={() => {
                  setMemberName(member.name);
                  setMemberId(member.id);
                  setModal(true);
                }}
              >
                <span className="admin-message-list__user-list__item__userinfo">
                  <img
                    src={member.avatar}
                    alt="userAvatar"
                    className="admin-message-list__user-list__item__userinfo__img"
                  />
                  <span className="admin-message-list__user-list__item__userinfo__name">
                    {member.name}
                  </span>
                </span>
                <span className="admin-message-list__user-list__item__message">
                  {member.messageContent}
                </span>
                <span className="admin-message-list__user-list__item__date">
                  {member.messageDate}
                </span>
              </li>
            ))
        ) : (
          <div className="admin-message-list__user-list__none">
            쪽지가 존재하지 않습니다.
          </div>
        )}
        {member.length > 0 && (
          <Pagination
            totalItemsCount={member.length}
            activePage={page}
            onChange={pageChange}
            itemsCountPerPage={item}
            firstPageText={""}
            lastPageText={""}
            prevPageText={""}
            nextPageText={""}
          />
        )}
      </ul>
    </React.Fragment>
  );
}

export default AdminMessageList;
