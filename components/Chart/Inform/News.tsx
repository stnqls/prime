import { getDatabase, ref, onValue, Database } from "firebase/database";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ko";

import NewsItem from "./NewsItem";
import "./News.scss";

const News = () => {
  const [data, setData] = useState([]);
  const db = getDatabase();
  const Ref = ref(db, "indicator/coinNews");
  const today = moment().format("YYYY-MM-DD");

  let isToday = false;
  let isYesterday = false;

  useEffect(() => {
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  return (
    <div className="news">
      <div className="news__head">
        <a href="https://coinness.live/" target="_blank">
          <div className="news__head__logo">
            <img src="/images/logos/coinlogo.png" alt="coinlogo" />
            CoinNess
          </div>
          실시간 코인뉴스
        </a>
      </div>
      <ul className="news__list">
        {data ? (
          data.map((item: any, index: number) => {
            if (today === item.date.slice(0, 10) && !isToday) {
              isToday = true;
              return (
                <React.Fragment key={`news-item-${index}`}>
                  <div className="news__date">
                    오늘,
                    {moment().locale("ko").format("YYYY년 MM월 DD일 dddd")}
                  </div>

                  <NewsItem
                    isToday={true}
                    date={item.date}
                    link={item.link}
                    title={item.title}
                  />
                </React.Fragment>
              );
            } else if (today !== item.date.slice(0, 10) && !isYesterday) {
              isYesterday = true;
              return (
                <React.Fragment key={`news-item-${index}`}>
                  <div className="news__date">
                    어제,
                    {moment()
                      .subtract(1, "days")
                      .locale("ko")
                      .format("YYYY년 MM월 DD일 dddd")}
                  </div>

                  <NewsItem
                    isToday={false}
                    date={item.date}
                    link={item.link}
                    title={item.title}
                  />
                </React.Fragment>
              );
            }
            if (today === item.date.slice(0, 10) && !isToday) {
              isToday = true;
            } else if (today !== item.date.slice(0, 10) && !isYesterday) {
              isYesterday = true;
            }
            return (
              <NewsItem
                key={`news-item-${index}`}
                is={true}
                date={item.date}
                link={item.link}
                title={item.title}
              />
            );
          })
        ) : (
          <li className="news__list__item--none">뉴스가 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default News;
