import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Reports from "../pages/Reports";
import CSRD from "../pages/CSRD";
import CultureSimulator from "../pages/CultureSimulator";
import Flexibility from "../pages/Flexibility";
import Gamification from "../pages/Gamification";
import Wellness from "../pages/Wellness";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/csrd" element={<CSRD />} />
      <Route path="/culture-simulator" element={<CultureSimulator />} />
      <Route path="/flexibility" element={<Flexibility />} />
      <Route path="/gamification" element={<Gamification />} />
      <Route path="/wellness" element={<Wellness />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Dashboard />} /> {/* Redirección por defecto */}
    </Routes>
  );
};

export default RoutesConfig;
