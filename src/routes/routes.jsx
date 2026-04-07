// NOTE: IMPORT OTHER CONSTANTS AND DEPENDENCIES
import React from "react";
import Root from "../Layout/Root";
import { createBrowserRouter } from "react-router-dom";
<<<<<<< Updated upstream
=======
import Dashboard from "../pages/Dashboard";
import ReportLecturer from "../pages/ReportLecturer";
import ReportStudent from "../pages/ReportStudent";
import RealTimeMonitoring from "../pages/Admin/RealTimeMonitoring";
>>>>>>> Stashed changes

// NOTE: IMPORT LECTURER PAGES
import Dashboard from "../pages/Lecturer/Dashboard";
import AttendanceMark from "../pages/Lecturer/AttendanceMark";

// NOTE: IMPORT STUDENT PAGES
import DashboardStudent from "../pages/Student/DashboardStudent";
import AttendanceStudent from "../pages/Student/AttendanceStudent";

// NOTE: IMPORT ADMIN PAGES
import AdminDashboard from "../pages/Admin/AdminDashboard";

// NOTE: IMPORT AUTH PAGES
import SignIn from "../pages/Login/SignIn";

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
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "admin/real-time-monitoring",
        element: <RealTimeMonitoring />,
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