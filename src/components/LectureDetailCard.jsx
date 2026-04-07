import React from 'react';

const LectureDetailCard = ({

  title = "Next Lecture",
  showCountdown = true,  


  courseCodevalue = "SENG 12233",
  locationvalue = "Hall A11 301",
  startTimevalue = "08:00 am",
  endTimevalue = "10:00 am",
  countdownvalue = "00:30:00",
  minutesLeftvalue = 30,

  courseCode = "course code",
  location = "location",
  startTime = "Start Time",
  endTime = "End Time",
  countdown = "countdown",
  minutesLeft = "minutes left",
}) => {
  return (
    <div className="w-full mx-auto bg-[#050505] px-6 sm:px-8 rounded-xl font-sans py-0">
      {/* Header */}
      <h2 className="mb-6 text-lg font-bold text-white">{title}</h2>

      {/* Main Content Layout */}
      <div className="grid items-end grid-cols-1 gap-6 md:grid-cols-12 md:gap-4">
        
        {/* Column 1: Course Code & Start Time */}
        <div className="flex flex-col gap-8 md:col-span-4">
          <h3 className="text-xl tracking-wide text-white">{courseCode}</h3>
          <div>
            <p className="mb-2 text-sm text-gray-400">{startTime}</p>
            <div className="bg-[#141414] text-gray-200 px-4 py-3 rounded-lg w-full md:w-[90%] text-sm">
              {startTimevalue}
            </div>
          </div>
        </div>

        {/* Column 2: Hall & End Time */}
        <div className="flex flex-col gap-5 md:col-span-4">
          <h3 className="text-xl tracking-wide text-white">{locationvalue}</h3>
          <div>
            <p className="mb-2 text-sm text-gray-400">{endTime}</p>
            <div className="bg-[#141414] text-gray-200 px-4 py-3 rounded-lg w-full md:w-[90%] text-sm">
              {endTimevalue}
            </div>
          </div>
        </div>

        {/* Column 3: Timer & Action Button */}
        {showCountdown && (
        <div className="flex flex-col items-center justify-end md:col-span-4 md:items-stretch">
          <div className="mb-1 text-2xl font-medium text-center text-white">
            {countdownvalue}
          </div>
          <p className="px-2 mb-4 text-xs text-center text-gray-300">
            Your lecture will be ready to start in {minutesLeftvalue} minutes.
          </p>
          <div className="w-full cursor-pointer bg-[#008B8B] hover:bg-[#007777] transition-colors text-white font-medium py-3 px-4 rounded-lg">
            Start Now
          </div>
        </div>
  ) }
      </div>
    </div>
  );
};

export default LectureDetailCard;