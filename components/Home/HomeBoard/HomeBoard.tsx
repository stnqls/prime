import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import HomeBoardInvestment from "./HomeBoardInvestment/HomeBoardInvestment";

import "./HomeBoard.scss";

const HomeBoard = () => {
  return (
    <div className="home-board parents" id="HomeBoard">
      <div className="home-board__contents parents">
        <HomeBoardInvestment />
      </div>
    </div>
  );
};

export default HomeBoard;
