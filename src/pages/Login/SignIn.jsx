import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/thunks/authThunks";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginUser(formData)).unwrap();
      const role = response?.user?.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
        return;
      }

      if (role === "lecturer") {
        navigate("/lecturer");
        return;
      }

      if (role === "student") {
        navigate("/student");
        return;
      }

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-black">
      {/* Sign In Card */}
      <div className="w-full max-w-150 bg-[#2A2A2A] rounded-md p-8 sm:p-14 md:px-20 md:py-24 shadow-2xl flex flex-col items-center">
        {/* Logo / Title */}
        <h1 className="mb-12 text-4xl font-bold tracking-wide text-white sm:text-5xl">
          BlueTrace
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
          {/* Username Input */}
          <div className="relative w-full">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="w-full cursor-pointer bg-transparent border border-gray-400 text-white px-4 py-3.5 rounded focus:outline-none focus:border-[#008B8B] transition-colors placeholder:text-gray-400"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full cursor-pointer bg-transparent border border-gray-400 text-white px-4 py-3.5 pr-12 rounded focus:outline-none focus:border-[#008B8B] transition-colors placeholder:text-gray-400"
              required
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-400 transition-colors -translate-y-1/2 cursor-pointer right-4 top-1/2 hover:text-white focus:outline-none"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          {/* Log In Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-[#008B8B] hover:bg-[#007777] disabled:bg-[#2b6666] text-white font-semibold text-lg py-3.5 rounded mt-4 transition-colors tracking-wide"
          >
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        <div className="mt-8 text-sm tracking-wide text-gray-300 transition-colors cursor-pointer hover:text-white focus:outline-none">
          Lost Password?
        </div>
      </div>
    </div>
  );
};

export default SignIn;
