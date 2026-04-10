import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, PlusCircle, User } from 'lucide-react';

const LecturerProfile = () => {
  // 1. User Info State (You will eventually get this from your login token/context)
  const [lecturerInfo] = useState({
    name: 'Dr. Sarah Connor',
    userId: '11',
  });

  // 2. Dropdown Toggle States (Tracks which years are open/closed)
  const [openAssignedYears, setOpenAssignedYears] = useState({ 1: true, 2: false, 3: false, 4: false });
  const [openAvailableYears, setOpenAvailableYears] = useState({ 1: true, 2: false, 3: false, 4: false });

  // 3. Real Data States (Starts empty, gets filled by the database!)
  const [assignedCourses, setAssignedCourses] = useState({ 1: [], 2: [], 3: [], 4: [] });
  const [availableCourses, setAvailableCourses] = useState({ 1: [], 2: [], 3: [], 4: [] });

  // NEW: The function that calls your GET API to grab the courses
  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/lecturer/${lecturerInfo.userId}/courses`);
      const data = await response.json();
      
      if (response.ok) {
        setAssignedCourses(data.assigned);
        setAvailableCourses(data.available);
      } else {
        console.error("Failed to fetch courses:", data.error);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // NEW: Fire the fetch function automatically when the page loads
  useEffect(() => {
    fetchCourses();
  }, []); // The empty array means "only run this once when the page opens"

  const toggleYear = (year, type) => {
    if (type === 'assigned') {
      setOpenAssignedYears(prev => ({ ...prev, [year]: !prev[year] }));
    } else {
      setOpenAvailableYears(prev => ({ ...prev, [year]: !prev[year] }));
    }
  };

  // 4. The Assign Function connecting to your POST API
  const handleAssignCourse = async (courseCode) => {
    try {
      const response = await fetch('http://localhost:5000/api/assign-lecturer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          lecturerId: lecturerInfo.userId, 
          courseCode: courseCode 
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);
        fetchCourses(); // <-- NEW: Instantly refresh the lists so the UI updates!
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Could not connect to the server.");
    }
  };

  // Reusable Component for the Dropdown Sections
  const CourseDropdown = ({ year, courses, isOpen, toggleFunc, type }) => (
    <div className="mb-4 bg-[#1A1A1A] border border-gray-700 rounded-lg overflow-hidden">
      <button 
        onClick={() => toggleFunc(year, type)}
        className="flex items-center justify-between w-full p-4 text-left transition-colors hover:bg-[#2A2A2A]"
      >
        <span className="font-semibold text-white">Year {year}</span>
        {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      
      {isOpen && (
        <div className="p-4 space-y-3 bg-[#111111] border-t border-gray-700">
          {(!courses || courses.length === 0) ? (
            <p className="text-sm text-gray-500">No courses available.</p>
          ) : (
            courses.map((course) => (
              <div key={course.code} className="flex items-center justify-between p-3 border border-gray-800 rounded-md bg-[#1A1A1A]">
                <div>
                  <h4 className="font-bold text-[#00E5FF]">{course.code}</h4>
                  <p className="text-sm text-gray-300">{course.name}</p>
                </div>
                {type === 'available' ? (
                  <button 
                    onClick={() => handleAssignCourse(course.code)}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-semibold text-white transition-colors bg-[#00E5FF] rounded hover:bg-[#00B3CC]"
                  >
                    <PlusCircle size={16} /> Enroll
                  </button>
                ) : (
                  <CheckCircle size={20} className="text-gray-500" />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-8 font-sans text-white bg-black">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header Block */}
        <div className="bg-[#2A2A2A] rounded-xl p-8 border border-gray-800 flex items-center gap-6">
          <div className="flex items-center justify-center w-24 h-24 bg-[#1A1A1A] rounded-full text-[#00E5FF] border-2 border-[#00E5FF]/30">
            <User size={40} />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold">{lecturerInfo.name}</h1>
            <p className="text-gray-400">Lecturer ID: <span className="font-semibold text-white">{lecturerInfo.userId}</span></p>
          </div>
        </div>

        {/* 2-Column Course Assignment Section */}
        <div className="bg-[#2A2A2A] rounded-xl p-8 border border-gray-800">
          <h2 className="flex items-center gap-2 mb-8 text-xl font-bold">
            <span className="text-[#00E5FF]">📖</span> Course Enrollments
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            
            {/* Left Column: Currently Assigned */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-center text-gray-300">Currently Enrolled</h3>
              {[1, 2, 3, 4].map(year => (
                <CourseDropdown 
                  key={`assigned-${year}`} year={year} type="assigned"
                  courses={assignedCourses[year]} isOpen={openAssignedYears[year]} 
                  toggleFunc={toggleYear}
                />
              ))}
            </div>

            {/* Right Column: Available for Assignment */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-center text-gray-300">Available for Assignment</h3>
              {[1, 2, 3, 4].map(year => (
                <CourseDropdown 
                  key={`avail-${year}`} year={year} type="available"
                  courses={availableCourses[year]} isOpen={openAvailableYears[year]} 
                  toggleFunc={toggleYear}
                />
              ))}
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LecturerProfile;