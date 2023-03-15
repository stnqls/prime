import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

import "./Indic.scss";

const Indic = () => {
  const db = getDatabase();
  const Ref = ref(db, "indicator/indices");
  const [btcKimP, setBtcKimP]: any = useState();
  const [ethKimP, setEthKimP]: any = useState();
  const [psy, setPsy] = useState();
  const [rsi, setRsi] = useState();
  const [sto, setSto] = useState();
  const [trend, setTrend] = useState();

  useEffect(() => {
    const getData = onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      setBtcKimP(data.btcKimP);
      setEthKimP(data.ethKimP);
      setPsy(data.psy);
      setRsi(data.rsi);
      setSto(data.sto);
      setTrend(data.trend);
    });
    return () => getData();
  }, []);

  function down(number: any) {
    if (number < 50 || number === "down") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="indic">
      <ul className="indic__list">
        <li className="indic__list__item">
          <div className="indic__list__item__name">공포지수(PSY)</div>
          <div
            className={
              down(psy)
                ? "indic__list__item__number--down"
                : "indic__list__item__number"
            }
          >
            {psy}
          </div>
        </li>
        <li className="indic__list__item">
          <div className="indic__list__item__name">상대 강도 지수(RSI)</div>
          <div
            className={
              down(rsi)
                ? "indic__list__item__number"
                : "indic__list__item__number--down"
            }
          >
            {rsi}
          </div>
        </li>
        <li className="indic__list__item">
          <div className="indic__list__item__name">스토캐스틱(STO)</div>
          <div
            className={
              down(sto)
                ? "indic__list__item__number--down"
                : "indic__list__item__number"
            }
          >
            {sto}
          </div>
        </li>
        <li className="indic__list__item">
          <div className="indic__list__item__name">추세(Trend)</div>
          <div
            className={
              down(trend)
                ? "indic__list__item__number"
                : "indic__list__item__number--down"
            }
          >
            {trend === "up" ? "상승장" : "하락장"}
          </div>
        </li>
        <li className="indic__list__item">
          <div className="indic__list__item__name">김치프리미엄(BTC)</div>
          <div
            className={
              btcKimP < 0
                ? "indic__list__item__number"
                : "indic__list__item__number--down"
            }
          >
            {btcKimP}%
          </div>
        </li>
        <li className="indic__list__item">
          <div className="indic__list__item__name">김치프리미엄(ETH)</div>
          <div
            className={
              ethKimP < 0
                ? "indic__list__item__number"
                : "indic__list__item__number--down"
            }
          >
            {ethKimP}%
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Indic;
