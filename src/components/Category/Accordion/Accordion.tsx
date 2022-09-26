import React, { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/outline";

import { TCategory } from "@/global/types";
import { useCRouter } from "@/hooks/useCRouter";

export interface IAccordionProps {
  categories: TCategory[];
}

const Accordion = (props: IAccordionProps) => {
  const { categories } = props;

  const [isOpen, setIsOpen] = useState(true);

  const { query } = useCRouter();

  const handleToggleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="shadow-lg rounded-2xl overflow-hidden">
      <div
        className="bg-cyan-light dark:bg-light dark:text-cyan-light text-light p-5 cursor-pointer flex justify-between"
        onClick={handleToggleAccordion}
      >
        <p>
          <FilterIcon className="inline mr-2" width={18} />
          Categories
        </p>
        <ChevronDownIcon
          className={`transform transition ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
          width={18}
        />
      </div>
      <div
        className={`py-2 ${
          isOpen ? "block" : "hidden"
        } dark:bg-gray-dark dark:text-light`}
      >
        <ul>
          <li
            className={`py-2 cursor-pointer last:border-b-0 border-b
               dark:border-gray-darkest hover:bg-light hover:dark:bg-cyan-light px-5
               ${
                 !query.categorySlug
                   ? "text-light bg-cyan-light"
                   : "dark:border-gray-darkest hover:bg-light hover:dark:bg-light hover:dark:text-gray-darkest"
               }`}
          >
            <Link href="/blogs">
              <a className="w-full block">All</a>
            </Link>
          </li>
          {categories.map((category) => (
            <li
              key={category._id}
              className={`py-2 cursor-pointer last:border-b-0 border-b
               dark:border-gray-darkest hover:bg-light hover:dark:bg-cyan-light px-5
               ${
                 query.categorySlug === category.englishTitle
                   ? "text-light bg-cyan-light"
                   : "dark:border-gray-darkest hover:bg-light hover:dark:bg-light hover:dark:text-gray-darkest"
               }`}
            >
              <Link href={`/blogs/${category.englishTitle}`}>
                <a className="w-full block">{category.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
