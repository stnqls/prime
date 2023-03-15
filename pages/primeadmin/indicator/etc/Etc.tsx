import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Lee from "../../../../lib/Lee";

import "./Etc.scss";

const Etc = () => {
  const [transferAmount, setTransferAmount] = useState<number>(500000);
  const [exchangeAmount, setExchangeAmount] = useState<number>(500000);
  const [twitter, setTwitter] = useState<string>("@");

  async function getEtcSetting() {
    try {
      const token: string = window.sessionStorage.getItem("accessToken") ?? "";
      const config: AxiosRequestConfig = {
        method: "get",
        url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/indicator/etc",
        headers: {
          authorization: token,
        },
      };
      const etcAxios = await axios(config);
      if (etcAxios.data.errCode === "101") {
        Lee.refreshToken(getEtcSetting);
      } else {
        setTransferAmount(etcAxios.data.transfer);
        setExchangeAmount(etcAxios.data.exchange);
        setTwitter(etcAxios.data.twitter);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function patchEtcSetting() {
    const token: string = window.sessionStorage.getItem("accessToken") ?? "";
    const config: AxiosRequestConfig = {
      method: "patch",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/indicator/etc",
      data: {
        transfer: transferAmount,
        exchange: exchangeAmount,
        twitter: twitter,
      },
      headers: {
        authorization: token,
      },
    };
    try {
      await axios(config).then((res) => {
        if (res.data.success) {
          alert("적용되었습니다");
        } else if (res.data.errCode === "101") {
          Lee.refreshToken(patchEtcSetting);
        } else {
          alert("에러 발생");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getEtcSetting();
  }, []);

  return (
    <div className="etc">
      <ul className="etc__list">
        <li className="etc__list__item">
          <span className="etc__list__item__title">
            코인 고래지갑 이동 기준
          </span>
          <input
            type="number"
            placeholder="500000 이상"
            value={transferAmount}
            onChange={(e) => {
              setTransferAmount(Number(e.target.value));
            }}
          />
        </li>
        <li className="etc__list__item">
          <span className="etc__list__item__title">
            비트코인 고래 거래 체결 기준
          </span>
          <input
            type="number"
            placeholder="500000 이상"
            value={exchangeAmount}
            onChange={(e) => {
              setExchangeAmount(Number(e.target.value));
            }}
          />
        </li>
        <li className="etc__list__item">
          <span className="etc__list__item__title">가져올 트위터 아이디</span>
          <input
            type="string"
            value={twitter}
            onChange={(e) => {
              if (e.target.value.length === 0) {
                e.target.value = "@";
              }
              setTwitter(e.target.value);
            }}
          />
        </li>
      </ul>
      <button
        className="etc__btn"
        onClick={async () => {
          if (exchangeAmount < 500000 || transferAmount < 500000) {
            alert("값을 확인해주세요");
          }
          await patchEtcSetting();
        }}
      >
        적용
      </button>
    </div>
  );
};

export default Etc;
