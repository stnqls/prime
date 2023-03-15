import React, { useState } from "react";
import axios from "axios";
import Lee from "../../../../../lib/Lee";
import "./TraderPackageListItemModal.scss";

const TraderPackageListItemDetail = (props: any) => {
  const [modify, setModify] = useState(false);
  // const [packageName, setPackageName] = useState(props.packageName);
  // const [packageDescription, setPackageDescription] = useState(
  //   props.packageDescription
  // );
  const [price, setPrice] = useState(props.price);

  function modifyPackage() {
    if (price > 0) {
      const headers: any = {
        authorization: window.sessionStorage.getItem("token"),
      };

      axios({
        method: "PATCH",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/packages/${props.packageId}`,
        headers,
        data: {
          // packageDescription: packageDescription,
          price: price,
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert("패키지 수정이 성공적으로 완료되었습니다.");
            location.reload();
          } else {
            if (res.data.errCode === "101") {
              Lee.refreshToken(modifyPackage);
            } else {
              alert("서버 통신 중 오류가 발생했습니다.");
            }
          }
        })
        .catch((err) => {
          window.alert("일시적인 오류입니다. 다시 시도해주세요.");
        });
    } else {
      alert("금액을 입력해주세요.");
    }
  }

  return (
    <React.Fragment>
      <div
        className="trader-package-list-item-detail__cover"
        onClick={() => {
          props.setView(false);
        }}
      ></div>
      <div className="trader-package-list-item-detail">
        <img
          src="/assets/x-sign.png"
          alt="close"
          className="trader-package-list-item-detail__close"
          onClick={() => {
            props.setView(false);
          }}
        />
        {modify ? (
          <div className="trader-package-list-item-detail__content">
            <div className="trader-package-list-item-detail__title">
              {/* <input
                type="text"
                onChange={(e) => {
                  setPackageName(e.target.value);
                }}
                defaultValue={props.packageName}
              /> */}
              {props.packageName}
            </div>
            <div className="trader-package-list-item-detail__price">
              <input
                type="text"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                defaultValue={props.price}
              />{" "}
              <span>KRW</span>
            </div>
            <div className="trader-package-list-item-detail__description">
              {/* <textarea
                onChange={(e) => {
                  setPackageDescription(e.target.value);
                }}
                defaultValue={props.packageDescription}
              ></textarea> */}
              {props.packageDescription}
            </div>
            <div
              className="trader-package-list-item-detail__modify"
              onClick={() => {
                modifyPackage();
              }}
            >
              완료
            </div>
          </div>
        ) : (
          <div className="trader-package-list-item-detail__content">
            <div className="trader-package-list-item-detail__title">
              {props.packageName}
            </div>
            <div className="trader-package-list-item-detail__price">
              {Lee.addComma(props.price)} <span>KRW</span>
            </div>
            <div className="trader-package-list-item-detail__description">
              {props.packageDescription}
            </div>
            {!props.isDeleted && (
              <div
                className="trader-package-list-item-detail__modify"
                onClick={() => {
                  setModify(true);
                }}
              >
                수정
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default TraderPackageListItemDetail;
