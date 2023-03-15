import React from "react";
import AddAdmin from "./addAdmin/AddAdmin";
import AdminList from "./adminList/AdminList";
import "./AdminSetting.scss";

function AdminSetting() {
  return (
    <div className="adminsetting">
      <div className="adminsetting__content">
        <div className="adminsetting__content__header">
          <span className="adminsetting__content__header__title">
            관리자 생성
          </span>
          {/* <ul className="adminsetting__content__header__count">
            <li className="adminsetting__content__header__count__list">
              <span>메인 운영자</span>
              <span className="adminsetting__content__header__count__num">
                1
              </span>
            </li>
            <li className="adminsetting__content__header__count__list">
              <span>서브 운영자</span>
              <span className="adminsetting__content__header__count__num">
                2
              </span>
            </li>
            <li className="adminsetting__content__header__count__list">
              <span>편집자/에디터</span>
              <span className="adminsetting__content__header__count__num">
                0
              </span>
            </li>
          </ul> */}
        </div>
        <div className="adminsetting__content__body">
          <AddAdmin />
          <AdminList />
        </div>
      </div>
    </div>
  );
}

export default AdminSetting;
