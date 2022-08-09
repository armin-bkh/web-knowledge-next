import { NextPage } from "next";
import React from "react";

import Accordion from "@/components/Category/Accordion/Accordion";
import SortBar from "@/components/SortBar/SortBar";
import BlogsList from "@/components/Blogs/BlogsList";
import MobileCategory from "@/components/Category/MobileCategory/MobileCategory";

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
    <main className="container lg:max-w-screen-xl px-4 md:px-4 mx-auto grid grid-cols-12 min-h-screen grid-rows-[30px_100px_minmax(400px,_1fr)] md:grid-rows-[60px_minmax(400px,_1fr)_100px] gap-5 py-5">
      <section className="col-span-12 md:col-span-3 md:row-span-2">
        <div className="hidden md:block">
          <Accordion />
        </div>
        <div className="block md:hidden">
          <MobileCategory />
        </div>
      </section>
      <section className="col-span-12 md:col-span-9 flex">
        <SortBar />
      </section>
      <section className="col-span-12 md:col-span-9 grid">
        <BlogsList blogs={staticBlogs} />
      </section>
    </main>
  );
};

export default BlogsPage;
