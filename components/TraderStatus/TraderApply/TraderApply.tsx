import axios from "axios";
import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import "./TraderApply.scss";

const TraderApply = () => {
  const [status, setStatus] = useState();

  function getTraderApply() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/users/apply_trader`,
      headers,
    })
      .then((res) => {
        if (res.status === 200) {
          setStatus(res.data.status);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getTraderApply);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function applyTrader() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "POST",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/users/apply_trader`,
      headers,
    })
      .then((res) => {
        if (res.status === 200) {
          alert("신청이 완료되었습니다.");
          setStatus(res.data.status);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  useEffect(() => {
    getTraderApply();
  }, []);

  return (
    <React.Fragment>
      {status === 0 ? (
        <div className="trader-apply">
          <div className="trader-apply__title">트레이더 신청을 원하시나요?</div>
          <div className="trader-apply__subtitle">
            프라임과 함께할 트레이더를 모집합니다.
          </div>
          <div
            className="trader-apply__btn"
            onClick={() => {
              applyTrader();
            }}
          >
            트레이더 신청하기
          </div>
        </div>
      ) : (
        <div className="trader-apply">
          <div className="trader-apply__status">관리자 승인 대기중</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TraderApply;
