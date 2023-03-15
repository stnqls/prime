import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import DelayLink from "../../../lib/DelayLink";
import Lee from "../../../lib/Lee";

import "./UserSidebar.scss";

const UserSidebar = (props: any) => {
  const [toggle, setToggle] = useState([false, false, false]);
  const [menu, setMenu]: any = useState([]);

  const changeToggle = (idx: number) => {
    setToggle((pre: any) => ({
      ...pre,
      [idx]: !pre[idx],
    }));
  };

  const clickedMenu = (idx: number) => {
    const newArr = Array(8).fill(false);
    newArr[idx] = true;
    setMenu(newArr);
  };

  const selectSubmenu = (target: number) => {
    const items = Lee.gets("user-sidebar__list__item__sublist__item");
    const item = Lee.get(`sublist${target}`);
    for (let i = 0; i < items.length; i++) {
      Lee.removeClass(items[i], "selected");
    }
    Lee.addClass(item, "selected");
  };

  const router = useRouter();

  return (
    <div className="user-sidebar">
      <ul className="user-sidebar__list">
        <li className={`user-sidebar__list__item`}>
          <div
            className={`user-sidebar__list__item__title ${
              router.query.page === "userModify" ? "menu" : ""
            }`}
            onClick={() => {
              changeToggle(0);
              clickedMenu(0);
            }}
          >
            회원
          </div>
          <ul
            className={`user-sidebar__list__item__sublist${
              toggle[0] ? " show" : ""
            }`}
          >
            <Link href="/user?page=userModify">
              <li
                className="user-sidebar__list__item__sublist__item"
                id="sublist0"
                onClick={() => {
                  router.query.page === "userModify" && selectSubmenu(0);
                }}
              >
                회원정보
              </li>
            </Link>
            <Link href="/user?page=alert">
              <li
                className="user-sidebar__list__item__sublist__item"
                id="sublist1"
                onClick={() => {
                  router.query.page === "alert" && selectSubmenu(1);
                }}
              >
                알림
              </li>
            </Link>
          </ul>
        </li>

        {props.role === "member" ? (
          <Link href="/user?page=traderApply">
            <li className={`user-sidebar__list__item`}>
              <div
                className={`user-sidebar__list__item__title  ${
                  router.query.page === "traderApply" ? "menu" : ""
                }`}
                onClick={() => {
                  changeToggle(1);
                  clickedMenu(1);
                }}
              >
                트레이더
              </div>
            </li>
          </Link>
        ) : (
          <li className={`user-sidebar__list__item`}>
            <div
              className={`user-sidebar__list__item__title ${
                (toggle[1] && router.query.page === "traderStatus") ||
                router.query.page === "traderPackage" ||
                router.query.page === "traderPick" ||
                router.query.page === "traderAdjustment"
                  ? "menu"
                  : ""
              }`}
              onClick={() => {
                changeToggle(1);
                clickedMenu(1);
              }}
            >
              트레이더
            </div>
            <ul
              className={`user-sidebar__list__item__sublist${
                toggle[1] ? " show" : ""
              }`}
            >
              <Link href="/user?page=traderStatus">
                <li
                  className="user-sidebar__list__item__sublist__item"
                  id="sublist2"
                  onClick={() => {
                    router.query.page === "traderStatus" && selectSubmenu(2);
                  }}
                >
                  트레이더 정보
                </li>
              </Link>
              <Link href="/user?page=traderPackage">
                <li
                  className="user-sidebar__list__item__sublist__item"
                  id="sublist3"
                  onClick={() => {
                    selectSubmenu(3);
                  }}
                >
                  패키지관리
                </li>
              </Link>
              <Link href="/user?page=traderPick">
                <li
                  className="user-sidebar__list__item__sublist__item"
                  id="sublist4"
                  onClick={() => {
                    selectSubmenu(4);
                  }}
                >
                  픽관리
                </li>
              </Link>
              <Link href="/user?page=traderAdjustment">
                <li
                  className="user-sidebar__list__item__sublist__item"
                  id="sublist5"
                  onClick={() => {
                    selectSubmenu(5);
                  }}
                >
                  정산내역
                </li>
              </Link>
            </ul>
          </li>
        )}
        <li className="user-sidebar__list__item">
          <div
            className={`user-sidebar__list__item__title ${
              router.query.page === "userPackage" ? "menu" : ""
            }`}
            onClick={() => {
              changeToggle(2);
              clickedMenu(2);
            }}
          >
            구독관리
          </div>
          <ul
            className={`user-sidebar__list__item__sublist${
              toggle[2] ? " show" : ""
            }`}
          >
            <Link href="/user?page=userPackage">
              <li
                className="user-sidebar__list__item__sublist__item"
                id="sublist6"
                onClick={() => {
                  selectSubmenu(6);
                }}
              >
                패키지
              </li>
            </Link>
            <Link href="/user?page=userPick">
              <li
                className="user-sidebar__list__item__sublist__item"
                id="sublist7"
                onClick={() => {
                  selectSubmenu(7);
                }}
              >
                픽 리스트
              </li>
            </Link>
          </ul>
        </li>
        <Link href="/user?page=payment">
          <li className="user-sidebar__list__item">
            <div
              className={`user-sidebar__list__item__title ${
                router.query.page === "payment" ? "menu" : ""
              }`}
              onClick={() => {
                clickedMenu(3);
              }}
            >
              결제내역
            </div>
          </li>
        </Link>
        <Link href="/user?page=messages">
          <li className="user-sidebar__list__item">
            <div
              className={`user-sidebar__list__item__title ${
                router.query.page === "messages" ? "menu" : ""
              }`}
              onClick={() => {
                clickedMenu(4);
              }}
            >
              쪽지함
            </div>
          </li>
        </Link>

        <li className="user-sidebar__list__item">
          <div
            className={`user-sidebar__list__item__title ${
              (toggle[3] && router.query.page === "communityBoard") ||
              router.query.page === "communityComments"
                ? "menu"
                : ""
            }`}
            onClick={() => {
              changeToggle(3);
              clickedMenu(5);
            }}
          >
            커뮤니티
          </div>
          <ul
            className={`user-sidebar__list__item__sublist${
              toggle[3] ? " show" : ""
            }`}
          >
            <Link href="/user?page=communityBoard">
              <li
                className="user-sidebar__list__item__sublist__item"
                id="sublist8"
                onClick={() => {
                  selectSubmenu(8);
                }}
              >
                내가 쓴 게시글
              </li>
            </Link>
            <Link href="/user?page=communityComments">
              <li
                className="user-sidebar__list__item__sublist__item"
                id="sublist9"
                onClick={() => {
                  selectSubmenu(9);
                }}
              >
                내가 쓴 댓글
              </li>
            </Link>

            <Link href="/user?page=userReview">
              <li
                className="user-sidebar__list__item__sublist__item"
                id="sublist10"
                onClick={() => {
                  selectSubmenu(10);
                }}
              >
                내가 쓴 후기
              </li>
            </Link>
          </ul>
        </li>
        <Link href="/user?page=userInquiry">
          <li className="user-sidebar__list__item">
            <div
              className={`user-sidebar__list__item__title ${
                router.query.page === "userInquiry" ? "menu" : ""
              }`}
              onClick={() => {
                clickedMenu(6);
              }}
            >
              1:1문의
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default UserSidebar;
