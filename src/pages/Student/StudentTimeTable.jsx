import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Loader2 } from "lucide-react";

const StudentTimeTable = () => {
  const { user } = useSelector((state) => state.auth);

  // Day mapping to determine if a selected day is in the past, present, or future
  const dayMap = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6};
  const currentDayStr = new Date().toLocaleDateString("en-US", { weekday: "long" });
  
  const defaultDay = dayMap[currentDayStr] ? currentDayStr : "Monday";

  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Fetch Timetable Data
  useEffect(() => {
    const fetchTimetable = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/timetable/${user.id}`);
        setTimetable(res.data.timetable || {});
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timetable:", err);
        setError("Failed to load timetable data.");
        setLoading(false);
      }
    };

    fetchTimetable();

    // Auto-refresh every minute to keep "Ongoing" statuses completely accurate
    const interval = setInterval(fetchTimetable, 60000);
    return () => clearInterval(interval);
  }, [user?.id]);

  // Helper: Format Time (e.g., "08:00:00" -> "08:00")
  const formatTime = (start, end) => {
    const formatStr = (timeStr) => (timeStr ? timeStr.slice(0, 5) : "--:--");
    return `${formatStr(start)} - ${formatStr(end)}`;
  };

  // Helper: Calculate smart status based on day AND time
  const getLectureStatus = (lecture, checkDay) => {
    if (lecture.is_cancelled === 1) return "Cancelled";

    const todayIndex = dayMap[currentDayStr] || 7;
    const checkDayIndex = dayMap[checkDay];

    // If the selected day has already passed
    if (checkDayIndex < todayIndex) return "Finished";
    
    // If the selected day is in the future
    if (checkDayIndex > todayIndex) return "Not Yet Started";

    // If the selected day is TODAY, check the exact time
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    const [startH, startM] = lecture.start_time.split(":").map(Number);
    const [endH, endM] = lecture.end_time.split(":").map(Number);

    const startMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;

    if (currentMins < startMins) return "Not Yet Started";
    if (currentMins >= startMins && currentMins <= endMins) return "Ongoing";
    return "Finished";
  };

  // Status styles mapping
  const getStatusStyle = (status) => {
    switch (status) {
      case "Finished":
        return "bg-cyan-500/10 text-cyan-400";
      case "Cancelled":
        return "bg-red-500/10 text-red-400";
      case "Ongoing":
        return "bg-green-500/10 text-green-400";
      case "Not Yet Started":
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  // Get and sort the lectures for the currently selected day
  const currentDayData = (timetable[selectedDay] || []).sort((a, b) => 
    a.start_time.localeCompare(b.start_time)
  );

  return (
    <div className="px-10 py-6 mx-16 text-white">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-semibold">Student Timetable</h1>

      {/* Day Selector */}
      <div className="flex justify-center gap-10 mb-6 text-sm md:text-base">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`transition-colors ${
              selectedDay === day
                ? "text-white font-semibold border-b-2 border-white pb-1"
                : "text-gray-400 hover:text-white pb-1 border-b-2 border-transparent"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Timetable Card */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 shadow-lg min-h-100">
        <h2 className="mb-4 text-lg font-semibold">
          {selectedDay} Schedule
        </h2>

        {/* Header Row */}
        <div className="grid grid-cols-4 pb-3 text-sm text-gray-400 border-b border-gray-700">
          <span>Course</span>
          <span>Time</span>
          <span>Hall</span>
          <span>Status</span>
        </div>

        {/* Data Rows */}
        <div className="mt-4 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Loader2 className="w-8 h-8 mb-4 animate-spin text-cyan-400" />
              <p>Loading timetable...</p>
            </div>
          ) : error ? (
            <div className="py-8 text-center text-red-400 bg-red-500/10 rounded-xl">
              {error}
            </div>
          ) : currentDayData.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No classes scheduled for {selectedDay}.
            </div>
          ) : (
            currentDayData.map((item, index) => {
              const currentStatus = getLectureStatus(item, selectedDay);
              
              return (
                <div
                  key={index}
                  className={`grid grid-cols-4 items-center p-4 rounded-xl transition ${
                    currentStatus === "Ongoing"
                      ? "bg-white/5 border border-green-500/20"
                      : "hover:bg-white/5"
                  }`}
                >
                  {/* Course */}
                  <span className="font-medium">
                    {item.course_code}
                    <span className="block text-xs font-normal text-gray-500">{item.course_name}</span>
                  </span>

                  {/* Time */}
                  <span className="text-gray-300">
                    {formatTime(item.start_time, item.end_time)}
                  </span>

                  {/* Hall */}
                  <span className="text-gray-300">{item.hall}</span>

                  {/* Status */}
                  <span
                    className={`px-3 py-1 text-xs rounded-full w-fit ${getStatusStyle(currentStatus)}`}
                  >
                    {currentStatus}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentTimeTable;