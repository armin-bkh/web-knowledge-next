import React from "react";

import { TComment } from "@/global/types";
import SingleComment from "@/components/Comments/SingleComment/SingleComment";
import ReplyComments from "@/components/Comments/ReplyComments/ReplyComments";

export interface ICommentsListProps {
  comments: TComment[];
  postId: string;
}

const CommentsList = (props: ICommentsListProps) => {
  const { comments, postId } = props;

  return (
    <div className="flex flex-col w-full gap-y-2">
      {comments?.map(
        (comment) =>
          !comment.responseTo &&
          comment.status === 2 && (
            <React.Fragment key={comment._id}>
              <SingleComment comment={comment} postId={postId} />
              <ReplyComments
                comments={comments}
                postId={postId}
                parentCommentId={comment._id}
              />
            </React.Fragment>
          )
      )}
    </div>
  );
};

export default CommentsList;
