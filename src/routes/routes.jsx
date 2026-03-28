// NOTE: IMPORT OTHER CONSTANTS AND DEPENDENCIES
import React from "react";
import Root from "../Layout/Root";
import { createBrowserRouter } from "react-router-dom";

// NOTE: IMPORT LECTURER PAGES
import Dashboard from "../pages/Lecturer/Dashboard";

// NOTE: IMPORT STUDENT PAGES

// NOTE: IMPORT ADMIN PAGES

// NOTE: IMPORT AUTH PAGES
import SignIn from "../pages/Login/Signin";

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
    ],
  },
  // AUTH ROUTES
  {
    path: "/signin",
    element: <SignIn />,
  }
]);

export default router;