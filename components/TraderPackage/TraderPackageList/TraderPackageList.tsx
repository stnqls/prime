import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import Pagination from "react-js-pagination";
import TraderPackageListItem from "./TraderPackageListItem/TraderPackageListItem";

import "./TraderPackageList.scss";

const TraderPackageList = (props: any) => {
  const packages: any = props.packages;
  const isDeletedPackages: any = props.deletedPackages;
  const [menu, setMenu] = useState(0);
  const [page, setPage] = useState(1);
  const [item] = useState(4);

  function pageChange(page: any) {
    setPage(page);
  }

  return (
    <div className="trader-package-list" id="TraderPackageList">
      {packages.length > 0 && (
        <ul className="trader-package-list__sort">
          <li
            className={`trader-package-list__sort__list ${
              menu === 0 && "clicked"
            }`}
            onClick={() => {
              setMenu(0);
            }}
          >
            진행중
          </li>
          <span>&#183;</span>
          <li
            className={`trader-package-list__sort__list ${
              menu === 1 && "clicked"
            }`}
            onClick={() => {
              setMenu(1);
            }}
          >
            종료
          </li>
        </ul>
      )}
      {packages.length > 0 ? (
        <div className="trader-package-list__contents">
          {menu === 0 && (
            <ul className="trader-package-list__contents__lists">
              {packages.map((_package: any, index: number) => {
                return (
                  <TraderPackageListItem
                    key={`trader-package-list-${index}`}
                    packageDescription={_package.packageDescription}
                    packageName={_package.packageName}
                    price={_package.price}
                    start_date={_package.date}
                    end_date={_package.deleteDate}
                    packageId={_package.id}
                    isDeleted={_package.isDeleted}
                    subscribersNum={_package.subscribersNum}
                    state={_package.isDeleted ? "deleted" : "progress"}
                  />
                );
              })}
            </ul>
          )}
          {menu === 1 && (
            <ul className="trader-package-list__contents__lists">
              {isDeletedPackages
                .slice(item * (page - 1), item * (page - 1) + item)
                .map((_package: any, index: number) => {
                  return (
                    <TraderPackageListItem
                      key={`trader-package-deletedlist-${index}`}
                      packageDescription={_package.packageDescription}
                      packageName={_package.packageName}
                      price={_package.price}
                      start_date={_package.date}
                      end_date={_package.deleteDate}
                      packageId={_package.id}
                      isDeleted={_package.isDeleted}
                      subscribersNum={_package.subscribersNum}
                      state={_package.isDeleted ? "deleted" : "progress"}
                    />
                  );
                })}
              <Pagination
                totalItemsCount={isDeletedPackages.length}
                activePage={page}
                onChange={pageChange}
                itemsCountPerPage={item}
                firstPageText={""}
                lastPageText={""}
                nextPageText={""}
                prevPageText={""}
              />
            </ul>
          )}
        </div>
      ) : (
        <div className="trader-package-list__none parents">
          <div className="trader-package-list__none__title">
            등록된 패키지가 없습니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default TraderPackageList;
