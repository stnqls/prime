import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import TraderStatusPackageItem from "./TraderStatusPackageItem/TraderStatusPackageItem";

import "./TraderStatusPackage.scss";

const TraderStatusPackage = (props: any) => {
  const packages: any = props.packages;

  return (
    <div className="trader-status-package parents" id="TraderStatusPackage">
      <div className="trader-status-package__contents parents">
        <div className="trader-status-package__contents__title">
          최근 패키지 목록
        </div>
        <div className="trader-status-package__contents__button">
          <DelayLink
            to="traderPackage"
            delay={200}
            onDelayStart={Lee.loadingStart}
          >
            <li className="trader-status-package__contents__button__add">
              수정하기
            </li>
          </DelayLink>
        </div>
        {packages && packages.length > 0 ? (
          <>
            <ul className="trader-status-package__contents__lists parents">
              {packages.map((_package: any, index: number) => {
                return (
                  <TraderStatusPackageItem
                    key={`package-${index}`}
                    thumbnail={_package.thumbnail}
                    packageDescription={_package.packageDescription}
                    packageName={_package.packageName}
                    price={_package.price}
                    start_date={_package.start_date}
                    end_date={_package.end_date}
                  />
                );
              })}
            </ul>
          </>
        ) : (
          <div className="trader-status-package__contents__none parents">
            <div className="trader-status-package__contents__none__title">
              등록된 패키지가 없습니다.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraderStatusPackage;
