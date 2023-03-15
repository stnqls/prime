import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import Lee from "../../../../lib/Lee";

import BoardItem from "./boardItem/BoardItem";

const BoardModal = dynamic(import("./boardModal/BoardModal"), {
  ssr: false,
});

function Entire(props: any) {
  let search: string = props.search;
  const [board, setBoard] = useState([]);
  const [modal, setModal] = useState(false);
  const [categoryCode, setCategoryCode] = useState();
  const [boardId, setBoardId] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  function getDetail(id: any, category: any) {
    setBoardId(id);
    setCategoryCode(category);
  }

  function getData(page: number) {
    setPage(page);
    const headers: any = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/community?page=${page}&categoryCode=${props.categoryCode}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setBoard(res.data.data.boardArray);
          setTotalPage(res.data.data.totalBoardCnt);
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
        console.log(err);
      });
  }

  const data = board.filter((text: any) => {
    if (search === "") {
      return text;
    } else if (text.title.toLowerCase().includes(search.toLowerCase())) {
      return text;
    } else if (
      text.memberNickname.toLowerCase().includes(search.toLowerCase())
    ) {
      return text;
    }
  });

  useEffect(() => {
    getData(1);
  }, []);

  return (
    <React.Fragment>
      {modal && (
        <BoardModal
          setModal={setModal}
          categoryCode={categoryCode}
          boardId={boardId}
          isFixed={props.isFixed}
        />
      )}
      <table className="board__content__body__table board__table">
        <thead className="board__table__head">
          <tr className="board__table__head__tr">
            <td className="board__table__head__category">구분</td>
            <td className="board__table__head__title">제목</td>
            <td className="board__table__head__name">작성자</td>
            <td className="board__table__head__id">UID</td>
            <td className="board__table__head__date">등록일</td>
            {props.categoryCode !== 901 &&
              (props.isFixed ? (
                <td className="board__table__head__delete">취소하기</td>
              ) : (
                <td className="board__table__head__delete">삭제하기</td>
              ))}
          </tr>
        </thead>
        <tbody className="board__table__body">
          {data &&
            data.length > 0 &&
            data.map((item: any, index: number) => (
              <BoardItem
                key={`admin-board-${index}`}
                category={item.category}
                categoryCode={item.categoryCode}
                content={item.content}
                date={item.date}
                boardId={item.id}
                isDeleted={item.isDeleted}
                like={item.like}
                id={item.memberId}
                name={item.memberNickname}
                title={item.title}
                view={item.view}
                getDetail={getDetail}
                setModal={setModal}
                isFixed={props.isFixed}
              />
            ))}
        </tbody>
      </table>
      <Pagination
        itemsCountPerPage={10}
        totalItemsCount={totalPage} //총 아이템의 개수
        activePage={page}
        onChange={getData} //페이지가 바뀔때 핸들링해줄 함수
        nextPageText={""}
        prevPageText={""}
      />
    </React.Fragment>
  );
}

export default Entire;
