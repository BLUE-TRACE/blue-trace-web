import React, { useState } from "react";

const StudentTimeTable = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Status styles (same as lecturer)
  const getStatusStyle = (status) => {
    switch (status) {
      case "Finished":
        return "bg-cyan-500/10 text-cyan-400";
      case "Cancelled":
        return "bg-red-500/10 text-red-400";
      case "Ongoing":
        return "bg-green-500/10 text-green-400";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  // ✅ Student-specific data
  const timetableData = [
    {
      course: "SENG 1223",
      time: "08:30 - 10:30",
      hall: "A11 301",
      status: "Finished",
    },
    {
      course: "SENG 2241",
      time: "10:30 - 12:30",
      hall: "A11 302",
      status: "Ongoing",
    },
    {
      course: "SENG 3312",
      time: "13:00 - 15:00",
      hall: "A11 303",
      status: "Not Yet Started",
    },
    {
      course: "SENG 4455",
      time: "15:30 - 17:00",
      hall: "A11 304",
      status: "Cancelled",
    },
  ];

  return (
    <div className="mx-16 text-white">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6">Student Timetable</h1>

      {/* Day Selector */}
      <div className="flex justify-center gap-10 mb-6 text-sm md:text-base">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`transition-colors ${
              selectedDay === day
                ? "text-white font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {selectedDay} Schedule
        </h2>

        {/* Header */}
        <div className="grid grid-cols-4 text-gray-400 text-sm border-b border-gray-700 pb-3">
          <span>Course</span>
          <span>Time</span>
          <span>Hall</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        <div className="mt-4 space-y-3">
          {timetableData.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 items-center p-4 rounded-xl transition text-center ${
                item.status === "Ongoing"
                  ? "bg-white/5 border border-green-500/20"
                  : "hover:bg-white/5"
              }`}
            >
              <span className="font-medium">{item.course}</span>
              <span className="text-gray-300">{item.time}</span>
              <span className="text-gray-300">{item.hall}</span>

              <span
                className={`px-3 py-1 text-xs rounded-full w-fit mx-auto text-center ${getStatusStyle(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTimeTable;