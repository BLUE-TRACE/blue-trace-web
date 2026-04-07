import LectureDetailCard from "../../components/LectureDetailCard";
import Table from "../../components/Table";
import DashboardSummary from "../../components/DashboardSummary";

const ReportLecturer = () => {
    const columns = [
  { key: "name", label: "Student Name" },
  { key: "attended", label: "Attended", align: "center" },
  { key: "absent", label: "Absent", align: "center" },
  { key: "status", label: "Status", align: "center" },
];

const data = [
  {
    name: "Rusiru Jayakody",
    attended: 8,
    absent: 2,
    status: "On Track",
  },
  {
    name: "Saman Perera",
    attended: 4,
    absent: 6,
    status: "At Risk",
  },
];

  
  return (
    <div className="text-white">
      
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select className="p-2 bg-gray-700 rounded">
          <option>Select Academic Year</option>
        </select>

        <select className="p-2 bg-gray-700 rounded">
          <option>Select Lecture</option>
        </select>
      </div>

      {/* Lecture Info */}
      <LectureDetailCard 
  title="Academic Year 2025/2026"
  showCountdown={false}
  courseCodevalue = "SENG 12233"
  locationvalue = "Dr. Isuru"
  startTimevalue = "28 April"
  endTimevalue = "28 September"
  // countdownvalue = "00:30:00"
  // minutesLeftvalue = {30}

  courseCode = "course code"
  location = "lecturer"
  startTime = "Start Date"
  endTime = "End Date"
  // countdown = "countdown"
  // minutesLeft = "minutes left"
/>

      {/* Table + Summary */}
      <div className="flex gap-6 mt-6">
  <div className="flex-1">
    <Table 
      title="Student Attendance"
      columns={columns}
      data={data}
    />
  </div>

  <DashboardSummary
  Enrolled={16}
  Present={10}
  Pending={5}
  Absent={1}

  EnrolledLable="Total Planned"
  Presentlable="Finished"
  PendingLable="Pending"
  AbsentLable="Cancelled"
/>
</div>
    </div>
  );
};

export default ReportLecturer;