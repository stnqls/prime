import Lee from "../../../../lib/Lee";
import "./ViewTraderPickItemMobile.scss";

const ViewTraderPickItemMobile = (props: any) => {
  return (
    <div className="view-trader-pick-item-mobile">
      <div className="view-trader-pick-item-mobile__title">
        [{props.type}] {props.coinKR}
      </div>
      <ul className="view-trader-pick-item-mobile__top">
        <li className="view-trader-pick-item-mobile__top__item">
          <span className="view-trader-pick-item-mobile__top__item__name">
            진입가
          </span>
          <span className="view-trader-pick-item-mobile__top__item__value">
            {Lee.addComma(props.entry_price)}
          </span>
        </li>
        <li className="view-trader-pick-item-mobile__top__item">
          <span className="view-trader-pick-item-mobile__top__item__name">
            타겟가
          </span>
          <span className="view-trader-pick-item-mobile__top__item__value">
            {Lee.addComma(props.target_price)}
          </span>
        </li>
        {/* <li className="view-trader-pick-item-mobile__top__item">
          <span className="view-trader-pick-item-mobile__top__item__name">
            페어
          </span>
          <span className="view-trader-pick-item-mobile__top__item__value">
            {props.fair}
          </span>
        </li> */}
        <li className="view-trader-pick-item-mobile__top__item">
          <span className="view-trader-pick-item-mobile__top__item__name">
            진입시점
          </span>
          <span className="view-trader-pick-item-mobile__top__item__value">
            {props.entry_date}
          </span>
        </li>
      </ul>
      <ul className="view-trader-pick-item-mobile__bottom">
        <li className="view-trader-pick-item-mobile__bottom__item">
          <span className="view-trader-pick-item-mobile__bottom__item__name">
            종료가
          </span>
          <span className="view-trader-pick-item-mobile__bottom__item__value">
            {Lee.addComma(props.end_price)}
          </span>
        </li>
        <li className="view-trader-pick-item-mobile__bottom__item">
          <span className="view-trader-pick-item-mobile__bottom__item__name">
            손익률
          </span>
          <span className="view-trader-pick-item-mobile__bottom__item__value">
            {props.profit_rate}
          </span>
        </li>

        <li className="view-trader-pick-item-mobile__bottom__item">
          <span className="view-trader-pick-item-mobile__bottom__item__name">
            종료시점
          </span>
          <span className="view-trader-pick-item-mobile__bottom__item__value">
            {props.end_date}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ViewTraderPickItemMobile;
