import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const policies = [
  { name: "Trabajo Remoto", impact: { satisfaction: +10, retention: +5, cost: -3, productivity: +7 } },
  { name: "Bono por Productividad", impact: { satisfaction: +8, retention: +4, cost: +10, productivity: +12 } },
  { name: "Horarios Flexibles", impact: { satisfaction: +12, retention: +7, cost: +2, productivity: +9 } },
  { name: "Semana Laboral de 4 Días", impact: { satisfaction: +15, retention: +10, cost: -5, productivity: +5 } },
  { name: "Capacitación Continua", impact: { satisfaction: +10, retention: +8, cost: +6, productivity: +11 } },
  { name: "Salario Emocional", impact: { satisfaction: +7, retention: +6, cost: +3, productivity: +8 } },
  { name: "Días Libres Ilimitados", impact: { satisfaction: +14, retention: +9, cost: +5, productivity: -2 } },
  { name: "Bonos por Retención", impact: { satisfaction: +5, retention: +12, cost: +8, productivity: +6 } },
  { name: "Revisión Salarial Anual", impact: { satisfaction: +10, retention: +6, cost: +12, productivity: +5 } },
  { name: "Programas de Salud Mental", impact: { satisfaction: +13, retention: +7, cost: +4, productivity: +6 } },
  { name: "Guardería en la Empresa", impact: { satisfaction: +9, retention: +8, cost: +10, productivity: +5 } },
  { name: "Transporte Gratuito", impact: { satisfaction: +6, retention: +4, cost: +7, productivity: +4 } },
  { name: "Almuerzos Subsidios", impact: { satisfaction: +7, retention: +5, cost: +6, productivity: +3 } },
  { name: "Flexibilidad en Vacaciones", impact: { satisfaction: +11, retention: +9, cost: +3, productivity: +4 } },
  { name: "Jornadas Comprimidas", impact: { satisfaction: +8, retention: +6, cost: -2, productivity: +10 } },
];

function PolicySimulator() {
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [metrics, setMetrics] = useState({ satisfaction: 50, retention: 50, cost: 50, productivity: 50 });

  const handlePolicyChange = (policy) => {
    let newPolicies = [...selectedPolicies];
    if (newPolicies.includes(policy.name)) {
      newPolicies = newPolicies.filter((p) => p !== policy.name);
    } else {
      newPolicies.push(policy.name);
    }
    setSelectedPolicies(newPolicies);

    let newMetrics = { satisfaction: 50, retention: 50, cost: 50, productivity: 50 };
    newPolicies.forEach((policyName) => {
      const selectedPolicy = policies.find((p) => p.name === policyName);
      newMetrics.satisfaction += selectedPolicy.impact.satisfaction;
      newMetrics.retention += selectedPolicy.impact.retention;
      newMetrics.cost += selectedPolicy.impact.cost;
      newMetrics.productivity += selectedPolicy.impact.productivity;
    });

    setMetrics(newMetrics);
  };

  const data = {
    labels: ["Satisfacción", "Retención", "Costos", "Productividad"],
    datasets: [{ label: "Impacto (%)", data: [metrics.satisfaction, metrics.retention, metrics.cost, metrics.productivity], backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#E91E63"] }]
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Simulador de Políticas de RRHH</h1>
      <p>Selecciona políticas para ver su impacto en la empresa.</p>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {policies.map((policy) => (
          <button
            key={policy.name}
            className={`p-2 rounded ${selectedPolicies.includes(policy.name) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => handlePolicyChange(policy)}
          >
            {policy.name}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <Bar data={data} />
      </div>
    </div>
  );
}

export default PolicySimulator;
