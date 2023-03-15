import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "./UserGraph.scss";

const UserGraph = (props) => {
  const data = props.graph;

  return (
    <div className="user-graph parents" id="UserGraph">
      <div className="user-graph__contents parents">
        <div className="user-graph__contents__title">수익률 현황</div>
        <div className="user-graph__contents__chart parents">
          <ResponsiveContainer height="100%" width="100%">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 5, bottom: 0, left: -20 }}
            >
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#0083db"
                fill="#0083db"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserGraph;
