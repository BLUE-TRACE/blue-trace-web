import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/thunks/authThunks"; // create this
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    yearLevel: 1,
    role: "student",
  });

  const [localError, setLocalError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    
    if (formData?.role !== "student") {
        formData.yearLevel = null; // Clear yearLevel for non-students
    }
    
    e.preventDefault();
    setLocalError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        registerUser({
          username: formData.username,
          password: formData.password,
          role: formData.role,
          yearLevel: formData.yearLevel,
        }),
      ).unwrap();

      navigate("/signin");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-black">
      <div className="w-full max-w-150 bg-[#2A2A2A] rounded-md p-8 sm:p-14 md:px-20 md:py-24 shadow-2xl flex flex-col items-center">
        {/* Title */}
        <h1 className="mb-12 text-4xl font-bold tracking-wide text-white sm:text-5xl">
          BlueTrace
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
          {/* Username */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full bg-transparent border border-gray-400 text-white px-4 py-3.5 rounded focus:outline-none focus:border-[#008B8B]"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full bg-transparent border border-gray-400 text-white px-4 py-3.5 pr-12 rounded focus:outline-none focus:border-[#008B8B]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full bg-transparent border border-gray-400 text-white px-4 py-3.5 pr-12 rounded focus:outline-none focus:border-[#008B8B]"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2"
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* yearLevel */}
          {formData.role === "student" && (
            <select
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleInputChange}
              className="w-full bg-zinc-800 border border-gray-400 text-white px-4 py-3.5 rounded focus:outline-none focus:border-[#008B8B]"
              required
            >
              <option value={1}>Level 1</option>
              <option value={2}>Level 2</option>
              <option value={3}>Level 3</option>
              <option value={4}>Level 4</option>
            </select>
          )}

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full bg-zinc-800 border border-gray-400 text-white px-4 py-3.5 rounded focus:outline-none focus:border-[#008B8B]"
            required
          >
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
            <option value="admin">Admin</option>
          </select>

          {/* Errors */}
          {localError && <p className="text-red-400">{localError}</p>}
          {error && <p className="text-red-400">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#008B8B] hover:bg-[#007777] disabled:bg-[#2b6666] text-white font-semibold text-lg py-3.5 rounded mt-4"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div
          onClick={() => navigate("/")}
          className="mt-8 text-sm text-gray-300 cursor-pointer hover:text-white"
        >
          Already have an account?{" "}
          <a href="/signin" className="text-cyan-400 hover:text-cyan-300">
            {" "}
            Log in{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
