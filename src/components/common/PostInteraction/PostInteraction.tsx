import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/outline";
import {
  BookmarkIcon as SolidBookmarkIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/solid";
import { AnnotationIcon } from "@heroicons/react/solid";

import { TBlog } from "@/global/types";
import { ToastMode } from "@/global/toast";
import { bookmarkPost, likePost } from "@/services/postInteraction";
import { useCRouter } from "@/hooks/useCRouter";

export interface IPostInterActionProps {
  post: TBlog;
  isSmall?: boolean;
  containerClassName?: string;
}

const PostInteraction = (props: IPostInterActionProps) => {
  const { post, isSmall, containerClassName } = props;

  const router = useCRouter();

  const iconSize = useMemo(() => (isSmall ? 12 : 20), [isSmall]);
  const paddingSize = useMemo(
    () => (isSmall ? "px-2 py-1" : "px-4 py-1"),
    [isSmall]
  );

  const handlePostInteraction = useCallback(
    async (action: "like" | "bookmark") => {
      try {
        const { data } = await (action === "like" ? likePost : bookmarkPost)(
          post._id
        );

        await router.pushHere();
        toast[ToastMode.SUCCESS](data.message);
      } catch (e: any) {
        console.log(e, "error is here");
        toast[ToastMode.ERROR](e.response.data.message);
      }
    },
    []
  );

  return (
    <div
      className={`flex items-center gap-1 ${containerClassName} justify-between md:justify-start`}
    >
      <button
        onClick={() => handlePostInteraction("bookmark")}
        className={`${paddingSize} rounded-md flex items-center bg-blue-100 transition text-blue-500 hover:text-blue-100 hover:bg-blue-500`}
      >
        {post.isBookmarked ? (
          <SolidBookmarkIcon className="inline" width={iconSize} />
        ) : (
          <BookmarkIcon className="inline" width={iconSize} />
        )}
      </button>
      <button
        onClick={() => handlePostInteraction("like")}
        className={`${paddingSize} rounded-md flex items-center bg-red-300 transition text-red-600 hover:text-red-300 hover:bg-red-600`}
      >
        {post.likesCount}{" "}
        {post.isLiked ? (
          <SolidHeartIcon className="inline ml-1" width={iconSize} />
        ) : (
          <HeartIcon className="inline ml-1" width={iconSize} />
        )}
      </button>
      <button
        className={`${paddingSize} rounded-md flex items-center bg-gray-300`}
      >
        {post.commentsCount}{" "}
        <AnnotationIcon className="inline ml-1" width={iconSize} />
      </button>
    </div>
  );
};

export default PostInteraction;
