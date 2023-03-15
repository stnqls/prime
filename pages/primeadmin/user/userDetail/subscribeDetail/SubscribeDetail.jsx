import React, { useState } from "react";
import Pagination from "react-js-pagination";

import SubscribeDetailItem from "./SubscribeDetailItem";
import Subscribe from "../../../modal/Subscribe";

import "./SubscribeDetail.scss";

function SubscribeDetail(props) {
  let data = props.props;
  let length = props.length;
  const [detail, setDetail] = useState({});
  const [subscribe, setSubscribe] = useState();
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);

  function pageChange(page) {
    setPage(page);
  }

  const getSubscribeModal = (modal) => {
    setSubscribe(modal);
  };

  const getDetail = (props) => {
    setDetail(props);
  };

  return (
    <React.Fragment>
      {data && data.length > 0 ? (
        <table className="subscribedetail">
          <thead className="subscribedetail__thead">
            <tr className="subscribedetail__thead__tr">
              <td className="subscribedetail__tradernickname">
                트레이더 닉네임
              </td>
              <td className="subscribedetail__package">패키지명</td>
              <td className="subscribedetail__traderuid">트레이더UID</td>
              <td className="subscribedetail__startdate">구매일</td>
              <td className="subscribedetail__enddate">만료일</td>
              <td className="subscribedetail__packageprice">패키지 가격</td>
              <td className="subscribedetail__status">구독 상태</td>
              <td className="subscribedetail__more">상세보기</td>
            </tr>
          </thead>
          <tbody className="subscribedetail__tbody">
            {data &&
              data
                .slice(item * (page - 1), item * (page - 1) + item)
                .map((index) => (
                  <tr className="subscribedetail__tbody__tr" key={index.id}>
                    <SubscribeDetailItem
                      getSubscribeModal={getSubscribeModal}
                      getDetail={getDetail}
                      traderNickname={index.traderNickname}
                      traderId={index.traderId}
                      packageName={index.packageName}
                      purchaseDate={index.purchaseDate}
                      expireDate={index.expireDate}
                      price={index.price}
                      status={index.status}
                      description={index.packageDescription}
                    />
                  </tr>
                ))}
          </tbody>
        </table>
      ) : (
        <div className="subscribedetail__none">구독중인 패키지가 없습니다.</div>
      )}
      {data && data.length > 0 && (
        <Pagination
          totalItemsCount={length}
          activePage={page}
          onChange={pageChange}
          itemsCountPerPage={item}
          firstPageText={""}
          lastPageText={""}
          prevPageText={""} //이전을 나타낼 텍스트
          nextPageText={""} //다음을 나타낼 텍스트
        />
      )}
      {subscribe && (
        <Subscribe getSubscribeModal={getSubscribeModal} data={detail} />
      )}
    </React.Fragment>
  );
}

export default SubscribeDetail;
