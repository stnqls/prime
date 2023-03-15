import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import Lee from "../../../../lib/Lee";

import InquiryList from "./InquiryList";

import "./AdminInquiry.scss";

function AdminInquiry() {
  const [toggle, setToggle] = useState(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);
  function pageChange(page) {
    setPage(page);
  }

  function getData() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/inquiry",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getData);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("오류가 발생하였습니다.");
        console.log(err);
      });
  }

  const searchdatas = data.filter((val) => {
    if (search === "") {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="admin-inquiry">
      <div className="admin-inquiry__content">
        <div className="admin-inquiry__content__header">
          <ul className="admin-inquiry__content__header__title">
            <li
              className={
                toggle === 0
                  ? "admin-inquiry__content__header__title__item--click"
                  : "admin-inquiry__content__header__title__item"
              }
              onClick={() => {
                setToggle(0);
              }}
            >
              전체
            </li>
            <li
              className={
                toggle === 1
                  ? "admin-inquiry__content__header__title__item--click"
                  : "admin-inquiry__content__header__title__item"
              }
              onClick={() => {
                setToggle(1);
              }}
            >
              회원
            </li>
            <li
              className={
                toggle === 2
                  ? "admin-inquiry__content__header__title__item--click"
                  : "admin-inquiry__content__header__title__item"
              }
              onClick={() => {
                setToggle(2);
              }}
            >
              트레이더
            </li>
          </ul>
          <input
            type="text"
            placeholder="이름으로 검색하기"
            className="admin-inquiry__content__header__search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {data && data.length > 0 ? (
          <div className="admin-inquiry__content__body">
            <table className="admin-inquiry__table">
              <thead className="admin-inquiry__table__head">
                <tr className="admin-inquiry__table__head__tr">
                  <td className="admin-inquiry__table__head__email">회원ID</td>
                  <td className="admin-inquiry__table__head__name">이름</td>
                  <td className="admin-inquiry__table__head__email">이메일</td>
                  <td className="admin-inquiry__table__head__category">
                    문의유형
                  </td>
                  <td className="admin-inquiry__table__head__title">제목</td>
                  <td className="admin-inquiry__table__head__date">등록일</td>
                  <td className="admin-inquiry__table__head__status">
                    읽음표시
                  </td>
                </tr>
              </thead>
              <tbody className="admin-inquiry__table__body">
                {toggle === 0 &&
                  searchdatas
                    .slice(item * (page - 1), item * (page - 1) + item)
                    .map((item, index) => (
                      <InquiryList
                        key={`admin-inquiry-${index}`}
                        title={item.title}
                        categoryCode={item.categoryCode}
                        name={item.name}
                        date={item.date.slice(0, 10)}
                        status={item.status}
                        content={item.content}
                        email={item.email}
                        id={item.id}
                        phoneNumber={item.phoneNumber}
                        memberId={item.memberId}
                      />
                    ))}
                {toggle === 1 &&
                  searchdatas
                    .slice(item * (page - 1), item * (page - 1) + item)
                    .map(
                      (item, index) =>
                        item.categoryCode === "201" && (
                          <InquiryList
                            key={`admin-inquiry-${index}`}
                            title={item.title}
                            categoryCode={item.categoryCode}
                            name={item.name}
                            date={item.date.slice(0, 10)}
                            status={item.status}
                            content={item.content}
                            email={item.email}
                            id={item.id}
                            phoneNumber={item.phoneNumber}
                            memberId={item.memberId}
                          />
                        )
                    )}
                {toggle === 2 &&
                  searchdatas
                    .slice(item * (page - 1), item * (page - 1) + item)
                    .map(
                      (item, index) =>
                        item.categoryCode === "202" && (
                          <InquiryList
                            key={`admin-inquiry-${index}`}
                            title={item.title}
                            categoryCode={item.categoryCode}
                            name={item.name}
                            date={item.date.slice(0, 10)}
                            status={item.status}
                            content={item.content}
                            email={item.email}
                            id={item.id}
                            phoneNumber={item.phoneNumber}
                            memberId={item.memberId}
                          />
                        )
                    )}
              </tbody>
            </table>
            {searchdatas.length > 0 ? (
              <Pagination
                totalItemsCount={searchdatas.length}
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
          <div className="admin-inquiry__content__none">
            등록된 문의가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminInquiry;
