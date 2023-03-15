import React from "react";
import "./Confirm.scss";

function Confirm(props) {
  return (
    <React.Fragment>
      <div className="wrapper"></div>
      <div className="confirm">
        <div className="confirm__text">
          <img
            src="/images/done.png"
            alt="done"
            className="confirm__text__check"
          />
          <h1 className="confirm__text__title">정상 처리 되었습니다.</h1>
        </div>
        <button
          type="button"
          className="confirm__btn"
          onClick={() => props.setModalConfirm(false)}
        >
          확인
        </button>
        <img
          src="/assets/close.png"
          alt="close"
          className="confirm__close"
          onClick={() => props.setModalConfirm(false)}
        />
      </div>
    </React.Fragment>
  );
}

export default Confirm;
