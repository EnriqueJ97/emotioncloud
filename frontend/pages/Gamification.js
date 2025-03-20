import { useState, useEffect } from "react";

function Gamification() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setRanking([
        { name: "Usuario1", points: 1200 },
        { name: "Usuario2", points: 1100 },
        { name: "Usuario3", points: 900 }
      ]);
    }, 1000);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Gamificación</h1>
      <ul className="mt-4">
        {ranking.map((user, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded mb-2">{index + 1}. {user.name} - {user.points} pts</li>
        ))}
      </ul>
    </div>
  );
}

export default Gamification;
