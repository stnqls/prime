import React, { useState } from "react";
import "./AddAdmin.scss";
import axios from "axios";

function AddAdmin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  function submitAdmin() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };

    axios({
      method: "POST",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/register",
      headers,
      data: {
        id: id,
        password: password,
        name: name,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("관리자 생성이 완료되었습니다.");
          clean();
        } else {
          alert("관리자가 중복 되거나 생성 중 오류가 발생했습니다.");
        }
      })
      .catch((err) => {
        window.alert("에러");
      });
  }

  function clean() {
    setId("");
    setName("");
    setPassword("");
  }

  return (
    <div className="addadmin">
      {/* <h1 className="addadmin__title">새 관리자 생성</h1> */}
      <ul className="addadmin__list">
        <li className="addadmin__list__item">
          <input
            type="text"
            className="addadmin__list__item__id addadmin__input"
            placeholder="ID"
            value={id}
            onChange={function (e) {
              setId(e.target.value);
            }}
          />
        </li>
        <li className="addadmin__list__item">
          <input
            type="text"
            className="addadmin__list__item__name addadmin__input"
            placeholder="관리자 이름"
            value={name}
            onChange={function (e) {
              setName(e.target.value);
            }}
          />
        </li>
        <li className="addadmin__list__item">
          <input
            type="password"
            className="addadmin__list__item__qw addadmin__input"
            placeholder="비밀번호"
            value={password}
            onChange={function (e) {
              setPassword(e.target.value), setCount(e.target.value.length);
            }}
          />
        </li>
      </ul>
      <button
        type="button"
        className="addadmin__btn"
        onClick={function () {
          if (count >= 6) {
            submitAdmin();
          } else return window.alert("비밀번호는 6자리이상 입력하세요.");
        }}
      >
        관리자 생성
      </button>
    </div>
  );
}

export default AddAdmin;
