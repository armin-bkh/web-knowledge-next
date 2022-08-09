import { NextPage } from "next";
import React from "react";

import Accordion from "@/components/Accordion/Accordion";
import SortBy from "@/components/SortBy/SortBy";
import BlogsList from "@/components/Blogs/BlogsList";

const staticBlogs = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png",
  "https://files.virgool.io/upload/users/128552/posts/e8abqiqowc2y/cjnw9y0ogmtr.png",
  "https://files.virgool.io/upload/users/128552/posts/e8abqiqowc2y/cjnw9y0ogmtr.png",
  "https://files.virgool.io/upload/users/128552/posts/e8abqiqowc2y/cjnw9y0ogmtr.png",
];

const BlogsPage: NextPage = () => {
  return (
    <main className="container max-w-screen-xl mx-auto grid grid-cols-12 min-h-screen grid-rows-[100px_100px_minmax(400px,_1fr)] md:grid-rows-[60px_minmax(400px,_1fr)_100px] gap-5 py-5">
      <section className="col-span-12 md:col-span-3 md:row-span-2">
        {/* Accordion component */}
        <Accordion />
      </section>
      <section className="col-span-12 md:col-span-9 flex">
        {/* Sort component */}
        <SortBy />
      </section>
      <section className="col-span-12 md:col-span-9 grid">
        {/* BlogList component */}
        <BlogsList blogs={staticBlogs} />
      </section>
    </main>
  );
};

export default BlogsPage;
