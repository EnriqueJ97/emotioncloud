import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700">Bienvenido a eMotionTrack</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
        Cerrar sesión
      </button>
    </header>
  );
}
