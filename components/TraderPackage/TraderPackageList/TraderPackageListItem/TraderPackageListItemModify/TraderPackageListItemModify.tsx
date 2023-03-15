import React, { useEffect, useState } from "react";
import Router from "next/router";
import Lee from "../../../../../lib/Lee";
import axios from "axios";

import "./TraderPackageListItemModify.scss";

const TraderPackageListItemModify = (props: any) => {
  const [packageThumbnail, setPackageThumbnail] = useState(props.thumbnail);
  const [packageName, setPackageName] = useState(props.packageName);
  const [packageDescription, setPackageDescription] = useState(
    props.packageDescription
  );
  const [price, setPrice] = useState(props.price);
  const [check, setCheck] = useState(true);

  function uploadThumbnail(e: React.ChangeEvent<any>) {
    const packageThumbnail: HTMLImageElement = Lee.get(
      "packageThumbnail"
    ) as HTMLImageElement;
    if (e.target.files[0]) {
      const file: any = URL.createObjectURL(e.target.files[0]);
      packageThumbnail.src = file;
      setPackageThumbnail(file);
      uploadStorage(e.target.files[0]);
    }
  }

  function uploadStorage(file: any) {
    setCheck(false);
    let formData = new FormData();
    formData.append("packagesThumbnail", file);

    axios
      .post(
        "https://us-central1-prime-investment-web.cloudfunctions.net/api/storage/upload/packagesThumbnail",
        formData,
        {
          headers: {
            uid: props.packageId,
          },
        }
      )
      .then((response) => {
        setPackageThumbnail(response.data.data);
        setCheck(true);
      })
      .catch((error) => {});
  }

  function modifyPackage() {
    if (check) {
      const headers: any = {
        authorization: window.sessionStorage.getItem("token"),
      };

      axios({
        method: "PATCH",
        url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/packages/${props.packageId}`,
        headers,
        data: {
          packageName: packageName,
          packageDescription: packageDescription,
          price: price,
          thumbnail: packageThumbnail,
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
      alert("현재 썸네일 업로드 중입니다. 잠시 후 다시 시도해주세요.");
    }
  }

  return (
    <div
      className="trader-package-list-item-modify"
      id="TraderPackageListItemModify"
    >
      <div
        className="trader-package-list-item-modify__hide"
        onClick={function () {
          props.setView(false);
        }}
      />
      <div className="trader-package-list-item-modify__contents">
        <div className="trader-package-list-item-modify__contents__category">
          패키지 수정
        </div>

        <img
          className="trader-package-list-item-modify__contents__close"
          src="/assets/x-sign.png"
          alt="x-sign"
          onClick={function () {
            props.setView(false);
          }}
        />

        {/* <div className="trader-package-list-item-modify__contents__thumbnail">
          <input
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            name="thumbnail"
            onChange={uploadThumbnail}
          />
          <label htmlFor="imageUpload"></label>
          <img src={packageThumbnail} id="packageThumbnail" alt="upload" />
        </div> */}

        <div className="trader-package-list-item-modify__contents__context parents">
          <div className="trader-package-list-item-modify__contents__context__package parents">
            <div className="trader-package-list-item-modify__contents__context__package__subject">
              패키지 이름
            </div>
            <div className="trader-package-list-item-modify__contents__context__package__name">
              <input
                type="text"
                placeholder="패키지 이름을 입력해주세요."
                value={packageName}
                onChange={function (e) {
                  setPackageName(e.target.value);
                }}
              />
            </div>
            <div className="trader-package-list-item-modify__contents__context__package__subject">
              패키지 설명
            </div>
            <div className="trader-package-list-item-modify__contents__context__package__description">
              <textarea
                placeholder="패키지 설명을 입력해주세요."
                value={packageDescription}
                onChange={function (e) {
                  setPackageDescription(e.target.value);
                }}
              />
            </div>
            <div className="trader-package-list-item-modify__contents__context__package__subject">
              패키지 가격
            </div>
            <div className="trader-package-list-item-modify__contents__context__package__description">
              <input
                type="number"
                placeholder="패키지 금액을 입력해주세요."
                value={price}
                onChange={function (e) {
                  setPrice(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="trader-package-list-item-modify__contents__submit"
          onClick={modifyPackage}
        >
          수정하기
        </div>
      </div>
    </div>
  );
};

export default TraderPackageListItemModify;
