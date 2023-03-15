import React from "react";

import "./HomeStatusPartnerItem.scss";

const HomeStatusPartnerItem = (props: any) => {
  return (
    <span className="home-status-partner-item">
      <img src={props.url} alt={props.partner} />
    </span>
  );
};

export default HomeStatusPartnerItem;
