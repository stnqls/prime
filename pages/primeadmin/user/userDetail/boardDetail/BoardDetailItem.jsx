const BoardDetailItem = (props) => {
  let category = props.categoryCode;
  switch (props.categoryCode) {
    case 101:
      category = "트레이딩";
      break;
    case 201:
      category = "매매분석법";
      break;
    case 301:
      category = "자유게시판";
      break;
  }

  return (
    <tr className="admin-board-detail__body__tr">
      <td>
        <input
          type="checkbox"
          name=""
          id=""
          onChange={(e) => {
            if (e.target.checked) {
              props.setIds(props.ids.concat(props.id));
              props.setCategoryCode(props.categoryCode);
            } else {
              props.setIds(props.ids.filter((id) => id !== props.id));
            }
          }}
        />
      </td>
      <td
        onClick={() => {
          props.setBoardId(props.id);
          props.setCategoryCode(props.categoryCode);
          props.setModal(true);
        }}
      >
        {category}
      </td>
      <td
        onClick={() => {
          props.setBoardId(props.id);
          props.setCategoryCode(props.categoryCode);
          props.setModal(true);
        }}
      >
        {props.title}
      </td>
      <td
        onClick={() => {
          props.setBoardId(props.id);
          props.setCategoryCode(props.categoryCode);
          props.setModal(true);
        }}
      >
        {props.date}
      </td>
    </tr>
  );
};

export default BoardDetailItem;
