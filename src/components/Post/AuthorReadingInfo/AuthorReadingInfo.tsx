import React from "react";

import Hr from "@/common/Hr/Hr";
import PostInteraction from "@/common/PostInteraction/PostInteraction";
import { TBlog } from "@/global/types";

export interface IAuthorReadingInfo {
  post: TBlog;
}

const AuthorReadingInfo = (props: IAuthorReadingInfo) => {
  const { post } = props;

  return (
    <div className="w-full p-5 rounded-md shadow dark:shadow-none dark:bg-gray-dark sticky top-5">
      <p className="dark:text-gray-400 text-lg">{post.author.name}</p>
      <p className="dark:text-gray-500 text-base">{post.author.biography}</p>
      <Hr darkest styles={{ margin: "8px 0" }} />
      <PostInteraction post={post} containerClassName="justify-between" />
    </div>
  );
};

export default AuthorReadingInfo;
