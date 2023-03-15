import React, { useEffect, useRef, useState } from "react";
import Pagination from "react-js-pagination";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import "swiper/swiper.scss";

import "./UserPackageList.scss";
import UserPackageListItem from "./UserPackageListItem/UserPackageListItem";

const UserPackageList = (props: any) => {
  const packages: any = props.packages;
  const [item] = useState(5);
  const [page, setPage] = useState(1);
  const parentElement: any = useRef(null);

  function pageChange(page: any) {
    setPage(page);
  }

  useEffect(() => {
    let top = parentElement;
    window.scrollTo(0, top.current.offsetTop);
  }, [page]);

  return (
    <div className="user-package-list" id="UserPackageList" ref={parentElement}>
      <div className="user-package-list__contents">
        {packages && packages.length > 0 ? (
          <>
            <ul className="user-package-list__contents__lists">
              {packages
                .slice(item * (page - 1), item * (page - 1) + item)
                .map((_package: any, index: number) => {
                  return (
                    <UserPackageListItem
                      key={`package-${index}`}
                      packageDescription={_package.packageDescription}
                      packageName={_package.packageName}
                      price={_package.price}
                      start_date={_package.date}
                      end_date={null}
                      packageId={_package.id}
                      traderName={_package.traderNickname}
                      traderAvatar={_package.traderAvatar}
                      traderId={_package.traderId}
                      isReviewed={_package.isReviewed}
                      reviewId={_package.reviewId}
                      purchaseDate={_package.purchaseDate}
                      expireDate={_package.expireDate}
                    />
                  );
                })}
            </ul>
            <Pagination
              totalItemsCount={packages.length}
              activePage={page}
              onChange={pageChange}
              itemsCountPerPage={item}
              firstPageText={""}
              lastPageText={""}
              nextPageText={""}
              prevPageText={""}
            />
          </>
        ) : (
          <div className="user-package-list__contents__none parents">
            <div className="user-package-list__contents__none__title">
              구독한 패키지가 없습니다.
            </div>
            <div className="user-package-list__contents__none__mtitle">
              구독한 패키지가 없습니다.
            </div>
            <div className="user-package-list__contents__none__msubtitle">
              프라임인베스트먼트가 선정한 트레이더를 확인해보세요!
            </div>
            <DelayLink
              to="findTrader"
              delay={200}
              onDelayStart={Lee.loadingStart}
            >
              <div className="user-package-list__contents__none__mbtn">
                트레이더 확인
              </div>
            </DelayLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPackageList;
