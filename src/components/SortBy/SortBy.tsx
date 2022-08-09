import { AdjustmentsIcon } from "@heroicons/react/outline";
import React from "react";

const staticSortTypes = ["Popular", "most views", "new blogs"];

const SortBy = () => {
  return (
    <div className="flex flex-1 items-center bg-white dark:bg-gray-dark rounded-2xl shadow-lg">
      <p className="mx-5 font-light dark:text-light">
        <AdjustmentsIcon className="mr-2 inline" width={18} /> Sort by:
      </p>
      <ul className="flex items-center gap-x-12 h-full">
        {staticSortTypes.map((sort, index) => (
          <li
            key={index}
            className="relative text-cyan-light dark:text-light font-bold after:content-[''] after:w-8 after:h-0.5 after:absolute after:bg-cyan-light dark:after:bg-light h-full flex items-center after:bottom-0 after:left-0 cursor-pointer"
          >
            {sort}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortBy;
