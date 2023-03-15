import React from "react";

import "./TradingItem.scss";

const TradingItem = (props: any) => {
  return (
    <React.Fragment>
      <td className="trading-table__tbody__no">{props.no}</td>
      <td className="trading-table__tbody__title">{props.title}</td>
      <td className="trading-table__tbody__updated">{props.updated}</td>
      <td className="trading-table__tbody__views">{props.views}</td>
      <td className="trading-table__tbody__recommended">{props.recommended}</td>
    </React.Fragment>
  );
};

export default TradingItem;
