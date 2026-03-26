import React from 'react';
import { ExternalLink } from 'lucide-react';
import Dashboard from '../pages/Dashboard';


// Reusable component for the statistics rows
const StatCard = ({ title, value, valueColor = "text-white", iconColor = "text-white" }) => (
  <div className="flex justify-between items-center bg-[#171717] rounded-xl p-4 w-full">
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-400">{title}</span>
      <span className={`text-xl font-semibold ${valueColor}`}>{value}</span>
    </div>
    <button className={`p-2 hover:bg-white/5 rounded-lg transition-colors ${iconColor}`}>
      <ExternalLink size={20} />
    </button>
  </div>
);


const DashboardSummary = ( {
  Enrolled=64,
    Present=48,
    Absent=5,
    Pending=5,
   // presantage=50,


    EnrolledLable="Student Enroled",
    Presentlable="Present Students",
    AbsentLable="Absent Students",
    PendingLable="pending",
}) => {
   
return (
    // Outer container simulating the app background
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-black">
     
      {/* Main Card Wrapper */}
      <div className="relative w-full mt-16 max-w-95">
       
        {/* Overlapping Donut Chart */}
        <div className="absolute z-10 flex items-center justify-center -translate-x-1/2 -top-14 left-1/2">
          {/* Custom SVG Ring */}
          <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
            {/* Blue Segment (Pending - approx 25%) */}
            <circle cx="60" cy="60" r="48" fill="transparent" stroke="#0ea5e9" strokeWidth="12"
              strokeDasharray="75.4 301.6" strokeDashoffset="-226.2" />
            {/* Red Segment (Absent - approx 25%) */}
            <circle cx="60" cy="60" r="48" fill="transparent" stroke="#ef4444" strokeWidth="12"
              strokeDasharray="75.4 301.6" strokeDashoffset="-150.8" />
            {/* Cyan Segment (Present - 50%) */}
            <circle cx="60" cy="60" r="48" fill="transparent" stroke="#00E5FF" strokeWidth="12"
              strokeDasharray="150.8 301.6" strokeDashoffset="0" />
          </svg>
          {/* Center Text */}
          <div className="absolute flex items-center justify-center text-lg font-semibold text-white">
           50%
          </div>
        </div>


        {/* Gray Card Content */}
        <div className="bg-[#2C2C2C] rounded-2xl pt-20 pb-8 px-6 flex flex-col items-center gap-6 shadow-xl">
         
          {/* Stats List */}
          <div className="flex flex-col w-full gap-3">
            <StatCard
              title={EnrolledLable}
              value={Enrolled}
              valueColor="text-white"
              iconColor="text-white"
            />
            <StatCard
              title={Presentlable}
              value={Present}
              valueColor="text-[#00E5FF]"
              iconColor="text-[#00E5FF]"
            />
            <StatCard
              title={PendingLable}
              value={Pending}
              valueColor="text-[#0ea5e9]"
              iconColor="text-[#0ea5e9]"
            />
            <StatCard
              title={AbsentLable}
              value={Absent}
              valueColor="text-[#ef4444]"
              iconColor="text-[#ef4444]"
            />
          </div>


          {/* Action Button */}
          <button className="mt-4 w-full border border-[#00E5FF] text-[#00E5FF] bg-black hover:bg-[#00E5FF]/10 transition-colors py-3.5 rounded-lg font-medium tracking-wide">
            Generate Report
          </button>
         
        </div>
      </div>
    </div>
  );
};


export default DashboardSummary;



