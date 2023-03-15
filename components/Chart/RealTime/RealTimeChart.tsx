import React from "react";
import BTCUSDT from "./BTCUSDT";
import Dominance from "./Dominance";
import Longs from "./Longs";
import Shorts from "./Shorts";
import "./RealTimeChart.scss";

const RealTimeChart = () => {
  return (
    <div className="real-time-chart">
      <div className="real-time-chart__btcusdt">
        <BTCUSDT />
      </div>
      <div className="real-time-chart__dominance">
        <Dominance />
      </div>
      <div className="real-time-chart__two">
        <div className="real-time-chart__two__longs">
          <Longs />
          <Shorts />
        </div>
      </div>
    </div>
  );
};

export default React.memo(RealTimeChart);
