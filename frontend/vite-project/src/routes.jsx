import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login"; // Ensure path is correct
import Register from "./components/auth/register";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/adminDashboard";
import Error404 from "./pages/error404";
import StudentList from "./components/teacher/studentList";


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} /> {/* Correct home route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/studentList" element={<StudentList />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
