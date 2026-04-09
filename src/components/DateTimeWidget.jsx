import React, { useEffect, useState } from "react";
import { Sun } from "lucide-react";

const DateTimeWidget = () => {
  const [timeData, setTimeData] = useState({
    time: "",
    day: "",
    date: "",
  });

  const updateTime = () => {
    const now = new Date();

    const options = { timeZone: "Asia/Colombo" };

    // Time
    const time = now.toLocaleTimeString("en-GB", {
      ...options,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // Day (Today / Tomorrow logic optional)
    const dayName = now.toLocaleDateString("en-US", {
      ...options,
      weekday: "long",
    });

    // Date
    const date = now.toLocaleDateString("en-US", {
      ...options,
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    setTimeData({
      time,
      day: dayName,
      date,
    });
  };

  useEffect(() => {
    updateTime(); // initial call

    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="flex flex-col justify-between p-8 bg-[#2C2C2C] text-white w-full md:min-w-100 lg:w-100 h-55 rounded-md shadow-md font-sans">

      {/* Icon */}
      <div>
        <Sun size={40} className="text-gray-300" strokeWidth={1.5} />
      </div>

      {/* Date & Time */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xl tracking-wide">
            Today
          </span>
          <span className="text-xl tracking-wide text-gray-200">
            {timeData.date}
          </span>
        </div>

        <div className="pb-1 text-2xl font-light tracking-widest">
          {timeData.time}
        </div>
      </div>
    </div>
  );
};

export default DateTimeWidget;