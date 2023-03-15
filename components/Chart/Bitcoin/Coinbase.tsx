import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

import "./Coinbase.scss";

const Coinbase = () => {
  const db = getDatabase();
  const RefAsks = ref(db, "indicator/coinbaseOrderBook/asks");
  const RefBids = ref(db, "indicator/coinbaseOrderBook/bids");
  const realtime = ref(db, "indicator/coinbaseTrade");
  const average = ref(db, "indicator/coinbaseOrderBook/average");

  const [asks, setAsks] = useState([]);
  const [aver, setAver] = useState();
  const [bids, setBids] = useState([]);
  const [realTime, setRealTime] = useState([]);

  useEffect(() => {
    onValue(RefBids, (snapshot) => {
      let bidsData = snapshot.val();
      setBids(bidsData);
    });

    onValue(average, (snapshot) => {
      let averageData = snapshot.val();
      setAver(averageData);
    });

    onValue(RefAsks, (snapshot) => {
      let asksData = snapshot.val();
      setAsks(asksData);
    });

    onValue(realtime, (snapshot) => {
      let realTimeData = snapshot.val();
      setRealTime(realTimeData);
    });
  }, []);

  return (
    <div className="bitcoin-coinbase">
      <div className="bitcoin-coinbase__title">코인베이스 비트코인 호가</div>
      {/* <div className="bitcoin-coinbase__group">그룹화 : </div> */}
      <div className="bitcoin-coinbase__body">
        <div className="bitcoin-coinbase__body__realtime">
          <ul className="bitcoin-coinbase__body__realtime__list">
            {realTime.map((data: any, index: number) => (
              <li
                className="bitcoin-coinbase__body__realtime__list__item"
                key={`bitcoin-coinbase-realtime-${index}`}
              >
                <span
                  className={`bitcoin-coinbase__body__realtime__list__item-${data.side}`}
                >
                  {data.price}
                </span>
                <span className="bitcoin-coinbase__body__realtime__list__item">
                  {data.size}
                </span>
                <span className="bitcoin-coinbase__body__realtime__list__item">
                  {data.date}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bitcoin-coinbase__body__selling">
          <ul className="bitcoin-coinbase__body__selling__list">
            {asks.map((item: any, index: number) => {
              return (
                <li
                  className="bitcoin-coinbase__body__selling__list__item"
                  key={`bitcoin-coinbase-selling-${index}`}
                >
                  <div
                    className="bitcoin-coinbase__body__selling__list__item__graph"
                    style={{
                      width: `${item[3]}%`,
                      height: "34px",
                      backgroundImage: "linear-gradient(#3C1911, #201513)",
                    }}
                  ></div>
                  <span className="bitcoin-coinbase__body__selling__list__item__first">
                    {item[0]}
                  </span>
                  <span>{item[1]}</span>
                  <span>{item[2]}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bitcoin-coinbase__body__buying">
          <div className="bitcoin-coinbase__body__buying__top">{aver} USD</div>
          <ul className="bitcoin-coinbase__body__buying__list">
            {bids.map((item: any, index: number) => (
              <li
                className="bitcoin-coinbase__body__buying__list__item"
                key={`bitcoin-coinbase-buying-${index}`}
              >
                <div
                  className="bitcoin-coinbase__body__buying__list__item__graph"
                  style={{
                    width: `${item[3]}%`,
                    height: "34px",
                    backgroundImage: "linear-gradient(#131C1A, #122E29)",
                  }}
                ></div>
                <span className="bitcoin-coinbase__body__buying__list__item__first">
                  {item[0]}
                </span>
                <span>{item[1]}</span>
                <span>{item[2]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Coinbase;
