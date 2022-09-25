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
          <div key={comment._id} className="ml-2 md:ml-5 flex flex-col gap-2">
            <SingleComment comment={comment} postId={postId} isReply />
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
