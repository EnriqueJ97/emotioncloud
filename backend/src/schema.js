// Esquema de la base de datos D1 para eMotionTrack
// Este archivo se utilizará para crear las tablas en D1

export async function createTables(db) {
  // Tabla de usuarios
  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      rol TEXT NOT NULL,
      organizacionId TEXT NOT NULL,
      fechaCreacion TEXT NOT NULL
    );
  `);

  // Tabla de organizaciones
  await db.exec(`
    CREATE TABLE IF NOT EXISTS organizaciones (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      plan TEXT NOT NULL,
      fechaCreacion TEXT NOT NULL
    );
  `);

  // Tabla de evaluaciones de bienestar
  await db.exec(`
    CREATE TABLE IF NOT EXISTS evaluaciones_bienestar (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      organizacionId TEXT NOT NULL,
      respuestas TEXT NOT NULL, -- JSON string
      indiceBienestar REAL NOT NULL,
      fecha TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES usuarios(id),
      FOREIGN KEY (organizacionId) REFERENCES organizaciones(id)
    );
  `);

  // Tabla de recomendaciones
  await db.exec(`
    CREATE TABLE IF NOT EXISTS recomendaciones (
      id TEXT PRIMARY KEY,
      evaluacionId TEXT NOT NULL,
      categoria TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      prioridad TEXT NOT NULL,
      fechaCreacion TEXT NOT NULL,
      FOREIGN KEY (evaluacionId) REFERENCES evaluaciones_bienestar(id)
    );
  `);

  // Tabla de retos
  await db.exec(`
    CREATE TABLE IF NOT EXISTS retos (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      categoria TEXT NOT NULL,
      puntosRecompensa INTEGER NOT NULL,
      organizacionId TEXT NOT NULL,
      duracion INTEGER NOT NULL,
      activo INTEGER NOT NULL,
      fechaCreacion TEXT NOT NULL,
      FOREIGN KEY (organizacionId) REFERENCES organizaciones(id)
    );
  `);

  // Tabla de retos asignados a usuarios
  await db.exec(`
    CREATE TABLE IF NOT EXISTS retos_usuario (
      id TEXT PRIMARY KEY,
      retoId TEXT NOT NULL,
      userId TEXT NOT NULL,
      organizacionId TEXT NOT NULL,
      fechaInicio TEXT NOT NULL,
      fechaFin TEXT NOT NULL,
      progresoActual INTEGER NOT NULL,
      completado INTEGER NOT NULL,
      FOREIGN KEY (retoId) REFERENCES retos(id),
      FOREIGN KEY (userId) REFERENCES usuarios(id),
      FOREIGN KEY (organizacionId) REFERENCES organizaciones(id)
    );
  `);

  // Tabla de solicitudes de horario flexible
  await db.exec(`
    CREATE TABLE IF NOT EXISTS solicitudes_flexibilidad (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      organizacionId TEXT NOT NULL,
      tipoSolicitud TEXT NOT NULL,
      fechaInicio TEXT NOT NULL,
      fechaFin TEXT NOT NULL,
      motivo TEXT NOT NULL,
      estado TEXT NOT NULL,
      fechaSolicitud TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES usuarios(id),
      FOREIGN KEY (organizacionId) REFERENCES organizaciones(id)
    );
  `);

  // Tabla de registro horario
  await db.exec(`
    CREATE TABLE IF NOT EXISTS registro_horario (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      organizacionId TEXT NOT NULL,
      fechaInicio TEXT NOT NULL,
      fechaFin TEXT NOT NULL,
      modalidad TEXT NOT NULL,
      horasTrabajadas REAL NOT NULL,
      fechaRegistro TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES usuarios(id),
      FOREIGN KEY (organizacionId) REFERENCES organizaciones(id)
    );
  `);

  // Tabla de reportes
  await db.exec(`
    CREATE TABLE IF NOT EXISTS reportes (
      id TEXT PRIMARY KEY,
      tipo TEXT NOT NULL,
      organizacionId TEXT NOT NULL,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      parametros TEXT NOT NULL, -- JSON string
      estado TEXT NOT NULL,
      fechaCreacion TEXT NOT NULL,
      fechaGeneracion TEXT,
      datos TEXT, -- JSON string
      FOREIGN KEY (organizacionId) REFERENCES organizaciones(id)
    );
  `);

  console.log('Tablas creadas correctamente');
}

// Función para insertar datos de ejemplo
export async function insertSampleData(db) {
  // Insertar organización de ejemplo
  await db.prepare(`
    INSERT INTO organizaciones (id, nombre, plan, fechaCreacion)
    VALUES (?, ?, ?, ?)
  `).bind(
    "org-1",
    "Empresa Ejemplo",
    "premium",
    new Date().toISOString()
  ).run();

  // Insertar usuarios de ejemplo
  await db.prepare(`
    INSERT INTO usuarios (id, email, nombre, rol, organizacionId, fechaCreacion)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(
    "user-1",
    "empleado@ejemplo.com",
    "Empleado Ejemplo",
    "empleado",
    "org-1",
    new Date().toISOString()
  ).run();

  await db.prepare(`
    INSERT INTO usuarios (id, email, nombre, rol, organizacionId, fechaCreacion)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(
    "user-2",
    "manager@ejemplo.com",
    "Manager Ejemplo",
    "manager",
    "org-1",
    new Date().toISOString()
  ).run();

  // Insertar retos de ejemplo
  await db.prepare(`
    INSERT INTO retos (id, nombre, descripcion, categoria, puntosRecompensa, organizacionId, duracion, activo, fechaCreacion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    "reto-1",
    "Meditación diaria",
    "Meditar durante 10 minutos cada día durante una semana",
    "bienestar",
    100,
    "org-1",
    7,
    1,
    new Date().toISOString()
  ).run();

  console.log('Datos de ejemplo insertados correctamente');
}
