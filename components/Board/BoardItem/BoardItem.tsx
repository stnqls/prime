import React, { useEffect, useState } from "react";

import "./BoardItem.scss";

const BoardItem = (props: any) => {
  const [no, setNo]: any = useState();

  function checkNo() {
    if (props.no == "공지") {
      setNo("--notice");
    } else if (props.no == "HOT") {
      setNo("--hot");
    } else {
      setNo("");
    }
  }

  useEffect(() => {
    checkNo();
  }, []);

  return (
    <React.Fragment>
      <td className={`board-table__tbody__no ${no}`}>{props.no}</td>
      <td className={`board-table__tbody__title ${no}`}>
        {props.title}{" "}
        {props.replyCnt === undefined ? null : "[" + props.replyCnt + "]"}
      </td>
      <td className="board-table__tbody__writer">{props.writer}</td>
      <td className="board-table__tbody__updated">{props.updated}</td>
      <td className="board-table__tbody__views">{props.views}</td>
      <td className="board-table__tbody__recommended">{props.recommended}</td>
    </React.Fragment>
  );
};

export default BoardItem;
