import BlogItem from "@/components/Blogs/BlogItem";
import React from "react";
import { TBlogs } from "../../global/types";

export interface IBlogsListProps {
  blogs: TBlogs[];
}

const BlogsList = (props: IBlogsListProps) => {
  const { blogs } = props;

  return (
    <div className="md:grid-cols-12 grid gap-10">
      {blogs.map((blog, index) => (
        <BlogItem key={blog._id} blog={blog} index={index} />
      ))}
    </div>
  );
};

export default BlogsList;
