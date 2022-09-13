import React from "react";
import { AnnotationIcon } from "@heroicons/react/solid";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/outline";

import Hr from "@/common/Hr/Hr";
import { TBlog } from "@/global/types";

export interface IAuthorReadingInfo {
  post: TBlog;
}

const AuthorReadingInfo = (props: IAuthorReadingInfo) => {
  const { post } = props;

  return (
    <div className="w-1/2 p-5 rounded-md shadow dark:shadow-none dark:bg-gray-dark">
      <p className="dark:text-gray-400">{post.author.name}</p>
      <p className="dark:text-gray-500 text-sm">{post.author.biography}</p>
      <Hr darkest styles={{ margin: "8px 0" }} />
      <div className="flex items-center justify-around">
        <button className="px-2 py-1 max-h-5 rounded-md flex items-center text-cyan-light">
          <BookmarkIcon className="inline" width={20} />
        </button>
        <button className="px-2 py-1 max-h-5 rounded-md flex items-center text-cyan-light">
          <HeartIcon className="inline" width={20} />
        </button>
        <button className="px-2 py-1 max-h-5 rounded-md flex items-center text-cyan-light">
          0 <AnnotationIcon className="inline ml-1" width={20} />
        </button>
      </div>
    </div>
  );
};

export default AuthorReadingInfo;
