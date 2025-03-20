// Cloudflare Worker para el componente de IA de eMotionTrack
// Este archivo es el punto de entrada para el Worker

// Configuración de CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

// Función para manejar solicitudes OPTIONS (preflight)
function handleOptions(request) {
  return new Response(null, {
    headers: corsHeaders
  });
}

// Función para generar recomendaciones basadas en evaluación de bienestar
async function generarRecomendaciones(datos) {
  // En una implementación real, aquí se utilizaría Workers AI para generar recomendaciones
  // basadas en modelos de machine learning
  
  // Extraer datos de la evaluación
  const { estres, satisfaccion, equilibrio, relaciones, pertenencia } = datos.respuestas;
  
  // Generar recomendaciones basadas en reglas simples
  const recomendaciones = [];
  
  if (estres > 7) {
    recomendaciones.push({
      categoria: "estres",
      descripcion: "Practicar técnicas de respiración durante 5 minutos al día",
      prioridad: "alta"
    });
    recomendaciones.push({
      categoria: "estres",
      descripcion: "Realizar pausas activas cada 2 horas de trabajo",
      prioridad: "media"
    });
  }
  
  if (equilibrio < 6) {
    recomendaciones.push({
      categoria: "equilibrio",
      descripcion: "Establecer horarios claros para trabajo y descanso",
      prioridad: "alta"
    });
    recomendaciones.push({
      categoria: "equilibrio",
      descripcion: "Implementar la técnica Pomodoro: 25 minutos de trabajo, 5 de descanso",
      prioridad: "media"
    });
  }
  
  if (relaciones < 7) {
    recomendaciones.push({
      categoria: "relaciones",
      descripcion: "Participar en actividades de team building con tu equipo",
      prioridad: "media"
    });
  }
  
  if (pertenencia < 6) {
    recomendaciones.push({
      categoria: "pertenencia",
      descripcion: "Unirse a comunidades internas relacionadas con tus intereses",
      prioridad: "media"
    });
  }
  
  if (satisfaccion < 6) {
    recomendaciones.push({
      categoria: "satisfaccion",
      descripcion: "Identificar aspectos positivos de tu trabajo diariamente",
      prioridad: "alta"
    });
  }
  
  // Si no hay recomendaciones específicas, añadir una general
  if (recomendaciones.length === 0) {
    recomendaciones.push({
      categoria: "general",
      descripcion: "Mantener hábitos saludables: ejercicio regular, alimentación balanceada y buen descanso",
      prioridad: "media"
    });
  }
  
  return {
    evaluacionId: datos.id,
    recomendaciones: recomendaciones
  };
}

// Función para analizar tendencias de bienestar
async function analizarTendencias(datos) {
  // En una implementación real, aquí se utilizaría Workers AI para analizar tendencias
  // basadas en datos históricos
  
  // Simulación de análisis de tendencias
  return {
    tendencia: datos.tendencia || "estable",
    prediccion: "Se espera una mejora gradual en los próximos 30 días",
    factoresRiesgo: datos.factoresRiesgo || ["Estrés elevado", "Equilibrio vida-trabajo bajo"],
    recomendacionesGenerales: [
      "Implementar programa de mindfulness en la organización",
      "Revisar políticas de flexibilidad horaria",
      "Fomentar actividades de team building"
    ]
  };
}

// Función para generar reportes de bienestar organizacional
async function generarReporte(datos) {
  // En una implementación real, aquí se utilizaría Workers AI para generar reportes
  // basados en datos agregados
  
  // Simulación de generación de reporte
  return {
    id: datos.id,
    titulo: datos.titulo,
    fechaGeneracion: new Date().toISOString(),
    indicadoresClave: {
      indiceBienestarPromedio: 7.2,
      tendencia: "mejora",
      participacion: "85%",
      satisfaccionGeneral: 7.5
    },
    departamentos: [
      {
        nombre: "IT",
        indiceBienestar: 6.8,
        factoresRiesgo: ["Estrés elevado", "Horas extra frecuentes"]
      },
      {
        nombre: "Marketing",
        indiceBienestar: 7.6,
        factoresRiesgo: ["Comunicación interna"]
      },
      {
        nombre: "RRHH",
        indiceBienestar: 8.1,
        factoresRiesgo: []
      }
    ],
    recomendaciones: [
      "Implementar pausas activas obligatorias en departamento IT",
      "Revisar carga de trabajo y distribución de tareas",
      "Fomentar actividades de integración interdepartamental"
    ]
  };
}

// Función principal del Worker
export default {
  async fetch(request, env, ctx) {
    // Manejar solicitudes OPTIONS
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }
    
    // Obtener la URL y la ruta
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Manejar diferentes rutas
    if (path === "/api/ia/recomendaciones" && request.method === "POST") {
      try {
        const datos = await request.json();
        const recomendaciones = await generarRecomendaciones(datos);
        
        return new Response(JSON.stringify(recomendaciones), {
          headers: corsHeaders
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: corsHeaders
        });
      }
    } 
    else if (path === "/api/ia/tendencias" && request.method === "POST") {
      try {
        const datos = await request.json();
        const tendencias = await analizarTendencias(datos);
        
        return new Response(JSON.stringify(tendencias), {
          headers: corsHeaders
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: corsHeaders
        });
      }
    }
    else if (path === "/api/ia/reportes" && request.method === "POST") {
      try {
        const datos = await request.json();
        const reporte = await generarReporte(datos);
        
        return new Response(JSON.stringify(reporte), {
          headers: corsHeaders
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: corsHeaders
        });
      }
    }
    else {
      return new Response(JSON.stringify({ error: "Ruta no encontrada" }), {
        status: 404,
        headers: corsHeaders
      });
    }
  }
};
