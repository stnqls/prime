import React from "react";
import "./UserListModal.scss";

function UserListModal(props) {
  return (
    <React.Fragment>
      <div className="wrapper"></div>
      <div className="userlistmodal">
        <div className="userlistmodal__user">
          <img
            src="/images/Memoji-01.png"
            alt=""
            className="userlistmodal__user__img"
          />
          <ul className="userlistmodal__user__info">
            <li className="userlistmodal__text">
              이름
              <span className="userlistmodal__result">{props.name}</span>
            </li>
            <li className="userlistmodal__text">
              구분
              <div className="userlistmodal__user__info__result sort__result">
                <input type="checkbox" name="" id="normal" />
                <label htmlFor="normal">일반</label>
                <input type="checkbox" name="" id="trader" />
                <label htmlFor="trader">트레이더</label>
                <input type="checkbox" name="" id="maneger" />
                <label htmlFor="maneger">운영진</label>
              </div>
            </li>
            <li className="userlistmodal__text">
              계정
              <span className="userlistmodal__result">{props.email}</span>
            </li>
            <li className="userlistmodal__text">
              비밀번호
              <input
                className="userlistmodal__result"
                placeholder="변경시에만 입력"
              ></input>
            </li>
          </ul>
        </div>
        <div className="userlistmodal__active">
          <div className="userlistmodal__active__info">
            <h1 className="userlistmodal__title">활동 정보</h1>
            <ul className="userlistmodal__active__info__list">
              <li className="userlistmodal__text">
                가입일
                <span className="userlistmodal__result"></span>
              </li>
              <li className="userlistmodal__text">
                마지막 로그인
                <span className="userlistmodal__result"></span>
              </li>
              <li className="userlistmodal__text">
                최종 로그인 IP
                <span className="userlistmodal__result"></span>
              </li>
            </ul>
          </div>
          <div className="userlistmodal__active__history">
            <h1 className="userlistmodal__title">활동 내역</h1>
            <ul className="userlistmodal__active__history__list">
              <li className="userlistmodal__text">
                게시글
                <span className="userlistmodal__result"></span>
              </li>
              <li className="userlistmodal__text">
                댓글
                <span className="userlistmodal__result"></span>
              </li>
              <li className="userlistmodal__text">
                구매 내역
                <span className="userlistmodal__result"></span>
              </li>
              <li className="userlistmodal__text">
                수익 인증
                <span className="userlistmodal__result"></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="userlistmodal__memo">
          <h1 className="userlistmodal__title">메모</h1>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="userlistmodal__memo__text"
          ></textarea>
        </div>
        <button type="button" className="userlistmodal__save">
          저장
        </button>
        <img
          src="/images/x-sign.png"
          alt="close"
          className="userlistmodal__close"
          onClick={function () {
            props.setModal(false);
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default UserListModal;
