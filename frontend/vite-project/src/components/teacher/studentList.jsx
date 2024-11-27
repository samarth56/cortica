import React, { useState, useEffect } from 'react';
import axios from 'axios';

const studentList = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [error, setError] = useState("");

  // Fetch attendance data from the server
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/attendance");
        setAttendanceList(response.data);
      } catch (err) {
        setError("Failed to fetch attendance data");
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Attendance List</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Student Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Selfie</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.length > 0 ? (
              attendanceList.map((attendance) => (
                <tr key={attendance._id} className="border-b">
                  <td className="px-4 py-2 text-sm text-gray-700">{attendance.studentName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{new Date(attendance.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{attendance.status}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {attendance.selfie ? (
                      <img src={attendance.selfie} alt="Selfie" className="w-12 h-12 object-cover rounded-full" />
                    ) : (
                      <span>No Selfie</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-sm text-gray-700">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default studentList;
