import React from "react";
import { BookmarkIcon, LinkIcon } from "@heroicons/react/outline";

import Slug from "@/common/Slug/Slug";
import Spacer from "@/common/Spacer/Spacer";
import { TBlog } from "@/global/types";

export interface IAuthorSectionProps {
  date: string;
  post: TBlog;
}

const AuthorSection = (props: IAuthorSectionProps) => {
  const { date, post } = props;
  return (
    <header className="flex flex-col md:flex-row justify-between flex-1">
      <div className="flex items-center">
        <img className="rounded-full w-20 h-20" src="/UserIcon.jpeg" />
        <div className="ml-2 flex flex-col h-full justify-center">
          <div className="flex">
            <p className="dark:text-light font-black text-lg">
              {post.author.name}
            </p>
            <Slug className="ml-5" category={post.category} color="blue" />
          </div>
          <p className="dark:text-light text-sm my-1">
            {post.author.biography}
          </p>
          <div className="flex items-center">
            <p className="text-cyan-light text-sm">{date}</p>
            <span className="mx-5 p-1 bg-cyan-light rounded-full"></span>
            <p className="text-cyan-light text-sm">
              {post.readingTime} minutes for reading
            </p>
          </div>
        </div>
      </div>
      <Spacer times={2} />
      <div className="flex items-center">
        <button>
          <LinkIcon className="dark:text-light" width={20} />
        </button>
        <Spacer times={2} />
        <button
          className="flex items-center ml-5 p-2 dark:bg-gray-400 dark:text-white
          dark:hover:bg-white dark:hover:text-gray-400 bg-white transition rounded-full
          px-4 text-gray-400 border border-gray-300 hover:bg-gray-400 hover:text-white cursor-pointer"
        >
          save <Spacer /> <BookmarkIcon width={20} />
        </button>
      </div>
    </header>
  );
};

export default AuthorSection;
