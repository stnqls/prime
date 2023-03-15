import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const Dominance = () => {
  return (
    <AdvancedRealTimeChart
      theme="dark"
      width={500}
      height={558}
      symbol="CRYPTOCAP:BTC.D"
      interval="15"
      timezone="Asia/Seoul"
      style="2"
      locale="kr"
      toolbar_bg="#f1f3f6"
      allow_symbol_change={false}
      container_id="tradingview_326eb"
    ></AdvancedRealTimeChart>
  );
};

export default Dominance;
