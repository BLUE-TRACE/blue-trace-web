import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const StudentTimeTable = () => {
  const { user } = useSelector((state) => state.auth);

  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/timetable/${user?.id}`,
        );

        setTimetable(res.data.timetable);
      } catch (err) {
        console.error("Error fetching timetable:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchTimetable();
  }, [user]);

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

  const timetableData = timetable[selectedDay] || [];

  return (
    <div className="mx-16 text-white">
      {/* Title */}
      <h1 className="mb-6 text-2xl font-semibold">Student Timetable</h1>

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
        <h2 className="mb-4 text-lg font-semibold">{selectedDay} Schedule</h2>

        {/* Header */}
        <div className="grid grid-cols-4 pb-3 text-sm text-gray-400 border-b border-gray-700">
          <span>Course</span>
          <span>Time</span>
          <span>Hall</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        <div className="mt-4 space-y-3">
          {timetableData.map((item, index) => {
            const status = item.is_cancelled ? "Cancelled" : "Not Yet Started"; // can improve later

            return (
              <div key={index} className="grid grid-cols-4 ...">
                <span>{item.course_code}</span>
                <span>
                  {item.start_time} - {item.end_time}
                </span>
                <span>{item.hall}</span>

                <span className={`... ${getStatusStyle(status)}`}>
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentTimeTable;
