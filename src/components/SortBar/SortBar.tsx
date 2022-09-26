import React, { useCallback, useState } from "react";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { useCRouter } from "@/hooks/useCRouter";

const sortOptions = [
  {
    label: "latest",
    id: "newest",
  },
  {
    label: "popular",
    id: "popular",
  },
  {
    label: "most views",
    id: "most",
  },
];

const SortBar = () => {
  const router = useCRouter();

  const [sortBy, setSortBy] = useState(router.query.sort || "newest");

  const handleSortBlogs = useCallback(
    (selectedSort: string) => {
      setSortBy(selectedSort);
      // router.query.sort = selectedSort;
      router.pushHere({ sort: selectedSort });
    },
    [sortBy]
  );

  return (
    <div className="flex flex-1 items-center bg-white dark:bg-gray-dark rounded-2xl shadow-lg">
      <p className="mx-5 font-light dark:text-light text-sm md:text-bas">
        <AdjustmentsIcon className="mr-2 inline" width={18} /> Sort by:
      </p>
      <ul className="flex items-center gap-x-6 md:gap-x-12 h-full">
        {sortOptions.map((sort) => (
          <li
            onClick={() => handleSortBlogs(sort.id)}
            key={sort.id}
            className={`text-xs md:text-base relative font-bold after:content-['']
             after:w-5 after:h-0.5 after:absolute after:bg-cyan-light dark:after:bg-light h-full
             flex items-center after:bottom-0 after:left-0 cursor-pointer ${
               sort.id === sortBy
                 ? "text-cyan-light dark:text-light after:bg-cyan-light"
                 : "dark:text-light dark:text-gray-400 after:bg-transparent dark:after:bg-transparent hover:text-cyan-light dark:hover:text-light"
             }`}
          >
            {sort.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortBar;
