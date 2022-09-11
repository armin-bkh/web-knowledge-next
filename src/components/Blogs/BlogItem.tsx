import React from "react";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/outline";
import { AnnotationIcon } from "@heroicons/react/solid";
import { TBlog } from "../../global/types";
import Link from "next/link";

export interface IBlogItemProps {
  blog: TBlog;
  index: number;
}

const BlogItem = (props: IBlogItemProps) => {
  const { blog, index } = props;

  return (
    <article className="md:col-span-6 xl:col-span-4 bg-white dark:bg-gray-dark shadow-lg rounded-2xl overflow-hidden max-h-[400px] flex flex-col">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={blog.coverImage}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="bg-gray-dark/10 dark:bg-light/50 m-3 p-3 rounded-2xl flex-1 flex flex-col justify-between">
        <p className="mb-2 text-lg font-bold dark:text-light">
          {index === 2
            ? " What is Next.js and what can it do?"
            : "what is next js"}
        </p>
        <div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center dark:text-light">
              <img
                src="https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-personal-information-icon-image_1144468.jpg"
                className="w-8 h-8 rounded-full ring-1 ring-white mr-2"
              />
              <p>Armin Bakhshi</p>
            </div>
            <Link href={`/blogs/${blog.category.englishTitle}`}>
              <a className="bg-blue-100 transition rounded-full px-2 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer">
                {blog.category.englishTitle}
              </a>
            </Link>
          </div>

          <div className="flex justify-between items-center mt-3 text-xs">
            <span className="text-gray-500 dark:text-gray-darkest">
              study time: 12 minute
            </span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 max-h-5 rounded-md flex items-center bg-blue-100 transition text-blue-500 hover:text-blue-100 hover:bg-blue-500">
                <BookmarkIcon className="inline" width={12} />
              </button>
              <button className="px-2 py-1 max-h-5 rounded-md flex items-center bg-red-300 transition text-red-600 hover:text-red-300 hover:bg-red-600">
                <HeartIcon className="inline" width={12} />
              </button>
              <button className="px-2 py-1 max-h-5 rounded-md flex items-center bg-gray-300">
                0 <AnnotationIcon className="inline ml-1" width={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
