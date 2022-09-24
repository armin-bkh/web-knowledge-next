import React, { useCallback, useMemo, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/outline";

import { postComment } from "@/services/postComment";
import { useToasts } from "react-toast-notifications";
import { ToastMode } from "@/global/toast";

export interface ICommentFormProps {
  postId: string;
  responseTo?: string;
}

const CommentForm = (props: ICommentFormProps) => {
  const { postId, responseTo } = props;

  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const { addToast } = useToasts();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    },
    []
  );

  const handleSubmitComment = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const result = await postComment({
          postId,
          content: comment,
          responseTo,
        });
        setError(false);
        addToast("submitted", { appearance: ToastMode.SUCCESS });
        console.log(result, "result is here");
      } catch (e: any) {
        setError(true);
        addToast(e.response.data.message, { appearance: ToastMode.ERROR });
      }
    },
    [comment]
  );

  const isValid = useMemo(() => comment || !error, [error, comment]);

  return (
    <form
      onSubmit={handleSubmitComment}
      className="flex flex-col w-full items-end relative"
    >
      <textarea
        value={comment}
        onChange={handleChange}
        placeholder="Add a comment..."
        className={`${responseTo ? "h-44" : "h-32"} ${
          error && "border border-red-400"
        } dark:text-white dark:bg-gray-dark w-full resize-none mb-2 shadow focus:shadow-lg outline-none rounded-md px-3 py-1 overflow-hidden resize-y`}
      />
      <button
        type="submit"
        disabled={!isValid}
        className="bg-blue-500 text-white py-2 rounded-md px-5 absolute bottom-3 right-1 disabled:bg-gray-500 disabled:text-gray-700"
      >
        <PaperAirplaneIcon className="rotate-90" width={20} />
      </button>
    </form>
  );
};

export default CommentForm;
