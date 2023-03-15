import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Lee from "../../lib/Lee";
import DelayLink from "../../lib/DelayLink";
import Router from "next/router";

import "./withdraw.scss";

const Withdraw = (props: any) => {
  const [others, setOthers] = useState(false);
  const [text, setText] = useState("");
  const [isAgree, setIsAgree] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function showInput(e: any) {
    setText(e.target.innerText);
  }

  return (
    <React.Fragment>
      <div
        className="withdraw__wrap"
        onClick={() => {
          props.setWithdraw(false);
        }}
      ></div>
      <div className="withdraw">
        <div className="withdraw__title">회원 탈퇴</div>
        <img
          src="/assets/x-sign.png"
          alt="close"
          className="withdraw__close"
          onClick={() => {
            props.setWithdraw(false);
          }}
        />
        <ol className="withdraw__content">
          <li>1.회원 탈퇴시, 현재 로그인된 아이디는 즉시 탈퇴 처리됩니다.</li>
          <li>
            2.탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하니
            신중하게 선택하시기 바랍니다.
          </li>
          <li>
            3.탈퇴 후 회원정보 및 서비스 이용기록은 모두 삭제되며 게시판형
            서비스에 등록한 게시물은 그대로 유지됩니다. 삭제를 원하는 게시글이
            있다면 탈퇴 전 삭제조치 하시기 바랍니다.
          </li>
          <li>
            4.탈퇴 시 유료 서비스 이용기간이 남아있을 경우 환불을 요청 하실 수
            있습니다.
          </li>
          <li>
            5.환불에 대한 정책은 이용약관 제 26조 및 27조의 7항에 따르며,
            환불하지 않고 탈퇴를 진행 할 경우, 회사 자체적으로 환불을 처리하지
            않습니다.
          </li>
        </ol>
        {/* <ul className="withdraw__reason">
          <li>탈퇴 사유를 선택해 주세요.</li>
          <li onClick={showInput}>컨텐츠의 부족</li>
          <li onClick={showInput}>서비스 이용에 대한 불만족</li>
          <li onClick={showInput}>사용빈도의 낮음</li>
          <li
            onClick={() => {
              setText("");
              setOthers(true);
            }}
          >
            기타
          </li>
          <li>
            <input
              type="text"
              placeholder={
                others
                  ? "탈퇴 사유를 입력해주세요."
                  : "탈퇴 사유를 선택해 주세요."
              }
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </li>
        </ul> */}
        <select className="withdraw__reason">
          <option value="">탈퇴 사유를 선택해 주세요.</option>
          <option value="">컨텐츠의 부족</option>
          <option value="">서비스 이용에 대한 불만족</option>
          <option value="">사용 빈도의 낮음</option>
          <option value="">기타</option>
        </select>
        <div
          className="withdraw__agree"
          onClick={() => {
            setIsAgree(!isAgree);
          }}
        >
          <img
            src={isAgree ? "/assets/check.png" : "/assets/check_x.png"}
            alt="check"
          />
          회원 탈퇴 안내 사항을 모두 확인하였으며, 동의합니다.
        </div>
        <button type="button" className="withdraw__btn">
          동의하고 탈퇴하기
        </button>
      </div>
    </React.Fragment>
  );
};

export default Withdraw;
