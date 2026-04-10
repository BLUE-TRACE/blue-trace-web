import React, { useState } from "react"; // <-- ADD useState here
import { 
  Users, UserCheck, GraduationCap, 
  BookOpen, School, Settings, 
  Activity, Bell, Database, ShieldCheck 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import CreateCourseModal from "../../components/CreateCoursemodal";
// Mock Data for the Activity Chart
const data = [
  { name: "Jan", activity: 100 },
  { name: "Feb", activity: 220 },
  { name: "Mar", activity: 180 },
  { name: "Apr", activity: 350 },
  { name: "May", activity: 280 },
  { name: "Jun", activity: 410 },
];

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen p-8 font-sans text-white bg-black">
      {/* 1. System Overview Header */}
      <div className="bg-[#2A2A2A] rounded-xl p-6 mb-8 flex justify-between items-center border border-gray-800">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-teal-900/30">
            <Activity className="text-teal-400" size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wider">SYSTEM OVERVIEW</h1>
            <p className="flex items-center gap-2 font-bold text-green-500">
              <ShieldCheck size={18} /> STATUS: ACTIVE
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="p-2 text-green-500 rounded-full bg-green-500/20"><ShieldCheck size={24}/></div>
          <div className="p-2 text-teal-500 rounded-full bg-teal-500/20"><Activity size={24}/></div>
          <div className="p-2 text-gray-300 bg-gray-700 rounded-full"><Settings size={24}/></div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Section: Stats & Chart */}
        <div className="space-y-8 lg:col-span-2">
          
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard icon={<Users />} title="Total Students" value="12,456" color="text-cyan-400" />
            <StatCard icon={<UserCheck />} title="Total Lecturers" value="458" color="text-yellow-400" />
            <StatCard icon={<School />} title="Total Faculties" value="12" />
            <StatCard icon={<GraduationCap />} title="Total Departments" value="48" />
            <StatCard icon={<BookOpen />} title="Total Course Modules" value="780" />
            <StatCard icon={<School />} title="Classrooms/Halls" value="120" />
          </div>

          {/* Activity Chart Section */}
          <div className="bg-[#2A2A2A] rounded-xl p-6 border border-gray-800">
            <h3 className="mb-6 text-lg font-semibold">Recent Admin Activity Trends</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1A1A1A", border: "none", borderRadius: "8px" }}
                    itemStyle={{ color: "#00E5FF" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="activity" 
                    stroke="#00E5FF" 
                    fillOpacity={1} 
                    fill="url(#colorActivity)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Section: Notifications & Actions */}
        <div className="space-y-8">
          {/* Critical Notifications */}
          <div className="bg-[#2A2A2A] rounded-xl p-6 border border-gray-800 min-h-100">
            <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold">
              <Bell size={20} className="text-yellow-500" /> Critical Notifications
            </h3>
            <div className="space-y-4">
              <NotificationItem type="error" msg="Critical Server Load" sub="Database latency high" />
              <NotificationItem type="warning" msg="System Maintenance" sub="Scheduled at 2:00 PM" />
              <NotificationItem type="error" msg="Failed Login Attempts" sub="IP: 192.168.1.105" />
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="px-2 text-lg font-semibold">Quick links</h3>
            <div className="grid grid-cols-2 gap-4">
              <QuickLinkBtn label="Add User" />
              <QuickLinkBtn label="Create Course" onClick={() => setIsModalOpen(true)} />
              <QuickLinkBtn label="Create Course" />
              <QuickLinkBtn label="Generate Reports" />
              <QuickLinkBtn label="System Status" />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <CreateCourseModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

// --- Sub-Components ---

const StatCard = ({ icon, title, value, color = "text-white" }) => (
  <div className="bg-[#2A2A2A] p-6 rounded-xl border border-gray-800 hover:bg-[#323232] transition-colors">
    <div className="flex items-center gap-2 mb-2 text-gray-400">
      {React.cloneElement(icon, { size: 18 })}
      <span className="text-sm font-medium">{title}</span>
    </div>
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
  </div>
);

const NotificationItem = ({ type, msg, sub }) => (
  <div className={`p-4 rounded-lg border-l-4 ${
    type === "error" ? "bg-red-900/20 border-red-500" : "bg-yellow-900/20 border-yellow-500"
  }`}>
    <p className={`font-bold text-sm ${type === "error" ? "text-red-400" : "text-yellow-400"}`}>{msg}</p>
    <p className="text-xs text-gray-500">{sub}</p>
  </div>
);

const QuickLinkBtn = ({ label, icon, onClick }) => (
  <button onClick={onClick} className="bg-[#008B8B] hover:bg-[#007777] text-white py-3 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
    {icon} {label}
  </button>
);

export default AdminDashboard;