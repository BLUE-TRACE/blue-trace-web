import React from 'react';
import { ExternalLink } from 'lucide-react';

// Reusable sub-component for the individual rows
const StatRow = ({ title, value, valueColor = "text-white", onIconClick }) => (
  <div className="flex justify-between items-center bg-[#1A1A1A] rounded-xl p-4 w-full">
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-400">{title}</span>
      <span className={`text-xl font-semibold ${valueColor}`}>{value}</span>
    </div>
    <button 
      onClick={onIconClick}
      className="p-2 text-white transition-colors rounded-lg hover:bg-white/5 focus:outline-none"
    >
      <ExternalLink size={18} />
    </button>
  </div>
);

const AttendanceSummary = ({
  total = 0,
  present = 0,
  pending = 0,
  absent = 0,
  onGenerateReport,
  onRowClick = () => {} // Optional handler if you want the arrows to do something
}) => {
  // SVG Math for dynamic donut chart
  const radius = 48;
  const circumference = 2 * Math.PI * radius; // ~301.6

  // Prevent division by zero if no data is passed
  const safeTotal = total > 0 ? total : 1; 

  // Calculate segment lengths
  const presentLength = (present / safeTotal) * circumference;
  const pendingLength = (pending / safeTotal) * circumference;
  const absentLength = (absent / safeTotal) * circumference;

  // Calculate offsets to make them chain together correctly
  const pendingOffset = -presentLength;
  const absentOffset = -(presentLength + pendingLength);

  // Center text percentage (defaults to present percentage)
  const presentPercentage = Math.round((present / safeTotal) * 100);

  return (
    <div className="relative w-full mt-16 font-sans max-w-95">
      
      {/* Overlapping Dynamic Donut Chart */}
      <div className="absolute z-10 flex items-center justify-center -translate-x-1/2 -top-14 left-1/2">
        <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
          {/* Background Track (optional, looks better if numbers don't add to 100%) */}
          <circle cx="60" cy="60" r={radius} fill="transparent" stroke="#333" strokeWidth="12" />
          
          {/* Cyan Segment (Present) */}
          <circle 
            cx="60" cy="60" r={radius} fill="transparent" stroke="#00E5FF" strokeWidth="12" 
            strokeDasharray={`${presentLength} ${circumference}`} 
            strokeDashoffset="0"
            className="transition-all duration-1000 ease-out"
          />
          {/* Blue Segment (Pending) */}
          <circle 
            cx="60" cy="60" r={radius} fill="transparent" stroke="#0ea5e9" strokeWidth="12" 
            strokeDasharray={`${pendingLength} ${circumference}`} 
            strokeDashoffset={pendingOffset}
            className="transition-all duration-1000 ease-out"
          />
          {/* Red Segment (Absent) */}
          <circle 
            cx="60" cy="60" r={radius} fill="transparent" stroke="#ef4444" strokeWidth="12" 
            strokeDasharray={`${absentLength} ${circumference}`} 
            strokeDashoffset={absentOffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center Text */}
        <div className="absolute flex items-center justify-center text-lg font-semibold text-white">
          {total > 0 ? `${presentPercentage}%` : '0%'}
        </div>
      </div>

      {/* Gray Card Content */}
      <div className="bg-[#2C2C2C] rounded-2xl pt-20 pb-8 px-6 flex flex-col items-center gap-6 shadow-2xl">
        
        {/* Stats List */}
        <div className="flex flex-col w-full gap-3">
          <StatRow 
            title="Total Students Enrolled" 
            value={total} 
            onIconClick={() => onRowClick('total')}
          />
          <StatRow 
            title="Students Present" 
            value={present} 
            valueColor="text-[#00E5FF]" 
            onIconClick={() => onRowClick('present')}
          />
          <StatRow 
            title="Students Pending" 
            value={pending} 
            valueColor="text-[#0ea5e9]" 
            onIconClick={() => onRowClick('pending')}
          />
          <StatRow 
            title="Students Absent" 
            value={absent} 
            valueColor="text-[#ef4444]" 
            onIconClick={() => onRowClick('absent')}
          />
        </div>

        {/* Action Button */}
        <div 
          onClick={onGenerateReport}
          className="mt-4 w-full border border-[#00E5FF] text-[#00E5FF] bg-black hover:bg-[#00E5FF]/10 transition-colors py-3.5 rounded-lg font-medium tracking-wide focus:outline-none"
        >
          Generate Report
        </div>
        
      </div>
    </div>
  );
};

export default AttendanceSummary;