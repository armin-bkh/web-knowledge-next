import React, { useCallback } from "react";
import toast from "react-hot-toast";

import { TBlog } from "@/global/types";
import { ToastMode } from "@/global/toast";
import { postComment } from "@/services/postComment";
import CommentForm from "@/components/Comments/CommentForm/CommentForm";
import CommentsList from "@/components/Comments/CommentsList/CommentsList";
import { useCRouter } from "@/hooks/useCRouter";

export interface IPostCommentsProps {
  post: TBlog;
}

const PostComments = (props: IPostCommentsProps) => {
  const { post } = props;

  const router = useCRouter();

  const handleSubmitComment = useCallback(
    async (content: string) => {
      try {
        const { data } = await postComment({
          postId: post._id,
          content,
        });

        await router.pushHere();
        toast[ToastMode.SUCCESS](data.message);
      } catch (e: any) {
        console.log(e, "eerrrrro");
        toast[ToastMode.ERROR](e.response.data.message);
      }
    },
    [post]
  );

  return (
    <>
      <CommentForm onSubmit={handleSubmitComment} />
      <CommentsList comments={post.comments} postId={post._id} />
    </>
  );
};

export default PostComments;
