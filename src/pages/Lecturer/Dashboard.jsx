import React, { useState } from "react";
import DateTimeWidget from "../../components/DateTimeWidget";
import LectureDetailCard from "../../components/LectureDetailCard";
import { MoreVertical } from "lucide-react";
import Table from "../../components/Table";
import DashboardSummary from "../../components/DashboardSummary";
import "../../App.css";

const Dashboard = () => {
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

  // 3. Define the data
  const timetableData = [
    {
      course: "SENG 1223",
      startTime: "10:00:00",
      endTime: "10:00:00",
      hall: "A11 301",
      status: "Finished",
    },
    {
      course: "SENG 1223",
      startTime: "10:00:00",
      endTime: "10:00:00",
      hall: "A11 301",
      status: "Cancelled",
    },
    {
      course: "SENG 1223",
      startTime: "10:00:00",
      endTime: "10:00:00",
      hall: "A11 301",
      status: "Not Yet Started",
    },
    {
      course: "SENG 1223",
      startTime: "10:00:00",
      endTime: "10:00:00",
      hall: "A11 301",
      status: "Not Yet Started",
    },
  ];

  return (
    <>
      <div className="mx-16">

        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <DateTimeWidget />
          <LectureDetailCard />
        </div>

        <div className="min-h-screen mt-10">
          <Table
            title="Today's Timetable"
            columns={tableColumns}
            data={timetableData}
          />
        </div>

        <div><DashboardSummary /></div>
      </div>
    </>
  );
};

export default Dashboard;
