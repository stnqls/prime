import React from "react";

function FaqItem(props) {
  let category = props.category;
  switch (category) {
    case 101:
      category = "공통";
      break;
    case 102:
      category = "회원";
      break;
    case 103:
      category = "트레이더";
      break;
  }
  return (
    <React.Fragment>
      <td>{category}</td>
      <td>{props.qu}</td>
    </React.Fragment>
  );
}
export default FaqItem;
