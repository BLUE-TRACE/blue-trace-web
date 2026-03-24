import React from 'react';

const LectureDetailCard = ({
  courseCode = "SENG 12233",
  location = "Hall A11 301",
  startTime = "08:00 am",
  endTime = "10:00 am",
  countdown = "00:30:00",
  minutesLeft = 30
}) => {
  return (
    <div className="w-full max-w-222 mx-auto bg-[#050505] p-6 sm:p-8 rounded-xl font-sans">
      {/* Header */}
      <h2 className="mb-6 text-lg font-bold text-white">Next Lecture</h2>

      {/* Main Content Layout */}
      <div className="grid items-end grid-cols-1 gap-6 md:grid-cols-12 md:gap-4">
        
        {/* Column 1: Course Code & Start Time */}
        <div className="flex flex-col gap-5 md:col-span-4">
          <h3 className="text-xl tracking-wide text-white">{courseCode}</h3>
          <div>
            <p className="mb-2 text-sm text-gray-400">Start Time</p>
            <div className="bg-[#141414] text-gray-200 px-4 py-3 rounded-lg w-full md:w-[90%] text-sm">
              {startTime}
            </div>
          </div>
        </div>

        {/* Column 2: Hall & End Time */}
        <div className="flex flex-col gap-5 md:col-span-4">
          <h3 className="text-xl tracking-wide text-white">{location}</h3>
          <div>
            <p className="mb-2 text-sm text-gray-400">End Time</p>
            <div className="bg-[#141414] text-gray-200 px-4 py-3 rounded-lg w-full md:w-[90%] text-sm">
              {endTime}
            </div>
          </div>
        </div>

        {/* Column 3: Timer & Action Button */}
        <div className="flex flex-col items-center justify-end md:col-span-4 md:items-stretch">
          <div className="mb-1 text-2xl font-medium text-center text-white">
            {countdown}
          </div>
          <p className="px-2 mb-4 text-xs text-center text-gray-300">
            Your lecture will be ready to start in {minutesLeft} minutes.
          </p>
          <button className="w-full bg-[#008B8B] hover:bg-[#007777] transition-colors text-white font-medium py-3 px-4 rounded-lg">
            Start Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default LectureDetailCard;