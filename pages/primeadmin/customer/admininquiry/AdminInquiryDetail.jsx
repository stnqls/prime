import axios from "axios";
import dynamic from "next/dynamic";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Lee from "../../../../lib/Lee";
import "./AdminInquiryDetail.scss";

const ReplyInquiry = dynamic(
  import("../../../../components/adminCustomer/ReplyInquiry"),
  {
    ssr: false,
  }
);

function AdminInquiryDetail() {
  const props = useRouter();
  const inquiryId = props.query.id;

  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState();
  const [imgUrl, setImgUrl] = useState([]);
  const [modify, setModify] = useState(false);
  const [modifyAnswer, setModifyAnswer] = useState("");
  const [answer, setAnswer] = useState("");

  function getDetail() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "GET",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/inquiry/${inquiryId}`,
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setAnswer(res.data.data.answer);
          setCategory(res.data.data.categoryCode);
          setImgUrl(res.data.data.imageUrl);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getDetail);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        window.alert("일시적인 오류입니다. 다시 시도해 주세요.");
        console.log(err);
      });
  }

  //1:1문의 삭제
  // function deleteInquiry() {
  //   const headers = {
  //     authorization: window.sessionStorage.getItem("accessToken"),
  //   };
  //   axios({
  //     method: "DELETE",
  //     url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/inquiry/${inquiryId}`,
  //     headers,
  //   })
  //     .then((res) => {
  //       if (res.data.success) {
  //         alert("정상적으로 삭제되었습니다.");
  //         router.back();
  //       } else {
  //         if (res.data.errCode === "101") {
  //           Lee.refreshToken(deleteInquiry);
  //         } else {
  //           alert("서버 통신 중 오류가 발생했습니다.");
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       window.alert("일시적인 오류입니다. 다시 시도해주세요.");
  //       console.log(err);
  //     });
  // }

  function modifyInquiry() {
    const headers = {
      authorization: window.sessionStorage.getItem("accessToken"),
    };
    axios({
      method: "PATCH",
      url: `https://us-central1-prime-investment-web.cloudfunctions.net/api/admin/customers/inquiry/${inquiryId}`,
      headers,
      data: {
        answer: modifyAnswer,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setAnswer(res.data.data.answer);
        } else {
          if (res.data.errCode === "101") {
            Lee.refreshToken(getDetail);
          } else {
            alert("서버통신 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getDetail();
  }, []);

  let categoryCode = category;
  switch (category) {
    case "201":
      categoryCode = "일반회원 이용 불편 및 문의";
      break;
    case "202":
      categoryCode = "트레이더회원 이용 불편 및 문의";
      break;
    default:
      categoryCode = "none";
      break;
  }

  return (
    <React.Fragment>
      <div className="admin-inquiry-detail">
        <img
          src="/assets/x-sign.png"
          alt="close"
          className="admin-inquiry-detail__close"
          onClick={() => {
            router.back();
          }}
        />

        <div className="admin-inquiry-detail__info">
          <div className="admin-inquiry-detail__info__name">
            이름
            <span className="admin-inquiry-detail__text">{data.name}</span>
          </div>
          <div className="admin-inquiry-detail__info__phone">
            연락처
            <span className="admin-inquiry-detail__text">
              {data.phoneNumber}
            </span>
          </div>
          <div className="admin-inquiry-detail__info__email">
            이메일
            <span className="admin-inquiry-detail__text">{data.email}</span>
          </div>
        </div>
        <div className="admin-inquiry-detail__boardinfo">
          <div className="admin-inquiry-detail__boardinfo__title">
            제목
            <span type="text" className="admin-inquiry-detail__text">
              {data.title}
            </span>
          </div>
          <div className="admin-inquiry-detail__boardinfo__category">
            문의 유형
            <span className="admin-inquiry-detail__text">{categoryCode}</span>
          </div>
        </div>
        {data.status !== 2 && (
          <div className="admin-inquiry-detail__btns">
            <button
              type="button"
              className="admin-inquiry-detail__btns__replybtn"
              onClick={() => {
                setModal(true);
              }}
            >
              답장하기
            </button>
            {/* <button
            type="button"
            className="admin-inquiry-detail__btns__deletebtn table__btn__red"
            onClick={() => {
              deleteInquiry();
            }}
          >
            삭제하기
          </button> */}
          </div>
        )}
        <div className="admin-inquiry-detail__content">내용</div>
        <div type="text" className="admin-inquiry-detail__content__text">
          {data.content}
        </div>
        {!imgUrl ? null : (
          <ul className="admin-inquiry-detail__img">
            {imgUrl.map((img, index) => (
              <li
                className="admin-inquiry-detail__img__item"
                key={`admin-inquiry-detail-img-${index}`}
              >
                <a href={img} target="_blank">
                  <img src={img} alt="imgs" />
                </a>
              </li>
            ))}
          </ul>
        )}

        {data.status === 2 && (
          <div className="admin-inquiry-detail__answer">
            <div className="admin-inquiry-detail__answer__title">
              답변
              {modify ? (
                <button
                  type="button"
                  className="admin-inquiry-detail__answer__modifybtn"
                  onClick={() => {
                    setModify(false);
                    modifyInquiry();
                  }}
                >
                  수정완료
                </button>
              ) : (
                <button
                  type="button"
                  className="admin-inquiry-detail__answer__modifybtn"
                  onClick={() => setModify(true)}
                >
                  수정하기
                </button>
              )}
            </div>

            {modify ? (
              <textarea
                className="admin-inquiry-detail__answer__modifytext"
                onChange={(e) => {
                  setModifyAnswer(e.target.value);
                }}
                defaultValue={answer}
              ></textarea>
            ) : (
              <div type="text" className="admin-inquiry-detail__answer__text">
                {answer}
              </div>
            )}
          </div>
        )}
      </div>
      {modal && <ReplyInquiry setModal={setModal} data={data} id={inquiryId} />}
    </React.Fragment>
  );
}

export default AdminInquiryDetail;
