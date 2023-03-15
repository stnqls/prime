import React from "react";
import "./AdminmodifyItem.scss";

function AdminmodifyItem(props) {
  return (
    <tr className="adminmodify__tabel__body__tr">
      <td className="adminmodify__table__body__category">{props.title}</td>
      <td className="adminmodify__table__body__main">
        <input type="checkbox" name="" id="" />
      </td>
      <td className="adminmodify__table__body__sub">
        <input type="checkbox" name="" id="" />
      </td>
      <td className="adminmodify__table__body__edit">
        <input type="checkbox" name="" id="" />
      </td>
    </tr>
  );
}

export default AdminmodifyItem;
