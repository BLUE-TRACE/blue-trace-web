import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, PlusCircle, User } from 'lucide-react';
import { useSelector } from 'react-redux'; // <-- NEW: Import Redux to get the real user!

const LecturerProfile = () => {
  // 1. Grab the REAL logged-in user from your Redux store
  const { user } = useSelector((state) => state.auth);

  // 2. Dropdown Toggle States
  const [openAssignedYears, setOpenAssignedYears] = useState({ 1: true, 2: false, 3: false, 4: false });
  const [openAvailableYears, setOpenAvailableYears] = useState({ 1: true, 2: false, 3: false, 4: false });

  // 3. Real Data States
  const [assignedCourses, setAssignedCourses] = useState({ 1: [], 2: [], 3: [], 4: [] });
  const [availableCourses, setAvailableCourses] = useState({ 1: [], 2: [], 3: [], 4: [] });

  // 4. Fetch Function using the REAL user ID
  const fetchCourses = async () => {
    if (!user?.id) return; // Safety check: Don't fetch until Redux has loaded the user

    try {
      const response = await fetch(`http://localhost:5000/api/lecturer/${user.id}/courses`);
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

  // Run fetch immediately when the page loads, or if the user object changes
  useEffect(() => {
    fetchCourses();
  }, [user]); 

  const toggleYear = (year, type) => {
    if (type === 'assigned') {
      setOpenAssignedYears(prev => ({ ...prev, [year]: !prev[year] }));
    } else {
      setOpenAvailableYears(prev => ({ ...prev, [year]: !prev[year] }));
    }
  };

  // 5. The Assign Function using the REAL user ID
  const handleAssignCourse = async (courseCode) => {
    try {
      const response = await fetch('http://localhost:5000/api/assign-lecturer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          lecturerId: user.id, // Using real Redux ID
          courseCode: courseCode 
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);
        fetchCourses(); // Instantly refresh
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
              // FIXED ALIGNMENT: Added gap-4, flex-1, min-w-0, and shrink-0
              <div key={course.code} className="flex items-center justify-between p-3 border border-gray-800 rounded-md bg-[#1A1A1A] gap-4">
                
                {/* Text Container: flex-1 allows it to take space, min-w-0 prevents it from pushing the button out */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#00E5FF] truncate">{course.code}</h4>
                  <p className="text-sm text-gray-300 truncate" title={course.name}>{course.name}</p>
                </div>

                {/* Button Container: shrink-0 guarantees the button never gets squished */}
                <div className="shrink-0 flex justify-end">
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
          <div className="flex items-center justify-center w-24 h-24 bg-[#1A1A1A] rounded-full text-[#00E5FF] border-2 border-[#00E5FF]/30 shrink-0">
            <User size={40} />
          </div>
          <div>
            {/* Using REAL Redux Data */}
            <h1 className="mb-2 text-3xl font-bold">{user?.username || 'Loading Name...'}</h1>
            <p className="text-gray-400">Lecturer ID: <span className="font-semibold text-white">{user?.id || '...'}</span></p>
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