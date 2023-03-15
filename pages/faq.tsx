import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import React, { useState, useEffect, useRef } from "react";
import Pagination from "react-js-pagination";
import FaqItem from "../components/CustomerService/FAQ/FaqItem";
import MobileFaqItem from "../components/CustomerService/FAQ/MobileFaqItem";
import Lee from "../lib/Lee";
import "../styles/pages/faq.scss";

const Faq: NextPage = () => {
  const [posts, setPosts] = useState([]);
  const [menu, setMenu] = useState(0);
  const [categoryCode, setCategoryCode] = useState("");
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(5);
  const [search, setSearch] = useState("");
  const parentElement: any = useRef(null);

  function pageChange(page: any) {
    setPage(page);
  }

  const filterData = posts.filter((val: any) => {
    if (search === "") {
      return val;
    } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });

  function getData() {
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/customers/faq?categoryCode=${categoryCode}`,
    })
      .then((res) => {
        if (res.data.success) {
          setPosts(res.data.data);
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
    setPage(1);
  }, [categoryCode]);

  useEffect(() => {
    let peTop = parentElement;
    // window.scrollTo(0, peTop.current.offsetTop - 15);
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="faq">
      <Head>
        <title>프라임 인베스트먼트 | FAQ</title>
      </Head>
      <div className="faq__ad">광고</div>

      <ul className="faq__category">
        <li
          className="faq__category__item--click"
          onClick={() => {
            Router.push("/faq");
          }}
        >
          FAQ
        </li>
        <li
          className="faq__category__item"
          onClick={() => {
            Router.push("/Inquiry");
          }}
        >
          1:1문의
        </li>
        <li
          className="faq__category__item"
          onClick={() => {
            Router.push("/notice");
          }}
        >
          공지사항
        </li>
      </ul>
      <div className="faq__searchbox" ref={parentElement}>
        <ul className="faq__searchbox__sorting">
          <li
            className={
              menu === 0
                ? "faq__searchbox__sorting__item--click"
                : "faq__searchbox__sorting__item"
            }
            onClick={() => {
              setMenu(0);
              setCategoryCode("");
            }}
          >
            전체 <span>&#183;</span>
          </li>
          <li
            className={
              menu === 1
                ? "faq__searchbox__sorting__item--click"
                : "faq__searchbox__sorting__item"
            }
            onClick={() => {
              setMenu(1);
              setCategoryCode("101");
            }}
          >
            공통 <span>&#183;</span>
          </li>
          <li
            className={
              menu === 2
                ? "faq__searchbox__sorting__item--click"
                : "faq__searchbox__sorting__item"
            }
            onClick={() => {
              setMenu(2);
              setCategoryCode("102");
            }}
          >
            회원 <span>&#183;</span>
          </li>
          <li
            className={
              menu === 3
                ? "faq__searchbox__sorting__item--click"
                : "faq__searchbox__sorting__item"
            }
            onClick={() => {
              setMenu(3);
              setCategoryCode("103");
            }}
          >
            트레이더
          </li>
        </ul>
        <div className="faq__searchbox__input">
          <input
            type="text"
            className="faq__searchbox__input__search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <img
            src="/assets/search-g.png"
            alt="search"
            className="faq__searchbox__input__img"
          />
        </div>
      </div>
      <div className="faq__body">
        <table className="faq__body__table">
          <thead className="faq__body__table__head">
            <tr className="faq__body__table__head__tr">
              <td className="faq__body__table__head__category">구분</td>
              <td className="faq__body__table__head__title">제목</td>
            </tr>
          </thead>
          <tbody className="faq__body__table__body">
            {filterData && filterData.length > 0 ? (
              filterData
                .slice(item * (page - 1), item * (page - 1) + item)
                .map((post: any, index: number) => {
                  let length =
                    page === 1 ? item : posts.length - item * (page - 1);
                  return (
                    <FaqItem
                      key={`faq-${index}`}
                      categoryCode={post.categoryCode}
                      title={post.title}
                      content={post.content}
                      index={page === 1 ? index : item * (page - 1) + index}
                      page={page}
                      length={length}
                    />
                  );
                })
            ) : (
              <tr className="faq__body__table__body__tr">
                <td className="faq__body__table__body__none" colSpan={2}>
                  등록된 FAQ가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {posts.length > 0 && (
          <Pagination
            activePage={page}
            itemsCountPerPage={item} //한 페이지당 보여줄 리스트 아이템의 개수
            totalItemsCount={filterData.length} //총 아이템의 개수
            onChange={pageChange} //페이지가 바뀔때 핸들링해줄 함수
            prevPageText={""} //이전을 나타낼 텍스트
            nextPageText={""} //다음을 나타낼 텍스트
          />
        )}
      </div>
      <div className="faq__mbody">
        {filterData
          .slice(item * (page - 1), item * (page - 1) + item)
          .map((post: any, index: number) => (
            <MobileFaqItem
              key={`faq__mbody-list-${index}`}
              categoryCode={post.categoryCode}
              title={post.title}
              content={post.content}
            />
          ))}
      </div>
    </div>
  );
};

export default Faq;
