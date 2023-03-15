// import { getDatabase, ref, child, get } from "firebase/database";
import { getDatabase, ref, onValue, Database } from "firebase/database";
import { useEffect, useState } from "react";

import "./Transfer.scss";

const Transfer = () => {
  const db = getDatabase();
  const Ref = ref(db, "indicator/whaleTransfer/");
  let [data, setData]: any = useState([]);

  useEffect(() => {
    onValue(Ref, (snapshot) => {
      data = snapshot.val();
      setData(data);
    });
    return () => {
      setData(data);
    };
  }, []);

  return (
    <div className="bitcoin-transfer">
      <div className="bitcoin-transfer__title">
        비트코인 고래 지갑 이동 현황
      </div>
      <ul className="bitcoin-transfer__list">
        {data &&
          data.map((item: any, index: number) => {
            let title;
            if (item.type === "deposit") {
              if (item.from.owner_type === "unknown") {
                title = "특정 지갑에서 " + item.to.owner + "로 입금";
              } else if (item.to.owner_type === "unknown") {
                title = item.from.owner + "에서 특정지갑으로 입금";
              } else {
                title = item.from.owner + "에서 " + item.to.owner + "로 입금";
              }
            } else if (item.type === "withdrawal") {
              if (item.from.owner_type === "unknown") {
                title = "특정 지갑에서 " + item.to.owner + "로 출금";
              } else if (item.to.owner_type === "unknown") {
                title = item.from.owner + "에서 특정지갑으로 출금";
              }
            }
            return (
              <li
                className="bitcoin-transfer__list__item"
                key={`bitcoin-transfer-list-${index}`}
              >
                <div className="bitcoin-transfer__list__item__left">
                  <div className="bitcoin-transfer__list__item__left__title">
                    {title}
                  </div>
                  <div className="bitcoin-transfer__list__item__left__date">
                    {item.date}
                  </div>
                </div>
                <div className="bitcoin-transfer__list__item__right">
                  <div className="bitcoin-transfer__list__item__right__money">
                    {Math.round(item.amount_krw / 100000000)}억
                    {item.type === "deposit" ? " 입금" : " 출금"}
                    <span>
                      {item.amount} {item.symbol}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Transfer;
