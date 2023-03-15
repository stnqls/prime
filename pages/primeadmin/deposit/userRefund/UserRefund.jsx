import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import Lee from "../../../../lib/Lee";
import RefundItem from "./RefundItem";
import "./UserRefund.scss";

function UserRefund() {
  const [refundUsers, setRefundUsers] = useState([]);
  const [filterPayment, setFilterPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortStatus, setSortStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);
  const [memo, setMemo] = useState(false);

  function pageChange(page) {
    setPage(page);
  }

  // const showMemo = (index) => {
  //   setMemo((i) => ({
  //     ...i,
  //     [index]: !i[index],
  //   }));
  // };

  function getRefundUsers() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/payments/refund",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setRefundUsers(data);
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
    const filters = refundUsers.filter((val) => {
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
        return a.price > b.price ? -1 : a.price < b.price ? 1 : 0;
      });
    }

    if (sortStatus === 7) {
      sorts = filters.sort(function (a, b) {
        return a.refundAmount > b.refundAmount
          ? -1
          : a.refundAmount < b.refundAmount
          ? 1
          : 0;
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
    <div className="userrefund">
      {!loading && (
        <div className="userrefund__content">
          <div className="userrefund__content__header">
            <span className="userrefund__content__header__title">
              환불 확인
            </span>
            {refundUsers && refundUsers.length > 0 && (
              <div className="userrefund__content__header__search">
                <input
                  type="text"
                  className="userrefund__content__header__search__input"
                  placeholder="성함으로 검색하기"
                  value={searchText}
                  onChange={function (e) {
                    setSearchText(e.target.value);
                  }}
                />
              </div>
            )}
          </div>
          {refundUsers && refundUsers.length > 0 ? (
            <div className="userrefund__content__body">
              <table className="userrefund__content__body__table userrefund__table">
                <thead className="userrefund__table__head">
                  <tr className="userrefund__table__head__tr">
                    <td
                      className="userrefund__table__head__name"
                      onClick={function () {
                        setSortStatus(1);
                      }}
                    >
                      성함
                    </td>
                    {/* <td className="userrefund__table__head__id">결제ID</td> */}
                    <td
                      className="userrefund__table__head__phone"
                      onClick={function () {
                        setSortStatus(2);
                      }}
                    >
                      전화번호
                    </td>
                    <td
                      className="userrefund__table__head__package-name"
                      onClick={function () {
                        setSortStatus(3);
                      }}
                    >
                      패키지명
                    </td>
                    <td
                      className="userrefund__table__head__method"
                      onClick={function () {
                        setSortStatus(4);
                      }}
                    >
                      결제방식
                    </td>
                    <td
                      className="userrefund__table__head__date"
                      onClick={function () {
                        setSortStatus(5);
                      }}
                    >
                      일시
                    </td>
                    <td
                      className="userrefund__table__head__price"
                      onClick={function () {
                        setSortStatus(6);
                      }}
                    >
                      패키지 금액
                    </td>
                    <td
                      className="userrefund__table__head__refund-price"
                      onClick={function () {
                        setSortStatus(7);
                      }}
                    >
                      예상환불액
                    </td>
                    <td className="userrefund__table__head__final-price">
                      최종환불액
                    </td>
                    <td className="userrefund__table__head__approval">
                      환불승인
                    </td>
                    <td className="userrefund__table__head__reject">
                      환불거절
                    </td>
                  </tr>
                </thead>
                <tbody className="userrefund__table__body">
                  {filterPayment
                    .slice(item * (page - 1), item * (page - 1) + item)
                    .map((user, index) => (
                      <RefundItem
                        key={`user-${index}`}
                        name={user.memberName}
                        packageName={user.packageName}
                        paymentId={user.id}
                        traderId={user.traderId}
                        memberId={user.memberId}
                        subscriptionId={user.subscriptionId}
                        phone={user.phoneNumber}
                        method={user.paymentType}
                        date={user.requestDate}
                        price={user.price}
                        refundPrice={user.refundAmount}
                        refundMemo={user.refundMemo}
                        index={index}
                      />
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
            <div className="userrefund__none">환불 요청 리스트가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserRefund;
