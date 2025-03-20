import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-full p-4">
      <h2 className="text-lg font-bold mb-4">eMotionTrack</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link></li>
          <li><Link to="/wellness" className="block py-2 px-4 hover:bg-gray-700">Bienestar</Link></li>
          <li><Link to="/gamification" className="block py-2 px-4 hover:bg-gray-700">Gamificación</Link></li>
          <li><Link to="/flexibility" className="block py-2 px-4 hover:bg-gray-700">Flexibilidad</Link></li>
          <li><Link to="/culture-simulator" className="block py-2 px-4 hover:bg-gray-700">Cultura</Link></li>
          <li><Link to="/csrd" className="block py-2 px-4 hover:bg-gray-700">CSRD</Link></li>
          <li><Link to="/reports" className="block py-2 px-4 hover:bg-gray-700">Reportes</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
