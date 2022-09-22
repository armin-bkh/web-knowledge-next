import React from "react";

import CommentForm from "@/components/Comments/CommentForm/CommentForm";
import { TBlog } from "@/global/types";
import CommentsList from "@/components/Comments/CommentsList/CommentsList";

export interface IPostCommentsProps {
  post: TBlog;
}

const PostComments = (props: IPostCommentsProps) => {
  const { post } = props;

  return (
    <>
      <CommentForm postId={post._id} />
      <CommentsList comments={post.comments} postId={post._id} />
    </>
  );
};

export default PostComments;
