import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import Lee from "../../../../lib/Lee";

import "./AdminTraderApply.scss";
import AdminTraderApplyItem from "./AdminTraderApplyItem";

const AdminTraderApply = () => {
  const [applyList, setApplyList] = useState([]);
  const [page, setPage] = useState(1);
  const [item] = useState(7);

  function pageChange(page: any) {
    setPage(page);
  }

  function getApplyList() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/users/apply_trader",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setApplyList(res.data.data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getApplyList);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getApplyList();
  }, []);

  return (
    <div className="admin-trader-apply">
      {applyList.length > 0 ? (
        <table className="admin-trader-apply__table">
          <thead className="admin-trader-apply__table__head">
            <tr className="admin-trader-apply__table__head__tr">
              <td>성함</td>
              <td>닉네임</td>
              <td>전화번호</td>
              <td>이메일</td>
              <td>신청일자</td>
              <td>수락/거절하기</td>
            </tr>
          </thead>
          <tbody className="admin-trader-apply__table__body">
            {applyList.map((item: any, index: number) => (
              <AdminTraderApplyItem
                key={`admin-trader-apply-list-${index}`}
                name={item.name}
                nickname={item.nickname}
                phoneNumber={item.phoneNumber}
                email={item.email}
                date={item.date}
                id={item.id}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="admin-trader-apply__none">
          트레이더 신청회원이 없습니다.
        </div>
      )}
      {applyList.length > 0 && (
        <Pagination
          totalItemsCount={applyList.length}
          activePage={page}
          onChange={pageChange}
          itemsCountPerPage={item}
          firstPageText={""}
          lastPageText={""}
          nextPageText={""}
          prevPageText={""}
        />
      )}
    </div>
  );
};

export default AdminTraderApply;
