const malla = {
  "Semestre 1": {
    "Preliminares de Matemática": [],
    "Álgebra": ["Preliminares de Matemática"],
    "Análisis Matemático I a": ["Preliminares de Matemática"],
    "Ingeniería y Sistemas Socioeconómicos": []
  },
  "Semestre 2": {
    "Geometría Analítica": ["Álgebra", "Análisis Matemático I a"],
    "Sistemas de Representación I": [],
    "Análisis Matemático I b": ["Análisis Matemático I a"],
    "Física I": ["Álgebra", "Análisis Matemático I a"]
  },
  "Semestre 3": {
    "Análisis Matemático II": ["Geometría Analítica", "Análisis Matemático I b"],
    "Química General": ["Análisis Matemático I a"],
    "Física II": ["Física I", "Análisis Matemático I b"],
    "Estabilidad I": ["Física I", "Análisis Matemático I b", "Sistemas de Representación I"],
    "Inglés I": []
  }
};

const aprobadas = new Set();
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
      btn.disabled = requisitos.length > 0 && !requisitos.every(r => aprobadas.has(r));
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

  const card = document.getElementById(nombre);
  card.classList.add("aprobada");

  const btn = botones.get(nombre);
  btn.disabled = true;
  btn.textContent = "Aprobada";

  desbloquearAsignaturas();
}

function desbloquearAsignaturas() {
  for (const [asignatura, requisitos] of Object.entries(flattenMalla())) {
    if (aprobadas.has(asignatura)) continue;

    const puedeDesbloquear = requisitos.every(r => aprobadas.has(r));
    if (puedeDesbloquear) {
      const btn = botones.get(asignatura);
      if (btn) btn.disabled = false;
    }
  }
}

function flattenMalla() {
  const plano = {};
  for (const asignaturas of Object.values(malla)) {
    Object.assign(plano, asignaturas);
  }
  return plano;
}

window.onload = crearMalla;
