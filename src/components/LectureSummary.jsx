import React from "react";
import { ExternalLink } from "lucide-react";

// Reusable sub-component for the stats rows
const StatRow = ({ label, value, valueColor = "text-white" }) => (
  <div className="flex justify-between items-center bg-[#171717] rounded-xl p-4 w-full">
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-400">{label}</span>
      <span className={`text-xl font-semibold ${valueColor}`}>{value}</span>
    </div>
    <button className="p-2 text-white transition-colors rounded-lg hover:bg-white/5 focus:outline-none">
      <ExternalLink size={18} />
    </button>
  </div>
);

const LectureSummary = ({
  courseCode = "SENG 21232",
  total = 0,
  attended = 0,
  missed = 0,
  onViewReport = () => {},
}) => {
  // Calculate percentage safely
  const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;

  // SVG Chart Math
  const radius = 45;
  const circumference = 2 * Math.PI * radius; // ~282.7
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full max-w-100 bg-[#2C2C2C] rounded-2xl p-6 flex flex-col items-center shadow-xl font-sans">
      {/* Header */}
      <div className="w-full mb-6 text-left">
        <h2 className="text-xl font-bold tracking-wide text-white">
          {courseCode}
        </h2>
      </div>

      {/* Dynamic Donut Chart */}
      <div className="relative flex items-center justify-center mt-2 mb-8">
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className="-rotate-90"
        >
          {/* Background Track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#333333"
            strokeWidth="12"
          />
          {/* Progress Indicator (Cyan) */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#00E5FF"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center Text */}
        <div className="absolute flex items-center justify-center text-3xl font-bold text-white">
          {percentage}%
        </div>
      </div>

      {/* Stats List */}
      <div className="flex flex-col w-full gap-3">
        <StatRow label="Total Lectures Held" value={total} />
        <StatRow
          label="Lectures Attended"
          value={attended}
          valueColor="text-[#00E5FF]"
        />
        <StatRow
          label="Lectures Missed"
          value={missed}
          valueColor="text-[#ef4444]"
        />
      </div>

      {/* Action Button */}
      <button
        onClick={onViewReport}
        className="mt-6 w-full border border-[#00E5FF] text-[#00E5FF] bg-black hover:bg-[#00E5FF]/10 transition-colors py-3.5 rounded-lg font-medium tracking-wide focus:outline-none"
      >
        View Report
      </button>
    </div>
  );
};

export default LectureSummary;
