import Router from "next/router";

const CommunityCommentsItem = (props: any) => {
  return (
    <tr className="community-comments__table__tbody__tr">
      <td>
        <input
          type="checkbox"
          name=""
          id=""
          onChange={(e) => {
            if (e.target.checked) {
              // props.setReplyIds([...props.replyIds, props.replyId]);
              props.setReplyIds(props.replyIds.concat(props.replyId));
            } else {
              props.setReplyIds(
                props.replyIds.filter((id: any) => id !== props.replyId)
              );
            }
          }}
        />
      </td>
      <td
        className="community-comments__table__tbody__title"
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
        <span>{props.content}</span>
      </td>
      <td
        className="community-comments__table__tbody__date"
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
    </tr>
  );
};

export default CommunityCommentsItem;
