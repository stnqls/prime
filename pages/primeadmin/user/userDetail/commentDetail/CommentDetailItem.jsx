const CommentDetailItem = (props) => {
  let category = props.categoryCode;
  let isDeleted = "";
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

  if (props.isDeleted) {
    isDeleted = "deleted";
  }

  return (
    <tr className={`admin-comment-detail__table__body__tr ${isDeleted}`}>
      {!props.isDeleted ? (
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
      ) : (
        <td></td>
      )}
      <td
        onClick={() => {
          props.setBoardId(props.boardId);
          props.setCategoryCode(props.categoryCode);
          props.setModal(true);
        }}
      >
        {category}
      </td>
      <td
        className="admin-comment-detail__table__body__tr__content"
        onClick={() => {
          props.setBoardId(props.boardId);
          props.setCategoryCode(props.categoryCode);
          props.setModal(true);
        }}
      >
        <span>{props.content}</span>
      </td>
      <td
        onClick={() => {
          props.setBoardId(props.boardId);
          props.setCategoryCode(props.categoryCode);
          props.setModal(true);
        }}
      >
        {props.date}
      </td>
    </tr>
  );
};

export default CommentDetailItem;
