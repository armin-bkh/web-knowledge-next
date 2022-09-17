import { GetServerSideProps, NextPage } from "next";
import React from "react";
import queryString from "query-string";

import Accordion from "@/components/Category/Accordion/Accordion";
import SortBar from "@/components/SortBar/SortBar";
import BlogsList from "@/components/Blogs/BlogList/BlogsList";
import MobileCategory from "@/components/Category/MobileCategory/MobileCategory";
import { getCategories } from "@/services/getCategories";
import { getBlogs } from "@/services/getBlogs";
import { IBlogsPageProps } from "@/pages/blogs";

const BlogsBySlugPage: NextPage<IBlogsPageProps> = (props) => {
  const { categories, posts } = props;
  return (
    <main className="container lg:max-w-screen-xl px-4 md:px-4 mx-auto grid grid-cols-12 min-h-screen grid-rows-[30px_100px_minmax(400px,_1fr)] md:grid-rows-[60px_minmax(400px,_1fr)_100px] gap-5 py-5">
      <section className="col-span-12 md:col-span-3 md:row-span-2">
        <div className="hidden md:block">
          <Accordion categories={categories} />
        </div>
        <div className="block md:hidden">
          <MobileCategory categories={categories} />
        </div>
      </section>
      <section className="col-span-12 md:col-span-9 flex">
        <SortBar />
      </section>
      <section className="col-span-12 md:col-span-9 grid">
        <BlogsList blogs={posts} />
      </section>
    </main>
  );
};

export default BlogsBySlugPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = {
    page: 1,
    limit: 6,
    ...context.query,
  };

  console.log(queryString.stringify(query), "query is her");

  const {
    data: { data: postsData },
  } = await getBlogs(queryString.stringify(query));
  const {
    data: { data: categories },
  } = await getCategories();

  const { docs: posts } = postsData;

  if (!posts.length) {
    return {
      notFound: true,
    };
  }

  console.log(posts, "posts ish ere");

  return {
    props: {
      categories,
      posts,
    },
  };
};
