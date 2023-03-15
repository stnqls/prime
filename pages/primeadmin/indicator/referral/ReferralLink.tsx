import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Lee from "../../../../lib/Lee";

import "./ReferralLink.scss";

const ReferralLink = () => {
  const [referral, setReferral] = useState<string[]>(["", "", "", "", ""]);
  let patchReferralArray: string[] = ["", "", "", "", ""];

  async function getReferral() {
    try {
      const token: string = window.sessionStorage.getItem("accessToken") ?? "";
      const config: AxiosRequestConfig = {
        method: "get",
        url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/indicator/referral",
        headers: {
          authorization: token,
        },
      };
      const referralAxios = await axios(config);
      if (referralAxios.data.errCode === "101") {
        Lee.refreshToken(getReferral);
      } else {
        setReferral(referralAxios.data);
        patchReferralArray = referralAxios.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function patchReferral() {
    const token: string = window.sessionStorage.getItem("accessToken") ?? "";
    const config: AxiosRequestConfig = {
      method: "patch",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/indicator/referral",
      data: {
        linkArray: patchReferralArray,
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
          Lee.refreshToken(patchReferral);
        } else {
          alert("에러 발생");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getReferral();
  }, []);
  return (
    <div className="referralLink">
      거래소 레퍼럴 링크 설정
      <ul className="referralLink__list">
        <li className="referralLink__list__item">
          <img src="/images/icons/binance.png" />
          <input
            type="string"
            defaultValue={referral[0]}
            onChange={(e) => {
              patchReferralArray[0] = e.target.value;
            }}
          />
        </li>
        <li className="referralLink__list__item">
          <img src="/images/icons/villbit.png" />
          <input
            type="string"
            defaultValue={referral[1]}
            onChange={(e) => {
              patchReferralArray[1] = e.target.value;
            }}
          />
        </li>
        <li className="referralLink__list__item">
          <img src="/images/icons/bybit.png" />
          <input
            type="string"
            defaultValue={referral[2]}
            onChange={(e) => {
              patchReferralArray[2] = e.target.value;
            }}
          />
        </li>
        <li className="referralLink__list__item">
          <img src="/images/icons/bitget.png" />
          <input
            type="string"
            defaultValue={referral[3]}
            onChange={(e) => {
              patchReferralArray[3] = e.target.value;
            }}
          />
        </li>
        <li className="referralLink__list__item">
          <img src="/images/icons/runningFox.png" />
          <input
            type="string"
            defaultValue={referral[4]}
            onChange={(e) => {
              patchReferralArray[4] = e.target.value;
            }}
          />
        </li>
      </ul>
      <button
        className="referralLink__btn"
        onClick={async () => {
          await patchReferral();
        }}
      >
        적용
      </button>
    </div>
  );
};

export default ReferralLink;
