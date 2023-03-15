import React, { useEffect, useState } from "react";
import Router from "next/router";
import Lee from "../../../../../lib/Lee";
import DelayLink from "../../../../../lib/DelayLink";
import axios from "axios";

import "./ViewTraderPackageItemBank.scss";

const ViewTraderPackageItemBank = (props: any) => {
  const [process, setProcess] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone]: any = useState("");

  function getInfos() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/users`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setName(data.name);
          setPhone(data.phoneNumber);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getInfos);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  function submitPayment() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "POST",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/payments`,
      headers,
      data: {
        traderId: props.traderId,
        memberName: name,
        phoneNumber: phone,
        packageId: props.packageId,
        packageName: props.packageName,
        packageDescription: props.packageDescription,
        thumbnail: props.thumbnail,
        paymentType: "bank",
        price: props.price,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setProcess(true);
          setTimeout(() => {
            alert("결제 확인 요청이 완료되었습니다.");
            window.location.reload();
          }, 2000);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(submitPayment);
          } else if (res.data.errCode === "001") {
            alert("이미 구독 중인 패키지입니다.");
          } else if (res.data.errCode === "002") {
            alert("이미 결제가 완료되었거나 결제 확인 요청이 진행 중입니다.");
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <div
      className="view-trader-package-item-bank"
      id="ViewTraderPackageItemBank"
    >
      {process && (
        <div className="view-trader-package-item-bank__process">
          <div className="view-trader-package-item-bank__process__contents">
            <svg>
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="red"
                strokeDasharray="78.5 235.5"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="blue"
                strokeDasharray="62.8 188.8"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                stroke="green"
                strokeDasharray="47.1 141.3"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <div className="view-trader-package-item-bank__process__contents__text">
              {props.traderName}님의 패키지에 대한 결제 확인 요청을 전송합니다.
            </div>
          </div>
        </div>
      )}
      <div
        className="view-trader-package-item-bank__hide"
        onClick={function () {
          props.setBank(false);
        }}
      />
      <div className="view-trader-package-item-bank__contents">
        <div className="view-trader-package-item-bank__contents__category">
          계좌이체
        </div>
        <img
          className="view-trader-package-item-bank__contents__close"
          src="/assets/x-sign.png"
          alt="x-sign"
          onClick={function () {
            props.setBank(false);
          }}
        />

        <div className="view-trader-package-item-bank__contents__context parents">
          <div className="view-trader-package-item-bank__contents__context__subject">
            패키지명
          </div>
          <div className="view-trader-package-item-bank__contents__context__title">
            {props.packageName}
          </div>
          <div className="view-trader-package-item-bank__contents__context__subject">
            입금자명
          </div>
          <div className="view-trader-package-item-bank__contents__context__name">
            {name}
            {phone.slice(7, 11)}
            <span>(성함 + 휴대폰 번호 뒷 4자리)</span>
          </div>
          <div className="view-trader-package-item-bank__contents__context__subject">
            결제 금액
          </div>
          <div className="view-trader-package-item-bank__contents__context__price">
            {Lee.addComma(props.price)}원
          </div>
          <div className="view-trader-package-item-bank__contents__context__subject">
            입금하실 계좌
          </div>
          <div className="view-trader-package-item-bank__contents__context__bank">
            089501-04-286516 국민은행
            <br />
            예금주: 프라임인베스트먼트(주)
          </div>
        </div>

        <div
          className="view-trader-package-item-bank__contents__submit"
          onClick={submitPayment}
        >
          <span>입금이 완료되셨다면</span>
          <br />
          결제 확인 요청
        </div>
      </div>
    </div>
  );
};

export default ViewTraderPackageItemBank;
