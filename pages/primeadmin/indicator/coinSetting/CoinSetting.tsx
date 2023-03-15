import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Lee from "../../../../lib/Lee";

import "./CoinSetting.scss";

const CoinSetting = () => {
  const tickerArray = [
    "BTC",
    "ETH",
    "SOL",
    "FTM",
    "BNB",
    "AVAX",
    "ADA",
    "TRX",
    "GMT",
    "APE",
    "DOT",
    "XRP",
    "SHIB",
    "NEAR",
    "ANC",
    "DOGE",
    "MATIC",
    "GALA",
    "MANA",
    "SAND",
    "ZIL",
    "ATOM",
    "KNC",
    "AAVE",
    "RSR",
    "XTZ",
    "AXS",
    "RUNE",
    "LINK",
    "SUSHI",
    "ERC",
    "LRC",
    "WAVE",
    "LTC",
    "ALGO",
    "WIN",
    "ROSE",
  ];

  const [representativeCoin, setRepresentativeCoin] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);

  const pushRepresentativeCoin = (coin: string) => {
    if (representativeCoin.length < 5 && !representativeCoin.includes(coin)) {
      setRepresentativeCoin([...representativeCoin, coin]);
    }
  };
  const deleteRepresentativeCoin = (coin: string) => {
    setRepresentativeCoin(
      representativeCoin.filter((element) => element !== coin)
    );
  };

  async function getRepresentativeCoin() {
    const token: string = window.sessionStorage.getItem("accessToken") ?? "";
    try {
      const config: AxiosRequestConfig = {
        method: "get",
        url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/indicator/representative",
        headers: {
          authorization: token,
        },
      };
      const representativeAxios = await axios(config);
      if (representativeAxios.data.errCode === "101") {
        Lee.refreshToken(getRepresentativeCoin);
      } else {
        setRepresentativeCoin(representativeAxios.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function patchRepresentativeCoin() {
    const token: string = window.sessionStorage.getItem("accessToken") ?? "";
    const config: AxiosRequestConfig = {
      method: "patch",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/indicator/representative",
      data: {
        coinArray: representativeCoin,
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
          Lee.refreshToken(patchRepresentativeCoin);
        } else {
          alert("에러 발생");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRepresentativeCoin();
  }, []);

  return (
    <div className="coinSetting">
      대표 코인 설정
      <div className="coinSetting__box">
        {representativeCoin.map((coin, index) => {
          return (
            <div
              className="coinSetting__box__item"
              onClick={() => {
                deleteRepresentativeCoin(coin);
              }}
              key={index}
            >
              {coin}
            </div>
          );
        })}
      </div>
      <div className="coinSetting__container">
        {tickerArray.map((coin, index) => {
          return (
            <div
              className="coinSetting__container__item"
              onClick={() => {
                pushRepresentativeCoin(coin);
              }}
              key={index}
            >
              {coin}
            </div>
          );
        })}
      </div>
      <button
        className="coinSetting__btn"
        onClick={async () => {
          if (representativeCoin.length === 5) {
            await patchRepresentativeCoin();
          } else {
            alert("코인 5개를 다 선택해주세요");
          }
        }}
      >
        적용
      </button>
    </div>
  );
};

export default CoinSetting;
