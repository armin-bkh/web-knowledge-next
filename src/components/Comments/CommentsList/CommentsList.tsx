import React from "react";

import { TComment } from "@/global/types";
import SingleComment from "@/components/Comments/SingleComment/SingleComment";

export interface ICommentsListProps {
  comments: TComment[];
  postId: string;
}

const CommentsList = (props: ICommentsListProps) => {
  const { comments, postId } = props;

  console.log(comments);

  return (
    <div className="flex flex-col w-full gap-y-2">
      {comments?.map((comment) => (
        <SingleComment key={comment._id} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

export default CommentsList;
