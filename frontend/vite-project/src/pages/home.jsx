import React, { useState, useRef } from "react";
import axios from "axios";

const Home = () => {
  const [attendanceData, setAttendanceData] = useState({
    date: "",
    status: "Present",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selfie, setSelfie] = useState(null); // Store the captured image
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPreviewActive, setIsPreviewActive] = useState(false); // Track if the preview is active
  const videoRef = useRef(null); // Reference to the video element
  const canvasRef = useRef(null); // Reference to the canvas element to draw the image

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData({ ...attendanceData, [name]: value });
  };

  // Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (err) {
      setError("Unable to access the camera.");
    }
  };

  // Capture the selfie from the video feed
  const captureSelfie = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg");
    setSelfie(image); // Store the captured image
    setIsPreviewActive(true); // Show the preview
    setIsCameraActive(false); // Stop the camera after capturing the image
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selfie) {
      setError("Please take a selfie before submitting.");
      return;
    }

    try {
      // Prepare the data to send
      const formData = new FormData();
      formData.append("date", attendanceData.date);
      formData.append("status", attendanceData.status);
      formData.append("selfie", selfie); // Attach the selfie

      const response = await axios.post(
        "http://localhost:4000/api/attendance", // Your backend endpoint
        formData
      );

      if (response.data.success) {
        setMessage("Attendance marked successfully!");
        setError("");
      } else {
        setError(response.data.message || "Something went wrong");
        setMessage("");
      }
    } catch (err) {
      setError("Server error");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Mark Attendance</h2>

        {/* Success/Error Messages */}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={attendanceData.date}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Attendance Status
            </label>
            <select
              id="status"
              name="status"
              value={attendanceData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          {/* Video feed */}
          {isCameraActive && (
            <div className="mb-4">
              <video
                ref={videoRef}
                autoPlay
                className="w-full h-auto rounded-lg border"
                style={{ border: "1px solid #ddd" }}
              />
            </div>
          )}

          {/* Canvas for capturing selfie */}
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="hidden"
            style={{ display: "none" }}
          />

          {!isCameraActive && !selfie && (
            <button
              type="button"
              onClick={startCamera}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Start Camera
            </button>
          )}

          {isCameraActive && !isPreviewActive && (
            <button
              type="button"
              onClick={captureSelfie}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Capture Selfie
            </button>
          )}

          {/* Preview of the selfie */}
          {isPreviewActive && (
            <div className="my-4">
              <p className="text-green-500 text-sm">Selfie Captured!</p>
              <img src={selfie} alt="Captured selfie" className="w-32 h-32 object-cover rounded-full" />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Mark Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
