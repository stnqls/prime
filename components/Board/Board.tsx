import React, { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import Lee from "../../lib/Lee";

import BoardItem from "./BoardItem/BoardItem";
import "./Board.scss";

const Board = (props: any) => {
  const categoryCode: any = props.code;
  const [data, setData]: any = useState([]);
  const [noticedata, setNoticedata]: any = useState([]);
  const [fixeddata, setFixeddata]: any = useState([]);
  const [menu, setMenu]: any = useState(0);
  const [login, setLogin] = useState(false);
  const [ip, setIp] = useState("");
  const [text, setText] = useState("");
  const [role, setRole]: any = useState();

  function write() {
    if (Lee.checkLogin()) {
      if (categoryCode === 201) {
        if (role === "trader") {
          setLogin(true);
          setTimeout(() => {
            Router.push({
              pathname: "/writeBoard",
              query: {
                categoryCode: categoryCode,
              },
            });
          }, 1000);
        } else {
          setLogin(false);
          alert("트레이더만 글쓰기가 가능합니다.");
        }
      } else {
        setLogin(true);
        setTimeout(() => {
          Router.push({
            pathname: "/writeBoard",
            query: {
              categoryCode: categoryCode,
            },
          });
        }, 1000);
      }
    } else {
      setLogin(false);
      alert("로그인 후 이용할 수 있습니다.");
      setTimeout(() => {
        location.href = "/login";
      }, 200);
    }
  }

  //아이피 가져오기
  // const getIPData = async () => {
  //   const res = await axios.get("https://geolocation-db.com/json/");
  //   setIp(res.data.IPv4);
  // };

  // 조회수
  // function countView(ID: any) {
  //   const boardId = ID;
  //   const headers: any = {
  //     authorization: window.sessionStorage.getItem("token"),
  //   };
  //   axios({
  //     method: "PATCH",
  //     url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/util/view",
  //     headers,
  //     data: {
  //       ip: ip,
  //       categoryCode: categoryCode,
  //       boardId: boardId,
  //     },
  //   });
  // }
  // 검색

  useEffect(() => {
    setData(props.data);
    setFixeddata(props.fixed);
    setNoticedata(props.notice);
  }, [props.data, props.notice, props.fixed]);

  useEffect(() => {
    // getIPData();
    setRole(window.sessionStorage.getItem("role"));
  }, []);

  return (
    <div className="board__contents parents">
      <div className="board__contents__ad">광고</div>
      <ul className="board__contents__category">
        <li
          className={
            categoryCode === 101
              ? "board__contents__category__item--click"
              : "board__contents__category__item"
          }
          onClick={() => {
            Router.push("/tradingBoard");
          }}
        >
          트레이딩
        </li>
        <li
          className={
            categoryCode === 201
              ? "board__contents__category__item--click"
              : "board__contents__category__item"
          }
          onClick={() => {
            Router.push("/tradingAnalysisBoard");
          }}
        >
          매매분석법
        </li>
        <li
          className={
            categoryCode === 301
              ? "board__contents__category__item--click"
              : "board__contents__category__item"
          }
          onClick={() => {
            Router.push("/freeBoard");
          }}
        >
          자유게시판
        </li>
      </ul>
      <div className="board__contents__body">
        <div className="board__contents__body__alignment">
          <ul className="board__contents__body__alignment__lists">
            {/* <li
              className={
                menu === 0
                  ? "board__contents__body__alignment__lists__selected"
                  : ""
              }
              onClick={() => {
                setMenu(0);
              }}
            >
              전체<span>&#183;</span>
            </li> */}
            <li
              className={
                menu === 0
                  ? "board__contents__body__alignment__lists__selected"
                  : ""
              }
              onClick={() => {
                props.getOrder("date");
                setMenu(0);
              }}
            >
              최신순<span>&#183;</span>
            </li>
            <li
              className={
                menu === 1
                  ? "board__contents__body__alignment__lists__selected"
                  : ""
              }
              onClick={() => {
                props.getOrder("view");
                setMenu(1);
              }}
            >
              조회순<span>&#183;</span>
            </li>
            <li
              className={
                menu === 2
                  ? "board__contents__body__alignment__lists__selected"
                  : ""
              }
              onClick={() => {
                props.getOrder("like");
                setMenu(2);
              }}
            >
              추천순
            </li>
          </ul>
          <div className="board__contents__body__alignment__search">
            {categoryCode === 201 && (
              <div className="board__contents__body__alignment__search__text">
                트레이더만 작성 가능합니다.
              </div>
            )}
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="board__contents__body__alignment__search__input"
              onChange={(e) => {
                let text = e.target.value;
                setText(text);
              }}
              onKeyPress={(e) => {
                e.key == "Enter" ? props.getText(text) : "";
              }}
            />
            <img
              src="/assets/search-g.png"
              alt="search"
              className="board__contents__body__alignment__search__icon"
            />
            <button
              className="board__contents__body__alignment__search__button--rect"
              onClick={() => {
                write();
              }}
            >
              글쓰기
            </button>
          </div>
        </div>
        <table className="board__contents__body__table board-table">
          <thead className="board-table__thead">
            <tr>
              <td className="board-table__thead__no">No</td>
              <td className="board-table__thead__title">제목</td>
              <td className="board-table__thead__writer">작성자</td>
              <td className="board-table__thead__updated">등록일</td>
              <td className="board-table__thead__views">조회수</td>
              <td className="board-table__thead__recommended">추천수</td>
            </tr>
          </thead>
          <tbody className="board-table__tbody">
            {noticedata &&
              noticedata.length > 0 &&
              noticedata.map((notice: any, index: number) => {
                return (
                  <tr
                    key={`notice-${index}`}
                    className={`board-table__tbody-fixed`}
                    onClick={() => {
                      setTimeout(() => {
                        Router.push({
                          pathname: "/readBoard",
                          query: {
                            id: notice.id,
                            categoryCode: props.noticeCode,
                            notice: true,
                          },
                        });
                      }, 1000);
                    }}
                  >
                    <BoardItem
                      no={"공지"}
                      title={notice.title}
                      writer={"관리자"}
                      updated={notice.date.slice(0, -9)}
                      views={""}
                      recommended={""}
                      id={notice.id}
                    />
                  </tr>
                );
              })}
            {fixeddata &&
              fixeddata.length > 0 &&
              fixeddata.map((fix: any, index: number) => {
                return (
                  <tr
                    key={`fixed-${index}`}
                    className={`board-table__tbody-fixed`}
                    onClick={() => {
                      setTimeout(() => {
                        Router.push({
                          pathname: "/readBoard",
                          query: {
                            id: fix.id,
                            categoryCode,
                          },
                        });
                      }, 1000);
                      // countView(fix.id);
                    }}
                  >
                    <BoardItem
                      no={"HOT"}
                      title={fix.title}
                      writer={fix.memberNickname}
                      updated={fix.date.slice(0, -9)}
                      views={fix.view}
                      recommended={fix.like}
                      id={fix.id}
                      replyCnt={fix.replyCnt}
                    />
                  </tr>
                );
              })}
            {data && data.length > 0 ? (
              data.map((items: any, index: number) => {
                return (
                  <tr
                    key={`data-${index}`}
                    className="board-table__tbody"
                    onClick={() => {
                      setTimeout(() => {
                        Router.push({
                          pathname: "/readBoard",
                          query: {
                            id: items.id,
                            categoryCode,
                          },
                        });
                      }, 1000);
                      // countView(items.id);
                    }}
                  >
                    <BoardItem
                      no={props.index - index}
                      title={items.title}
                      writer={items.memberNickname}
                      updated={items.date.slice(0, -9)}
                      views={items.view}
                      recommended={items.like}
                      id={items.id}
                      replyCnt={items.replyCnt}
                    />
                  </tr>
                );
              })
            ) : (
              <tr className="board-table__tbody__none">
                <td colSpan={6}>게시글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Board;
