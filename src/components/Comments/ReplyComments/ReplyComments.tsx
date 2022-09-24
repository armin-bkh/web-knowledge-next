import React from "react";

import { TComment } from "@/global/types";
import SingleComment from "@/components/Comments/SingleComment/SingleComment";

export interface IReplyComments {
  comments: TComment[];
  parentCommentId: string;
  postId: string;
}

const ReplyComments = (props: IReplyComments) => {
  const { comments, postId, parentCommentId } = props;

  return (
    <>
      {comments.map((comment: any) =>
        parentCommentId === comment.responseTo ? (
          <div key={comment.id} className="ml-5">
            <SingleComment comment={comment} postId={postId} />
            <ReplyComments
              comments={comments}
              parentCommentId={comment._id}
              postId={postId}
            />
          </div>
        ) : null
      )}
    </>
  );
};

export default ReplyComments;
