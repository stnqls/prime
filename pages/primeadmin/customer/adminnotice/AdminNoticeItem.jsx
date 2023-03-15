import axios from "axios";
import router from "next/router";
import React, { useState } from "react";
import Lee from "../../../../lib/Lee";

function AdminNoticeItem(props) {
  const [answer, setAnswer] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState();
  const [modify, setModify] = useState(false);

  function modifyNotice() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/notice/${props.id}`,
      headers,
      data: {
        title: title,
        content: content,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert("데이터가 정상적으로 수정되었습니다.");
          router.reload();
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(modifyNotice);
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  }

  function deleteNotice() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "DELETE",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/notice/${props.id}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          alert("데이터가 정상적으로 삭제되었습니다.");
          router.reload();
        } else {
          alert("서버 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <tr
        className="admin-notice__table__body__tr"
        onClick={() => {
          setContent(props.content);
          if (modify) {
            setAnswer(true);
          } else {
            setAnswer(!answer);
          }
        }}
      >
        <td className="admin-notice__table__body__no">{props.no}</td>
        <td className="admin-notice__table__body__title">
          {modify ? (
            <input
              type="text"
              className="admin-notice__table__body__title__input"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              defaultValue={props.title}
            />
          ) : (
            <div className="admin-notice__table__body__title__div">
              {props.title}
            </div>
          )}
        </td>
        <td className="admin-notice__table__body__nickname">
          {props.adminName}
        </td>
        <td className="admin-notice__table__body__date">{props.date}</td>
      </tr>
      <tr
        className={
          answer
            ? "admin-notice__table__body__answer"
            : "admin-notice__table__body__answer--none"
        }
      >
        <td className="admin-notice__table__body__answer__an" colSpan="4">
          {modify ? (
            <textarea
              className="admin-notice__table__body__answer__an__text"
              defaultValue={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          ) : (
            <div className="admin-notice__table__body__answer__an__text__show">
              {content}
            </div>
          )}
          <button
            className="admin-notice__table__body__answer__an__delete"
            onClick={() => {
              if (confirm("삭제하시겠습니까?")) deleteNotice();
            }}
          >
            삭제하기
          </button>
          {modify ? (
            <button
              className="admin-notice__table__body__answer__an__btn"
              onClick={() => {
                modifyNotice();
              }}
            >
              수정완료
            </button>
          ) : (
            <button
              className="admin-notice__table__body__answer__an__btn"
              onClick={() => setModify(!modify)}
            >
              수정하기
            </button>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

export default AdminNoticeItem;
