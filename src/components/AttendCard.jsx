import React from 'react';

const AttendCard = ({
  date = "Thu, 6 Feb",
  courseCode = "SENG 12233",
  lectureNo = "Lecture 01",
  location = "Hall A11 301",
  startTime = "08:00 am",
  endTime = "10:00 am",
  countdown = "00:30:00",
}) => {
  return (
    <div className="w-full px-0 py-0 mx-auto font-sans bg-transparent rounded-xl">
          <h3 className="mb-4 text-xl tracking-wide text-white text-start">{date}</h3>

      {/* Main Content Layout */}
      <div className="grid items-end grid-cols-1 gap-6 bg-shite md:grid-cols-12 md:gap-4">
        
        {/* Column 1: Course Code & Start Time */}
        <div className="flex flex-col gap-5 md:col-span-4">
          <p className="text-white text-md">{courseCode} - {lectureNo}</p>
          <div>
            <p className="mb-2 text-sm text-gray-400">Start Time</p>
            <div className="bg-[#141414] text-gray-200 px-4 py-3 rounded-lg w-full md:w-[90%] text-sm">
              {startTime}
            </div>
          </div>
        </div>

        {/* Column 2: Hall & End Time */}
        <div className="flex flex-col gap-5 md:col-span-4">
          <h3 className="text-xl tracking-wide text-white ">{location}</h3>
          <div>
            <p className="mb-2 text-sm text-gray-400">End Time</p>
            <div className="bg-[#141414] text-gray-200 px-4 py-3 rounded-lg w-full md:w-[90%] text-sm">
              {endTime}
            </div>
          </div>
        </div>

        {/* Column 3: Timer & Action Button */}
        <div className="flex flex-col items-center justify-end md:col-span-4 md:items-stretch">
          
          <div className="w-full cursor-pointer bg-[#008B8B] hover:bg-cyan-400 transition-colors text-white font-medium py-3 px-4 rounded-lg">
            Start Tracking
          </div>
          <div className="w-full mt-4 cursor-pointer bg-transparent border border-[#FF1010] text-[#FF1010] hover:bg-[#FF1010] hover:text-white transition-colors font-medium py-3 px-4 rounded-lg">
            Stop Tracking
          </div>
        </div>

      </div>
    </div>
  );
};

export default AttendCard;