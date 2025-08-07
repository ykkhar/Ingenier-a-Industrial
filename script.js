// Estructura de semestres con asignaturas y requisitos
const malla = {
  "Semestre 1": {
    "Preliminares de Matemática": [],
    "Algebra": ["Preliminares de Matemática"],
    "Análisis Matemático I a": ["Preliminares de Matemática"],
    "Ingeniería y Sistemas Socioeconómicos": []
  },
  "Semestre 2": {
    "Geometría Analítica": ["Algebra", "Análisis Matemático I a"],
    "Sistemas de Representación I": [],
    "Análisis Matemático I b": ["Análisis Matemático I a"],
    "Física I": ["Algebra", "Análisis Matemático I a"]
  },
  "Semestre 3": {
    "Análisis Matemático II": ["Geometría Analítica", "Análisis Matemático I b"],
    "Química General": ["Análisis Matemático I a"],
    "Física II": ["Física I", "Análisis Matemático I b"],
    "Estabilidad I": ["Física I", "Análisis Matemático I b", "Sistemas de Representación I"],
    "Inglés I": []
  }
  // Puedes seguir agregando más semestres...
};

// Set de asignaturas aprobadas
const aprobadas = new Set();

// Map de botones para acceder fácilmente y habilitar cuando sea necesario
const botones = new Map();

function crearMalla() {
  const contenedor = document.getElementById("malla");

  for (const [semestre, asignaturas] of Object.entries(malla)) {
    const columna = document.createElement("div");
    columna.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    columna.appendChild(titulo);

    for (const [asignatura, requisitos] of Object.entries(asignaturas)) {
      const card = document.createElement("div");
      card.className = "asignatura";
      card.id = asignatura;

      const nombre = document.createElement("h3");
      nombre.textContent = asignatura;

      const btn = document.createElement("button");
      btn.textContent = "Aprobar";
      btn.disabled = !requisitos.every(r => aprobadas.has(r));
      btn.addEventListener("click", () => aprobarAsignatura(asignatura));

      botones.set(asignatura, btn);

      card.appendChild(nombre);
      card.appendChild(btn);
      columna.appendChild(card);
    }

    contenedor.appendChild(columna);
  }
}

function aprobarAsignatura(nombre) {
  if (aprobadas.has(nombre)) return;

  aprobadas.add(nombre);

  const tarjeta = document.getElementById(nombre);
  tarjeta.classList.add("aprobada");

  const boton = botones.get(nombre);
  boton.disabled = true;
  boton.textContent = "Aprobada";

  actualizarDesbloqueos();
}

function actualizarDesbloqueos() {
  for (const [asignatura, requisitos] of Object.entries(flatten(malla))) {
    if (aprobadas.has(asignatura)) continue;

    const puedeDesbloquear = requisitos.every(r => aprobadas.has(r));
    if (puedeDesbloquear) {
      const btn = botones.get(asignatura);
      if (btn) btn.disabled = false;
    }
  }
}

function flatten(obj) {
  const result = {};
  for (const asignaturas of Object.values(obj)) {
    Object.assign(result, asignaturas);
  }
  return result;
}

window.onload = crearMalla;
