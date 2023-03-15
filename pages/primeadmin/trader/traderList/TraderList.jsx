import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import Lee from "../../../../lib/Lee";
import Confirm from "../../modal/Confirm";
import TraderListItem from "./TraderListItem";
import TraderListModal from "./traderListModal/TraderListModal";

import "./TraderList.scss";

function TraderList({ gettraderInfo }) {
  const [modal, setModal] = useState(false);
  const [modalconfirm, setModalConfirm] = useState(false);
  const [traders, setTraders] = useState([]);
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
  const TraderInfo = (trader) => {
    gettraderInfo(trader);
  };

  function getTraders() {
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
          const data = res.data.data;
          setTraders(data);
          setFilterPayment(data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getTraders);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("에러");
        console.log(err);
      });
  }

  function textFilter() {
    const filters = traders.filter((val) => {
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
    getTraders();
  }, []);

  useEffect(() => {
    textFilter();
  }, [searchText, sortStatus]);

  useEffect(() => {
    setClick(Array(filterPayment.length).fill(false));
  }, [page]);

  return (
    <React.Fragment>
      {modal && <TraderListModal setModal={setModal} />}
      {modalconfirm && <Confirm setModalConfirm={setModalConfirm} />}
      <div className="traderlist">
        <div className="traderlist__content">
          <div className="traderlist__content__header">
            <span className="traderlist__content__header__title">
              트레이더 사용자
            </span>
            <div className="traderlist__content__header__search">
              <input
                type="text"
                className="traderlist__content__header__search__input"
                placeholder="검색하기"
                value={searchText}
                onChange={function (e) {
                  setSearchText(e.target.value);
                }}
              />
            </div>
          </div>

          {traders && traders.length > 0 ? (
            <div className="traderlist__content__body">
              <table className="traderlist__content__body__table traderlist__table">
                <thead className="traderlist__table__head">
                  <tr className="traderlist__table__head__tr">
                    <td
                      className="traderlist__table__head__name"
                      onClick={function () {
                        setSortStatus(1);
                      }}
                    >
                      성함
                    </td>
                    <td
                      className="traderlist__table__head__nickname"
                      onClick={function () {
                        setSortStatus(2);
                      }}
                    >
                      닉네임
                    </td>
                    <td
                      className="traderlist__table__head__phone"
                      onClick={function () {
                        setSortStatus(3);
                      }}
                    >
                      전화번호
                    </td>
                    <td
                      className="traderlist__table__head__email"
                      onClick={function () {
                        setSortStatus(4);
                      }}
                    >
                      이메일
                    </td>
                    <td
                      className="traderlist__table__head__uid"
                      onClick={function () {
                        setSortStatus(5);
                      }}
                    >
                      UID
                    </td>
                    <td className="traderlist__table__head__role">
                      회원으로 전환하기
                    </td>
                  </tr>
                </thead>
                <tbody className="traderlist__table__body">
                  {filterPayment &&
                    filterPayment.length > 0 &&
                    filterPayment
                      .slice(item * (page - 1), item * (page - 1) + item)
                      .map((trader, index) => (
                        <tr
                          key={`trader-${index}`}
                          className={
                            click[index]
                              ? "traderlist__table__body__tr--click"
                              : "traderlist__table__body__tr"
                          }
                          onClick={() => {
                            TraderInfo(trader);
                            changeClick(index);
                          }}
                        >
                          <TraderListItem
                            nickname={trader.nickname}
                            uid={trader.uid}
                            name={trader.name}
                            date={trader.signupDate}
                            email={trader.email}
                            phone={trader.phoneNumber}
                            more={"/assets/admin_more.png"}
                            setModal={setModal}
                            role={trader.role}
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
                  nextPageText={""}
                  prevPageText={""}
                />
              ) : null}
            </div>
          ) : (
            <div className="traderlist__content__none">
              트레이더 리스트가 없습니다.
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default TraderList;
