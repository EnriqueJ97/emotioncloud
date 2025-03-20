import { Link } from "react-router-dom";
import { HomeIcon, ChartBarIcon, UserIcon } from "@heroicons/react/outline";

export function Sidebar() {
  return (
    <aside className="w-64 bg-blue-600 text-white p-6">
      <h2 className="text-2xl font-bold">eMotionTrack</h2>
      <nav className="mt-6">
        <Link className="flex items-center py-2 hover:bg-blue-500 px-3 rounded" to="/dashboard">
          <HomeIcon className="w-6 h-6 mr-3" /> Dashboard
        </Link>
        <Link className="flex items-center py-2 hover:bg-blue-500 px-3 rounded" to="/wellness">
          <ChartBarIcon className="w-6 h-6 mr-3" /> Bienestar
        </Link>
        <Link className="flex items-center py-2 hover:bg-blue-500 px-3 rounded" to="/flexibility">
          <UserIcon className="w-6 h-6 mr-3" /> Flexibilidad
        </Link>
      </nav>
    </aside>
  );
}
