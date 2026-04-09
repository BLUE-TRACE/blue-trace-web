// NOTE: IMPORT OTHER CONSTANTS AND DEPENDENCIES
import React from "react";
import Root from "../Layout/Root";
import { createBrowserRouter } from "react-router-dom";

import AuthRedirect from "../components/AuthRedirect";

// NOTE: IMPORT LECTURER PAGES
import Dashboard from "../pages/Lecturer/Dashboard";
import AttendanceMark from "../pages/Lecturer/AttendanceMark";
import TimeTablePage from "../pages/Lecturer/TimeTablePage";
import ReportLecturer from "../pages/Lecturer/ReportLecturer";

// NOTE: IMPORT STUDENT PAGES
import DashboardStudent from "../pages/Student/DashboardStudent";
import AttendanceStudent from "../pages/Student/AttendanceStudent";
import StudentTimeTable from "../pages/Student/StudentTimeTable";
import ReportStudent from "../pages/Student/ReportStudent";

// NOTE: IMPORT ADMIN PAGES
import AdminDashboard from "../pages/Admin/AdminDashboard";

// NOTE: IMPORT AUTH PAGES
import SignIn from "../pages/Login/SignIn";
import SignUp from "../pages/Login/SignUp";

// NOTE: DEFINE ROUTES
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRedirect />,
  },
  // LECTURER ROUTES
  {
    path: "/lecturer",
    element: <Root />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "timetable", element: <TimeTablePage /> },
      { path: "attendance-mark", element: <AttendanceMark /> },
      { path: "report", element: <ReportLecturer /> },
    ],
  },
  // STUDENT ROUTES
  {
    path: "/student",
    element: <Root />,
    children: [
      { index: true, element: <DashboardStudent /> },
      { path: "timetable", element: <StudentTimeTable /> },
      { path: "attendance", element: <AttendanceStudent /> },
      { path: "report", element: <ReportStudent /> },
    ],
  },
  // ADMIN ROUTES
  {
    path: "/admin",
    element: <Root />,
    children: [{ index: true, element: <AdminDashboard /> }],
  },
  // AUTH ROUTES
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;