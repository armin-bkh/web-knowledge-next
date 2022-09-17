import React, { useMemo } from "react";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/outline";
import {
  BookmarkIcon as SolidBookmarkIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/solid";
import { AnnotationIcon } from "@heroicons/react/solid";

import { TBlog } from "@/global/types";

export interface IPostInterAction {
  post: TBlog;
  isSmall?: boolean;
  containerClassName?: string;
}

const PostInteraction = (props: IPostInterAction) => {
  const { post, isSmall, containerClassName } = props;

  const iconSize = useMemo(() => (isSmall ? 12 : 20), [isSmall]);
  const paddingSize = useMemo(
    () => (isSmall ? "px-2 py-1" : "px-4 py-1"),
    [isSmall]
  );

  return (
    <div
      className={`flex items-center gap-1 ${containerClassName} justify-between md:justify-start`}
    >
      <button
        className={`${paddingSize} rounded-md flex items-center bg-blue-100 transition text-blue-500 hover:text-blue-100 hover:bg-blue-500`}
      >
        {post.isBookmarked ? (
          <SolidBookmarkIcon className="inline" width={iconSize} />
        ) : (
          <BookmarkIcon className="inline" width={iconSize} />
        )}
      </button>
      <button
        className={`${paddingSize} rounded-md flex items-center bg-red-300 transition text-red-600 hover:text-red-300 hover:bg-red-600`}
      >
        {post.isLiked ? (
          <SolidHeartIcon className="inline" width={iconSize} />
        ) : (
          <HeartIcon className="inline" width={iconSize} />
        )}
      </button>
      <button
        className={`${paddingSize} rounded-md flex items-center bg-gray-300`}
      >
        {post.comments.length}{" "}
        <AnnotationIcon className="inline ml-1" width={iconSize} />
      </button>
    </div>
  );
};

export default PostInteraction;
