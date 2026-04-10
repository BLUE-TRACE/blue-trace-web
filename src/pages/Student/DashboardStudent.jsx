import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MoreVertical } from "lucide-react";
import DateTimeWidget from "../../components/DateTimeWidget";
import LectureDetailCard from "../../components/LectureDetailCard";
import Table from "../../components/Table";
import "../../App.css";

const DashboardStudent = () => {
  const { user } = useSelector((state) => state.auth);
  const [studentName, setStudentName] = useState(
    user?.username ? user?.username : "Student",
  );
  const role = user?.role ? user?.role : "student";

  const [timetable, setTimetable] = useState({});

  const getToday = () => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" });
  };

  const today = getToday();
  const todayCourses = timetable[today] || [];

  const nextLecture = todayCourses[0]; // simple version

  // 1. Define the dynamic columns
  const tableColumns = [
    {
      key: "course",
      label: "Course",
      render: (value, row) => (
        <span className={getStatusColor(row.status)}>{value}</span>
      ),
    },
    {
      key: "startTime",
      label: "Start Time",
      render: (value, row) => (
        <span className={getStatusColor(row.status)}>{value}</span>
      ),
    },
    {
      key: "endTime",
      label: "End Time",
      render: (value, row) => (
        <span className={getStatusColor(row.status)}>{value}</span>
      ),
    },
    {
      key: "hall",
      label: "Hall",
      render: (value, row) => (
        <span className={getStatusColor(row.status)}>{value}</span>
      ),
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
        <button
          className={`${getStatusColor(row.status)} hover:opacity-70 transition-opacity`}
        >
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
      case "Not Yet Started":
      default:
        return "text-gray-400"; // Default gray
    }
  };

  const timetableData = todayCourses.map((item) => {
    let status = "Not Yet Started";

    if (item.is_cancelled) {
      status = "Cancelled";
    } else {
      const now = new Date();
      const start = new Date(`1970-01-01T${item.start_time}`);
      const end = new Date(`1970-01-01T${item.end_time}`);

      if (now > end) status = "Finished";
      else if (now >= start && now <= end) status = "Ongoing";
    }

    return {
      course: item.course_code,
      startTime: item.start_time,
      endTime: item.end_time,
      hall: item.hall,
      status,
    };
  });

  return (
    <>
      <div className="mx-16">
        <div className="mb-10 text-2xl font-medium text-start">
          Hi, {studentName}
        </div>
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <DateTimeWidget />
          <LectureDetailCard
            role={role}
            courseCodevalue={nextLecture?.course_code}
            startTimevalue={nextLecture?.start_time}
            endTimevalue={nextLecture?.end_time}
            locationvalue={nextLecture?.hall}
          />
        </div>

        <div className="pb-10 mt-10">
          <Table
            title="Today's Timetable"
            columns={tableColumns}
            data={timetableData}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardStudent;
