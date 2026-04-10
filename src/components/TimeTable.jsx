import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

const TimeTable = ({ data, role }) => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Finished":
        return "text-cyan-400";
      case "Cancelled":
        return "text-red-400";
      case "Ongoing":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="px-10 py-6 text-white">
      <h1 className="mb-6 text-2xl font-semibold">
        {role} Timetable
      </h1>

      {/* Day Selector */}
      <div className="flex justify-center gap-10 mb-6">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`${
              selectedDay === day
                ? "text-white font-semibold"
                : "text-gray-400"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="grid items-center grid-cols-5 p-3 rounded-lg hover:bg-white/5"
          >
            <span>{item.course}</span>
            <span>{item.time}</span>
            <span>{item.hall}</span>
            <span className={getStatusStyle(item.status)}>
              {item.status}
            </span>

            {/* Only show for lecturer */}
            {role === "Lecturer" ? (
              <button className="text-gray-400 hover:text-white">
                <MoreVertical size={18} />
              </button>
            ) : (
              <span className="text-sm text-gray-500">-</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTable;