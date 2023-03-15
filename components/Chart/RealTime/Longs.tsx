import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const Longs = () => {
  return (
    <AdvancedRealTimeChart
      theme="dark"
      width={500}
      height={279}
      symbol="BITFINEX:BTCUSDLONGS"
      interval="15"
      timezone="Asia/Seoul"
      style="1"
      locale="kr"
      toolbar_bg="#f1f3f6"
      allow_symbol_change={false}
      container_id="tradingview_65f00"
    ></AdvancedRealTimeChart>
  );
};

export default Longs;
