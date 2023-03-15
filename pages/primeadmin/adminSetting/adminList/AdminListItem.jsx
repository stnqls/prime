import React from "react";
import "./AdminListItem.scss";

function AdminListItem(props) {
  return (
    <li className="adminlist__item">
      <ul className="adminlist__item__info">
        <li className="adminlist__item__info__list">이름: {props.name}</li>
        <li className="adminlist__item__info__list">id: {props.id} </li>
      </ul>
      {/* <img
        src="/images/close.png"
        alt="close"
        className="adminlist__item__close"
      /> */}
    </li>
  );
}

export default AdminListItem;
