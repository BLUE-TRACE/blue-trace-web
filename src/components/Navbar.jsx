import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
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
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleTabs = {
    lecturer: [
      { name: "Dashboard", icon: <MdDashboard size={20} />, path: "/lecturer" },
      {
        name: "Timetable",
        icon: <MdSchedule size={20} />,
        path: "/lecturer/timetable",
      },
      {
        name: "Attendance",
        icon: <MdAssignmentTurnedIn size={20} />,
        path: "/lecturer/attendance-mark",
      },
      {
        name: "Report",
        icon: <MdReport size={20} />,
        path: "/lecturer/report",
      },
    ],
    student: [
      { name: "Dashboard", icon: <MdDashboard size={20} />, path: "/student" },
      {
        name: "Timetable",
        icon: <MdSchedule size={20} />,
        path: "/student/timetable",
      },
      {
        name: "Attendance",
        icon: <MdAssignmentTurnedIn size={20} />,
        path: "/student/attendance",
      },
      { name: "Report", icon: <MdReport size={20} />, path: "/student/report" },
    ],
    admin: [
      {
        name: "Dashboard",
        icon: <MdDashboard size={20} />,
        path: "/admin/dashboard",
      },
    ],
  };

  const tabs = roleTabs[role] || [student];

  const handleLogout = () => {
    localStorage.clear(); // remove token + user
    navigate("/signin");
  };

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
          {/* <button className="bg-transparent border-none text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors">
            <FaUserCircle size={20} />
          </button> */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="bg-transparent border-none text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors"
            >
              <FaUserCircle size={20} />
            </button>

            {/* Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-3 w-40 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-50">
                {/* User Info (optional) */}
                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                  {user?.username || "User"}
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>

                {user?.role === "student" && (
                <button
                  onClick={() => {
                    navigate("/student/profile");
                    setActiveTab(""); 
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  My Profile
                </button>
                 ) }
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
