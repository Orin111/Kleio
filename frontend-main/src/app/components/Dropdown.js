import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";

const DropdownButton = ({ pages, handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-1 right-7 inline-block">
      <FiMenu
        onClick={toggleDropdown}
        className="cursor-pointer text-gray-400"
        size={45}
      />

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 cursor-pointer top- bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-gray-700 absolute top-0 right-0 mt-8"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              onClick={() => {
                setIsOpen(!isOpen);
                handleClick(pages.Chat);
              }}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {pages.Chat}
            </li>
            <li
              onClick={() => {
                setIsOpen(!isOpen);
                handleClick(pages.Report);
              }}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {pages.Report}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
