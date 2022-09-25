import React, { useCallback } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { TBlog } from "@/global/types";
import { ToastMode } from "@/global/toast";
import { postComment } from "@/services/postComment";
import CommentForm from "@/components/Comments/CommentForm/CommentForm";
import CommentsList from "@/components/Comments/CommentsList/CommentsList";

export interface IPostCommentsProps {
  post: TBlog;
}

const PostComments = (props: IPostCommentsProps) => {
  const { post } = props;

  const router = useRouter();

  const handleSubmitComment = useCallback(
    async (content: string) => {
      try {
        console.log(content);
        const { data } = await postComment({
          postId: post._id,
          content,
        });
        toast[ToastMode.SUCCESS](data.message);
        console.log(router, "router is her");
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
