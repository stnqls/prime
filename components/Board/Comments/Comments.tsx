import { useEffect, useState } from "react";
import WriteComments from "./WriteComments";
import CommentsItem from "./CommentsItem/CommentsItem";
import "./Comments.scss";

const Comments = (props: any) => {
  const [comments, setComments]: any = useState([]);

  useEffect(() => {
    setComments(props.props);
  }, [props.props]);

  // for (let i = 0; i < comments.length; i++) {
  //   if(comments[i+1] === null) {

  //   }
  //   if (comments[i].bundleId === comments[i + 1].bundleId) {
  //     comments[i].depth === 0
  //       ? (comments[i].content = "삭제된 댓글 입니다.")
  //       : "";
  //   }
  // }

  return (
    <div className="comments">
      <div className="comments__title">댓글 {comments.length}</div>
      {comments.length > 0
        ? comments.map((comment: any, index: number) => {
            return (
              <CommentsItem
                key={`comments-${index}`}
                memberNickname={comment.memberNickname}
                content={comment.content}
                date={comment.date}
                depth={comment.depth}
                bundleId={comment.bundleId}
                categoryCode={props.code}
                boardId={comment.boardId}
                replyId={comment.id}
                isMyReply={comment.isMyReply}
                isDeleted={comment.isDeleted}
              />
            );
          })
        : null}

      <WriteComments props={props} />
    </div>
  );
};

export default Comments;
