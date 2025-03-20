import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700">Bienestar</h2>
              <p className="text-gray-500">Accede a tus métricas de bienestar.</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700">Flexibilidad</h2>
              <p className="text-gray-500">Gestiona tus solicitudes de flexibilidad.</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700">Retos & Gamificación</h2>
              <p className="text-gray-500">Participa y gana recompensas.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
