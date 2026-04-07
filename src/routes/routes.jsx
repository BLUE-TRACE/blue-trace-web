// NOTE: IMPORT OTHER CONSTANTS AND DEPENDENCIES
import React from "react";
import Root from "../Layout/Root";
import { createBrowserRouter } from "react-router-dom";

// NOTE: IMPORT LECTURER PAGES
import Dashboard from "../pages/Lecturer/Dashboard";
import AttendanceMark from "../pages/Lecturer/AttendanceMark";
import ReportLecturer from "../pages/Lecturer/ReportLecturer";


// NOTE: IMPORT STUDENT PAGES
import DashboardStudent from "../pages/Student/DashboardStudent";
import AttendanceStudent from "../pages/Student/AttendanceStudent";
import ReportStudent from "../pages/Student/ReportStudent";

// NOTE: IMPORT ADMIN PAGES
import AdminDashboard from "../pages/Admin/AdminDashboard";

// NOTE: IMPORT AUTH PAGES
import SignIn from "../pages/Login/SignIn";

import TimeTablePage from "../pages/Lecturer/TimeTablePage";

import StudentTimeTable from "../pages/Student/StudentTimeTable";

// NOTE: DEFINE ROUTES
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/lecturer/timetable",
        element: <TimeTablePage />,
      },
      {
        path: "report/lecturer",
        element: <ReportLecturer />,
      },
      {
        path: "report/student",
        element: <ReportStudent />,
      },
      // LECTURER ROUTES
      {
        path: "/lecturer/attendance-mark",
        element: <AttendanceMark />,
      },
      // STUDENT ROUTES
      {
        path: "/student",
        element: <DashboardStudent />,
      },
      {
        path: "/student/attendance",
        element: <AttendanceStudent />,
      },
      {
        path: "/student/timetable",
        element: <StudentTimeTable />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
  // AUTH ROUTES
  {
    path: "/signin",
    element: <SignIn />,
  }
]);
export default router;