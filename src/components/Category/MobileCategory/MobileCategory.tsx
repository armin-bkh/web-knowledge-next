import React from "react";
import Link from "next/link";

import { TCategory } from "@/global/types";
import { useCRouter } from "@/hooks/useCRouter";

export type TMobileCategoryProps = {
  categories: TCategory[];
};

const MobileCategory = (props: TMobileCategoryProps) => {
  const { categories } = props;

  const { query } = useCRouter();

  return (
    <div>
      <ul className="flex space-x-10 overflow-auto snap-x pb-3">
        <li
          className={`snap-start py-1 cursor-pointer border px-3
              rounded-md ${
                !query.categorySlug
                  ? "bg-cyan-light text-light"
                  : "dark:border-light dark:text-light hover:bg-gray-dark hover:text-light dark:hover:bg-light dark:hover:text-gray-dark"
              }`}
        >
          <Link href="/blogs">
            <a className="w-full">All</a>
          </Link>
        </li>
        {categories.map((category) => (
          <li
            key={category._id}
            className={`snap-start py-1 cursor-pointer border px-3
              rounded-md ${
                query.categorySlug === category.englishTitle
                  ? "bg-cyan-light text-light"
                  : "dark:border-light dark:text-light hover:bg-gray-dark hover:text-light dark:hover:bg-light dark:hover:text-gray-dark"
              }`}
          >
            <Link href={`/blogs/${category.englishTitle}`}>
              <a className="w-full whitespace-nowrap text-xs md:text-sm">
                {category.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileCategory;
