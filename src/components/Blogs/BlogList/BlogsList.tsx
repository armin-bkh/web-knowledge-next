import React from "react";

import BlogItem from "@/components/Blogs/BlogItem/BlogItem";
import { TBlog } from "@/global/types";

export interface IBlogsListProps {
  blogs: TBlog[];
}

const BlogsList = (props: IBlogsListProps) => {
  const { blogs } = props;

  return (
    <div className="md:grid-cols-12 grid gap-10">
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsList;
