import React from "react";
import "./TraderListModal.scss";

function TraderListModal(props) {
  return (
    <React.Fragment>
      <div className="wrapper"></div>
      <div className="traderlistmodal">
        <div className="traderlistmodal__trader">
          <img
            src="/images/Memoji-01.png"
            alt=""
            className="traderlistmodal__trader__img"
          />
          <ul className="traderlistmodal__trader__info">
            <li className="traderlistmodal__text">
              이름
              <span className="traderlistmodal__result">{props.name}</span>
            </li>
            <li className="traderlistmodal__text">
              구분
              <div className="traderlistmodal__trader__info__result sort__result">
                <input type="checkbox" name="" id="normal" />
                <label htmlFor="normal">일반</label>
                <input type="checkbox" name="" id="trader" />
                <label htmlFor="trader">트레이더</label>
                <input type="checkbox" name="" id="maneger" />
                <label htmlFor="maneger">운영진</label>
              </div>
            </li>
            <li className="traderlistmodal__text">
              계정
              <span className="traderlistmodal__result">{props.email}</span>
            </li>
            <li className="traderlistmodal__text">
              비밀번호
              <span className="traderlistmodal__result"></span>
            </li>
          </ul>
        </div>
        <div className="traderlistmodal__active">
          <div className="traderlistmodal__active__info">
            <h1 className="traderlistmodal__title">활동 정보</h1>
            <ul className="traderlistmodal__active__info__list">
              <li className="traderlistmodal__text">
                가입일
                <span className="traderlistmodal__result"></span>
              </li>
              <li className="traderlistmodal__text">
                마지막 로그인
                <span className="traderlistmodal__result"></span>
              </li>
              <li className="traderlistmodal__text">
                최종 로그인 IP
                <span className="traderlistmodal__result"></span>
              </li>
            </ul>
          </div>
          <div className="traderlistmodal__active__history">
            <h1 className="traderlistmodal__title">활동 내역</h1>
            <ul className="traderlistmodal__active__history__list">
              <li className="traderlistmodal__text">
                게시글
                <span className="traderlistmodal__result"></span>
              </li>
              <li className="traderlistmodal__text">
                댓글
                <span className="traderlistmodal__result"></span>
              </li>
              <li className="traderlistmodal__text">
                구매 내역
                <span className="traderlistmodal__result"></span>
              </li>
              <li className="traderlistmodal__text">
                수익 인증
                <span className="traderlistmodal__result"></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="traderlistmodal__memo">
          <h1 className="traderlistmodal__title">메모</h1>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="traderlistmodal__memo__text"
          ></textarea>
        </div>
        <button type="button" className="traderlistmodal__save">
          저장
        </button>
        <img
          src="/images/x-sign.png"
          alt="close"
          className="traderlistmodal__close"
          onClick={function () {
            props.setModal(false);
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default TraderListModal;
