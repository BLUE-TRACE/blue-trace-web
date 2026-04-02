// NOTE: IMPORT OTHER CONSTANTS AND DEPENDENCIES
import React from "react";
import Root from "../Layout/Root";
import { createBrowserRouter } from "react-router-dom";

// NOTE: IMPORT LECTURER PAGES
import Dashboard from "../pages/Lecturer/Dashboard";
import AttendanceMark from "../pages/Lecturer/AttendanceMark";

// NOTE: IMPORT STUDENT PAGES
import DashboardStudent from "../pages/Student/DashboardStudent";
import AttendanceStudent from "../pages/Student/AttendanceStudent";

// NOTE: IMPORT ADMIN PAGES

// NOTE: IMPORT AUTH PAGES
import SignIn from "../pages/Login/Signin";

import TimeTablePage from "../pages/Lecturer/TimeTablePage";



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

    ],
  },
  // AUTH ROUTES
  {
    path: "/signin",
    element: <SignIn />,
  }
]);

export default router;