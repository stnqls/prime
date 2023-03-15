import React, { useState } from "react";
import TraderList from "./traderList/TraderList";
import TraderDetail from "./traderDetail/TraderDetail";

function Trader() {
  const [trader, setTrader] = useState(0);
  const [traderId, setTraderId] = useState();

  const gettraderInfo = (id) => {
    setTrader(id);
    setTraderId(id.uid);
  };

  return (
    <React.Fragment>
      <TraderList gettraderInfo={gettraderInfo} />
      <TraderDetail trader={trader} traderId={traderId} />
    </React.Fragment>
  );
}

export default Trader;
