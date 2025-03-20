export function Header({ onLogout }) {
    return (
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-lg font-bold">eMotionTrack</h1>
        <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
          Cerrar sesión
        </button>
      </header>
    );
  }
  