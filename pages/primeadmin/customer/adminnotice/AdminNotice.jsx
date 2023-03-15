import axios from "axios";
import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import AdminNoticeItem from "./AdminNoticeItem";
import "./AdminNotice.scss";
import dynamic from "next/dynamic";
import Pagination from "react-js-pagination";

const AddNotice = dynamic(import("../../modal/AddNotice"), {
  ssr: false,
});

function AdminNotice() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
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
      headers,
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/notice",
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
        alert("오류가 발생하였습니다.");
        console.log(err);
      });
  }

  const searchdatas = data.filter((val) => {
    if (search === "") {
      return val;
    } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <div className="admin-notice">
        <div className="admin-notice__content">
          <div className="admin-notice__content__header">
            <input
              type="text"
              placeholder="제목으로 검색하기"
              className="admin-notice__content__header__search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              className="admin-notice__content__header__addbtn"
              onClick={() => setModal(true)}
            >
              추가하기
            </button>
          </div>

          <table className="admin-notice__content__body admin-notice__table">
            <thead className="admin-notice__table__head">
              <tr className="admin-notice__table__head__tr">
                <td className="admin-notice__table__head__no">NO</td>
                <td className="admin-notice__table__head__title">제목</td>
                <td className="admin-notice__table__head__nickname">닉네임</td>
                <td className="admin-notice__table__head__date">등록일</td>
              </tr>
            </thead>
            <tbody className="admin-notice__table__body">
              {searchdatas
                .slice(item * (page - 1), item * (page - 1) + item)
                .map((items, index) => (
                  <AdminNoticeItem
                    key={`admin-notice-${index}`}
                    adminId={items.adminId}
                    content={items.content}
                    date={items.date}
                    id={items.id}
                    title={items.title}
                    no={searchdatas.length - item * (page - 1) - index}
                    adminName={items.adminName}
                  />
                ))}
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
      </div>
      {modal && <AddNotice setModal={setModal} />}
    </React.Fragment>
  );
}

export default AdminNotice;
