import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import Router from "next/router";
import axios from "axios";

import "./addPick.scss";
import router from "next/router";

const AddPick = (props: any) => {
  const [packages, setPackages] = useState([]);
  const [packageId, setPackageId]: any = useState();
  const [category, setCategory]: any = useState("spot");
  const [coinNameKR, setCoinNameKR]: any = useState();
  const [coinNameEN, setCoinNameEN]: any = useState();
  const [pair, setPair]: any = useState();
  const [entryPrice, setEntryPrice]: any = useState();
  const [targetPrice, setTargetPrice]: any = useState();
  const [option, setOption]: any = useState("long");
  const [leverage, setLeverage]: any = useState();

  const [openOption, setOpenOption] = useState(false);

  function getPackages() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/packages",
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setPackages(res.data.data);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getPackages);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
        window.alert("일시적인 오류입니다. 다시 시도해주세요.");
      });
  }

  function startPick() {
    if (
      packageId !== "" &&
      category &&
      coinNameKR &&
      coinNameEN &&
      category &&
      pair &&
      option &&
      entryPrice &&
      targetPrice
    ) {
      const headers: any = {
        authorization: window.sessionStorage.getItem("token"),
      };

      axios({
        method: "POST",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/picks/start`,
        headers,
        data: {
          packageId: packageId,
          coinNameKr: coinNameKR,
          coinNameEng: coinNameEN,
          pair: pair,
          category: category,
          entryPrice: entryPrice,
          targetPrice: targetPrice,
          option: option,
          leverage: leverage,
        },
      })
        .then((res) => {
          if (res.data.success) {
            window.alert("픽이 정상적으로 등록되었습니다.");
            // Lee.loadingStart();
            props.setView(false);
            setTimeout(() => {
              //   Router.push("/traderPick");
              router.reload();
            }, 400);
          } else {
            if (res.data.errCode === "101") {
              Lee.refreshToken(startPick);
            } else {
              alert("서버 통신 중 오류가 발생했습니다.");
            }
          }
        })
        .catch((err) => {
          window.alert("일시적인 오류입니다. 다시 시도해주세요.");
        });
    } else {
      alert("모든 항목을 입력해주시기 바랍니다.");
    }
  }

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <React.Fragment>
      <div
        className="add-pick__cover"
        onClick={function () {
          props.setView(false);
        }}
      ></div>
      <div className="add-pick">
        <img
          src="/assets/x-sign.png"
          alt="close"
          className="add-pick__close"
          onClick={function () {
            props.setView(false);
          }}
        />
        <div className="add-pick__form">
          <div className="add-pick__form__title">등록하기</div>
          <div className="add-pick__form__subject">패키지 선택</div>
          <select
            className="add-pick__form__package"
            onChange={(e) => {
              setPackageId(e.target.value);
            }}
          >
            <option value="">패키지를 선택해 주세요</option>
            {packages.map(
              (packages: any, index: number) =>
                !packages.isDeleted && (
                  <option key={`add-pick-package-${index}`} value={packages.id}>
                    {packages.packageName}
                  </option>
                )
            )}
          </select>
          <div className="add-pick__form__wrap">
            <div className="add-pick__form__nameKR">
              <div className="add-pick__form__subject">코인이름 (한글)</div>
              <input
                type="text"
                className="add-pick__form__input"
                placeholder="비트코인"
                id="PickNameInput"
                defaultValue={coinNameKR}
                maxLength={8}
                onChange={function (e) {
                  setCoinNameKR(e.target.value);
                }}
              />
            </div>
            <div className="add-pick__form__nameEN">
              <div className="add-pick__form__subject">코인이름 (영문)</div>
              <input
                type="text"
                className="add-pick__form__input"
                placeholder="BTC"
                id="PickNameInput"
                maxLength={5}
                defaultValue={coinNameEN}
                onChange={function (e) {
                  setCoinNameEN(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="add-pick__form__wrap">
            <div className="add-pick__form__category">
              <div className="add-pick__form__subject">분류</div>
              <select
                className="add-pick__form__category__select"
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === "spot") {
                    setOpenOption(false);
                  } else {
                    setOpenOption(true);
                  }
                }}
              >
                <option value="spot">현물</option>
                <option value="futures">선물</option>
              </select>
            </div>

            <div className="add-pick__form__pair">
              <div className="add-pick__form__subject">페어</div>
              <input
                type="text"
                className="add-pick__form__input"
                placeholder="KRW"
                maxLength={20}
                id="PickNameInput"
                defaultValue={pair}
                onChange={function (e) {
                  setPair(e.target.value);
                }}
              />
            </div>
          </div>
          {openOption && (
            <React.Fragment>
              <div className="add-pick__form__wrap">
                <div className="add-pick__form__option">
                  <div className="add-pick__form__subject">옵션</div>
                  <select
                    className="add-pick__form__option__select"
                    onChange={(e) => {
                      setOption(e.target.value);
                    }}
                  >
                    <option value="long">LONG</option>
                    <option value="short">SHORT</option>
                  </select>
                </div>

                <div className="add-pick__form__leverage">
                  <div className="add-pick__form__subject">레버리지</div>
                  <input
                    type="number"
                    className="add-pick__form__input"
                    placeholder="1"
                    maxLength={20}
                    id="PickNameInput"
                    defaultValue={leverage}
                    onChange={function (e) {
                      setLeverage(e.target.value);
                    }}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
          <div className="add-pick__form__wrap">
            <div className="add-pick__form__enterprice">
              <div className="add-pick__form__subject">진입가격</div>
              <input
                type="number"
                className="add-pick__form__input"
                placeholder="145"
                id="PriceInput"
                defaultValue={entryPrice}
                onChange={function (e) {
                  setEntryPrice(e.target.value);
                }}
              />
            </div>
            <div className="add-pick__form__targetprice">
              <div className="add-pick__form__subject">목표가격</div>
              <input
                type="number"
                className="add-pick__form__input"
                placeholder="145"
                id="PriceInput"
                defaultValue={targetPrice}
                onChange={function (e) {
                  setTargetPrice(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="add-pick__form__submit" onClick={startPick}>
            등록하기
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddPick;
