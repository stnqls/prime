import React, { useState } from "react";
import Lee from "../../../../lib/Lee";
import dynamic from "next/dynamic";

import "./ViewTraderPackageItem.scss";

const ViewTraderPackageItemModal = dynamic(
  import("./ViewTraderPackageItemModal/ViewTraderPackageItemModal"),
  {
    ssr: false,
  }
);

const ViewTraderPackageItemMethod = dynamic(
  import("./ViewTraderPackageItemMethod/ViewTraderPackageItemMethod"),
  {
    ssr: false,
  }
);

const ViewTraderPackageItemBank = dynamic(
  import("./ViewTraderPackageItemBank/ViewTraderPackageItemBank"),
  {
    ssr: false,
  }
);

const ViewTraderPackageItemCard = dynamic(
  import("./ViewTraderPackageItemCard/ViewTraderPackageItemCard"),
  {
    ssr: false,
  }
);

const Portal = dynamic(import("../../../../lib/Portal"), {
  ssr: false,
});

const ViewTraderPackageItem = (props: any) => {
  const [view, setView] = useState(false);
  const [method, setMethod] = useState(false);
  const [bank, setBank] = useState(false);
  const [card, setCard] = useState(false);
  const [clear] = useState(false);
  let profit_rate;

  function viewDetail() {
    setView(true);
  }

  if (props.profitRate > 0) {
    profit_rate = "over";
  } else if (props.profitRate < 0) {
    profit_rate = "under";
  } else {
    profit_rate = "normal";
  }

  return (
    <>
      {view && (
        <Portal>
          <ViewTraderPackageItemModal
            setView={setView}
            setMethod={setMethod}
            Clear={clear}
            traderName={props.traderName}
            packageName={props.packageName}
            packageDescription={props.packageDescription}
            traderAvatar={props.traderAvatar}
            price={props.price}
            traderId={props.traderId}
            packageId={props.packageId}
          />
        </Portal>
      )}
      {method && (
        <Portal>
          <ViewTraderPackageItemMethod
            setMethod={setMethod}
            setBank={setBank}
            setCard={setCard}
            traderName={props.traderName}
            thumbnail={props.thumbnail}
            packageName={props.packageName}
            packageDescription={props.packageDescription}
            traderAvatar={props.traderAvatar}
            price={props.price}
            traderId={props.traderId}
            packageId={props.packageId}
          />
        </Portal>
      )}
      {bank && (
        <Portal>
          <ViewTraderPackageItemBank
            setBank={setBank}
            traderName={props.traderName}
            thumbnail={props.thumbnail}
            packageName={props.packageName}
            packageDescription={props.packageDescription}
            traderAvatar={props.traderAvatar}
            price={props.price}
            traderId={props.traderId}
            packageId={props.packageId}
          />
        </Portal>
      )}
      {card && (
        <Portal>
          <ViewTraderPackageItemCard
            setCard={setCard}
            traderName={props.traderName}
            thumbnail={props.thumbnail}
            packageName={props.packageName}
            packageDescription={props.packageDescription}
            traderAvatar={props.traderAvatar}
            price={props.price}
            traderId={props.traderId}
            packageId={props.packageId}
          />
        </Portal>
      )}
      <li
        className={`view-trader-package-item parents ${props.state}`}
        onClick={viewDetail}
      >
        <div className="view-trader-package-item__contents parents">
          <div className="view-trader-package-item__contents__title">
            {props.packageName}
          </div>
          <hr className="view-trader-package-item__contents__line" />
          <div className="view-trader-package-item__contents__paragraph">
            {props.packageDescription}
          </div>
          <div
            className={`view-trader-package-item__contents__rate ${profit_rate}`}
          >
            수익률 {props.profitRate}%
          </div>
          <div className="view-trader-package-item__contents__price">
            {Lee.addComma(props.price)} KRW
          </div>
          <div className="view-trader-package-item__contents__button">
            상세보기
          </div>
        </div>
      </li>
    </>
  );
};

export default ViewTraderPackageItem;
