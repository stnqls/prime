import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const Shorts = () => {
  return (
    <AdvancedRealTimeChart
      theme="dark"
      width={500}
      height={279}
      symbol="BITFINEX:BTCUSDSHORTS"
      interval="15"
      timezone="Asia/Seoul"
      style="1"
      locale="kr"
      toolbar_bg="#f1f3f6"
      allow_symbol_change={false}
      container_id="tradingview_409d6"
    ></AdvancedRealTimeChart>
  );
};

export default Shorts;
