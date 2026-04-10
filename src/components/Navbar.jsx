import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const location = useLocation();

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
        path: "/admin",
      },
    ],
  };

  const tabs = roleTabs[role] || [];

  const isTabActive = (tabPath) => {
    if (location.pathname === tabPath) return true;

    // Match nested routes like /lecturer/attendance-mark/:id while keeping dashboard exact.
    return tabPath !== `/${role}` && location.pathname.startsWith(`${tabPath}/`);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/signin", { replace: true });
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 py-4 relative z-50 text-gray-100 bg-gray-900 md:px-2 lg:px-6">
      {/* Logo 1 */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
        <span className="text-2xl font-bold">BlueTrace</span>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-100 transition-colors hover:text-cyan-400 focus:outline-none"
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
        <div className="items-center hidden gap-2 md:flex">
          <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
          <span className="text-lg font-bold md:text-xl lg:text-2xl">
            BlueTrace
          </span>
        </div>

        {/* Tabs */}
        <ul className="flex flex-col items-start p-0 m-0 list-none md:flex-row md:items-center gap-2 sm:gap-0 lg:gap-4">
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={`flex items-center gap-2 w-full md:w-auto px-3 py-3 md:py-2 cursor-pointer transition-colors duration-200 rounded-md md:rounded-none md:border-t-2 ${
                isTabActive(tab.path)
                  ? "text-cyan-400 md:border-cyan-400 bg-gray-800 md:bg-transparent"
                  : "text-gray-300 border-transparent hover:text-gray-100 hover:bg-gray-800 md:hover:bg-transparent"
              }`}
              onClick={() => {
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
        <div className="flex items-center px-3 pt-4 mt-4 border-t border-gray-700 gap-5 md:gap-2 lg:gap-5 md:mt-0 md:pt-0 md:border-none md:px-0">
          {" "}
          <button className="p-0 text-gray-300 transition-colors bg-transparent border-none cursor-pointer px-0 hover:text-cyan-400">
            <FaCalendarAlt size={18} />
          </button>
          <button className="p-0 m-0 text-gray-300 transition-colors bg-transparent border-none cursor-pointer hover:text-cyan-400">
            <FaBell size={18} />
          </button>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="text-gray-300 transition-colors bg-transparent border-none cursor-pointer hover:text-cyan-400"
            >
              <FaUserCircle size={20} />
            </button>

            {/* Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 z-50 w-40 mt-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                {/* User Info (optional) */}
                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                  {user?.username || "User"}
                </div>

                {/* DYNAMIC PROFILE BUTTON: Shows for both student and lecturer */}
                {(user?.role === "student" || user?.role === "lecturer") && (
                  <button
                    onClick={() => {
                      navigate(`/${user.role}/profile`);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-gray-300 transition-colors hover:bg-gray-700"
                  >
                    My Profile
                  </button>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-left text-red-400 transition-colors hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;