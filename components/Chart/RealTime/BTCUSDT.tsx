import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const BTCUSDT = () => {
  return (
    <AdvancedRealTimeChart
      theme="dark"
      width={600}
      height={558}
      symbol="BINANCE:BTCUSDT"
      interval="15"
      timezone="Asia/Seoul"
      style="1"
      locale="kr"
      toolbar_bg="#f1f3f6"
      allow_symbol_change={false}
      container_id="tradingview_dcf24"
    ></AdvancedRealTimeChart>
  );
};

export default BTCUSDT;
