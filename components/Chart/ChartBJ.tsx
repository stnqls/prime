import { getDatabase, ref, onValue } from "firebase/database";
import moment from "moment";
import { useEffect, useState } from "react";

import "./ChartBJ.scss";

const ChartBJ = () => {
  const db = getDatabase();
  const Ref = ref(db, "indicator/leaderBoard");
  const [data, setData] = useState([]);

  useEffect(() => {
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
    return () => {
      setData(data);
    };
  }, []);

  return (
    <div className="chartBJ">
      <ul className="chartBJ__list">
        {data &&
          data.map((item: any, index: number) => {
            return (
              <li className="chartBJ__list__item" key={`chartBJ-list-${index}`}>
                <div className="chartBJ__list__item__name">{item.nickname}</div>
                <div className="chartBJ__list__item__position">
                  <span>포지션</span>
                  <div
                    className={`chartBJ__list__item__position--${item.side}`}
                  >
                    {item.side}
                  </div>
                </div>
                <div
                  className={
                    item.weeklyWinRate < 50
                      ? "chartBJ__list__item__rate--down"
                      : "chartBJ__list__item__rate"
                  }
                >
                  <span>최근 일주일 간 승률</span>
                  {item.weeklyWinRate}%
                </div>
                <div className="chartBJ__list__item__update">
                  업데이트 시간
                  <br />
                  {moment(item.data).format("DD일 HH:mm")}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ChartBJ;
