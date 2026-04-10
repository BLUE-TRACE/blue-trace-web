import React, { useEffect } from "react";
import { Home } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import AttendCard from "../../components/AttendCard";
import Table from "../../components/Table";
import AttendanceSummary from "../../components/AttendanceSummary";
import profile_pic from "../../assets/images/stu-profile-pic.jpg";
import "../../App.css";

const AttendanceMark = () => {
  const [tracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // sessionId from Dashboard page
  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    let interval;

    if (tracking && sessionId) {
      interval = setInterval(async () => {
        try {
          const res = await axios.post("/api/scan", {
            sessionId,
            macAddresses: mockMacs,
          });

          console.log("Scan update:", res.data);
        } catch (err) {
          console.error(err);
        }
      }, 5000); // every 5 seconds
    }

    return () => clearInterval(interval);
  }, [tracking, sessionId]);

  const handleStartTracking = async () => {
    if (!sessionId) {
      setError("No active session. Start a session first.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // TEMP: simulate scan data (until Python integration)
      const mockMacs = ["3c:38:24:2f:a0:49", "AA:BB:CC:DD:EE:02"];

      const res = await axios.post("http://localhost:5000/api/scan", {
        sessionId: 11,
        macAddresses: mockMacs,
      });

      setMessage(res.data.message);
      setTracking(true);
    } catch (err) {
      setError(err.response?.data?.error || "Scan failed");
    } finally {
      setLoading(false);
    }
  };

  const handleStopTracking = () => {
    setTracking(false);
    setMessage("Tracking stopped.");
  };

  const handleGenerateReport = (courseName) => {
    console.log(`Generating report for ${courseName}...`);
  };

  const handleRowAction = (type) => {
    console.log(`Navigating to detailed view for: ${type}`);
  };

  const date = "Thu, 6 Feb";
  const courseCode = "SENG 12233";
  const lectureNo = "Lecture 01";
  const location = "Hall A11 301";
  const startTime = "08:00 am";
  const endTime = "10:00 am";
  const countdown = "00:30:00";

  // 1. Define the columns tailored to this specific layout
  const tableColumns = [
    {
      key: "student",
      label: "Student Name",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {/* Avatar Placeholder */}
          <div className="w-10 h-10 overflow-hidden bg-gray-600 rounded-full shrink-0">
            <img
              src={profile_pic}
              alt={row.name}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Name & ID */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">{row.name}</span>
            <span className="text-xs text-gray-400">{row.id}</span>
          </div>
        </div>
      ),
    },
    {
      key: "checkInStatus",
      label: "Check In",
      render: (_, row) => {
        // Determine color based on status string in data
        let colorClass = "bg-[#00E5FF]"; // Cyan default
        if (row.status === "red") colorClass = "bg-red-500";
        if (row.status === "blue") colorClass = "bg-blue-500";
        if (row.status === "green") colorClass = "bg-green-500";

        return (
          <div className="flex items-center w-full h-full">
            <div className={`h-2 w-24 rounded-full ${colorClass}`}></div>
          </div>
        );
      },
    },
    {
      key: "checkOut",
      label: "Check out",
      render: (value) =>
        value ? (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Home size={14} />
            <span>{value}</span>
          </div>
        ) : (
          <span className="text-transparent">-</span> // Empty state if no checkout time
        ),
    },
  ];

  // 2. Define the dummy data based on the image
  const studentData = [
    {
      name: "Rusiru Jayakody",
      id: "SE/2020/010",
      status: "cyan",
      checkOut: "12:30",
    },
    {
      name: "Rusiru Jayakody",
      id: "SE/2020/010",
      status: "cyan",
      checkOut: "12:30",
    },
    {
      name: "Rusiru Jayakody",
      id: "SE/2020/010",
      status: "blue",
      checkOut: null,
    }, // No checkout
    {
      name: "Rusiru Jayakody",
      id: "SE/2020/010",
      status: "red",
      checkOut: null,
    }, // Red status, no checkout
    {
      name: "Rusiru Jayakody",
      id: "SE/2020/010",
      status: "cyan",
      checkOut: "12:30",
    },
    {
      name: "Rusiru Jayakody",
      id: "SE/2020/010",
      status: "cyan",
      checkOut: "12:30",
    },
    {
      name: "Rusiru Jayakody",
      id: "SE/2020/010",
      status: "cyan",
      checkOut: "12:30",
    },
    {
      name: "Rusiru Jayakody",
      id: "SE/2020/010",
      status: "green",
      checkOut: "12:30",
    },
  ];

  return (
    <div className="mx-16">
      <div className="w-full px-0 py-0 mx-auto font-sans bg-transparent rounded-xl">
        <h3 className="mb-4 text-xl tracking-wide text-white text-start">
          {date}
        </h3>

        {/* Main Content Layout */}
        <div className="grid items-end grid-cols-1 gap-6 bg-shite md:grid-cols-12 md:gap-4">
          {/* Column 1: Course Code & Start Time */}
          <div className="flex flex-col gap-5 md:col-span-4">
            <p className="text-white text-md">
              {courseCode} - {lectureNo}
            </p>
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
            <button
              onClick={handleStartTracking}
              disabled={loading || tracking}
              className=" w-full cursor-pointer bg-[#008B8B] hover:bg-cyan-400 transition-colors text-white font-medium py-3 px-4 rounded-lg"
            >
              {loading ? "Starting..." : "Start Tracking"}
            </button>

            <button
              onClick={handleStopTracking}
              disabled={!tracking}
              className="w-full mt-4 cursor-pointer bg-transparent border border-[#FF1010] text-[#FF1010] hover:bg-[#FF1010] hover:text-white transition-colors font-medium py-3 px-4 rounded-lg"
            >
              Stop Tracking
            </button>

            {message && <p className="text-green-400">{message}</p>}
            {error && <p className="text-red-400">{error}</p>}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen py-4 font-sans sm:py-8">
        <div className="flex flex-col justify-between w-full gap-10 lg:flex-row">
          <div className="w-full sm:mt-6 lg:max-w-2/3">
            {" "}
            {/* Max width matches the image dimensions roughly */}
            <Table
              columns={tableColumns}
              data={studentData}
              // Notice I didn't pass a 'title' prop because the image doesn't show one above the table
            />
          </div>
          <div className="flex flex-wrap items-start justify-center w-full min-h-screen gap-10 p-2 bg-black lg:max-w-1/3">
            <AttendanceSummary
              total={64}
              present={48}
              pending={5}
              absent={11}
              onGenerateReport={() =>
                handleGenerateReport("Software Engineering")
              }
              onRowClick={handleRowAction}
            />
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default AttendanceMark;
