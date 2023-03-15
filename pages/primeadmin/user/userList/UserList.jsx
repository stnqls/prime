import React, { useEffect, useState } from "react";
import Confirm from "../../modal/Confirm";
import "./UserList.scss";
import UserListItem from "./UserListItem";
import UserListModal from "./userListModal/UserListModal";
import axios from "axios";
import Lee from "../../../../lib/Lee";
import Pagination from "react-js-pagination";

function UserList({ getuserInfo }) {
  const [modal, setModal] = useState(false);
  const [modalconfirm, setModalConfirm] = useState(false);
  const [users, setUsers] = useState([]);
  const [filterPayment, setFilterPayment] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortStatus, setSortStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);
  const [click, setClick] = useState();

  function changeClick(index) {
    const newArr = Array(filterPayment.length).fill(false);
    newArr[index] = true;
    setClick(newArr);
  }

  function pageChange(page) {
    setPage(page);
  }

  const UserInfo = (user) => {
    getuserInfo(user);
  };

  function getUsers() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/users",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setUsers(data);
          setFilterPayment(data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getUsers);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("에러");
      });
  }

  function textFilter() {
    const filters = users.filter((val) => {
      if (searchText == "") {
        return val;
      } else if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
        return val;
      } else if (
        val.nickname.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return val;
      } else if (
        val.phoneNumber.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return val;
      }
    });

    let sorts;

    if (sortStatus === 0 || sortStatus === 1) {
      sorts = filters.sort(function (a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    }

    if (sortStatus === 2) {
      sorts = filters.sort(function (a, b) {
        return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
      });
    }

    if (sortStatus === 3) {
      sorts = filters.sort(function (a, b) {
        return a.phoneNumber < b.phoneNumber
          ? -1
          : a.phoneNumber > b.phoneNumber
          ? 1
          : 0;
      });
    }

    if (sortStatus === 4) {
      sorts = filters.sort(function (a, b) {
        return a.email < b.email ? -1 : a.email > b.email ? 1 : 0;
      });
    }

    if (sortStatus === 5) {
      sorts = filters.sort(function (a, b) {
        return a.uid > b.uid ? -1 : a.uid < b.uid ? 1 : 0;
      });
    }

    setFilterPayment(sorts);
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    textFilter();
  }, [searchText, sortStatus]);

  useEffect(() => {
    setClick(Array(filterPayment.length).fill(false));
  }, [page]);

  return (
    <React.Fragment>
      {modal && <UserListModal setModal={setModal} />}
      {modalconfirm && <Confirm setModalConfirm={setModalConfirm} />}
      <div className="userlist">
        <div className="userlist__content">
          <div className="userlist__content__header">
            <span className="userlist__content__header__title">
              전체 사용자
            </span>
            <div className="userlist__content__header__search">
              <input
                type="text"
                className="userlist__content__header__search__input"
                placeholder="검색하기"
                value={searchText}
                onChange={function (e) {
                  setSearchText(e.target.value);
                }}
              />
            </div>
          </div>

          {users && users.length > 0 ? (
            <div className="userlist__content__body">
              <table className="userlist__content__body__table userlist__table">
                <thead className="userlist__table__head">
                  <tr className="userlist__table__head__tr">
                    <td
                      className="userlist__table__head__name"
                      onClick={function () {
                        setSortStatus(1);
                      }}
                    >
                      성함
                    </td>
                    <td
                      className="userlist__table__head__nickname"
                      onClick={function () {
                        setSortStatus(2);
                      }}
                    >
                      닉네임
                    </td>
                    <td
                      className="userlist__table__head__phone"
                      onClick={function () {
                        setSortStatus(3);
                      }}
                    >
                      전화번호
                    </td>
                    <td
                      className="userlist__table__head__email"
                      onClick={function () {
                        setSortStatus(4);
                      }}
                    >
                      이메일
                    </td>
                    <td
                      className="userlist__table__head__uid"
                      onClick={function () {
                        setSortStatus(5);
                      }}
                    >
                      UID
                    </td>
                    <td className="userlist__table__head__role">
                      트레이더 전환하기
                    </td>
                  </tr>
                </thead>
                <tbody className="userlist__table__body">
                  {filterPayment &&
                    filterPayment.length > 0 &&
                    filterPayment
                      .slice(item * (page - 1), item * (page - 1) + item)
                      .map((user, index) => (
                        <tr
                          key={`user-${index}`}
                          className={
                            click[index]
                              ? "userlist__table__body__tr--click"
                              : "userlist__table__body__tr"
                          }
                          onClick={() => {
                            UserInfo(user);
                            changeClick(index);
                          }}
                        >
                          <UserListItem
                            nickname={user.nickname}
                            uid={user.uid}
                            name={user.name}
                            email={user.email}
                            phone={user.phoneNumber}
                            more={"/assets/admin_more.png"}
                            setModal={setModal}
                            role={user.role}
                            page={page}
                          />
                        </tr>
                      ))}
                </tbody>
              </table>
              {filterPayment.length > 0 ? (
                <Pagination
                  totalItemsCount={filterPayment.length}
                  activePage={page}
                  onChange={pageChange}
                  itemsCountPerPage={item}
                  firstPageText={""}
                  lastPageText={""}
                  prevPageText={""} //이전을 나타낼 텍스트
                  nextPageText={""} //다음을 나타낼 텍스트
                />
              ) : null}
            </div>
          ) : (
            <div className="userlist__content__none">
              멤버 리스트가 없습니다.
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserList;
