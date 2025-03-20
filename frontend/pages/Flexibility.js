import { useState } from "react";

function Flexibility() {
  const [requests, setRequests] = useState([
    { id: 1, type: "Trabajo Remoto", date: "2024-06-01", status: "Aprobado" },
    { id: 2, type: "Cambio de Horario", date: "2024-06-10", status: "Pendiente" },
  ]);
  const [newRequest, setNewRequest] = useState("");

  const handleAddRequest = () => {
    if (newRequest) {
      const newEntry = { id: requests.length + 1, type: newRequest, date: new Date().toISOString().split("T")[0], status: "Pendiente" };
      setRequests([...requests, newEntry]);
      setNewRequest("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Flexibilidad</h1>

      {/* Formulario para solicitar flexibilidad */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <label className="block mb-2 font-semibold">Selecciona el tipo de solicitud:</label>
        <select className="border p-2 w-full mb-2" value={newRequest} onChange={(e) => setNewRequest(e.target.value)}>
          <option value="">-- Selecciona una opción --</option>
          <option value="Trabajo Remoto">Trabajo Remoto</option>
          <option value="Horario Flexible">Horario Flexible</option>
          <option value="Semana Laboral Reducida">Semana Laboral Reducida</option>
          <option value="Día Libre Adicional">Día Libre Adicional</option>
        </select>
        <button onClick={handleAddRequest} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700">
          Enviar Solicitud
        </button>
      </div>

      {/* Lista de solicitudes enviadas */}
      <h2 className="text-xl font-semibold mb-2">Historial de Solicitudes</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Tipo de Solicitud</th>
            <th className="border p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="text-center">
              <td className="border p-2">{request.date}</td>
              <td className="border p-2">{request.type}</td>
              <td className={`border p-2 font-semibold ${request.status === "Aprobado" ? "text-green-600" : "text-yellow-600"}`}>
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Flexibility;
