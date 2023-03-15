import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";

import MessageList from "../components/Message/MessageList/MessageList";

import "../styles/pages/messages.scss";

const Messages: NextPage = () => {
  return (
    <div className="messages">
      <Head>
        <title>프라임 인베스트먼트 | 쪽지함</title>
      </Head>
      <MessageList />
    </div>
  );
};

export default Messages;
