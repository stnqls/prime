import React, { useEffect, useState } from "react";

function FaqItem(props: any) {
  let category = props.categoryCode;
  let newArr = Array(props.length).fill(false);
  const [toggle, setToggle]: any = useState(newArr);

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

  function click(index: number) {
    setToggle((i: any) => ({
      ...i,
      [index]: !i[index],
    }));
  }

  useEffect(() => {
    setToggle(newArr);
  }, [props.page]);

  return (
    <React.Fragment>
      <tr
        onClick={() => {
          click(props.index);
        }}
        className="faq__body__table__body__tr"
      >
        <td className="faq__body__table__body__category">{category}</td>
        <td className="faq__body__table__body__title">{props.title}</td>
      </tr>
      <tr
        className={
          toggle[props.index]
            ? "faq__body__table__body__answer__show"
            : "faq__body__table__body__answer"
        }
      >
        <td className="faq__body__table__body__answer__an" colSpan={2}>
          {props.content}
        </td>
      </tr>
    </React.Fragment>
  );
}

export default FaqItem;
