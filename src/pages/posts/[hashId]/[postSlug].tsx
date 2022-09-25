import React, { useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";

import { TBlog } from "@/global/types";
import { getPostBySlug } from "@/services/getPostBySlug";
import AuthorSection from "@/components/Post/AuthorSection/AuthorSection";
import FooterPostSection from "@/components/Post/FooterPostSection/FooterPostSection";
import AuthorReadingInfo from "@/components/Post/AuthorReadingInfo/AuthorReadingInfo";
import BlogsList from "@/components/Blogs/BlogList/BlogsList";
import PostComments from "@/components/Comments/PostComments/PostComments";
import Spacer from "@/common/Spacer/Spacer";

export interface IPostDetailPage {
  post: TBlog;
}

const PostDetailPage: NextPage<IPostDetailPage> = (props) => {
  const { post } = props;

  const date = useMemo(() => new Date(post.updatedAt).toLocaleDateString(), []);

  return (
    <main className="container flex flex-wrap lg:max-w-screen-xl px-4 md:px-4 mx-auto min-h-screen py-5">
      <section className="flex-[3]">
        <div className="flex justify-between items-start">
          <AuthorSection date={date} post={post} />
        </div>
        <div
          className="prose-lg lg:prose-xl prose-h1:font-black prose-h2:font-bold prose-p:text-base my-10 prose-p:text-justify
          dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-p:text-gray-50 prose-code:italic
          prose-code:font-bold prose-code:text-sm dark:prose-code:text-white prose-pre:bg-gray-darkest dark:prose-pre:bg-gray-700 prose-pre:text-white dark:prose-pre:text-gray-50 prose-pre:text-sm"
        >
          <h1>{post.title}</h1>
          <img src={post.coverImage} />
          <h2>Hello mamad</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2>hello asghar</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2>pre tag is here</h2>
          <code>`js.config.json`</code>
          <pre>
            {`module.exports = {
  aliReza: new Date.now()
  aliReza: new Date.now()
  aliReza: new Date.now()
}`}
          </pre>
        </div>
      </section>
      <section className="hidden lg:flex md:flex-1 justify-center items-center p-5">
        <AuthorReadingInfo post={post} />
      </section>
      <FooterPostSection post={post} />
      {post.related.length > 0 && (
        <section className="mt-10 w-full overflow-hidden">
          <h2 className="text-4xl font-bold mb-10 dark:text-white">Related</h2>
          <div className="max-w-screen-xl mx-auto">
            <BlogsList blogs={post.related} related />
          </div>
        </section>
      )}
      <Spacer times={2} />
      <PostComments post={post} />
    </main>
  );
};

export default PostDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { hashId, postSlug } = context.query as any;
  const {
    data: { data: post },
  } = await getPostBySlug(context.req, hashId, postSlug);

  return {
    props: {
      post,
    },
  };
};
