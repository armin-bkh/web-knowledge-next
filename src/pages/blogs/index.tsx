import React from "react";
import { GetServerSideProps, NextPage } from "next";
import queryStrings from "query-string";

import { TCategory, TBlog, TPaginateDetail } from "@/global/types";
import { getBlogs } from "@/services/getBlogs";
import { getCategories } from "@/services/getCategories";
import SortBar from "@/components/SortBar/SortBar";
import BlogsList from "@/components/Blogs/BlogList/BlogsList";
import Accordion from "@/components/Category/Accordion/Accordion";
import MobileCategory from "@/components/Category/MobileCategory/MobileCategory";
import Pagination from "@/components/Pagination/Pagination";

export interface IBlogsPageProps {
  categories: TCategory[];
  posts: TBlog[];
  paginateDetail: TPaginateDetail;
}

const BlogsPage: NextPage<IBlogsPageProps> = (props) => {
  const { categories, posts, paginateDetail } = props;

  console.log("test log");

  return (
    <main className="container lg:max-w-screen-xl px-4 md:px-4 mx-auto grid grid-cols-12 min-h-screen grid-rows-[30px_100px_minmax(400px,_1fr)] md:grid-rows-[60px_minmax(400px,_1fr)_100px] gap-5 py-5">
      <section className="col-span-12 md:col-span-3 md:row-span-2">
        <div className="hidden md:block">
          <Accordion categories={categories} />
        </div>
        <div className="block md:hidden max-h-14">
          <MobileCategory categories={categories} />
        </div>
      </section>
      <section className="col-span-12 md:col-span-9 flex max-h-14 md:h-auto">
        <SortBar />
      </section>
      <section className="col-span-12 md:col-span-9 grid">
        <BlogsList blogs={posts} />
        <Pagination paginateDetail={paginateDetail} />
      </section>
    </main>
  );
};

export default BlogsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;

  const {
    data: { data: categories },
  } = await getCategories();
  const {
    data: { data: postsData },
  } = await getBlogs(req, queryStrings.stringify(query));

  const { docs: posts, ...paginateDetail } = postsData;

  return {
    props: {
      categories,
      posts,
      paginateDetail,
    },
  };
};
