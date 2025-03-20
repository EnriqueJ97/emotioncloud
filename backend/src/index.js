// Cloudflare Worker para el backend de eMotionTrack
// Este archivo es el punto de entrada para el Worker

import { Router } from 'itty-router';
import { json } from 'itty-router-extras';

// Crear el router
const router = Router();

// Middleware para CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Middleware para manejar OPTIONS (preflight)
router.options('*', () => {
  return new Response(null, {
    headers: corsHeaders,
  });
});

// Middleware para autenticación
const authenticate = async (request) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  // En una implementación real, verificaríamos el token
  // Por ahora, simplemente permitimos cualquier token
  return null;
};

// Rutas de bienestar
router.post('/api/bienestar/evaluaciones', async (request) => {
  try {
    const data = await request.json();
    
    // Calcular índice de bienestar (simplificado)
    const respuestas = data.respuestas;
    const indiceBienestar = Object.values(respuestas).reduce((sum, val) => sum + val, 0) / Object.values(respuestas).length;
    
    // En una implementación real, guardaríamos esto en D1
    const evaluacion = {
      id: crypto.randomUUID(),
      userId: data.userId,
      organizacionId: data.organizacionId,
      respuestas: respuestas,
      indiceBienestar: indiceBienestar,
      fecha: new Date().toISOString()
    };
    
    return json(evaluacion, { headers: corsHeaders });
  } catch (error) {
    return json({ error: error.message }, { status: 400, headers: corsHeaders });
  }
});

router.get('/api/bienestar/evaluaciones/:id/recomendaciones', async (request) => {
  try {
    const { id } = request.params;
    
    // En una implementación real, buscaríamos la evaluación en D1
    // y generaríamos recomendaciones basadas en los resultados
    
    // Recomendaciones de ejemplo
    const recomendaciones = {
      evaluacionId: id,
      recomendaciones: [
        {
          id: crypto.randomUUID(),
          categoria: "estres",
          descripcion: "Practicar técnicas de respiración durante 5 minutos al día",
          prioridad: "alta"
        },
        {
          id: crypto.randomUUID(),
          categoria: "equilibrio",
          descripcion: "Establecer horarios claros para trabajo y descanso",
          prioridad: "media"
        }
      ]
    };
    
    return json(recomendaciones, { headers: corsHeaders });
  } catch (error) {
    return json({ error: error.message }, { status: 400, headers: corsHeaders });
  }
});

// Rutas de gamificación
router.post('/api/gamificacion/retos', async (request) => {
  try {
    const data = await request.json();
    
    // En una implementación real, guardaríamos esto en D1
    const reto = {
      id: crypto.randomUUID(),
      ...data,
      fechaCreacion: new Date().toISOString()
    };
    
    return json(reto, { headers: corsHeaders });
  } catch (error) {
    return json({ error: error.message }, { status: 400, headers: corsHeaders });
  }
});

router.post('/api/gamificacion/retos-usuario', async (request) => {
  try {
    const data = await request.json();
    
    // En una implementación real, verificaríamos que el reto existe en D1
    const fechaInicio = new Date().toISOString();
    const fechaFin = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 días después
    
    const retoUsuario = {
      id: crypto.randomUUID(),
      retoId: data.retoId,
      userId: data.userId,
      organizacionId: data.organizacionId,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      progresoActual: 0,
      completado: false
    };
    
    return json(retoUsuario, { headers: corsHeaders });
  } catch (error) {
    return json({ error: error.message }, { status: 400, headers: corsHeaders });
  }
});

// Rutas de flexibilidad horaria
router.post('/api/flexibilidad/solicitudes', async (request) => {
  try {
    const data = await request.json();
    
    // En una implementación real, guardaríamos esto en D1
    const solicitud = {
      id: crypto.randomUUID(),
      ...data,
      estado: "PENDIENTE",
      fechaSolicitud: new Date().toISOString()
    };
    
    return json(solicitud, { headers: corsHeaders });
  } catch (error) {
    return json({ error: error.message }, { status: 400, headers: corsHeaders });
  }
});

router.post('/api/flexibilidad/registro-horario', async (request) => {
  try {
    const data = await request.json();
    
    // Calcular horas trabajadas
    const fechaInicio = new Date(data.fechaInicio);
    const fechaFin = new Date(data.fechaFin);
    const horasTrabajadas = (fechaFin - fechaInicio) / (1000 * 60 * 60);
    
    // En una implementación real, guardaríamos esto en D1
    const registro = {
      id: crypto.randomUUID(),
      ...data,
      horasTrabajadas: horasTrabajadas,
      fechaRegistro: new Date().toISOString()
    };
    
    return json(registro, { headers: corsHeaders });
  } catch (error) {
    return json({ error: error.message }, { status: 400, headers: corsHeaders });
  }
});

// Rutas de reportes
router.post('/api/reportes', async (request) => {
  try {
    const data = await request.json();
    
    // En una implementación real, guardaríamos esto en D1
    const reporte = {
      id: crypto.randomUUID(),
      ...data,
      estado: "PENDIENTE",
      fechaCreacion: new Date().toISOString()
    };
    
    return json(reporte, { headers: corsHeaders });
  } catch (error) {
    return json({ error: error.message }, { status: 400, headers: corsHeaders });
  }
});

router.post('/api/reportes/:id/generar', async (request) => {
  try {
    const { id } = request.params;
    
    // En una implementación real, buscaríamos el reporte en D1
    // y generaríamos el reporte basado en los parámetros
    
    // Reporte de ejemplo
    const reporte = {
      id: id,
      estado: "COMPLETADO",
      fechaGeneracion: new Date().toISOString(),
      datos: {
        indiceBienestarPromedio: 7.2,
        tendencia: "MEJORA",
        factoresRiesgo: ["Estrés en departamento IT"],
        recomendaciones: ["Implementar pausas activas en departamento IT"]
      }
    };
    
    return json(reporte, { headers: corsHeaders });
  } catch (error) {
    return json({ error: error.message }, { status: 400, headers: corsHeaders });
  }
});

// Ruta para autenticación
router.post('/api/auth/login', async (request) => {
  try {
    const { email, password } = await request.json();
    
    // En una implementación real, verificaríamos las credenciales en D1
    // Por ahora, aceptamos cualquier combinación de email/password
    
    const user = {
      id: "123",
      email: email,
      nombre: "Usuario Ejemplo",
      rol: "empleado"
    };
    
    // Generar un token simple (en producción usaríamos JWT)
    const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));
    
    return json({
      access_token: token,
      user: user
    }, { headers: corsHeaders });
  } catch (error) {
    return json({ error: error.message }, { status: 400, headers: corsHeaders });
  }
});

// Ruta de fallback para 404
router.all('*', () => {
  return json({ error: 'Ruta no encontrada' }, { status: 404, headers: corsHeaders });
});

// Función principal del Worker
export default {
  async fetch(request, env, ctx) {
    // Añadir CORS a todas las respuestas
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }
    
    // Manejar la solicitud con el router
    return router.handle(request);
  }
};
