import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import Lee from "../../../../lib/Lee";
import TraderPaymentDetailsItem from "./TraderPaymentDetailsItem";
import "./TraderPaymentDetails.scss";

function TraderPaymentDetails() {
  const [toggle, setToggle] = useState(1);
  const [traderDeposit, setTaderDeposit] = useState([]);
  const [filterPayment, setFilterPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortStatus, setSortStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);

  function pageChange(page) {
    setPage(page);
  }

  function getTraderDeposit() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/withdrawals?status=${toggle}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setTaderDeposit(data);
          setFilterPayment(data);
          setLoading(false);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getTraderDeposit);
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
    const filters = traderDeposit.filter((val) => {
      if (searchText == "") {
        return val;
      } else if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
        return val;
      }
    });

    let sorts;

    if (sortStatus === 0 || sortStatus === 1) {
      sorts = filters.sort(function (a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    }

    if (sortStatus === 1) {
      sorts = filters.sort(function (a, b) {
        return a.phoneNumber < b.phoneNumber
          ? -1
          : a.phoneNumber > b.phoneNumber
          ? 1
          : 0;
      });
    }
    if (sortStatus === 2) {
      sorts = filters.sort(function (a, b) {
        return a.packageName < b.packageName
          ? -1
          : a.packageName > b.packageName
          ? 1
          : 0;
      });
    }

    if (sortStatus === 3) {
      sorts = filters.sort(function (a, b) {
        return a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : 0;
      });
    }

    if (sortStatus === 4) {
      sorts = filters.sort(function (a, b) {
        return a.requestDate < b.requestDate
          ? -1
          : a.requestDate > b.requestDate
          ? 1
          : 0;
      });
    }

    if (sortStatus === 5) {
      sorts = filters.sort(function (a, b) {
        return a.status > b.status ? -1 : a.status < b.status ? 1 : 0;
      });
    }
    setFilterPayment(sorts);
  }

  useEffect(() => {
    getTraderDeposit();
  }, [toggle]);

  useEffect(() => {
    textFilter();
  }, [searchText, sortStatus]);
  return (
    <div className="traderpaymentdetails traderdetails">
      {!loading && (
        <div className="traderdetails__content">
          <div className="traderdetails__content__header">
            <ul className="traderdetails__content__header__title">
              <li
                className={
                  toggle === 1
                    ? "traderdetails__content__header__title__item--click"
                    : "traderdetails__content__header__title__item"
                }
                onClick={() => {
                  setToggle(1);
                }}
              >
                정산 완료
              </li>
              <li
                className={
                  toggle === 2
                    ? "traderdetails__content__header__title__item--click"
                    : "traderdetails__content__header__title__item"
                }
                onClick={() => {
                  setToggle(2);
                }}
              >
                정산 거절
              </li>
            </ul>
            <div className="traderdetails__content__header__search">
              <input
                type="text"
                className="traderdetails__content__header__search__input"
                placeholder="성함으로 검색하기"
                value={searchText}
                onChange={function (e) {
                  setSearchText(e.target.value);
                }}
              />
            </div>
          </div>
          {traderDeposit && traderDeposit.length > 0 ? (
            <div className="traderdetails__content__body">
              <table className="traderdetails__content__body__table traderdetails__table">
                <thead className="traderdetails__table__head">
                  <tr className="traderdetails__table__head__tr">
                    <td
                      className="traderdetails__table__head__name"
                      onClick={function () {
                        setSortStatus(0);
                      }}
                    >
                      이름
                    </td>

                    <td
                      className="traderdetails__table__head__phone"
                      onClick={function () {
                        setSortStatus(1);
                      }}
                    >
                      전화번호
                    </td>
                    <td
                      className="traderdetails__table__head__package"
                      onClick={function () {
                        setSortStatus(2);
                      }}
                    >
                      패키지 이름
                    </td>
                    <td
                      className="traderdetails__table__head__price"
                      onClick={function () {
                        setSortStatus(3);
                      }}
                    >
                      금액
                    </td>
                    <td
                      className="traderdetails__table__head__date"
                      onClick={function () {
                        setSortStatus(4);
                      }}
                    >
                      일시
                    </td>
                    <td
                      className="traderdetails__table__head__status"
                      onClick={function () {
                        setSortStatus(5);
                      }}
                    >
                      정산여부
                    </td>
                    {/* {toggle === 1 ? (
                      <td className="traderdetails__table__head__approval">
                        정산취소
                      </td>
                    ) : null} */}
                  </tr>
                </thead>
                <tbody className="traderdetails__table__body">
                  {filterPayment &&
                    filterPayment.length > 0 &&
                    filterPayment
                      .slice(item * (page - 1), item * (page - 1) + item)
                      .map((user, index) => (
                        <tr
                          className="traderdetails__table__body__tr"
                          key={`user-${index}`}
                        >
                          <TraderPaymentDetailsItem
                            name={user.name}
                            id={user.id}
                            phone={user.phoneNumber}
                            date={user.requestDate}
                            price={user.amount}
                            status={user.status}
                            packageName={user.packageName}
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
            <div className="traderdetails__none">
              트레이더 정산 내역 리스트가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TraderPaymentDetails;
