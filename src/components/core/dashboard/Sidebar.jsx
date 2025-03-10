import React from 'react';
import { sideBarLinks } from '../../../data/sidebarLinks';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`h-full flex flex-col gap-3 p-4 transition-all duration-300 ${
        isOpen ? "w-[250px]" : "w-full"
      } bg-blue-900 text-white shadow-lg`}
    >
      {sideBarLinks.map((link, id) => (
        <Link
          key={id}
          to={link?.path || "#"}
          className="flex items-center gap-2 py-2 px-4 rounded-md text-white font-medium transition duration-300 hover:bg-blue-700"
        >
          <FiChevronRight className="text-lg" />
          <span className={`${isOpen ? "block" : "hidden"} md:block`}>
            {link?.name}
          </span>
        </Link>
      ))}
    </div>
  );
};
