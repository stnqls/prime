import Head from "next/head";
import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Lee from "../lib/Lee";
import axios from "axios";
import router from "next/router";

import Comments from "../components/Board/Comments/Comments";
import BoardList from "../components/Board/BoardList/BoardList";
import "../styles/pages/readBoard.scss";

const readBoard = () => {
  const data = useRouter();
  const boardId: any = data.query.id;
  const categoryCode: any = data.query.categoryCode;
  const activePage: any = data.query.activePage;

  const [likebtn, setLikebtn]: any = useState();
  const [countLike, setCountLike]: any = useState();
  const [detail, setDetail]: any = useState([]);
  const [comments, setComments]: any = useState([]);
  const [notice, setNotice]: any = useState(data.query.notice);
  const [uid, setUid]: any = useState();

  function likebtnState() {
    setLikebtn(!likebtn);
    if (likebtn) {
      setCountLike(countLike - 1);
    } else {
      setCountLike(countLike + 1);
    }
  }

  function getParameterByID(ID: string) {
    ID = ID.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + ID + "=([^&#]*)"),
      results: any = regex.exec(location.search);
    let resultsID = results.input.substring(4, 24);
    return results == null ? "" : resultsID;
  }

  function getParameterByCode(code: string) {
    code = code.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + code + "=([^&#]*)"),
      results: any = regex.exec(location.search);
    let resultsCode = results[1];
    return results == null ? "" : resultsCode;
  }

  function getBoard() {
    const headers: any = {
      authorization: Lee.checkLogin()
        ? window.sessionStorage.getItem("token")
        : "",
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/community/${getParameterByID(
        "categoryCode"
      )}?categoryCode=${getParameterByCode("categoryCode")}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          const comment = res.data.data.replyArray;
          setDetail(data);
          setComments(comment);
          setCountLike(data.like);
          setLikebtn(data.isLiked);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getBoard);
          } else if (res.data.errCode === 301) {
            alert("삭제된 게시물 입니다.");
            router.back();
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해 주세요.");
        console.log(err);
      });
  }

  function deleteBoard() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "DELETE",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/community",
      data: {
        categoryCode: categoryCode,
        boardIds: [boardId],
      },
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          window.alert("정상적으로 삭제되었습니다.");
          setTimeout(() => {
            router.back();
          }, 1000);
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해 주세요.");
        console.log(err.response);
      });
  }

  function like() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/community/like/${boardId}`,
      data: {
        categoryCode: categoryCode,
      },
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          likebtnState();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(like);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해 주세요.");
        console.log(err.response);
      });
  }

  const handleCopyClipBoard = async () => {
    try {
      let url = window.location.href;
      await navigator.clipboard.writeText(url);

      alert("복사되었습니다.");
    } catch (error) {
      alert("다시 시도해주세요.");
    }
  };

  useEffect(() => {
    getBoard();
    setUid(window.sessionStorage.getItem("uid"));
  }, [boardId]);

  useEffect(() => {
    setNotice(data.query.notice);
  }, [data.query.notice]);

  return (
    <div className="readboard">
      <Head>
        <title>프라임 인베스트먼트</title>
      </Head>

      <div className="readboard__ad">광고</div>
      <div className="readboard__header">
        <div className="readboard__header__info">
          <div className="readboard__header__info__mcategory">
            {categoryCode}
          </div>
          <div className="readboard__header__info__title">{detail.title}</div>
          <div className="readboard__header__info__writer">
            {detail.memberNickname}
          </div>
          <div className="readboard__header__info__date">{detail.date}</div>
        </div>
        {notice ? null : (
          <div className="readboard__header__content">
            {detail.memberId === uid && (
              <div className="readboard__header__content__btns">
                <button
                  type="button"
                  className="readboard__header__content__btns__modify"
                  onClick={() => {
                    if (Lee.checkLogin()) {
                      Router.push({
                        pathname: "/modifyBoard",
                        query: {
                          id: boardId,
                          categoryCode: categoryCode,
                        },
                      });
                    } else {
                      alert("로그인 후 이용할 수 있습니다.");
                    }
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="readboard__header__content__btns__delete"
                  onClick={() => {
                    if (Lee.checkLogin()) {
                      deleteBoard();
                    } else {
                      alert("로그인 후 이용할 수 있습니다.");
                    }
                  }}
                >
                  삭제
                </button>
              </div>
            )}
            <div className="readboard__header__content__count">
              <span className="readboard__header__content__count__views">
                조회수 {detail.view}
              </span>
              <span className="readboard__header__content__count__recommended">
                추천 {countLike}
              </span>
            </div>
          </div>
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: detail.content }}
        className="readboard__body"
      ></div>

      {notice ? null : (
        <React.Fragment>
          <div className="readboard__buttons">
            <button
              type="button"
              className={
                likebtn
                  ? "readboard__buttons__recommended--done"
                  : "readboard__buttons__recommended"
              }
              onClick={() => {
                if (Lee.checkLogin()) {
                  like();
                } else {
                  alert("로그인후 이용 가능합니다.");
                  router.push("/login");
                }
              }}
            >
              <img
                src={"/assets//like.png"}
                alt=""
                className="readboard__buttons__recommended__img"
              />
              추천하기
            </button>
            <button
              type="button"
              className="readboard__buttons__share"
              onClick={() => {
                handleCopyClipBoard();
              }}
            >
              <img
                src="/assets/share.png"
                alt=""
                className="readboard__buttons__share__img"
              />
              공유하기
            </button>
          </div>
          {comments && (
            <Comments code={categoryCode} boardId={boardId} props={comments} />
          )}
        </React.Fragment>
      )}
      <div className="readboard__list">
        <button
          type="button"
          className="readboard__list__btn"
          onClick={() => {
            if (categoryCode === "101") {
              Router.push("/tradingBoard");
            } else if (categoryCode === "201") {
              Router.push("/tradingAnalysisBoard");
            } else if (categoryCode === "301") {
              Router.push("/freeBoard");
            } else {
              Router.push("/tradingBoard");
            }
          }}
        >
          목록
        </button>
        <div className="readboard__list__board">
          {categoryCode === "101" && (
            <BoardList categoryCode={categoryCode} activePage={activePage} />
          )}
          {categoryCode === "201" && (
            <BoardList categoryCode={categoryCode} activePage={activePage} />
          )}
          {categoryCode === "301" && (
            <BoardList categoryCode={categoryCode} activePage={activePage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default readBoard;
