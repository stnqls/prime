import React, { useState } from "react";
import Link from "next/link";
import down from "../../../public/assets/admin-down.png";
import up from "../../../public/assets/admin-up.png";

import "./Sidebar.scss";

function Sidebar() {
  const [toggle, setToggle] = useState([true, true, true, true, true, true]);

  const toggleChange = (index) => {
    setToggle((prestate) => ({
      ...prestate,
      [index]: !prestate[index],
    }));
  };

  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        <li className="sidebar__list__top">
          <Link href="/primeadmin?page=user">
            <span className="sidebar__list__top__span">
              프라임인베스트먼트
              <br />
              어드민통합시스템
            </span>
          </Link>
        </li>
        <li className="sidebar__list__item">
          <div
            className="sidebar__list__item__title down"
            onClick={() => toggleChange(0)}
          >
            <img
              src="/images/icons/admin-user.png"
              alt="user"
              className="sidebar__list__item__title__img"
            />
            <span className="sidebar__list__item__title__span">회원관리</span>
            <img
              src={toggle[0] ? up : down}
              alt=""
              className="sidebar__list__item__title__arrow"
            />
          </div>
          <ul
            className={`sidebar__list__item__sublist ${
              toggle[0] ? "show" : ""
            }`}
          >
            <Link href="/primeadmin?page=user">
              <li className="sidebar__list__item__sublist__subitem">
                사용자 목록
              </li>
            </Link>
            <Link href="/primeadmin?page=trader">
              <li className="sidebar__list__item__sublist__subitem">
                트레이더 관리
              </li>
            </Link>
            <Link href="/primeadmin?page=adminTraderApply">
              <li className="sidebar__list__item__sublist__subitem">
                트레이더 신청 목록
              </li>
            </Link>
            <Link href="/primeadmin?page=adminSetting">
              <li className="sidebar__list__item__sublist__subitem">
                관리자 설정
              </li>
            </Link>
          </ul>
        </li>
        <li className="sidebar__list__item">
          <div
            className="sidebar__list__item__title down"
            onClick={() => toggleChange(1)}
          >
            <img
              src="/images/icons/admin-paid.png"
              alt="user"
              className="sidebar__list__item__title__img"
            />
            <span className="sidebar__list__item__title__span">입출금관리</span>
            <img
              src={toggle[1] ? up : down}
              alt=""
              className="sidebar__list__item__title__arrow"
            />
          </div>
          <ul
            className={`sidebar__list__item__sublist ${
              toggle[1] ? "show" : ""
            }`}
          >
            <Link href="/primeadmin?page=userPaymentDetails">
              <li className="sidebar__list__item__sublist__subitem">
                회원 결제 내역
              </li>
            </Link>
            <Link href="/primeadmin?page=userDeposit">
              <li className="sidebar__list__item__sublist__subitem">
                회원 입금 확인 요청
              </li>
            </Link>
            <Link href="/primeadmin?page=userRefund">
              <li className="sidebar__list__item__sublist__subitem">
                회원 환불 확인 요청
              </li>
            </Link>
            <Link href="/primeadmin?page=traderPaymentRequest">
              <li className="sidebar__list__item__sublist__subitem">
                트레이더 정산 요청
              </li>
            </Link>
            <Link href="/primeadmin?page=traderPaymentDetails">
              <li className="sidebar__list__item__sublist__subitem">
                트레이더 정산 내역
              </li>
            </Link>
          </ul>
        </li>
        <li className="sidebar__list__item">
          <div
            className="sidebar__list__item__title down"
            onClick={() => toggleChange(2)}
          >
            <img
              src="/images/icons/admin-forum.png"
              alt="user"
              className="sidebar__list__item__title__img"
            />
            <span className="sidebar__list__item__title__span">
              커뮤니티 관리
            </span>
            <img
              src={toggle[2] ? up : down}
              alt=""
              className="sidebar__list__item__title__arrow"
            />
          </div>
          <ul
            className={`sidebar__list__item__sublist ${
              toggle[2] ? "show" : ""
            }`}
          >
            <Link href="/primeadmin?page=board">
              <li className="sidebar__list__item__sublist__subitem">
                게시판 관리
              </li>
            </Link>
            <Link href="/primeadmin?page=comments">
              <li className="sidebar__list__item__sublist__subitem">
                댓글 관리
              </li>
            </Link>
            <Link href="/primeadmin?page=reviews">
              <li className="sidebar__list__item__sublist__subitem">
                이용후기 관리
              </li>
            </Link>
          </ul>
        </li>
        <li className="sidebar__list__item">
          <Link href="/primeadmin?page=indicator">
            <div className="sidebar__list__item__title down">
              <img
                src="/images/icons/indicator.png"
                alt="user"
                className="sidebar__list__item__title__img"
              />
              <span className="sidebar__list__item__title">지표</span>
            </div>
          </Link>
        </li>

        <li className="sidebar__list__item">
          <div
            className="sidebar__list__item__title down"
            onClick={() => toggleChange(4)}
          >
            <img
              src="/images/icons/admin-support.png"
              alt="user"
              className="sidebar__list__item__title__img"
            />
            <span className="sidebar__list__item__title__span">고객센터</span>
            <img
              src={toggle[4] ? up : down}
              alt=""
              className="sidebar__list__item__title__arrow"
            />
          </div>
          <ul
            className={`sidebar__list__item__sublist ${
              toggle[4] ? "show" : ""
            }`}
          >
            <Link href="/primeadmin?page=adminFaq">
              <li className="sidebar__list__item__sublist__subitem">FAQ</li>
            </Link>
            <Link href="/primeadmin?page=adminInquiry">
              <li className="sidebar__list__item__sublist__subitem">1:1문의</li>
            </Link>
            <Link href="/primeadmin?page=adminNotice">
              <li className="sidebar__list__item__sublist__subitem">
                공지사항
              </li>
            </Link>
            <Link href="/primeadmin?page=adminPartnership">
              <li className="sidebar__list__item__sublist__subitem">
                사업제휴
              </li>
            </Link>
          </ul>
        </li>
        <li className="sidebar__list__item">
          <div
            className="sidebar__list__item__title down"
            onClick={() => toggleChange(5)}
          >
            <img
              src="/images/icons/admin-message.png"
              alt="user"
              className="sidebar__list__item__title__img"
            />
            <span className="sidebar__list__item__title__span">쪽지함</span>
            <img
              src={toggle[5] ? up : down}
              alt=""
              className="sidebar__list__item__title__arrow"
            />
          </div>
          <ul
            className={`sidebar__list__item__sublist ${
              toggle[5] ? "show" : ""
            }`}
          >
            <Link href="/primeadmin?page=adminMessage">
              <li className="sidebar__list__item__sublist__subitem">쪽지함</li>
            </Link>
          </ul>
        </li>
        {/* <li className="sidebar__list__item">
          <div className="sidebar__list__item__title">
            <img
              src="/images/graph.png"
              alt="user"
              className="sidebar__list__item__title__img"
            />
            <span className="sidebar__list__item__title__span">
              프라임 지표
            </span>
          </div>
        </li> */}
        {/* <li className="sidebar__list__item">
          <div
            className="sidebar__list__item__title down"
            onClick={() => toggleChange(3)}
          >
            <img
              src="/images/sms.png"
              alt="user"
              className="sidebar__list__item__title__img"
            />
            <span className="sidebar__list__item__title__span">1:1 문의</span>
            <img
              src={toggle[3] ? up : down}
              alt=""
              className="sidebar__list__item__title__arrow"
            />
          </div>
          <ul
            className={`sidebar__list__item__sublist ${
              toggle[3] ? "show" : ""
            }`}
          >
            <li className="sidebar__list__item__sublist__subitem">1:1 문의</li>
            <li className="sidebar__list__item__sublist__subitem">
              자주묻는 질문
            </li>
          </ul>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
