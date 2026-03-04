import React, { useState } from "react";
import { FaCalendarAlt, FaBell, FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdSchedule, MdAssignmentTurnedIn, MdReport } from "react-icons/md";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = [
    { name: "Dashboard", icon: <MdDashboard size={20} /> },
    { name: "Timetable", icon: <MdSchedule size={20} /> },
    { name: "Attendance", icon: <MdAssignmentTurnedIn size={20} /> },
    { name: "Report", icon: <MdReport size={20} /> },
  ];

  return (
    <nav className="bg-gray-900 text-gray-100 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
        <span className="font-bold text-lg">BlueTrace</span>
      </div>

      {/* Tabs */}
      <ul className="flex items-center gap-4 list-none m-0 p-0">
        {tabs.map((tab) => (
          <li
            key={tab.name}
            className={`flex items-center gap-1.5 px-2 py-2 cursor-pointer border-t-2 ${
              activeTab === tab.name
                ? "text-cyan-400 border-cyan-400"
                : "text-gray-100 border-transparent"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            <span className="text-sm">{tab.name}</span>
          </li>
        ))}
      </ul>

      {/* Right icons */}
      <div className="flex items-center gap-3.5">
        <button className="bg-transparent border-none text-gray-100 cursor-pointer">
          <FaCalendarAlt size={18} />
        </button>
        <button className="bg-transparent border-none text-gray-100 cursor-pointer">
          <FaBell size={18} />
        </button>
        <button className="bg-transparent border-none text-gray-100 cursor-pointer">
          <FaUserCircle size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;