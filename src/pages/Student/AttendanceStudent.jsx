import React from "react";
import AttendCard from "../../components/AttendCard";
import Table from "../../components/Table";
import LectureSummary from "../../components/LectureSummary";

const AttendanceStudent = () => {
  const date = "Thu, 6 Feb";
  const courseCode = "SENG 12233";
  const lectureNo = "Lecture 01";
  const location = "Hall A11 301";
  const startTime = "08:00 am";
  const endTime = "10:00 am";

  const handleViewReport = (courseName) => {
    console.log(`Generating report for ${courseName}...`);
  };

  // 1. Define the columns tailored to this specific layout
  const tableColumns = [
    {
      key: "course",
      label: "Course",
      render: (_, row) => (
        <span className="text-sm font-medium text-white">{row.code}</span>
      ),
    },
    {
      key: "totalLectures",
      label: "Total Lectures",
      render: (_, row) => (
        <span className="text-sm text-white">{row.total}</span>
      ),
    },
    {
      key: "attendedLectures",
      label: "Attended Lectures",
      render: (_, row) => (
        <span className="text-sm text-white">{row.attended}</span>
      ),
    },
  ];

  // Sample data for the table
  const attendanceData = [
    { code: "SENG 22123", name: "Software Engineering", total: 4, attended: 2 },
    { code: "SENG 22014", name: "Data Structures", total: 6, attended: 5 },
    { code: "SENG 22302", name: "Operating Systems", total: 2, attended: 2 },
    { code: "SENG 24203", name: "Database Systems", total: 5, attended: 4 },
    { code: "SENG 25024", name: "Computer Networks", total: 3, attended: 1 },
    {
      code: "SENG 26052",
      name: "Artificial Intelligence",
      total: 4,
      attended: 3,
    },
  ];

  return (
    <div className="mx-16">
      <div className="w-full px-0 py-0 mx-auto font-sans bg-transparent rounded-xl">
        <h3 className="mb-4 text-xl tracking-wide text-white text-start">
          {courseCode}
        </h3>

        {/* Main Content Layout */}
        <div className="grid items-end grid-cols-1 gap-6 bg-shite md:grid-cols-12 md:gap-4">
          {/* Column 1: Course Code & Start Time */}
          <div className="flex flex-col gap-5 md:col-span-4">
            <p className="text-white text-md">
              {date} - {lectureNo}
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
            <div className="w-full cursor-pointer bg-[#008B8B] hover:bg-cyan-400 transition-colors text-white font-medium py-3 px-4 rounded-lg">
              Join Now
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex items-center justify-center min-h-screen py-4 font-sans sm:py-8">
        <div className="flex flex-col justify-between w-full gap-10 lg:flex-row">
          <div className="w-full sm:mt-6 lg:max-w-2/3">
            <Table columns={tableColumns} data={attendanceData} />
          </div>
          <div className="flex flex-wrap items-start justify-center w-full min-h-screen gap-10 p-2 bg-black lg:max-w-1/3">
            <LectureSummary
              courseCode={courseCode}
              total={20}
              attended={15}
              missed={5}
              onViewReport={handleViewReport}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStudent;
