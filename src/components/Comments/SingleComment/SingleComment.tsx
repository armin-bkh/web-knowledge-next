import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { TComment } from "@/global/types";
import { ToastMode } from "@/global/toast";
import { postComment } from "@/services/postComment";
import CommentForm from "@/components/Comments/CommentForm/CommentForm";

export interface ISingleCommentProps {
  isReply?: boolean;
  comment: TComment;
  postId: string;
}

const SingleComment = (props: ISingleCommentProps) => {
  const { isReply, comment, postId } = props;

  const [reply, setReply] = useState(false);

  const handleReply = useCallback(() => {
    setReply((prevReply) => !prevReply);
  }, []);

  const handleSubmitComment = useCallback(
    async (content: string) => {
      try {
        const { data } = await postComment({
          postId,
          content,
          responseTo: comment._id,
        });
        console.log({ postId, content, responseTo: comment._id });
        setReply(false);
        toast[ToastMode.SUCCESS](data.message);
      } catch (e: any) {
        console.log(e, "eerrrrro");
        toast[ToastMode.ERROR](e.response.data.message);
      }
    },
    [postId, comment]
  );

  return (
    <div
      className={`bg-white p-2 shadow rounded-md  dark:text-white ${
        isReply ? "bg-gray-200 dark:bg-gray-700/50" : "dark:bg-gray-dark/50"
      }`}
    >
      <div className="flex items-center">
        <img className="rounded-full w-14 h-14" src="/icons/UserIcon.jpeg" />
        <p className="ml-2 md:text-lg">{comment.writer.name}</p>
      </div>
      <p className="bg-gray-50 dark:bg-gray-dark p-1 md:p-3 mt-2 rounded-md text-xs md:text-sm">
        {comment.content}
      </p>
      <button
        onClick={handleReply}
        className="ml-auto mt-2 block text-sm text-blue-500"
      >
        {reply ? "Close" : "Reply"}
      </button>
      {reply && <CommentForm onSubmit={handleSubmitComment} />}
    </div>
  );
};

export default SingleComment;
