import React, { useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { LinkIcon, BookmarkIcon, HeartIcon } from "@heroicons/react/outline";
import { AnnotationIcon } from "@heroicons/react/solid";

import Spacer from "@/common/Spacer/Spacer";
import Hr from "@/common/Hr/Hr";
import { getPostBySlug } from "@/services/getPostBySlug";
import { TBlog } from "@/global/types";

export interface IPostDetailPage {
  post: TBlog;
}

const PostDetailPage: NextPage<IPostDetailPage> = (props) => {
  const { post } = props;

  const date = useMemo(() => new Date(post.updatedAt).toLocaleDateString(), []);

  return (
    <main className="container flex lg:max-w-screen-xl px-4 md:px-4 mx-auto min-h-screen py-5">
      <section className="flex justify-between items-start flex-[3]">
        <header className="flex flex-col md:flex-row justify-between flex-1">
          <div className="flex items-center">
            <img
              className="rounded-full w-20 h-20"
              src="https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-personal-information-icon-image_1144468.jpg"
            />
            <div className="ml-2 flex flex-col h-full justify-center">
              <div className="flex">
                <p className="dark:text-light font-black text-lg">
                  {post.author.name}
                </p>
                <Link href={`/blogs/${post.category.englishTitle}`}>
                  <a className="ml-5 bg-blue-100 transition rounded-full px-2 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer">
                    {post.category.title}
                  </a>
                </Link>
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
            <button className="flex items-center ml-5 p-2 dark:bg-gray-400 dark:text-white dark:hover:bg-white dark:hover:text-gray-400 bg-white transition rounded-full px-4 text-gray-400 border border-gray-300 hover:bg-gray-300 hover:text-white cursor-pointer">
              save <Spacer /> <BookmarkIcon width={20} />
            </button>
          </div>
        </header>
      </section>
      <section className="hidden lg:flex md:flex-1 justify-center items-start">
        <div className="w-1/2 p-5 rounded-md bg-gray-dark">
          <p className="dark:text-gray-darkest">{post.author.name}</p>
          <p className="dark:text-gray-darkest text-sm">
            {post.author.biography}
          </p>
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
      </section>
      <footer></footer>
    </main>
  );
};

export default PostDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { hashId, postSlug } = context.query as any;
  const {
    data: { data: post },
  } = await getPostBySlug(hashId, postSlug);

  console.log(post, "data is hre");

  console.log({ hashId, postSlug }, "post slug");

  return {
    props: {
      post,
    },
  };
};
