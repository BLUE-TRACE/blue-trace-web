import React from 'react';
import { Sun } from 'lucide-react';

const DateTimeWidget = ({ 
  time = "08 : 15 : 13", 
  day = "Today", 
  date = "Thu, 6 Feb" 
}) => {
  return (
    <div className="flex flex-col justify-between p-8 bg-[#2C2C2C] text-white w-96 h-55 rounded-md shadow-md font-sans border border-transparent">
      
      {/* Top Section: Icon */}
      <div>
        <Sun size={40} className="text-gray-300" strokeWidth={1.5} />
      </div>

      {/* Bottom Section: Date & Time */}
      <div className="flex justify-between items-end">
        
        {/* Left Side: Day & Date */}
        <div className="flex flex-col gap-2">
          <span className="text-xl tracking-wide">{day}</span>
          <span className="text-xl tracking-wide text-gray-200">{date}</span>
        </div>

        {/* Right Side: Time */}
        <div className="text-2xl tracking-widest font-light pb-1">
          {time}
        </div>
        
      </div>
      
    </div>
  );
};

export default DateTimeWidget;