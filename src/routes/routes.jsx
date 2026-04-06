// NOTE: IMPORT OTHER CONSTANTS AND DEPENDENCIES
import React from "react";
import Root from "../Layout/Root";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ReportLecturer from "../pages/ReportLecturer";
import ReportStudent from "../pages/ReportStudent";


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
        path: "report/lecturer",
        element: <ReportLecturer />,
      },
      {
        path: "report/student",
        element: <ReportStudent />,
      },
    ],
  },
]);
export default router;