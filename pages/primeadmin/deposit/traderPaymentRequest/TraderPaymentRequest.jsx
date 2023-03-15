import React, { useEffect, useState } from "react";
import "./TraderPaymentRequest.scss";
import axios from "axios";
import Lee from "../../../../lib/Lee";
import Pagination from "react-js-pagination";
import TraderPaymentRequestItem from "./TraderPaymentRequestItem";

function TraderPaymentRequest() {
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
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/withdrawals?status=0",
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
    getTraderDeposit();
  }, []);

  useEffect(() => {
    textFilter();
  }, [searchText, sortStatus]);

  return (
    <div className="traderpaymentrequest traderrequest">
      {!loading && (
        <div className="traderrequest__content">
          <div className="traderrequest__content__header">
            <span className="traderrequest__content__header__title">
              정산 요청
            </span>
            <div className="traderrequest__content__header__search">
              <input
                type="text"
                className="traderrequest__content__header__search__input"
                placeholder="성함으로 검색하기"
                value={searchText}
                onChange={function (e) {
                  setSearchText(e.target.value);
                }}
              />
            </div>
          </div>
          {traderDeposit && traderDeposit.length > 0 ? (
            <div className="traderrequest__content__body">
              <table className="traderrequest__body__table traderrequest__table">
                <thead className="traderrequest__table__head">
                  <tr className="traderrequest__table__head__tr">
                    <td className="traderrequest__table__head__tradername">
                      트레이더 이름
                    </td>
                    <td className="traderrequest__table__head__phone">
                      전화번호
                    </td>
                    <td className="traderrequest__table__head__package">
                      패키지 이름
                    </td>
                    <td className="traderrequest__table__head__price">금액</td>
                    <td className="traderrequest__table__head__date">일시</td>
                    <td className="traderrequest__table__head__approval">
                      정산 승인
                    </td>
                    <td className="traderrequest__table__head__deny">
                      정산 거절
                    </td>
                  </tr>
                </thead>
                <tbody className="traderrequest__table__body">
                  {filterPayment &&
                    filterPayment.length > 0 &&
                    filterPayment
                      .slice(item * (page - 1), item * (page - 1) + item)
                      .map((user, index) => (
                        <tr
                          className="traderrequest__table__body__tr"
                          key={`user-${index}`}
                        >
                          <TraderPaymentRequestItem
                            name={user.name}
                            nickname={user.nickname}
                            id={user.id}
                            phone={user.phoneNumber}
                            date={user.requestDate}
                            price={user.amount}
                            approval={"승인하기"}
                            // paymentId={user.paymentIds[0]}
                            deny={"승인거절"}
                            packageName={user.packageName}
                          />
                        </tr>
                      ))}
                </tbody>
              </table>
              {filterPayment && filterPayment.length > 0 ? (
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
            <div className="traderrequest__content__none">
              트레이더 정산 요청 리스트가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TraderPaymentRequest;
