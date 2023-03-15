import React, { useEffect, useState } from "react";
import AdminListItem from "./AdminListItem";
import axios from "axios";
import Lee from "../../../../lib/Lee";

import "./AdminList.scss";
import Pagination from "react-js-pagination";
function AdminList() {
  const [admin, setAdmin] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [item, setItem] = useState(5);

  function getAdmin() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setAdmin(res.data.data);
          setTotalPage(res.data.data.length);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getAdmin);
          } else {
            alert("서버통신중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  }

  function pageChange(page) {
    setPage(page);
  }

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div className="adminlist-wrap">
      <ul className="adminlist">
        {admin && admin.length > 0
          ? admin
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((admin, index) => (
                <AdminListItem
                  key={`admin-list-${index}`}
                  position={"관리자"}
                  name={admin.name}
                  id={admin.id}
                />
              ))
          : "관리자가 존재하지 않습니다."}
      </ul>
      <Pagination
        totalItemsCount={totalPage} //총 아이템의 개수
        activePage={page}
        onChange={pageChange} //페이지가 바뀔때 핸들링해줄 함수
        itemsCountPerPage={item}
        nextPageText={""}
        prevPageText={""}
      />
    </div>
  );
}

export default AdminList;
