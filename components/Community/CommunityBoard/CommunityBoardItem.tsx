import Router from "next/router";

const CommunityBoardItem = (props: any) => {
  return (
    <tr className="community-board__table__tbody__tr">
      <td>
        <input
          type="checkbox"
          name=""
          id=""
          onChange={(e) => {
            if (e.target.checked) {
              props.setBoardIds(props.boardIds.concat(props.boardId));
            } else {
              props.setBoardIds(
                props.boardIds.filter((id: any) => id !== props.boardId)
              );
            }
          }}
        />
      </td>
      <td
        className="community-board__table__tbody__title"
        onClick={() => {
          Router.push({
            pathname: "/readBoard",
            query: {
              id: props.boardId,
              categoryCode: props.categoryCode,
            },
          });
        }}
      >
        {props.title}
      </td>
      <td
        className="community-board__table__tbody__date"
        onClick={() => {
          Router.push({
            pathname: "/readBoard",
            query: {
              id: props.boardId,
              categoryCode: props.categoryCode,
            },
          });
        }}
      >
        {props.date}
      </td>
      <td
        className="community-board__table__tbody__views"
        onClick={() => {
          Router.push({
            pathname: "/readBoard",
            query: {
              id: props.boardId,
              categoryCode: props.categoryCode,
            },
          });
        }}
      >
        {props.view}
      </td>
      <td
        className="community-board__table__tbody__likes"
        onClick={() => {
          Router.push({
            pathname: "/readBoard",
            query: {
              id: props.boardId,
              categoryCode: props.categoryCode,
            },
          });
        }}
      >
        {props.like}
      </td>
    </tr>
  );
};

export default CommunityBoardItem;
