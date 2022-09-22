import React, { useCallback, useState } from "react";

import { TComment } from "@/global/types";
import CommentForm from "@/components/Comments/CommentForm/CommentForm";

export interface ISingleCommentProps {
  comment: TComment;
  postId: string;
}

const SingleComment = (props: ISingleCommentProps) => {
  const { comment, postId } = props;

  const [reply, setReply] = useState(false);

  const handleReply = useCallback(() => {
    setReply((prevReply) => !prevReply);
  }, []);

  return (
    <div className="bg-white p-2 shadow rounded-md dark:bg-gray-dark/50 dark:text-white">
      <div className="flex items-center">
        <img className="rounded-full w-14 h-14" src="/UserIcon.jpeg" />
        <p className="ml-2">{comment.writer.name}</p>
      </div>
      <p className="bg-gray-50 dark:bg-gray-dark p-3 mt-2 rounded-md">
        {comment.content}
      </p>
      <button
        onClick={handleReply}
        className="ml-auto mt-2 block text-sm text-blue-500"
      >
        {reply ? "Close" : "Reply"}
      </button>
      {reply && <CommentForm postId={postId} responseTo={comment.writer._id} />}
    </div>
  );
};

export default SingleComment;
