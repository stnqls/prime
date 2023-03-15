import React, { useEffect, useState } from "react";
import "./UserDeposit.scss";
import DepositItem from "./DepositItem";
import axios from "axios";
import Lee from "../../../../lib/Lee";
import Pagination from "react-js-pagination";

function UserDeposit() {
  const [userDeposit, setUserDeposit] = useState([]);
  const [filterPayment, setFilterPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortStatus, setSortStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);
  function pageChange(page) {
    setPage(page);
  }

  function getUserDeposit() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/payments/depositReq",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setUserDeposit(data);
          setFilterPayment(data);
          setLoading(false);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(UserDeposit);
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
    const filters = userDeposit.filter((val) => {
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
        return a.phoneNumber < b.phoneNumber
          ? -1
          : a.phoneNumber > b.phoneNumber
          ? 1
          : 0;
      });
    }

    if (sortStatus === 3) {
      sorts = filters.sort(function (a, b) {
        return a.packageName < b.packageName
          ? -1
          : a.packageName > b.packageName
          ? 1
          : 0;
      });
    }

    if (sortStatus === 4) {
      sorts = filters.sort(function (a, b) {
        return a.memberId < b.memberId ? -1 : a.memberId > b.memberId ? 1 : 0;
      });
    }

    if (sortStatus === 5) {
      sorts = filters.sort(function (a, b) {
        return a.paymentType > b.paymentType
          ? -1
          : a.paymentType < b.paymentType
          ? 1
          : 0;
      });
    }

    if (sortStatus === 6) {
      sorts = filters.sort(function (a, b) {
        return a.requestDate > b.requestDate
          ? -1
          : a.requestDate < b.requestDate
          ? 1
          : 0;
      });
    }

    if (sortStatus === 7) {
      sorts = filters.sort(function (a, b) {
        return a.price > b.price ? -1 : a.price < b.price ? 1 : 0;
      });
    }

    setFilterPayment(sorts);
  }

  useEffect(() => {
    getUserDeposit();
  }, []);

  useEffect(() => {
    textFilter();
  }, [searchText, sortStatus]);

  return (
    <div className="userdeposit">
      {!loading && (
        <div className="userdeposit__content">
          <div className="userdeposit__content__header">
            <span className="userdeposit__content__header__title">
              입금 확인
            </span>
            <div className="userdeposit__content__header__search">
              <input
                type="text"
                className="userdeposit__content__header__search__input"
                placeholder="성함으로 검색하기"
                value={searchText}
                onChange={function (e) {
                  setSearchText(e.target.value);
                }}
              />
            </div>
          </div>
          {userDeposit && userDeposit.length > 0 ? (
            <div className="userdeposit__content__body">
              <table className="userdeposit__content__body__table userdeposit__table">
                <thead className="userdeposit__table__head">
                  <tr className="userdeposit__table__head__tr">
                    <td
                      className="userdeposit__table__head__name"
                      onClick={function () {
                        setSortStatus(1);
                      }}
                    >
                      성함
                    </td>
                    <td
                      className="userdeposit__table__head__phone"
                      onClick={function () {
                        setSortStatus(2);
                      }}
                    >
                      전화번호
                    </td>
                    <td
                      className="userdeposit__table__head__package"
                      onClick={function () {
                        setSortStatus(3);
                      }}
                    >
                      패키지명
                    </td>
                    <td
                      className="userdeposit__table__head__id"
                      onClick={function () {
                        setSortStatus(4);
                      }}
                    >
                      유저ID
                    </td>
                    <td
                      className="userdeposit__table__head__method"
                      onClick={function () {
                        setSortStatus(5);
                      }}
                    >
                      결제방식
                    </td>
                    <td
                      className="userdeposit__table__head__date"
                      onClick={function () {
                        setSortStatus(6);
                      }}
                    >
                      일시
                    </td>
                    <td
                      className="userdeposit__table__head__price"
                      onClick={function () {
                        setSortStatus(7);
                      }}
                    >
                      금액
                    </td>
                    <td className="userdeposit__table__head__approval">
                      결제승인
                    </td>
                    <td className="userdeposit__table__head__cancel">
                      승인취소
                    </td>
                  </tr>
                </thead>
                <tbody className="userdeposit__table__body">
                  {filterPayment
                    .slice(item * (page - 1), item * (page - 1) + item)
                    .map((user, index) => (
                      <tr
                        className="userdeposit__table__body__tr"
                        key={`user-${index}`}
                      >
                        <DepositItem
                          name={user.memberName}
                          phone={user.phoneNumber}
                          method={user.paymentType}
                          date={user.requestDate}
                          price={user.price}
                          paymentId={user.paymentId}
                          packageName={user.packageName}
                          packageId={user.packageId}
                          traderId={user.traderId}
                          memberId={user.memberId}
                          subscriptionId={user.subscriptionId}
                          approval={"결제 승인"}
                          cancel={"승인취소"}
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
            <div className="userdeposit__none">
              입금 확인 리스트가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDeposit;
