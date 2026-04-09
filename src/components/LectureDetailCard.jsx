import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LectureDetailCard = ({
  role = "student", // or "lecturer"
  courseCodevalue,
  lecturerId,

  title = "Next Lecture",
  showCountdown = true,
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
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // const [sessionStarted, setSessionStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [sessionId, setSessionId] = useState(
    localStorage.getItem("sessionId") || null,
  );

  const [sessionStarted, setSessionStarted] = useState(
    !!localStorage.getItem("sessionId"),
  );

  const handleStartSession = async () => {
    if (loading || sessionStarted) return;

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/start-session", {
        courseCode: courseCodevalue.replace(/\s/g, ""),
        lecturerId: lecturerId,
      });

      const newSessionId = res.data.sessionId;

      // STORE SESSION
      localStorage.setItem("sessionId", newSessionId);

      setSessionId(newSessionId);
      setSessionStarted(true);
      setMessage(res.data.message);

      navigate("/lecturer/attendance-mark");
    } catch (err) {
      setError(err.response?.data?.error || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleStopSession = async () => {
    if (loading || !sessionId) return;

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/stop-session", {
        sessionId: sessionId,
      });

      // CLEAR SESSION
      localStorage.removeItem("sessionId");

      setSessionId(null);
      setSessionStarted(false);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Network error");
    } finally {
      setLoading(false);
    }
  };
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
            {role === "lecturer" && (
              <div
                onClick={
                  sessionStarted ? handleStopSession : handleStartSession
                }
                disabled={loading}
                className={`w-full transition-colors text-white font-medium py-3 px-4 rounded-lg ${
                  sessionStarted
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-[#008B8B] hover:bg-[#007777]"
                }`}
              >
                {loading
                  ? "Processing..."
                  : sessionStarted
                    ? "Stop Session"
                    : "Start Session"}
              </div>
              
            )}
            {message && <p className="text-green-400 mt-2 text-sm">{message}</p>}
            {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureDetailCard;
