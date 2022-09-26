import { GetServerSideProps, NextPage } from "next";
import React from "react";
import queryString from "query-string";

import SortBar from "@/components/SortBar/SortBar";
import Pagination from "@/components/Pagination/Pagination";
import BlogsList from "@/components/Blogs/BlogList/BlogsList";
import Accordion from "@/components/Category/Accordion/Accordion";
import MobileCategory from "@/components/Category/MobileCategory/MobileCategory";
import { getCategories } from "@/services/getCategories";
import { getBlogs } from "@/services/getBlogs";
import { IBlogsPageProps } from "@/pages/blogs";

const BlogsBySlugPage: NextPage<IBlogsPageProps> = (props) => {
  const { categories, posts, paginateDetail } = props;
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

export default BlogsBySlugPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;

  console.log(queryString.stringify(query), "query is her");

  const {
    data: { data: postsData },
  } = await getBlogs(req, queryString.stringify(query));
  const {
    data: { data: categories },
  } = await getCategories();

  const { docs: posts, ...paginateDetail } = postsData;

  if (!posts.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categories,
      posts,
      paginateDetail,
    },
  };
};
