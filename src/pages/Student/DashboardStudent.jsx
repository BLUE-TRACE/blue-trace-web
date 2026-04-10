import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MoreVertical } from "lucide-react";
import DateTimeWidget from "../../components/DateTimeWidget";
import LectureDetailCard from "../../components/LectureDetailCard";
import Table from "../../components/Table";
import "../../App.css";

const DashboardStudent = () => {
  const { user } = useSelector((state) => state.auth);
  
  // State variables
  const [studentName, setStudentName] = useState(user?.username || "Student");
  const [timetableData, setTimetableData] = useState([]);
  const [nextLecture, setNextLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const role = user?.role || "student";

  // 1. Define the dynamic columns
  const tableColumns = [
    {
      key: "course",
      label: "Course",
      render: (value, row) => <span className={getStatusColor(row.status)}>{value}</span>,
    },
    {
      key: "startTime",
      label: "Start Time",
      render: (value, row) => <span className={getStatusColor(row.status)}>{value}</span>,
    },
    {
      key: "endTime",
      label: "End Time",
      render: (value, row) => <span className={getStatusColor(row.status)}>{value}</span>,
    },
    {
      key: "hall",
      label: "Hall",
      render: (value, row) => <span className={getStatusColor(row.status)}>{value}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <span className={getStatusColor(value)}>{value}</span>,
    },
    {
      key: "actions",
      label: "More details",
      align: "center",
      render: (_, row) => (
        <button className={`${getStatusColor(row.status)} hover:opacity-70 transition-opacity`}>
          <MoreVertical size={20} />
        </button>
      ),
    },
  ];

  // 2. Helper function to determine text color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Finished":
        return "text-[#00E5FF]"; // Teal/Cyan color
      case "Cancelled":
        return "text-[#FF4444]"; // Red color
      case "Ongoing":
        return "text-[#00FF00]"; // Green color for active
      case "Not Yet Started":
      default:
        return "text-gray-400"; // Default gray
    }
  };

  // 3. Helper to calculate actual lecture status based on time
  const calculateLectureStatus = (lecture) => {
    if (lecture.is_cancelled === 1) return "Cancelled";

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

  // 4. Fetch and Process Data
  useEffect(() => {
    const fetchTimetable = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/timetable/${user.id}`);
        
        // Get current day string (e.g., "Monday", "Friday")
        const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
        
        // Extract today's lectures from the response or default to empty array
        const todaysLectures = res.data.timetable[currentDay] || [];

        // Sort by start time ascending
        todaysLectures.sort((a, b) => a.start_time.localeCompare(b.start_time));

        // Format data for the Table component
        const formattedTableData = todaysLectures.map((l) => ({
          course: l.course_code,
          startTime: l.start_time,
          endTime: l.end_time,
          hall: l.hall,
          status: calculateLectureStatus(l),
          raw: l // Keep raw data for next lecture logic
        }));

        setTimetableData(formattedTableData);

        // Find the "Next" or "Ongoing" valid lecture for the Detail Card
        const upcomingLecture = formattedTableData.find(
          (l) => l.status === "Not Yet Started" || l.status === "Ongoing"
        );
        
        setNextLecture(upcomingLecture || null);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch timetable", err);
        setError("Could not load timetable data.");
        setLoading(false);
      }
    };

    fetchTimetable();

    // Refresh status every 1 minute to keep "Ongoing" accurate without page refresh
    const interval = setInterval(fetchTimetable, 60000);
    return () => clearInterval(interval);
  }, [user?.id]);

  // 5. Calculate countdown and minutes left for Detail Card
  const getTimerDetails = () => {
    if (!nextLecture || nextLecture.status === "Ongoing") {
      return { countdownvalue: "00:00:00", minutesLeftvalue: 0 };
    }

    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const [startH, startM] = nextLecture.startTime.split(":").map(Number);
    const startMins = startH * 60 + startM;

    const diffMins = startMins - currentMins;
    
    // Format countdown HH:MM:00
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    const formattedCountdown = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`;

    return { 
      countdownvalue: diffMins > 0 ? formattedCountdown : "00:00:00", 
      minutesLeftvalue: diffMins > 0 ? diffMins : 0 
    };
  };

  const timerDetails = getTimerDetails();

  return (
    <>
      <div className="mx-16">
        <div className="mb-10 text-2xl font-medium text-start">
          Hi, {studentName}
        </div>
        
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <DateTimeWidget />
          
          {nextLecture ? (
            <LectureDetailCard 
              role={role} 
              courseCodevalue={nextLecture.course} 
              startTimevalue={nextLecture.startTime}
              endTimevalue={nextLecture.endTime}
              locationvalue={nextLecture.hall}
              countdownvalue={timerDetails.countdownvalue}
              minutesLeftvalue={timerDetails.minutesLeftvalue}
              title={nextLecture.status === "Ongoing" ? "Current Lecture" : "Next Lecture"}
            />
          ) : (
            <div className="flex items-center justify-center w-full p-8 text-gray-400 bg-[#050505] rounded-xl lg:w-1/2">
              {loading ? "Loading lecture details..." : "No upcoming lectures today."}
            </div>
          )}
        </div>

        <div className="pb-10 mt-10">
          {error ? (
            <div className="p-4 text-red-500 rounded bg-red-500/10">{error}</div>
          ) : (
            <Table
              title="Today's Timetable"
              columns={tableColumns}
              data={timetableData}
              message={loading ? "Loading timetable..." : "No classes scheduled for today."}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardStudent;