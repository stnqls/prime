import React from "react";
import "./Adminmodify.scss";
import AdminmodifyItem from "./AdminmodifyItem";

function Adminmodify() {
  return (
    <div className="adminmodify">
      <table className="adminmodify__table">
        <thead className="adminmodify__table__head">
          <tr className="adminmodify__table__tr">
            <td className="adminmodify__table__head__category">항목</td>
            <td className="adminmodify__table__head__main">메인 운영자</td>
            <td className="adminmodify__table__head__sub">서브 운영자</td>
            <td className="adminmodify__tabel__head__edit">편집자/에디터</td>
          </tr>
        </thead>
        <tbody className="adminmodify__table__body">
          <AdminmodifyItem title={"회원관리"} />
          <AdminmodifyItem title={"입금관리"} />
          <AdminmodifyItem title={"제휴관리"} />
          <AdminmodifyItem title={"커뮤니티 관리"} />
          <AdminmodifyItem title={"프라임 지표"} />
          <AdminmodifyItem title={"1:1 문의"} />
        </tbody>
      </table>
      <button type="button" className="adminmodify__table__btn">
        수정하기
      </button>
    </div>
  );
}

export default Adminmodify;
