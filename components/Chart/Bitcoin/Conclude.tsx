import {
  getDatabase,
  ref,
  onValue,
  query,
  limitToLast,
} from "firebase/database";
import { useEffect, useState } from "react";

import "./Conclude.scss";

const Conclude = () => {
  const db = getDatabase();
  const Ref = query(ref(db, "indicator/whaleTrade"), limitToLast(1));

  let [data, setData]: any = useState([]);
  let [item, setItem]: any = useState({
    amount_krw: "",
    amount_usd: "",
    date: "",
    exchange: "",
    exchange_kor: "",
    position: "",
    price: "",
    symbol: "",
  });
  let itemList: any = [];
  let lastData: any;

  useEffect(() => {
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      lastData = Object.values(data)[0];
      if (data !== null) {
        if (itemList.length < 15) {
          setItem(data);
          itemList = itemList.concat(lastData);
          setData(itemList);
        } else if (itemList.length >= 15) {
          itemList.shift();
          itemList = itemList.concat(lastData);
          setData(itemList);
        }
      }
    });
  }, []);

  function amount(usd: any) {
    if (usd >= 1000000) {
      return Number(usd / 1000000).toFixed(2) + "M";
    } else {
      return Math.floor(Number(usd) / 1000) + "K";
    }
  }
  return (
    <div className="bitcoin-conclude">
      <div className="bitcoin-conclude__title">비트코인 고래 체결 현황</div>
      <ul className="bitcoin-conclude__list">
        {data.map((data: any, index: number) => {
          return (
            <li
              className={
                data.position === "buy"
                  ? "bitcoin-conclude__list__item"
                  : "bitcoin-conclude__list__item--sell"
              }
              key={`bitcoin-conclude-list-${index}`}
            >
              <div className="bitcoin-conclude__list__item__name">
                {data.exchange_kor}
              </div>
              <div className="bitcoin-conclude__list__item__money">
                <div className="bitcoin-conclude__list__item__money__d">
                  ${data.price}
                </div>
                <div className="bitcoin-conclude__list__item__money__d">
                  {Math.round(data.amount_krw / 100000000)}억
                </div>
                <div className="bitcoin-conclude__list__item__money__d">
                  ${amount(data.amount_usd)}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Conclude;
