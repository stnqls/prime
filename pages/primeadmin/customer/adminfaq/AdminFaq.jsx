import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Lee from "../../../../lib/Lee";
import EntireFaq from "../../../../components/adminCustomer/EntireFaq";
import "./AdminFaq.scss";

const AddFaq = dynamic(import("../../modal/AddFaq"), {
  ssr: false,
});

function AdminFaq() {
  const [toggle, setToggle] = useState(0);
  const [total, setTotal] = useState([]);
  const [common, setCommon] = useState([]);
  const [member, setMember] = useState([]);
  const [trader, setTrader] = useState([]);
  const [modal, setModal] = useState(false);

  function getData() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/faq",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setCommon(res.data.data.commonArray);
          setMember(res.data.data.memberArray);
          setTrader(res.data.data.traderArray);
          setTotal([
            ...res.data.data.commonArray,
            ...res.data.data.memberArray,
            ...res.data.data.traderArray,
          ]);
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
      });
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      {modal && <AddFaq setModal={setModal} />}
      <div className="admin-faq">
        <div className="admin-faq__content">
          <div className="admin-faq__content__header">
            <ul className="admin-faq__content__header__title">
              <li
                className={
                  toggle === 0
                    ? "admin-faq__content__header__title__item--click"
                    : "admin-faq__content__header__title__item"
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
                    ? "admin-faq__content__header__title__item--click"
                    : "admin-faq__content__header__title__item"
                }
                onClick={() => {
                  setToggle(1);
                }}
              >
                공통
              </li>
              <li
                className={
                  toggle === 2
                    ? "admin-faq__content__header__title__item--click"
                    : "admin-faq__content__header__title__item"
                }
                onClick={() => {
                  setToggle(2);
                }}
              >
                회원
              </li>
              <li
                className={
                  toggle === 3
                    ? "admin-faq__content__header__title__item--click"
                    : "admin-faq__content__header__title__item"
                }
                onClick={() => {
                  setToggle(3);
                }}
              >
                트레이더
              </li>
            </ul>
            <button
              className="admin-faq__content__header__addbtn"
              onClick={() => {
                setModal(true);
              }}
            >
              추가하기
            </button>
          </div>
          {toggle === 0 && total.length > 0 && <EntireFaq data={total} />}
          {toggle === 1 && common.length > 0 && <EntireFaq data={common} />}
          {toggle === 2 && member.length > 0 && <EntireFaq data={member} />}
          {toggle === 3 && trader.length > 0 && <EntireFaq data={trader} />}
        </div>
      </div>
    </React.Fragment>
  );
}

export default AdminFaq;
