import React, { useEffect, useState } from "react";
import { Home } from "lucide-react";
import axios from "axios";
import Table from "../../components/Table";
import AttendanceSummary from "../../components/AttendanceSummary";
import profile_pic from "../../assets/images/stu-profile-pic.jpg"; // Adjust path if needed
import "../../App.css";

const AttendanceMark = () => {
  // --- States ---
  const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId") || null);
  const [tracking, setTracking] = useState(false); // Is it currently polling?
  const [hasStartedTracking, setHasStartedTracking] = useState(false); // Has tracking ever been initiated?
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const [studentData, setStudentData] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    pending: 0,
    absent: 0,
  });

  // Dummy course details (You can replace these by fetching them from your DB/State)
  const date = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const courseCode = "SE101"; 
  const lectureNo = "Lecture 01";
  const location = "Hall A11 301";
  const startTime = "08:00 am";
  const endTime = "10:00 am";

  // --- Live Polling Effect ---
  useEffect(() => {
    // Only poll if tracking is ACTIVE and we have a sessionId
    if (!tracking || !sessionId) return;

    const fetchLiveAttendance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/live-attendance/${sessionId}`
        );

        const students = res.data.students;

        // Transform backend data to match the Table columns
        const formatted = students.map((s) => ({
          name: s.username,
          id: s.student_id,
          status: s.status || "green", // Map status color (green = present)
          checkOut: null, 
        }));

        setStudentData(formatted);

        // Update summary based on fetched data
        setSummary((prev) => ({
          ...prev,
          present: students.length,
          // Note: To calculate accurate absent/pending, you would need the 'total' 
          // enrolled students for this course from the backend. 
          // For now, we update 'present' dynamically.
        }));
      } catch (err) {
        console.error("Live fetch error:", err);
      }
    };

    // Fetch immediately on track start, then every 5 seconds
    fetchLiveAttendance(); 
    const interval = setInterval(fetchLiveAttendance, 5000); 

    return () => clearInterval(interval);
  }, [tracking, sessionId]);

  // --- Action Handlers ---
  const handleStartTracking = async () => {
    if (!sessionId) {
      setError("No active session. Please start a session from the Dashboard first.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/trigger-hardware-scan",
        { sessionId }
      );

      setMessage(res.data.message);
      setTracking(true); 
      setHasStartedTracking(true); // <--- Unlocks the Table and Report UI permanently for this view
    } catch (err) {
      setError(err.response?.data?.error || "Failed to start hardware scan");
    } finally {
      setLoading(false);
    }
  };

  const handleStopTracking = () => {
    setTracking(false);
    setMessage("Tracking stopped. You can now generate the report.");
  };

  const handleGenerateReport = (courseName) => {
    console.log(`Generating report for ${courseName}...`);
    // Add logic here to download CSV/PDF or trigger backend report generation
  };

  const handleRowAction = (type) => {
    console.log(`Navigating to detailed view for: ${type}`);
  };

  // --- Table Configuration ---
  const tableColumns = [
    {
      key: "student",
      label: "Student Name",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden bg-gray-600 rounded-full shrink-0">
            <img
              src={profile_pic}
              alt={row.name}
              className="object-cover w-full h-full"
            />
          </div>
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
        let colorClass = "bg-[#00E5FF]"; 
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
          <span className="text-transparent">-</span> 
        ),
    },
  ];

  return (
    <div className="mx-16 mb-10">
      {/* Top Header Card */}
      <div className="w-full px-0 py-0 mx-auto font-sans bg-transparent rounded-xl">
        <h3 className="mb-4 text-xl tracking-wide text-white text-start">
          {date}
        </h3>

        <div className="grid items-end grid-cols-1 gap-6 md:grid-cols-12 md:gap-4">
          {/* Course Details */}
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

          {/* Location & End Time */}
          <div className="flex flex-col gap-5 md:col-span-4">
            <h3 className="text-xl tracking-wide text-white">{location}</h3>
            <div>
              <p className="mb-2 text-sm text-gray-400">End Time</p>
              <div className="bg-[#141414] text-gray-200 px-4 py-3 rounded-lg w-full md:w-[90%] text-sm">
                {endTime}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-end md:col-span-4 md:items-stretch">
            <button
              onClick={handleStartTracking}
              disabled={loading || tracking}
              className={`w-full cursor-pointer transition-colors text-white font-medium py-3 px-4 rounded-lg ${
                tracking ? "bg-gray-600 cursor-not-allowed" : "bg-[#008B8B] hover:bg-cyan-600"
              }`}
            >
              {loading ? "Starting..." : tracking ? "Tracking Active" : "Start Tracking"}
            </button>

            <button
              onClick={handleStopTracking}
              disabled={!tracking}
              className={`w-full mt-4 transition-colors font-medium py-3 px-4 rounded-lg border ${
                !tracking 
                  ? "border-gray-700 text-gray-700 cursor-not-allowed" 
                  : "border-[#FF1010] text-[#FF1010] hover:bg-[#FF1010] hover:text-white cursor-pointer"
              }`}
            >
              Stop Tracking
            </button>

            {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>
        </div>
      </div>

      {/* Conditionally Render Table and Summary ONLY after tracking has started */}
      {hasStartedTracking && (
        <div className="flex items-center justify-center py-4 mt-10 font-sans sm:py-8">
          <div className="flex flex-col justify-between w-full gap-10 lg:flex-row">
            
            {/* Table Area */}
            <div className="w-full sm:mt-6 lg:w-2/3">
              <Table
                columns={tableColumns}
                data={studentData}
              />
            </div>

            {/* Summary / Report Area */}
            <div className="flex flex-wrap items-start justify-center w-full gap-10 p-2 lg:w-1/3">
              <AttendanceSummary
                total={summary.total || studentData.length} // Fallback to list length if total isn't set yet
                present={summary.present}
                pending={summary.pending}
                absent={summary.absent}
                onGenerateReport={() => handleGenerateReport(courseCode)}
                onRowClick={handleRowAction}
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceMark;