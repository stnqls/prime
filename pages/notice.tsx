import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import Pagination from "react-js-pagination";
import NoticeItem from "../components/CustomerService/Notice/NoticeItem";
import MobileNoticeItem from "../components/CustomerService/Notice/MobileNoticeItem";

import "../styles/pages/Paginate.scss";
import "../styles/pages/notice.scss";

function Notice() {
  const [posts, setPosts] = useState([]);
  // const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [item] = useState(5);
  const parentElement: any = useRef(null);

  function pageChange(page: any) {
    setPage(page);
  }

  function getData() {
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/customers/notice",
    }).then((res) => {
      if (res.data.success) {
        setPosts(res.data.data);
      }
    });
  }

  // const filterData = posts.filter((val: any) => {
  //   if (search === "") {
  //     return val;
  //   } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
  //     return val;
  //   }
  // });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let peTop = parentElement;
    // window.scrollTo(0, peTop.current.offsetTop - 15);
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="notice">
      <Head>
        <title>프라임 인베스트먼트 | 공지사항</title>
      </Head>
      <div className="notice__ad">광고</div>

      <ul className="notice__category">
        <li
          className="notice__category__item"
          onClick={() => {
            Router.push("/faq");
          }}
        >
          FAQ
        </li>
        <li
          className="notice__category__item"
          onClick={() => {
            Router.push("/Inquiry");
          }}
        >
          1:1문의
        </li>
        <li
          className="notice__category__item--click"
          onClick={() => {
            Router.push("/notice");
          }}
        >
          공지사항
        </li>
      </ul>
      {/* <div className="notice__searchbox">
        <input
          type="text"
          className="notice__searchbox__input"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img
          src="/assets/search-g.png"
          alt="search"
          className="notice__searchbox__img"
        />
      </div> */}
      <div className="notice__content" ref={parentElement}>
        <table className="notice__content__table">
          <thead className="notice__content__table__head">
            <tr className="notice__content__table__head__tr">
              <td className="notice__content__table__head__tr__no">No</td>
              <td className="notice__content__table__head__tr__title">제목</td>
              <td className="notice__content__table__head__tr__date">등록일</td>
            </tr>
          </thead>
          <tbody className="notice__content__table__body">
            {posts && posts.length > 0 ? (
              posts
                .slice(item * (page - 1), item * (page - 1) + item)
                .map((post: any, index: number) => {
                  let length =
                    page === 1 ? item : posts.length - item * (page - 1);
                  return (
                    <NoticeItem
                      key={`notice-${index}`}
                      no={posts.length - item * (page - 1) - index}
                      title={post.title}
                      date={post.date}
                      content={post.content}
                      index={page === 1 ? index : item * (page - 1) + index}
                      page={page}
                      length={length}
                    />
                  );
                })
            ) : (
              <tr className="notice__content__table__body__tr">
                <td
                  className="notice__content__table__body__tr__none"
                  colSpan={3}
                >
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {posts.length > 0 && (
          <Pagination
            totalItemsCount={posts.length} //총 아이템의 개수
            activePage={page}
            onChange={pageChange} //페이지가 바뀔때 핸들링해줄 함수
            itemsCountPerPage={item} //한 페이지당 보여줄 리스트 아이템의 개수
            prevPageText={""} //이전을 나타낼 텍스트
            nextPageText={""} //다음을 나타낼 텍스트
          />
        )}
      </div>
      <div className="notice__mcontent">
        {posts
          // .slice(item * (page - 1), item * (page - 1) + item)
          .map((post: any, index: number) => (
            <MobileNoticeItem
              key={`notice-mobile-list-${index}`}
              title={post.title}
              date={post.date}
              content={post.content}
            />
          ))}
      </div>
    </div>
  );
}

export default Notice;
