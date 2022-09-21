import React from "react";
import Link from "next/link";

import PostInteraction from "@/common/PostInteraction/PostInteraction";
import { TBlog } from "@/global/types";

export interface IBlogItemProps {
  blog: TBlog;
  related?: boolean;
}

const BlogItem = (props: IBlogItemProps) => {
  const { blog, related } = props;

  return (
    <article
      className={`${
        related
          ? "w-full md:w-[280px] flex-shrink-0 snap-start scroll-ml-9"
          : "md:col-span-6 xl:col-span-4"
      }  bg-white dark:bg-gray-dark shadow-lg rounded-2xl overflow-hidden max-h-[350px] flex flex-col`}
    >
      <div className="aspect-w-16 aspect-h-9">
        <Link href={`/posts/${blog.hashId}/${blog.slug}`}>
          <a>
            <img
              src={blog.coverImage}
              className="w-full h-full object-cover object-center"
            />
          </a>
        </Link>
      </div>
      <div className="bg-gray-dark/10 dark:bg-light/50 m-3 p-3 rounded-2xl flex-1 flex flex-col justify-between">
        <Link href={`/posts/${blog.hashId}/${blog.slug}`}>
          <a>
            <p className="mb-2 text-lg font-bold dark:text-light">
              {blog.title}
            </p>
          </a>
        </Link>
        <div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center dark:text-light">
              <img
                src="https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-personal-information-icon-image_1144468.jpg"
                className="w-8 h-8 rounded-full ring-1 ring-white mr-2"
              />
              <p>{blog.author.name}</p>
            </div>
            <Link href={`/blogs/${blog.category.englishTitle}`}>
              <a className="bg-blue-100 transition rounded-full px-2 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer">
                {blog.category.title}
              </a>
            </Link>
          </div>

          <div className="flex justify-between items-center mt-3 text-xs">
            <span className="text-gray-500 dark:text-gray-darkest">
              study time: {blog.readingTime} minute
            </span>
            <PostInteraction post={blog} isSmall />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
