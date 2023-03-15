import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import "./AdminPartnership.scss";
import AdminPartnershipDetail from "./AdminPartnershipDetail";
import AdminPartnershipItem from "./AdminPartnershipItem";

const AdminPartnership = () => {
  const [partners, setPartners] = useState([]);
  const [openmodal, setOpenmodal] = useState(false);
  const [id, setId] = useState();
  const [menu, setMenu] = useState(0);

  const [page, setPage] = useState(1);
  const [item] = useState(10);

  function pageChange(page: any) {
    setPage(page);
  }

  function getPartners() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/partner",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          // console.log(res);
          setPartners(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPartners();
  }, []);

  return (
    <div className="admin-partnership">
      <div className="admin-partnership__content">
        <div className="admin-partnership__content__header">
          <ul className="admin-partnership__content__header__list">
            <li
              className={`admin-partnership__content__header__list__item ${
                menu === 0 ? "click" : ""
              }`}
              onClick={() => {
                setMenu(0);
              }}
            >
              전체
            </li>
            <li
              className={`admin-partnership__content__header__list__item ${
                menu === 1 ? "click" : ""
              }`}
              onClick={() => {
                setMenu(1);
              }}
            >
              답변완료
            </li>
            <li
              className={`admin-partnership__content__header__list__item ${
                menu === 2 ? "click" : ""
              }`}
              onClick={() => {
                setMenu(2);
              }}
            >
              답변미완료
            </li>
          </ul>
        </div>
        <div className="admin-partnership__content__body">
          <table className="admin-partnership__content__body__table">
            <thead className="admin-partnership__content__body__table__thead">
              <tr className="admin-partnership__content__body__table__thead__tr">
                <td>이름</td>
                <td>이메일</td>
                <td>제목</td>
                <td>등록일</td>
                <td>답장여부</td>
                <td>답장시간</td>
              </tr>
            </thead>
            <tbody className="admin-partnership__content__body__table__tbody">
              {partners.length > 0 &&
                menu === 0 &&
                partners.map((partner: any, index: number) => {
                  return (
                    <AdminPartnershipItem
                      key={`admin-partnership-list-${index}`}
                      name={partner.name}
                      email={partner.email}
                      title={partner.title}
                      date={partner.date}
                      status={partner.status}
                      id={partner.id}
                      setOpenmodal={setOpenmodal}
                      setId={setId}
                      answerDate={partner.answerDate}
                      menu={menu}
                    />
                  );
                })}
              {partners.length > 0 &&
                menu === 1 &&
                partners.map((partner: any, index: number) => {
                  if (partner.status === 1) {
                    return (
                      <AdminPartnershipItem
                        key={`admin-partnership-list-${index}`}
                        name={partner.name}
                        email={partner.email}
                        title={partner.title}
                        date={partner.date}
                        status={partner.status}
                        id={partner.id}
                        setOpenmodal={setOpenmodal}
                        setId={setId}
                        answerDate={partner.answerDate}
                        menu={menu}
                      />
                    );
                  }
                })}
              {partners.length > 0 &&
                menu === 2 &&
                partners.map((partner: any, index: number) => {
                  if (partner.status === 0) {
                    return (
                      <AdminPartnershipItem
                        key={`admin-partnership-list-${index}`}
                        name={partner.name}
                        email={partner.email}
                        title={partner.title}
                        date={partner.date}
                        status={partner.status}
                        id={partner.id}
                        setOpenmodal={setOpenmodal}
                        setId={setId}
                        answerDate={partner.answerDate}
                        menu={menu}
                      />
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
        {partners.length > 0 && (
          <Pagination
            totalItemsCount={partners.length}
            activePage={page}
            onChange={pageChange}
            itemsCountPerPage={item}
            firstPageText={""}
            lastPageText={""}
            nextPageText={""}
            prevPageText={""}
          />
        )}
      </div>
      {openmodal && (
        <AdminPartnershipDetail setOpenmodal={setOpenmodal} id={id} />
      )}
    </div>
  );
};

export default AdminPartnership;
