import React from "react";
import Link from "next/link";

import { TCategory } from "@/global/types";

export type TMobileCategoryProps = {
  categories: TCategory[];
};

const MobileCategory = (props: TMobileCategoryProps) => {
  const { categories } = props;

  return (
    <div>
      <ul className="flex space-x-10 overflow-auto pb-5">
        <li className="py-1 cursor-pointer border dark:border-light px-3 rounded-md dark:text-light hover:bg-gray-dark hover:text-light dark:hover:bg-light dark:hover:text-gray-dark">
          <Link href="/blogs">
            <a className="w-full">All</a>
          </Link>
        </li>
        {categories.map((category) => (
          <li
            key={category._id}
            className="py-1 cursor-pointer border dark:border-light px-3 rounded-md dark:text-light hover:bg-gray-dark hover:text-light dark:hover:bg-light dark:hover:text-gray-dark"
          >
            <Link href={`/blogs/${category.englishTitle}`}>
              <a className="w-full">{category.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileCategory;
