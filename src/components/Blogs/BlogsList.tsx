import BlogItem from "@/components/Blogs/BlogItem";
import React from "react";

export interface IBlogsListProps {
  blogs: any[];
}

const BlogsList = (props: IBlogsListProps) => {
  const { blogs } = props;

  return (
    <div className="md:grid-cols-12 grid gap-10">
      {blogs.map((blog, index) => (
        <BlogItem key={index} blog={blog} index={index} />
      ))}
    </div>
  );
};

export default BlogsList;
