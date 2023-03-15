import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ViewTraderPackageItem from "./ViewTraderPackageItem/ViewTraderPackageItem";
import SwiperCore, { Scrollbar } from "swiper";
SwiperCore.use([Scrollbar]);

import "./ViewTraderPackage.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/swiper.scss";

const ViewTraderPackage = (props: any) => {
  const packages: any = props.packages;

  return (
    <div className="view-trader-package " id="ViewTraderPackage">
      <div className="view-trader-package__contents ">
        <div className="view-trader-package__contents__title">패키지 목록</div>
        {packages && packages.length > 0 ? (
          <>
            <ul className="view-trader-package__contents__lists ">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={40}
                className="mySwiper"
                scrollbar={{
                  draggable: true,
                }}
              >
                {packages.map((_package: any, index: number) => {
                  return (
                    !_package.isDeleted && (
                      <SwiperSlide key={`package-${index}`}>
                        <ViewTraderPackageItem
                          traderId={props.traderId}
                          packageDescription={_package.packageDescription}
                          packageName={_package.packageName}
                          price={_package.price}
                          start_date={_package.start_date}
                          end_date={_package.end_date}
                          packageId={_package.id}
                          traderName={props.traderName}
                          traderAvatar={props.traderAvatar}
                          profitRate={_package.profitRate}
                        />
                      </SwiperSlide>
                    )
                  );
                })}
              </Swiper>
            </ul>
            <ul className="view-trader-package__contents__mlists ">
              {packages.map((_package: any, index: number) => {
                return (
                  <ViewTraderPackageItem
                    key={`package-${index}`}
                    traderId={props.traderId}
                    packageDescription={_package.packageDescription}
                    packageName={_package.packageName}
                    price={_package.price}
                    start_date={_package.start_date}
                    end_date={_package.end_date}
                    packageId={_package.id}
                    traderName={props.traderName}
                    traderAvatar={props.traderAvatar}
                    profitRate={_package.profitRate}
                  />
                );
              })}
            </ul>
          </>
        ) : (
          <div className="view-trader-package__contents__none parents">
            등록된 패키지가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTraderPackage;
