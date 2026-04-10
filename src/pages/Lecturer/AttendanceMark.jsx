import React, { useEffect, useState, useCallback } from "react";
import { Home, Loader2, X, CheckCircle2, XCircle } from "lucide-react";
import axios from "axios";
import Table from "../../components/Table";
import SessionSummary from "../../components/SessionSummary";
import profile_pic from "../../assets/images/stu-profile-pic.jpg"; 
import "../../App.css";

const AttendanceMark = () => {
  // --- Standard States ---
  const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId") || null);
  const [tracking, setTracking] = useState(false); 
  
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const [studentData, setStudentData] = useState([]);
  const [summary, setSummary] = useState({ total: 0, present: 0, pending: 0, absent: 0 });

  // --- NEW: Detailed Report Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailedReport, setDetailedReport] = useState(null);
  const [viewReportLoading, setViewReportLoading] = useState(false);

  // --- Course Details ---
  const date = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const courseCode = "SE102"; 
  const lectureNo = "Lecture 01";
  const location = "Hall A11 301";
  const startTime = "08:00 am";
  const endTime = "10:00 am";

  // --- API: Fetch Live Data (Table) ---
  const fetchLiveAttendance = useCallback(async () => {
    if (!sessionId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/live-attendance/${sessionId}`);
      const students = res.data.students;

      const formatted = students.map((s) => ({
        name: s.username,
        id: s.student_id,
        status: s.status || "green",
        checkOut: null, 
      }));

      setStudentData(formatted);
      setSummary((prev) => ({ ...prev, present: students.length }));
    } catch (err) {
      console.error("Live fetch error:", err);
    }
  }, [sessionId]);

  // --- Effects ---
  useEffect(() => {
    if (sessionId) fetchLiveAttendance();
  }, [sessionId, fetchLiveAttendance]);

  useEffect(() => {
    if (!tracking || !sessionId) return;
    const interval = setInterval(fetchLiveAttendance, 5000); 
    return () => clearInterval(interval);
  }, [tracking, sessionId, fetchLiveAttendance]);

  // --- Actions ---
  const handleStartTracking = async () => {
    if (!sessionId) {
      setError("No active session.");
      return;
    }
    setLoading(true); setError(""); setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/trigger-hardware-scan", { sessionId });
      setMessage(res.data.message);
      setTracking(true); 
    } catch (err) {
      setError(err.response?.data?.error || "Failed to start hardware scan");
    } finally {
      setLoading(false);
    }
  };

  const handleStopTracking = () => {
    setTracking(false);
    setMessage("Tracking stopped. You can now view or download the report.");
  };

  // --- NEW: View Detailed Report (UI Modal) ---
  const handleViewDetailedReport = async () => {
    if (!sessionId) return;
    setViewReportLoading(true);
    try {
      // Adjust this URL to match your actual backend route that returns the JSON
      const response = await axios.get(`http://localhost:5000/api/session-summary-report/${sessionId}`);
      setDetailedReport(response.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch detailed report:", err);
      setError("Could not load the detailed report. Try again.");
    } finally {
      setViewReportLoading(false);
    }
  };

  // --- Original: Download Report (CSV/PDF) ---
  const handleDownloadReport = async (courseName) => {
    if (!sessionId) return;
    setReportLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/generate-report/${sessionId}`, {
        responseType: 'blob', 
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${courseName}_Attendance_Report.csv`); 
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setMessage("Report downloaded successfully!");
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setReportLoading(false);
    }
  };

  // --- Table Configuration ---
  const tableColumns = [
    {
      key: "student",
      label: "Student Name",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden bg-gray-600 rounded-full shrink-0">
            <img src={profile_pic} alt={row.name} className="object-cover w-full h-full" />
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
        return (
          <div className="flex items-center w-full h-full">
            <div className={`h-2 w-24 rounded-full ${colorClass}`}></div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mx-16 mb-10 font-sans">
      
      {/* Top Controls Card */}
      <div className="w-full px-0 py-0 mx-auto bg-transparent rounded-xl">
        <h3 className="mb-4 text-xl tracking-wide text-white text-start">{date}</h3>
        <div className="grid items-end grid-cols-1 gap-6 md:grid-cols-12 md:gap-4">
          <div className="flex flex-col gap-5 md:col-span-4">
            <p className="text-white text-md">{courseCode} - {lectureNo}</p>
            <div>
              <p className="mb-2 text-sm text-gray-400">Start Time</p>
              <div className="bg-[#141414] text-gray-200 px-4 py-3 rounded-lg w-full md:w-[90%] text-sm">{startTime}</div>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:col-span-4">
            <h3 className="text-xl tracking-wide text-white">{location}</h3>
            <div>
              <p className="mb-2 text-sm text-gray-400">End Time</p>
              <div className="bg-[#141414] text-gray-200 px-4 py-3 rounded-lg w-full md:w-[90%] text-sm">{endTime}</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-end md:col-span-4 md:items-stretch">
            <button onClick={handleStartTracking} disabled={loading || tracking || !sessionId}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors text-white ${!sessionId ? "bg-gray-700 cursor-not-allowed" : tracking ? "bg-gray-600 cursor-not-allowed" : "bg-[#008B8B] hover:bg-cyan-600"}`}>
              {loading ? "Starting..." : tracking ? "Tracking Active" : "Start Tracking"}
            </button>
            <button onClick={handleStopTracking} disabled={!tracking}
              className={`w-full mt-4 py-3 px-4 rounded-lg border font-medium transition-colors ${!tracking ? "border-gray-700 text-gray-700 cursor-not-allowed" : "border-[#FF1010] text-[#FF1010] hover:bg-[#FF1010] hover:text-white"}`}>
              Stop Tracking
            </button>
            {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {sessionId && (
        <div className="flex items-center justify-center py-4 mt-10 sm:py-8">
          <div className="flex flex-col justify-between w-full gap-10 lg:flex-row">
            
            <div className="w-full sm:mt-6 lg:w-2/3">
              <Table columns={tableColumns} data={studentData} />
            </div>

            <div className="flex flex-wrap items-start justify-center w-full gap-10 p-2 lg:w-1/3">
              {reportLoading || viewReportLoading ? (
                 <div className="flex flex-col items-center justify-center w-full h-[400px] bg-[#2C2C2C] rounded-2xl">
                    <Loader2 className="w-8 h-8 text-[#00E5FF] animate-spin mb-4" />
                    <p className="text-gray-400">Processing Report...</p>
                 </div>
              ) : (
                <SessionSummary
                  total={summary.total || studentData.length} 
                  present={summary.present}
                  pending={summary.pending}
                  absent={summary.absent}
                  onViewReport={handleViewDetailedReport}     // NEW UI Button
                  onGenerateReport={() => handleDownloadReport(courseCode)} // Download Button
                />
              )}
            </div>

          </div>
        </div>
      )}

      {/* NEW: Detailed Report Modal Overlay */}
      {isModalOpen && detailedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] w-full max-w-3xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-white">Attendance Report</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Course: <span className="font-semibold text-white">{detailedReport.sessionDetails.courseCode}</span> | 
                  Session ID: <span className="text-white">{detailedReport.sessionDetails.sessionId}</span>
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto">
              
              {/* Summary Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 text-center border rounded-xl bg-gray-800/50 border-gray-700/50">
                  <p className="text-sm text-gray-400">Total Enrolled</p>
                  <p className="mt-1 text-3xl font-bold text-white">{detailedReport.summary.totalEnrolled}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-center">
                  <p className="text-sm text-[#00E5FF]/80">Present</p>
                  <p className="text-3xl font-bold text-[#00E5FF] mt-1">{detailedReport.summary.presentCount}</p>
                </div>
                <div className="p-4 text-center border rounded-xl bg-red-500/10 border-red-500/20">
                  <p className="text-sm text-red-400">Absent</p>
                  <p className="mt-1 text-3xl font-bold text-red-500">{detailedReport.summary.absentCount}</p>
                </div>
              </div>

              {/* Student Lists Grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                
                {/* Present Students */}
                <div>
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
                    <CheckCircle2 className="text-[#00E5FF]" size={20} /> 
                    Present Students
                  </h3>
                  <div className="space-y-2">
                    {detailedReport.data.presentStudents.length > 0 ? (
                      detailedReport.data.presentStudents.map((student) => (
                        <div key={student.student_id} className="flex justify-between p-3 rounded-lg bg-gray-800/30">
                          <span className="text-gray-200">{student.username}</span>
                          <span className="text-sm text-gray-500">ID: {student.student_id}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-sm italic text-center text-gray-500 border border-dashed rounded-lg border-gray-700/50">
                        No students marked present.
                      </div>
                    )}
                  </div>
                </div>

                {/* Absent Students */}
                <div>
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
                    <XCircle className="text-red-500" size={20} /> 
                    Absent Students
                  </h3>
                  <div className="space-y-2">
                    {detailedReport.data.absentStudents.length > 0 ? (
                      detailedReport.data.absentStudents.map((student) => (
                        <div key={student.student_id} className="flex justify-between p-3 border rounded-lg bg-red-500/5 border-red-500/10">
                          <span className="text-gray-200">{student.username}</span>
                          <span className="text-sm text-gray-500">ID: {student.student_id}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-sm italic text-center text-gray-500 border border-dashed rounded-lg border-gray-700/50">
                        No students marked absent.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceMark;