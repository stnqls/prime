import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./HomeSliderItem.scss";

function HomeSliderItem(props: any) {
  let now;
  const [to, setTo] = useState("");

  if (props.idx < 10) {
    now = "0" + props.idx;
  } else {
    now = props.idx;
  }

  useEffect(() => {
    let role = window.sessionStorage.getItem("role");

    if (Lee.checkLogin()) {
      if (role === "trader") {
        setTo("user?page=traderStatus");
      } else {
        setTo(props.button[0][1]);
      }
    } else {
      setTo("login");
    }
  });

  return (
    <React.Fragment>
      <div className="home-slider-item">
        <div className={`home-slider-item__background slide-${props.idx}`}>
          <img src={props.thumbnail} alt="thumbnail" />
          <div className="thumbnail-cover"></div>
        </div>
        <div className="home-slider-item__contents">
          {/* <div className="home-slider-item__contents__now">{now}</div> */}
          <div className="home-slider-item__contents__text">
            <div className="home-slider-item__contents__text__title">
              {props.title}
            </div>
            <div className="home-slider-item__contents__text__paragraph">
              {props.paragraph}
            </div>
            {props.button.length > 1 ? (
              <ul className="home-slider-item__contents__text__button">
                <DelayLink to={to} delay={200} onDelayStart={Lee.loadingStart}>
                  <li className="home-slider-item__contents__text__button__list">
                    {props.button[0][0]}
                  </li>
                </DelayLink>
                <DelayLink
                  to={props.button[1][1]}
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <li className="home-slider-item__contents__text__button__list rightbtn">
                    {props.button[1][0]}
                  </li>
                </DelayLink>
              </ul>
            ) : (
              <ul className="home-slider-item__contents__text__button">
                <DelayLink
                  to={props.button[0][1]}
                  delay={200}
                  onDelayStart={Lee.loadingStart}
                >
                  <li className="home-slider-item__contents__text__button__list go">
                    {props.button[0][0]}
                  </li>
                </DelayLink>
              </ul>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomeSliderItem;
