import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Wellness from "../pages/Wellness";
import Flexibility from "../pages/Flexibility";
import Gamification from "../pages/Gamification";
import Login from "../pages/Login";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/wellness" element={<Wellness />} />
      <Route path="/flexibility" element={<Flexibility />} />
      <Route path="/gamification" element={<Gamification />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}

