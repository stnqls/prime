import React, { useEffect, useState } from "react";
import Router from "next/router";
import Lee from "../../../../../../lib/Lee";
import DelayLink from "../../../../../../lib/DelayLink";
import axios from "axios";
import moment from "moment";

import "./PaymentListItemModalRefund.scss";

const PaymentListItemModalRefund = (props: any) => {
  const [process, setProcess]: any = useState(false);
  const [ready, setReady]: any = useState(false);
  const [refund, setRefund]: any = useState();
  const [bank, setBank]: any = useState("");
  const [name, setName]: any = useState();
  const [account, setAccount]: any = useState();

  const today = moment();
  const purchaseDate = moment(props.purchaseDate);

  function getRefundInfo() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };

    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/payments/refund/${props.paymentId}/preview`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setRefund(res.data.data);
          setReady(true);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getRefundInfo);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  function refundSubmit() {
    if (!bank || !name || !account) {
      alert("빈칸을 다 채워주세요.");
    } else {
      const headers: any = {
        authorization: window.sessionStorage.getItem("token"),
      };

      axios({
        method: "PATCH",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/payments/refund`,
        headers,
        data: {
          paymentId: props.paymentId,
          refundMemo: bank + name + account,
        },
      })
        .then((res) => {
          if (res.data.success) {
            setProcess(true);
            setTimeout(() => {
              alert(
                "해당 결제 건에 대한 환불 요청이 성공적으로 전송되었습니다."
              );
              window.location.reload();
            }, 2000);
          } else {
            if (res.data.errCode === "101") {
              Lee.refreshToken(refundSubmit);
            } else {
              alert("서버 통신 중 오류가 발생했습니다.");
            }
          }
        })
        .catch((err) => {
          if (err.errCode === "201") {
            alert("메모를 입력해주세요.");
          } else {
            window.alert("일시적인 오류입니다. 다시 시도해주세요.");
          }
        });
    }
  }

  useEffect(() => {
    getRefundInfo();
  }, []);

  return (
    <div
      className="payment-list-item-modal-refund"
      id="PaymentListItemModalRefund"
    >
      {process && (
        <div className="payment-list-item-modal-refund__process">
          <div className="payment-list-item-modal-refund__process__contents">
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
            <div className="payment-list-item-modal-refund__process__contents__text">
              결제에 대한 환불 요청을 진행 중입니다.
            </div>
          </div>
        </div>
      )}
      <div
        className="payment-list-item-modal-refund__hide"
        onClick={function () {
          props.setView(false);
        }}
      />
      <div className="payment-list-item-modal-refund__contents">
        <img
          className="payment-list-item-modal-refund__contents__close"
          src="/assets/x-sign.png"
          alt="x-sign"
          onClick={function () {
            props.setView(false);
          }}
        />
        <div className="payment-list-item-modal-refund__contents__category">
          환불하기
        </div>
        <div className="payment-list-item-modal-refund__contents__desc">
          환불 및 취소하기는 프라임인베스트먼트사의 유료서비스 정책에
          의거합니다. <br /> 할인이벤트로 결제를 하신 경우에는 할인이
          불가합니다. <br />
          1개월(30일) 상품판매액 X 30-이용기간/30으로 일할계산 된다는 점
          인지바랍니다. <br /> 상품의 가격이 전문가마다 다른점 인지바랍니다.
          <br />
          환불예정금액과 실제 환불금액은 다를수도 있습니다.
        </div>
        <div className="payment-list-item-modal-refund__contents__package">
          <div className="payment-list-item-modal-refund__contents__package__name">
            1. 환불요청 상품
          </div>
          <div className="payment-list-item-modal-refund__contents__package__info">
            <img src={props.traderAvatar} alt="traderAvatar" />
            <div>
              <div className="payment-list-item-modal-refund__contents__package__info__package">
                {props.packageName}
              </div>
              <div className="payment-list-item-modal-refund__contents__package__info__price">
                <span> {Lee.addComma(props.price)}KRW</span>
                <span>
                  {purchaseDate.format("YY.MM.DD") +
                    " ~ " +
                    today.format("YY.MM.DD")}
                </span>
              </div>
              <div className="payment-list-item-modal-refund__contents__package__info__trader">
                <span>{props.traderName}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-list-item-modal-refund__contents__price">
          <div className="payment-list-item-modal-refund__contents__price__name">
            2. 환불예정 금액
          </div>
          <div className="payment-list-item-modal-refund__contents__price__info">
            {ready ? (
              refund && refund.refundAmount ? (
                `${Lee.addComma(refund.refundAmount)}원 (이용일수 : ${
                  refund.usePeriod
                }일)`
              ) : (
                `${Lee.addComma(props.price)}원`
              )
            ) : (
              <span>계산 중</span>
            )}
          </div>
        </div>
        <div className="payment-list-item-modal-refund__contents__bank">
          <div className="payment-list-item-modal-refund__contents__bank__name">
            3. 환불계좌 입력하기
          </div>
          <select
            name=""
            id=""
            onChange={(e) => {
              setBank(e.target.value);
            }}
          >
            <option value="">은행선택</option>
            <option value="카카오">카카오</option>
            <option value="국민">국민</option>
            <option value="KEB하나은행">KEB하나은행</option>
            <option value="우리">우리</option>
            <option value="신한">신한</option>
            <option value="한국시티">한국시티</option>
            <option value="기업">기업</option>
            <option value="농협">농협</option>
            <option value="수협">수협</option>
            <option value="산업">산업</option>
          </select>
          <input
            type="text"
            placeholder="'이름'을 입력해주세요."
            className="payment-list-item-modal-refund__contents__bank__username"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="'계좌번호'를 입력해주세요."
            className="payment-list-item-modal-refund__contents__bank__userbank"
            onChange={(e) => {
              setAccount(e.target.value);
            }}
          />
        </div>
        <div
          className="payment-list-item-modal-refund__contents__submit"
          onClick={refundSubmit}
        >
          환불요청
        </div>
      </div>
    </div>
  );
};

export default PaymentListItemModalRefund;
