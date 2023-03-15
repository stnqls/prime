import React from "react";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";

const Cryptocurrency = () => {
  return (
    <CryptoCurrencyMarket
      colorTheme="dark"
      width={910}
      height={480}
      defaultColumn="overview"
      screener_type="crypto_mkt"
      displayCurrency="USD"
      locale="kr"
    ></CryptoCurrencyMarket>
  );
};

export default React.memo(Cryptocurrency);
