import React from "react";
import { AnnotationIcon } from "@heroicons/react/solid";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/outline";

import Hr from "@/common/Hr/Hr";
import Slug from "@/common/Slug/Slug";
import Spacer from "@/common/Spacer/Spacer";
import { TBlog } from "@/global/types";
import PostInteraction from "@/common/PostInteraction/PostInteraction";

export interface IFooterPostSection {
  post: TBlog;
}

const FooterPostSection = (props: IFooterPostSection) => {
  const { post } = props;

  return (
    <footer className="w-full">
      <nav className="flex items-center mb-8">
        <Slug
          category={post.category}
          className="bg-white border text-gray-400 border-gray-300 hover:bg-gray-400 dark:bg-gray-400 dark:text-white dark:hover:bg-white dark:hover:text-gray-500"
        />
      </nav>
      <div>
        <PostInteraction post={post} containerClassName="gap-x-7" />
      </div>
      <Hr styles={{ margin: "24px 0" }} />
      <div className="flex items-center">
        <img
          className="rounded-full w-20 h-20"
          src="https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-personal-information-icon-image_1144468.jpg"
        />
        <div className="ml-2">
          <p className="dark:text-light font-black text-lg">
            {post.author.name}
          </p>
          <Spacer times={2} />
          <p className="dark:text-light text-sm my-1">
            {post.author.biography}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPostSection;
