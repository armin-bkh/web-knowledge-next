import React, { useState } from "react";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/outline";

const staticCategories = ["javascript", "nodejs", "react", "vuejs"];

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(true);

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
        className={`p-5 ${
          isOpen ? "block" : "hidden"
        } dark:bg-gray-dark dark:text-light`}
      >
        <ul>
          {staticCategories.map((category, index) => (
            <li
              key={index}
              className="py-2 cursor-pointer last:border-b-0 border-b dark:border-gray-darkest"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
