import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/core/dashboard/Sidebar';
import { FiMenu } from 'react-icons/fi';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex items-start w-full h-full overflow-hidden bg-gray-200">
      {/* Sidebar - Responsive */}
      <div
        className={`absolute md:relative z-50 transition-all duration-300 h-full ${
          isSidebarOpen ? "w-[250px] h-fit" : "max-md:w-[70px] w-[250px] max-md:h-0 max-md:overflow-hidden"
        } bg-blue-900 text-white shadow-lg flex flex-col`}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="fixed top-0 left-0 md:hidden z-50 bg-blue-900 p-2 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu size={24} className="text-white" />
      </button>

      {/* Main Content */}
      <div className="flex-grow overflow-x-hidden overflow-y-auto flex justify-center items-start pb-20  w-full h-full">
        <div className="w-full md:w-11/12 py-8 bg-gray-200 rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
