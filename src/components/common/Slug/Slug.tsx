import React from "react";
import Link from "next/link";

import { TBlogCategory } from "@/global/types";

export interface ISlugProps {
  category: TBlogCategory;
  className?: string;
  color?: "blue" | "red" | "gray";
}

const Slug = (props: ISlugProps) => {
  const { category, color, className } = props;

  return (
    <Link href={`/blogs/${category.englishTitle}`}>
      <a
        className={`px-2 py-1 bg-${color}-100 transition rounded-full px-2 text-${color}-500 hover:bg-${color}-500 hover:text-white cursor-pointer ${className}`}
      >
        {category.title}
      </a>
    </Link>
  );
};

export default Slug;
