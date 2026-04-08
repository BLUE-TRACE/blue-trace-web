import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import router from "./routes/routes.jsx";
import { fetchUsers } from "./store/thunks/userThunks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
