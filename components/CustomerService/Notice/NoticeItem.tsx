import React, { useEffect, useState } from "react";

function NoticeItem(props: any) {
  let newArr = Array(props.length).fill(false);
  const [toggle, setToggle]: any = useState(newArr);

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
        className="notice__content__table__body__tr"
        onClick={() => {
          click(props.index);
        }}
      >
        <td className="notice__content__table__body__tr__no">{props.no}</td>
        <td className="notice__content__table__body__tr__title">
          {props.title}
        </td>
        <td className="notice__content__table__body__tr__date">{props.date}</td>
      </tr>
      <tr
        className={
          toggle[props.index]
            ? "notice__content__table__body__answer__show"
            : "notice__content__table__body__answer"
        }
      >
        <td className="notice__content__table__body__answer__an" colSpan={3}>
          {props.content}
        </td>
      </tr>
    </React.Fragment>
  );
}

export default NoticeItem;
