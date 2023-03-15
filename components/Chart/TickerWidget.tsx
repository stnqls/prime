import { Ticker, TickerSymbol } from "react-ts-tradingview-widgets";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";

const TickerWidget = () => {
  const [TickerSymbols, setTickerSymbols] = useState<TickerSymbol[]>([
    {
      title: "BTC 24h",
      proName: "BINANCE:BTCUSDT",
    },
    {
      title: "ETH 24h",
      proName: "BINANCE:ETHUSDT",
    },
    {
      title: "XRP 24h",
      proName: "BINANCE:XRPUSDT",
    },
    {
      title: "BNB 24h",
      proName: "BINANCE:BNBUSDT",
    },
    {
      title: "SOL 24h",
      proName: "BINANCE:SOLAUD",
    },
  ]);

  useEffect(() => {
    const getticker = getTicker();
    return () => {
      getticker;
    };
  }, []);

  async function getTicker() {
    const config: AxiosRequestConfig = {
      method: "get",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/indicator/representative",
    };
    try {
      const representativeAxios = await axios(config);
      const tempTickerSymbols = [];
      for (const i in representativeAxios.data) {
        tempTickerSymbols.push({
          title: representativeAxios.data[i] + " 24h",
          proName: "BINANCE:" + representativeAxios.data[i] + "USDT",
        });
      }
      setTickerSymbols(tempTickerSymbols);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="ticker" style={{ height: "70px", overflow: "hidden" }}>
      <Ticker colorTheme="dark" locale="kr" symbols={TickerSymbols} />
    </div>
  );
};

export default React.memo(TickerWidget);
