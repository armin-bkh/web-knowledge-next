import React, { useCallback, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/outline";

export interface ICommentFormProps {
  postId: string;
  responseTo?: string;
}

const CommentForm = (props: ICommentFormProps) => {
  const { postId, responseTo } = props;

  const [comment, setComment] = useState<string>("");

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
        console.log(comment);
      } catch (e: any) {
        console.log(e, "error is heres");
      }
    },
    [comment]
  );

  return (
    <form
      onSubmit={handleSubmitComment}
      className="flex flex-col w-full items-end relative"
    >
      <textarea
        value={comment}
        onChange={handleChange}
        placeholder="Add a comment..."
        className={`${
          responseTo ? "h-44" : "h-32"
        } dark:text-white dark:bg-gray-dark w-full resize-none mb-2 shadow focus:shadow-lg outline-none rounded-md px-3 py-1 overflow-hidden resize-y`}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded-md px-5 absolute bottom-3 right-1"
      >
        <PaperAirplaneIcon className="rotate-90" width={20} />
      </button>
    </form>
  );
};

export default CommentForm;
