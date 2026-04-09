import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRedirect = () => {
  const { user } = useSelector((state) => state.auth);

  // Not logged in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Role-based redirect
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === "lecturer") {
    return <Navigate to="/lecturer" replace />;
  }

  if (user.role === "student") {
    return <Navigate to="/student" replace />;
  }

  return <Navigate to="/signin" replace />;
};

export default AuthRedirect;