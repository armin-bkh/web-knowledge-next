import React from "react";

import BlogItem from "@/components/Blogs/BlogItem/BlogItem";
import { TBlog } from "@/global/types";

export interface IBlogsListProps {
  blogs: TBlog[];
  related?: boolean;
}

const BlogsList = (props: IBlogsListProps) => {
  const { blogs, related } = props;

  return (
    <div
      className={
        related
          ? "scroll-smooth snap-x overflow-x-auto md:px-20 py-5 gap-7 flex flex-col md:flex-row"
          : "md:grid-cols-12 grid gap-10"
      }
    >
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} related={related} />
      ))}
    </div>
  );
};

export default BlogsList;
