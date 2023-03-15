import React, { useState } from "react";
import Pagination from "react-js-pagination";

import PackageDetailItem from "./PackageDetailItem";
import Package from "../../../modal/Package";

import "./PackageDetail.scss";

function PackageDetail(props) {
  const data = props.props;
  const [packages, setPackages] = useState();
  const [detail, setDetail] = useState({});
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);

  const getPackageModal = (modal) => {
    setPackages(modal);
  };

  const getDetail = (props) => {
    setDetail(props);
  };

  function pageChange(page) {
    setPage(page);
  }

  return (
    <React.Fragment>
      {data && data.length > 0 ? (
        <table className="packagedetail">
          <thead className="packagedetail__thead">
            <tr className="packagedetail__thead__tr">
              <td className="packagedetail__package">패키지명</td>
              <td className="packagedetail__traderuid">패키지 ID</td>
              <td className="packagedetail__packageprice">패키지 가격</td>
              <td className="packagedetail__more">상세보기</td>
            </tr>
          </thead>
          <tbody className="packagedetail__tbody">
            {data &&
              data
                .slice(item * (page - 1), item * (page - 1) + item)
                .map((index) => (
                  <tr className="packagedetail__tbody__tr" key={index.id}>
                    <PackageDetailItem
                      getPackageModal={getPackageModal}
                      getDetail={getDetail}
                      traderNickname={index.traderNickname}
                      packageId={index.id}
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
        <div className="packagedetail__none">
          트레이더가 등록한 패키지가 없습니다.
        </div>
      )}
      {data && data.length > 0 && (
        <Pagination
          totalItemsCount={data.length}
          activePage={page}
          onChange={pageChange}
          itemsCountPerPage={item}
          firstPageText={""}
          lastPageText={""}
          prevPageText={""} //이전을 나타낼 텍스트
          nextPageText={""} //다음을 나타낼 텍스트
        />
      )}
      {packages && <Package getPackageModal={getPackageModal} data={detail} />}
    </React.Fragment>
  );
}

export default PackageDetail;
