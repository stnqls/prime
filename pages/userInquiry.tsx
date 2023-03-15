import axios from "axios";
import { useEffect, useState } from "react";
import InquiryItem from "../components/CustomerService/Inquiry/InquiryItem";
import "../styles/pages/userInquiry.scss";

const UserInquiry = () => {
  const [inquiry, setInquiry] = useState([]);

  function getInquiry() {
    const headers: any = {
      authorization: window.sessionStorage.getItem("token"),
    };
    axios({
      method: "GET",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/users/customer/inquiry",
      headers,
    })
      .then((res) => {
        if (res.status === 200) {
          setInquiry(res.data.data.inquiries);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getInquiry();
  }, []);

  return (
    <div className="user-inquiry">
      <ul className="user-inquiry__list">
        {inquiry &&
          inquiry.map((item: any, index: number) => (
            <InquiryItem
              key={`user-inquiry-${index}`}
              title={item.title}
              status={item.status}
              content={item.content}
              date={item.date}
              answer={item.answer}
              answerDate={item.answerDate}
              categoryCode={item.categoryCode}
            />
          ))}
      </ul>
      {inquiry.length <= 0 && (
        <div className="user-inquiry__none">1:1문의가 없습니다.</div>
      )}
    </div>
  );
};

export default UserInquiry;
