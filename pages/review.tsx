import type { NextPage } from "next";
import React from "react";
import Head from "next/head";

import ReviewList from "../components/Review/ReviewList/ReviewList";

import "../styles/pages/review.scss";

const Review: NextPage = () => {
  return (
    <div className="review">
      <Head>
        <title>프라임 인베스트먼트 | 이용후기</title>
      </Head>
      <div className="review__contents parents">
        <ReviewList />
      </div>
    </div>
  );
};

export default Review;
