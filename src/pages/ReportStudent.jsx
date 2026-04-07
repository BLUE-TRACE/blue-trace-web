import StudentReportCard from "../components/StudentReportCard";
import LectureDetailCard from "../components/LectureDetailCard";

const subjects = [
  {
    subjectCode: "SENG 1233",
    lecturerName: "Dr.Isuru",
    totalPlanned: 20,
    finished: 8,
    pending: 12,
    attended: 7,
    absent: 1,
    status: "On Track",
    percentage: 80,
  },
  {
    subjectCode: "SENG 2142",
    lecturerName: "Dr.Perera",
    totalPlanned: 18,
    finished: 6,
    pending: 12,
    attended: 5,
    absent: 1,
    status: "At Risk",
    percentage: 45,
  },
];

const ReportStudent = () => {
  return (
    <div className="flex flex-col gap-4 p-6" >
      
      {/* Lecture Info */}
      <LectureDetailCard
        title="Academic Year 2025/2026"
        showCountdown={false}
        courseCodevalue="4th Year"
        locationvalue="Rusiru Jayakodhi"
        startTimevalue="28 April"
        endTimevalue="28 September"
        courseCode="course code"
        location="lecturer"
        startTime="Start Date"
        endTime="End Date"
      />

      {/* Subject Cards */}
      {subjects.map((subject, index) => (
        <StudentReportCard key={index} {...subject} />
      ))}

    </div>
  );
};

export default ReportStudent;
