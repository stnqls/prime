import { getDatabase, ref, onValue, Database } from "firebase/database";
import { useEffect, useState } from "react";
import Lee from "../../lib/Lee";

import "./Ratio.scss";

const Ratio = () => {
  const [btcusdtL, setBtcusdtL]: any = useState();
  const [btcusdtS, setBtcusdtS]: any = useState();
  const [ethusdtL, setEthusdtL]: any = useState();
  const [ethusdtS, setEthusdtS]: any = useState();
  const [xrpusdtL, setXrpusdtL]: any = useState();
  const [xrpusdtS, setXrpusdtS]: any = useState();

  const db = getDatabase();
  const Ref = ref(db, "indicator/binanceMarginCall");
  let data: any;

  useEffect(() => {
    const getValue = onValue(Ref, (snapshot) => {
      data = snapshot.val();
      setBtcusdtL(data.btcusdt.long);
      setBtcusdtS(data.btcusdt.short);
      setEthusdtL(data.ethusdt.long);
      setEthusdtS(data.ethusdt.short);
      setXrpusdtL(data.xrpusdt.long);
      setXrpusdtS(data.xrpusdt.short);
    });
    return () => getValue();
  }, []);

  function percent(num1: any, num2: any) {
    let result = Number(((num1 / (num1 + num2)) * 100).toFixed(2));
    if (result === NaN) {
      return 0;
    } else {
      return result;
    }
  }

  return (
    <div className="ratio">
      <div className="ratio__title">바이낸스 누적 강제 청산 비율</div>
      <div className="ratio__body">
        <ul className="ratio__body__list">
          <li className="ratio__body__list__item ratio__item">
            <div className="ratio__body__list__item__title">24h-BTCUSDT</div>
            <ul className="ratio__item__list">
              <li className="ratio__item__list__item">
                <div className="ratio__item__list__item__title">
                  <div className="ratio__item__list__item__title__long">
                    누적 롱 청산액
                    <span>{percent(btcusdtL, btcusdtS)}%</span>
                  </div>
                  <div className="ratio__item__list__item__title__short">
                    <span>{percent(btcusdtS, btcusdtL)}%</span>
                    누적 숏 청산액
                  </div>
                </div>
                <div className="ratio__item__list__item__data">
                  <div
                    className="ratio__item__list__item__data__long"
                    style={{
                      width: `${Number(
                        (btcusdtL / (btcusdtL + btcusdtS)) * 100
                      ).toFixed(2)}%`,
                      display: btcusdtL === 0 ? "none" : "block",
                    }}
                  ></div>
                  <div
                    className="ratio__item__list__item__data__short"
                    style={{
                      width: `${Number(
                        (btcusdtS / (btcusdtL + btcusdtS)) * 100
                      ).toFixed(2)}%`,
                      display: btcusdtS === 0 ? "none" : "block",
                    }}
                  ></div>
                  <div className="ratio__item__list__item__data__text">
                    <div>${Lee.addComma(btcusdtL)}</div>
                    <div>${Lee.addComma(btcusdtS)}</div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li className="ratio__body__list__item ratio__item">
            <div className="ratio__body__list__item__title">24h-ETHUSDT</div>
            <ul className="ratio__item__list">
              <li className="ratio__item__list__item">
                <div className="ratio__item__list__item__title">
                  <div className="ratio__item__list__item__title__long">
                    누적 롱 청산액
                    <span>{percent(ethusdtL, ethusdtS)}%</span>
                  </div>
                  <div className="ratio__item__list__item__title__short">
                    <span>{percent(ethusdtS, ethusdtL)}%</span>
                    누적 숏 청산액
                  </div>
                </div>
                <div className="ratio__item__list__item__data">
                  <div
                    className="ratio__item__list__item__data__long"
                    style={{
                      width: `${Number(
                        (ethusdtL / (ethusdtL + ethusdtS)) * 100
                      ).toFixed(2)}%`,
                      display: ethusdtL === 0 ? "none" : "block",
                    }}
                  ></div>
                  <div
                    className="ratio__item__list__item__data__short"
                    style={{
                      width: `${Number(
                        (ethusdtS / (ethusdtL + ethusdtS)) * 100
                      ).toFixed(2)}%`,
                      display: ethusdtS === 0 ? "none" : "block",
                    }}
                  ></div>
                  <div className="ratio__item__list__item__data__text">
                    <div>${Lee.addComma(ethusdtL)}</div>
                    <div>${Lee.addComma(ethusdtS)}</div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li className="ratio__body__list__item ratio__item">
            <div className="ratio__body__list__item__title">24h-XRPUSDT</div>
            <ul className="ratio__item__list">
              <li className="ratio__item__list__item">
                <div className="ratio__item__list__item__title">
                  <div className="ratio__item__list__item__title__long">
                    누적 롱 청산액
                    <span>{percent(xrpusdtL, xrpusdtS)}%</span>
                  </div>
                  <div className="ratio__item__list__item__title__short">
                    <span>{percent(xrpusdtS, xrpusdtL)}%</span>
                    누적 숏 청산액
                  </div>
                </div>
                <div className="ratio__item__list__item__data">
                  <div
                    className="ratio__item__list__item__data__long"
                    style={{
                      width: `${Number(
                        (xrpusdtL / (xrpusdtL + xrpusdtS)) * 100
                      ).toFixed(2)}%`,
                      display: xrpusdtL === 0 ? "none" : "block",
                    }}
                  ></div>
                  <div
                    className="ratio__item__list__item__data__short"
                    style={{
                      width: `${Number(
                        (xrpusdtS / (xrpusdtL + xrpusdtS)) * 100
                      ).toFixed(2)}%`,
                      display: xrpusdtS === 0 ? "none" : "block",
                    }}
                  ></div>
                  <div className="ratio__item__list__item__data__text">
                    <div>${Lee.addComma(xrpusdtL)}</div>
                    <div>${Lee.addComma(xrpusdtS)}</div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Ratio;
