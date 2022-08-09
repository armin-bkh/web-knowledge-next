import { staticCategories } from "@/components/Category/Accordion/Accordion";
import React from "react";

const MobileCategory = () => {
  return (
    <div>
      <ul className="flex space-x-10 overflow-auto pb-5">
        {staticCategories.map((category, index) => (
          <li
            key={index}
            className="py-1 cursor-pointer border dark:border-light px-3 rounded-md dark:text-light hover:bg-gray-dark hover:text-light dark:hover:bg-light dark:hover:text-gray-dark"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileCategory;
