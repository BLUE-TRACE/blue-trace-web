import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaBell,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  MdDashboard,
  MdSchedule,
  MdAssignmentTurnedIn,
  MdReport,
} from "react-icons/md";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const tabs = [
  { name: "Dashboard", icon: <MdDashboard size={20} />, path: "/" },
  { name: "Timetable", icon: <MdSchedule size={20} />, path: "/lecturer/timetable" },
  { name: "Attendance", icon: <MdAssignmentTurnedIn size={20} />, path: "/lecturer/attendance-mark" },
  { name: "Report", icon: <MdReport size={20} />, path: "/lecturer/report" },
];

  return (
    <nav className="bg-gray-900 text-gray-100 px-6 md:px-2 lg:px-6 py-4 flex flex-wrap justify-between items-center relative z-50">
      {/* Logo 1 */}
      <div className="flex md:hidden items-center gap-2">
        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
        <span className="font-bold text-2xl">BlueTrace</span>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-100 hover:text-cyan-400 focus:outline-none transition-colors"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Tabs & Right Icons (Hidden on mobile unless toggled open) */}
      <div
        className={`w-full md:w-auto md:flex md:flex-1 md:justify-between md:items-center md:ml-8 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "block mt-4" : "hidden"
        }`}
      >
        {/* Logo 2 */}
        <div className="md:flex hidden items-center gap-2">
          <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
          <span className="font-bold text-lg md:text-xl lg:text-2xl">
            BlueTrace
          </span>
        </div>

        {/* Tabs */}
        <ul className="flex flex-col md:flex-row items-start md:items-center gap-2 sm:gap-0 lg:gap-4 list-none m-0 p-0">
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={`flex items-center gap-2 w-full md:w-auto px-3 py-3 md:py-2 cursor-pointer transition-colors duration-200 rounded-md md:rounded-none md:border-t-2 ${
                activeTab === tab.name
                  ? "text-cyan-400 md:border-cyan-400 bg-gray-800 md:bg-transparent"
                  : "text-gray-300 border-transparent hover:text-gray-100 hover:bg-gray-800 md:hover:bg-transparent"
              }`}
              onClick={() => {
                setActiveTab(tab.name);
                navigate(tab.path);
                setIsMobileMenuOpen(false); // Auto-close menu on mobile after selection
              }}
            >
              {tab.icon}
              <span className="text-sm md:text-base">{tab.name}</span>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-5 md:gap-2 lg:gap-5 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-700 md:border-none px-3 md:px-0">
          {" "}
          <button className="px-0 bg-transparent border-none text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors">
            <FaCalendarAlt size={18} />
          </button>
          <button className="m-0 p-0 bg-transparent border-none text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors">
            <FaBell size={18} />
          </button>
          <button className="bg-transparent border-none text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors">
            <FaUserCircle size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
