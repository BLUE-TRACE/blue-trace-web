import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateCourseModal = ({ onClose }) => {
  // 1. Define the state to hold our form data
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    yearLevel: '1',
    hall: '',
    startTime: '',
    endTime: '',
    day: 'Monday'
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  // 2. Handle typing in the input boxes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle the Submit button click (Connecting to your API!)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing
    setStatus({ type: 'loading', message: 'Creating course...' });

    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        setTimeout(() => onClose(), 2000); // Close the popup after 2 seconds
      } else {
        setStatus({ type: 'error', message: data.error });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to connect to the server.' });
    }
  };

  return (
    // The dark transparent background overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* The modal box */}
      <div className="bg-[#1A1A1A] border border-gray-700 rounded-xl w-full max-w-md p-6 relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute text-gray-400 top-4 right-4 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-teal-400">Create New Course</h2>

        {/* Status Message Display */}
        {status.message && (
          <div className={`mb-4 p-3 rounded text-sm ${status.type === 'error' ? 'bg-red-900/50 text-red-400' : 'bg-green-900/50 text-green-400'}`}>
            {status.message}
          </div>
        )}

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-400">Course Code</label>
              <input required type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} className="w-full p-2 text-white bg-black border border-gray-700 rounded outline-none focus:border-teal-500" placeholder="e.g. SE101" />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-400">Year Level</label>
              <select name="yearLevel" value={formData.yearLevel} onChange={handleChange} className="w-full p-2 text-white bg-black border border-gray-700 rounded outline-none focus:border-teal-500">
                <option value="1">Year 1</option><option value="2">Year 2</option>
                <option value="3">Year 3</option><option value="4">Year 4</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-400">Course Name</label>
            <input required type="text" name="courseName" value={formData.courseName} onChange={handleChange} className="w-full p-2 text-white bg-black border border-gray-700 rounded outline-none focus:border-teal-500" placeholder="e.g. Software Engineering" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-400">Hall/Room</label>
              <input required type="text" name="hall" value={formData.hall} onChange={handleChange} className="w-full p-2 text-white bg-black border border-gray-700 rounded outline-none focus:border-teal-500" placeholder="e.g. Room 405" />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-400">Day</label>
              <select name="day" value={formData.day} onChange={handleChange} className="w-full p-2 text-white bg-black border border-gray-700 rounded outline-none focus:border-teal-500">
                <option value="Monday">Monday</option><option value="Tuesday">Tuesday</option><option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option><option value="Friday">Friday</option><option value="Saturday">Saturday</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-400">Start Time</label>
              <input required type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="w-full p-2 text-white bg-black border border-gray-700 rounded outline-none focus:border-teal-500" />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-400">End Time</label>
              <input required type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="w-full p-2 text-white bg-black border border-gray-700 rounded outline-none focus:border-teal-500" />
            </div>
          </div>

          <button type="submit" className="w-full py-3 mt-4 font-bold text-white transition-colors bg-teal-600 rounded-lg hover:bg-teal-500">
            {status.type === 'loading' ? 'Saving...' : 'Save Course'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateCourseModal;