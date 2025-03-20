import { useState } from "react";

function Wellness() {
  const [mood, setMood] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bienestar</h1>
      <p>¿Cómo te sientes hoy?</p>
      <div className="flex gap-4 mt-4">
        {["Excelente", "Bien", "Regular", "Mal"].map((option) => (
          <button key={option} className={`p-2 rounded ${mood === option ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setMood(option)}>
            {option}
          </button>
        ))}
      </div>
      {mood && <p className="mt-4">Estado seleccionado: <strong>{mood}</strong></p>}
    </div>
  );
}

export default Wellness;
