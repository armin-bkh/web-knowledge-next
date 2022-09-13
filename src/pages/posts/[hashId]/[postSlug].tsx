import React, { useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/outline";
import { AnnotationIcon } from "@heroicons/react/solid";

import Hr from "@/common/Hr/Hr";
import { getPostBySlug } from "@/services/getPostBySlug";
import { TBlog } from "@/global/types";
import AuthorSection from "@/components/Post/AuthorSection/AuthorSection";
import Slug from "@/common/Slug/Slug";
import Spacer from "@/common/Spacer/Spacer";
import FooterPostSection from "@/components/Post/FooterPostSection/FooterPostSection";
import AuthorReadingInfo from "@/components/Post/AuthorReadingInfo/AuthorReadingInfo";

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
      </section>
      <section className="hidden lg:flex md:flex-1 justify-center items-start">
        <AuthorReadingInfo post={post} />
      </section>
      <FooterPostSection post={post} />
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
