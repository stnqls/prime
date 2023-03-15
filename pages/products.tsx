import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";

import PayemtList from "../components/Products/ProductsList/ProductsList";

import "../styles/pages/products.scss";

const Products: NextPage = () => {
  const datas = [
    {
      products: [
        {
          thumbnail:
            "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
          title: "박스매매 전문, 안정적인 수익",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 200000,
          start_date: "2021년 08월 17일",
          end_date: "2021년 09월 17일",
          trader_name: "KOREA TIGER",
          trader_avatar:
            "https://images.unsplash.com/photo-1544168190-79c17527004f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80",
          title: "백만원 시드로 1억 가즈아",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 300000,
          start_date: "2021년 06월 17일",
          end_date: "2021년 07월 17일",
          trader_name: "KOREA 햇님",
          trader_avatar:
            "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80",
          title: "가상화폐를 몰라도 수익은 낼 수 있다!",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 150000,
          start_date: "2021년 05월 17일",
          end_date: "2021년 05월 17일",
          trader_name: "BBC Edwards",
          trader_avatar:
            "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
          title: "아직 뜨지 못한 신규 화폐를 노려라",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 250000,
          start_date: "2021년 04월 17일",
          end_date: "2021년 04월 17일",
          trader_name: "BBC James",
          trader_avatar:
            "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
          title: "박스매매 전문, 안정적인 수익",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 200000,
          start_date: "2021년 08월 17일",
          end_date: "2021년 09월 17일",
          trader_name: "KOREA TIGER",
          trader_avatar:
            "https://images.unsplash.com/photo-1544168190-79c17527004f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80",
          title: "백만원 시드로 1억 가즈아",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 300000,
          start_date: "2021년 06월 17일",
          end_date: "2021년 07월 17일",
          trader_name: "KOREA 햇님",
          trader_avatar:
            "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80",
          title: "가상화폐를 몰라도 수익은 낼 수 있다!",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 150000,
          start_date: "2021년 05월 17일",
          end_date: "2021년 05월 17일",
          trader_name: "BBC Edwards",
          trader_avatar:
            "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
          title: "아직 뜨지 못한 신규 화폐를 노려라",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 250000,
          start_date: "2021년 04월 17일",
          end_date: "2021년 04월 17일",
          trader_name: "BBC James",
          trader_avatar:
            "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
          title: "박스매매 전문, 안정적인 수익",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 200000,
          start_date: "2021년 08월 17일",
          end_date: "2021년 09월 17일",
          trader_name: "KOREA TIGER",
          trader_avatar:
            "https://images.unsplash.com/photo-1544168190-79c17527004f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80",
          title: "백만원 시드로 1억 가즈아",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 300000,
          start_date: "2021년 06월 17일",
          end_date: "2021년 07월 17일",
          trader_name: "KOREA 햇님",
          trader_avatar:
            "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80",
          title: "가상화폐를 몰라도 수익은 낼 수 있다!",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 150000,
          start_date: "2021년 05월 17일",
          end_date: "2021년 05월 17일",
          trader_name: "BBC Edwards",
          trader_avatar:
            "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
          title: "아직 뜨지 못한 신규 화폐를 노려라",
          paragraph:
            "현재 가격이 차트에 남아있는 마지막 저항과 거의 비슷하고 곧 약간의 조정을 받을 수 있다. 비트코인이 여전히 41K-30K 박스권에서 보합할 가능성이 높다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를",
          price: 250000,
          start_date: "2021년 04월 17일",
          end_date: "2021년 04월 17일",
          trader_name: "BBC James",
          trader_avatar:
            "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
        },
      ],
    },
  ];

  return (
    <div className="products">
      <Head>
        <title>프라임 인베스트먼트 | 결제내역</title>
      </Head>
      <div className="products__contents parents">
        <div className="products__contents__box parents">
          <div className="products__contents__box__title">상품목록</div>
          <PayemtList products={datas[0].products} />
        </div>
      </div>
    </div>
  );
};

export default Products;
