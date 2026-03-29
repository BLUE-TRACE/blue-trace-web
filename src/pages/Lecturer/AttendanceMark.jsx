import React from "react";
import { Home } from "lucide-react"; // Using lucide-react for the little house/checkout icon
import AttendCard from "../../components/AttendCard";
import Table from "../../components/Table";
import AttendanceSummary from "../../components/AttendanceSummary";
import profile_pic from "../../assets/images/stu-profile-pic.jpg";
import "../../App.css";

const AttendanceMark = () => {
  const handleGenerateReport = (courseName) => {
    console.log(`Generating report for ${courseName}...`);
  };

  const handleRowAction = (type) => {
    console.log(`Navigating to detailed view for: ${type}`);
  };

  // 1. Define the columns tailored to this specific layout
  const tableColumns = [
    {
      key: "student",
      label: "Student Name",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {/* Avatar Placeholder */}
          <div className="w-10 h-10 overflow-hidden bg-gray-600 rounded-full shrink-0">
            {/* <img 
               src={`https://ui-avatars.com/api/?name=${row.name.replace(' ', '+')}&background=random`} 
               alt={row.name}
               className="object-cover w-full h-full"
             /> */}
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
      <AttendCard />
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
