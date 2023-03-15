import React, { useState, useEffect } from "react";
import "./UserPaymentDetails.scss";
import UserPaymentDetailsItem from "./UserPaymentDetailsItem";
import axios from "axios";
import Lee from "../../../../lib/Lee";
import Pagination from "react-js-pagination";

function UserPaymentDetails() {
  const [userPayment, setUserPayment] = useState([]);
  const [filterPayment, setFilterPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortStatus, setSortStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);

  function pageChange(page) {
    setPage(page);
  }

  function getRefundUsers() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/payments`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setUserPayment(data);
          setFilterPayment(data);
          setLoading(false);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getRefundUsers);
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
    const filters = userPayment.filter((val) => {
      if (searchText == "") {
        return val;
      } else if (
        val.memberName.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return val;
      }
    });

    let sorts;

    if (sortStatus === 0 || sortStatus === 1) {
      sorts = filters.sort(function (a, b) {
        return a.memberName < b.memberName
          ? -1
          : a.memberName > b.memberName
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
        return a.phoneNumber < b.phoneNumber
          ? -1
          : a.phoneNumber > b.phoneNumber
          ? 1
          : 0;
      });
    }

    if (sortStatus === 4) {
      sorts = filters.sort(function (a, b) {
        return a.paymentType < b.paymentType
          ? -1
          : a.paymentType > b.paymentType
          ? 1
          : 0;
      });
    }

    if (sortStatus === 5) {
      sorts = filters.sort(function (a, b) {
        return a.requestDate > b.requestDate
          ? -1
          : a.requestDate < b.requestDate
          ? 1
          : 0;
      });
    }

    if (sortStatus === 6) {
      sorts = filters.sort(function (a, b) {
        return a.price > b.price ? -1 : a.price < b.price ? 1 : 0;
      });
    }

    if (sortStatus === 7) {
      sorts = filters.sort(function (a, b) {
        return a.status < b.status ? -1 : a.status > b.status ? 1 : 0;
      });
    }

    setFilterPayment(sorts);
  }

  useEffect(() => {
    getRefundUsers();
  }, []);

  useEffect(() => {
    textFilter();
  }, [searchText, sortStatus]);
  return (
    <div className="userpaymentdetails userdetails">
      {!loading && (
        <div className="userdetails__content">
          <div className="userdetails__content__header">
            <span className="userdetails__content__header__title">
              결제 내역
            </span>
            <div className="userdetails__content__header__search">
              <input
                type="text"
                className="userdetails__content__header__search__input"
                placeholder="성함으로 검색하기"
                value={searchText}
                onChange={function (e) {
                  setSearchText(e.target.value);
                }}
              />
            </div>
          </div>
          {userPayment && userPayment.length > 0 ? (
            <div className="userdetails__content__body">
              <table className="userdetails__content__body__table userdetails__table">
                <thead className="userdetails__table__head">
                  <tr className="userdetails__table__head__tr">
                    <td
                      className="userdetails__table__head__name"
                      onClick={function () {
                        setSortStatus(1);
                      }}
                    >
                      이름
                    </td>

                    <td
                      className="userdetails__table__head__phone"
                      onClick={function () {
                        setSortStatus(3);
                      }}
                    >
                      전화번호
                    </td>
                    <td
                      className="userdetails__table__head__package"
                      onClick={function () {
                        setSortStatus(2);
                      }}
                    >
                      패키지 이름
                    </td>
                    <td
                      className="userdetails__table__head__method"
                      onClick={function () {
                        setSortStatus(4);
                      }}
                    >
                      결제방식
                    </td>
                    <td
                      className="userdetails__table__head__price"
                      onClick={function () {
                        setSortStatus(6);
                      }}
                    >
                      금액 (결제금액/환불금액)
                    </td>
                    <td
                      className="userdetails__table__head__date"
                      onClick={function () {
                        setSortStatus(5);
                      }}
                    >
                      일시
                    </td>
                    <td
                      className="userdetails__table__head__status"
                      onClick={function () {
                        setSortStatus(7);
                      }}
                    >
                      결제여부
                    </td>
                  </tr>
                </thead>
                <tbody className="userdetails__table__body">
                  {filterPayment &&
                    filterPayment.length > 0 &&
                    filterPayment
                      .slice(item * (page - 1), item * (page - 1) + item)
                      .map((user, index) => (
                        <tr
                          className="userdetails__table__body__tr"
                          key={`user-${index}`}
                        >
                          <UserPaymentDetailsItem
                            name={user.memberName}
                            id={user.paymentId}
                            phone={user.phoneNumber}
                            method={user.paymentType}
                            requestDate={user.requestDate}
                            purchaseDate={user.purchaseDate}
                            refundDate={user.refundDate}
                            expireDate={user.expireDate}
                            price={user.price}
                            status={user.status}
                            refundAmount={user.refundAmount}
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
            <div className="userdetails__none">
              결제 내역 리스트가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserPaymentDetails;
