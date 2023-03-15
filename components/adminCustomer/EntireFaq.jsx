import React, { useState } from "react";
import router from "next/router";
import axios from "axios";
import Pagination from "react-js-pagination";
import Lee from "../../lib/Lee";
import FaqItem from "../../pages/primeadmin/customer/adminfaq/FaqItem";

function EntireFaq(props) {
  const [answer, setAnswer] = useState(false);
  const [content, setContent] = useState();
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);

  function pageChange(page) {
    setPage(page);
  }
  const data = props.data;

  const showAnswer = (index) => {
    setAnswer((i) => ({
      ...i,
      [index]: !i[index],
    }));
  };

  function modifyAnswer(faqId) {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/faq/${faqId}`,
      headers,
      data: {
        content: content,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("정상적으로 수정되었습니다.");
          router.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(modifyAnswer);
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

  function deleteFaq(faqId) {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/faq`,
      headers,
      data: {
        faqId: faqId,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("데이터가 정상적으로 삭제되었습니다.");
          router.reload();
        } else {
          alert("서버 통신 중 오류가 발생했습니다.");
        }
      })
      .catch((err) => {
        window.alert("오류가 발생하였습니다.");
        console.log(err);
      });
  }
  return (
    <div className="admin-faq__content__body">
      {data.length > 0 ? (
        <table className="admin-faq__table">
          <thead className="admin-faq__table__head">
            <tr className="admin-faq__table__head__tr">
              <td className="admin-faq__table__head__category">구분</td>
              <td className="admin-faq__table__head__question">질문</td>
            </tr>
          </thead>
          <tbody className="admin-faq__table__body">
            {data
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((item, index) => (
                <React.Fragment key={`admin-faq-${index}`}>
                  <tr
                    className="admin-faq__table__body__tr"
                    onClick={() => {
                      showAnswer(index);
                      setContent(item.content);
                    }}
                  >
                    <FaqItem
                      category={item.categoryCode}
                      qu={item.title}
                      an={item.content}
                    />
                  </tr>
                  <tr
                    className={
                      answer[index]
                        ? "admin-faq__table__body__answer"
                        : "admin-faq__table__body__answer--none"
                    }
                  >
                    <td
                      className="admin-faq__table__body__answer__an"
                      colSpan="2"
                    >
                      <textarea
                        className="admin-faq__table__body__answer__an__text"
                        defaultValue={item.content}
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                      ></textarea>
                      <button
                        className="admin-faq__table__body__answer__delete"
                        onClick={() => {
                          deleteFaq(item.id);
                        }}
                      >
                        삭제하기
                      </button>
                      <button
                        className="admin-faq__table__body__answer__an__btn"
                        onClick={() => {
                          modifyAnswer(item.id);
                        }}
                      >
                        수정하기
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="admin-faq__content__body__none">
          FAQ가 존재하지 않습니다.
        </div>
      )}
      {data.length > 0 ? (
        <Pagination
          totalItemsCount={data.length}
          activePage={page}
          onChange={pageChange}
          itemsCountPerPage={item}
          firstPageText={""}
          lastPageText={""}
          nextPageText={""}
          prevPageText={""}
        />
      ) : null}
    </div>
  );
}

export default EntireFaq;
