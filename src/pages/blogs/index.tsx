import { NextPage } from "next";
import React from "react";

import { getBlogs } from "@/services/getBlogs";
import { getCategories } from "@/services/getCategories";
import SortBar from "@/components/SortBar/SortBar";
import BlogsList from "@/components/Blogs/BlogList/BlogsList";
import Accordion from "@/components/Category/Accordion/Accordion";
import MobileCategory from "@/components/Category/MobileCategory/MobileCategory";
import { TCategory, TBlog } from "@/global/types";

export interface IBlogsPageProps {
  categories: TCategory[];
  posts: TBlog[];
}

const BlogsPage: NextPage<IBlogsPageProps> = (props) => {
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

export default BlogsPage;

export const getServerSideProps = async () => {
  const {
    data: { data: categories },
  } = await getCategories();
  const {
    data: { data: postsData },
  } = await getBlogs();

  const { docs: posts } = postsData;

  console.log(posts, "posts ish ere");

  return {
    props: {
      categories,
      posts,
    },
  };
};
