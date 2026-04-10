import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { CheckCircle2, AlertCircle, Laptop, BookOpen, PlusCircle, Loader2 } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  
  // --- Device Registration States ---
  const [currentMac, setCurrentMac] = useState(user?.registeredMacAddress || null);
  const [hasDevice, setHasDevice] = useState(user?.hasRegisteredDevice || false);
  const [macInput, setMacInput] = useState("");
  const [deviceMessage, setDeviceMessage] = useState("");
  const [deviceError, setDeviceError] = useState("");
  const [deviceLoading, setDeviceLoading] = useState(false);

  // --- Course Enrollment States ---
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [enrollError, setEnrollError] = useState("");
  const [enrollMessage, setEnrollMessage] = useState("");
  const [enrollingCourseCode, setEnrollingCourseCode] = useState(null); // Tracks which button is loading

  // ==========================================
  // FETCH COURSES LOGIC
  // ==========================================
  const fetchCourses = useCallback(async () => {
    if (!user?.id) return;
    try {
      setCoursesLoading(true);
      const res = await axios.get(`http://localhost:5000/api/student-courses/${user.id}`);
      setEnrolledCourses(res.data.enrolled);
      setAvailableCourses(res.data.available);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setEnrollError("Failed to load courses.");
    } finally {
      setCoursesLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // ==========================================
  // ENROLL IN COURSE LOGIC
  // ==========================================
  const handleEnroll = async (courseCode) => {
    setEnrollingCourseCode(courseCode);
    setEnrollError("");
    setEnrollMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/enroll", {
        studentId: user.id,
        courseCode: courseCode
      });

      setEnrollMessage(res.data.message);
      // Re-fetch courses so the UI updates instantly
      await fetchCourses(); 
    } catch (err) {
      setEnrollError(err.response?.data?.error || "Failed to enroll in course.");
    } finally {
      setEnrollingCourseCode(null);
    }
  };

  // ==========================================
  // DEVICE REGISTRATION LOGIC
  // ==========================================
  const isValidMac = (mac) => {
    const regex = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;
    return regex.test(mac);
  };

  const handleRegisterDevice = async () => {
    if (!macInput) {
      setDeviceError("Please enter a MAC address.");
      return;
    }
    if (!isValidMac(macInput)) {
      setDeviceError("Invalid MAC address format. Use format AA:BB:CC:DD:EE:FF");
      return;
    }

    setDeviceLoading(true);
    setDeviceMessage("");
    setDeviceError("");

    try {
      const normalizedMac = macInput.toLowerCase();
      const res = await axios.post("http://localhost:5000/api/register-device", {
        studentId: user.id, 
        macAddress: normalizedMac,
      });

      setDeviceMessage(res.data.message);
      setCurrentMac(res.data.macAddress);
      setHasDevice(true);
      setMacInput(""); 

      const storedUser = JSON.parse(localStorage.getItem("authUser"));
      if (storedUser) {
        storedUser.registeredMacAddress = res.data.macAddress;
        storedUser.hasRegisteredDevice = true;
        localStorage.setItem("authUser", JSON.stringify(storedUser));
      }
    } catch (err) {
      setDeviceError(err.response?.data?.error || "Network error. Please try again.");
    } finally {
      setDeviceLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 font-sans md:px-16">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ========================================== */}
        {/* 1. PROFILE & DEVICE CARD                     */}
        {/* ========================================== */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-800 bg-black/20">
            <h2 className="text-2xl font-bold text-white">My Profile</h2>
            <p className="mt-1 text-sm text-gray-400">Manage your account and device registration.</p>
          </div>

          <div className="p-8">
            <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center">
              <div className="flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full shrink-0">
                <span className="text-3xl font-bold text-cyan-400">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-white">{user?.username}</h3>
                <p className="text-gray-400">Student ID: <span className="text-gray-200">{user?.id}</span></p>
                <p className="text-gray-400">Year Level: <span className="text-gray-200">Year {user?.yearLevel}</span></p>
              </div>
            </div>

            <div className="w-full h-px mb-8 bg-gray-800"></div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Laptop className="text-cyan-400" size={24} />
                <h3 className="text-lg font-semibold text-white">Device Registration</h3>
              </div>

              <div className={`p-4 rounded-xl border flex items-start gap-4 ${hasDevice ? "bg-[#00E5FF]/5 border-[#00E5FF]/20" : "bg-gray-800/50 border-gray-700"}`}>
                {hasDevice ? (
                  <CheckCircle2 className="mt-0.5 text-[#00E5FF] shrink-0" size={20} />
                ) : (
                  <AlertCircle className="mt-0.5 text-yellow-500 shrink-0" size={20} />
                )}
                <div>
                  <h4 className={`font-medium ${hasDevice ? "text-[#00E5FF]" : "text-yellow-500"}`}>
                    {hasDevice ? "Device Registered" : "No Device Registered"}
                  </h4>
                  <p className="mt-1 text-sm text-gray-400">
                    {hasDevice 
                      ? `Your attendance will be tracked using MAC Address: ` 
                      : "You must register your mobile device's Wi-Fi MAC address to mark attendance."}
                    {hasDevice && <span className="ml-1 font-mono font-bold tracking-wider text-white">{currentMac}</span>}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="e.g. AA:BB:CC:DD:EE:FF"
                    value={macInput}
                    onChange={(e) => setMacInput(e.target.value)}
                    className="flex-1 px-4 py-3 font-mono text-white transition-colors bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 placeholder:text-gray-600"
                  />
                  <button
                    onClick={handleRegisterDevice}
                    disabled={deviceLoading}
                    className={`px-6 py-3 font-semibold text-black transition-colors rounded-lg whitespace-nowrap ${
                      deviceLoading ? "bg-cyan-600/50 cursor-not-allowed" : "bg-[#00E5FF] hover:bg-[#00E5FF]/90"
                    }`}
                  >
                    {deviceLoading ? "Processing..." : hasDevice ? "Update Device" : "Register Device"}
                  </button>
                </div>
                {deviceMessage && <p className="text-sm font-medium text-green-400">{deviceMessage}</p>}
                {deviceError && <p className="text-sm font-medium text-red-400">{deviceError}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 2. COURSE MANAGEMENT CARD                    */}
        {/* ========================================== */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-800 bg-black/20">
            <div className="flex items-center gap-3">
              <BookOpen className="text-cyan-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Course Enrollments</h2>
            </div>
            <p className="mt-1 text-sm text-gray-400">Manage your modules for Year {user?.yearLevel}.</p>
          </div>

          <div className="p-8 space-y-8">
            
            {/* Messages */}
            {enrollMessage && <div className="p-4 text-green-400 border rounded-lg bg-green-500/10 border-green-500/20">{enrollMessage}</div>}
            {enrollError && <div className="p-4 text-red-400 border rounded-lg bg-red-500/10 border-red-500/20">{enrollError}</div>}

            {coursesLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                
                {/* Column 1: Enrolled Courses */}
                <div>
                  <h3 className="pb-2 mb-4 text-lg font-semibold text-white border-b border-gray-800">Currently Enrolled</h3>
                  <div className="space-y-3">
                    {enrolledCourses.length > 0 ? (
                      enrolledCourses.map((course) => (
                        <div key={course.course_code} className="p-4 border border-gray-700 rounded-xl bg-gray-800/30">
                          <div className="flex items-center justify-between">
                            <div className="w-full">
                              <span className="text-sm font-bold text-cyan-400">{course.course_code}</span>
                              <h4 className="font-medium text-white">{course.course_name}</h4>
                            </div>
                            <CheckCircle2 className="text-gray-500" size={20} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm italic text-gray-500">You are not enrolled in any courses yet.</p>
                    )}
                  </div>
                </div>

                {/* Column 2: Available Courses */}
                <div>
                  <h3 className="pb-2 mb-4 text-lg font-semibold text-white border-b border-gray-800">Available for Year {user?.yearLevel}</h3>
                  <div className="space-y-3">
                    {availableCourses.length > 0 ? (
                      availableCourses.map((course) => (
                        <div key={course.course_code} className="flex items-center justify-between p-4 transition-colors border border-gray-700 rounded-xl bg-gray-800/30 group hover:border-gray-500">
                          <div className="w-full">
                            <span className="text-sm font-bold text-gray-400">{course.course_code}</span>
                            <h4 className="font-medium text-white">{course.course_name}</h4>
                          </div>
                          
                          <button
                            onClick={() => handleEnroll(course.course_code)}
                            disabled={enrollingCourseCode === course.course_code}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-black transition-colors rounded-lg bg-[#00E5FF] hover:bg-[#00E5FF]/80 disabled:opacity-50"
                          >
                            {enrollingCourseCode === course.course_code ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <PlusCircle size={16} /> Enroll
                              </>
                            )}
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm italic text-gray-500">No more courses available to enroll in.</p>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;