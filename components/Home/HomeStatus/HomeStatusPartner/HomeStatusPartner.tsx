import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import HomeStatusPartnerItem from "./HomeStatusPartnerItem/HomeStatusPartnerItem";

import "./HomeStatusPartner.scss";

const HomeStatusPartner = (props: any) => {
  const partners = props.partners;

  return (
    <div className="home-status-partner parents">
      <div className="home-status-partner__contents parents">
        <div className="home-status-partner__contents__title">
          프라임인베스트먼트의 파트너사를 소개합니다
        </div>
        <div className="home-status-partner__contents__lists">
          {partners.map((partner: any, idx: any) => {
            return (
              <HomeStatusPartnerItem
                partner={partner.partner}
                url={partner.url}
                idx={idx}
                key={`partner-${idx}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeStatusPartner;
