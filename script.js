const asignaturas = {
  "Preliminares de Matemática": [],
  "Algebra": ["Preliminares de Matemática"],
  "Análisis Matemático I a": ["Preliminares de Matemática"],
  "Ingeniería y Sistemas Socioeconómicos": [],

  "Geometría Analítica": ["Algebra", "Análisis Matemático I a"],
  "Sistemas de Representación I": [],
  "Análisis Matemático I b": ["Análisis Matemático I a"],
  "Física I": ["Algebra", "Análisis Matemático I a"],

  "Análisis Matemático II": ["Geometría Analítica", "Análisis Matemático I b"],
  "Química General": ["Análisis Matemático I a"],
  "Física II": ["Física I", "Análisis Matemático I b"],
  "Estabilidad I": ["Física I", "Análisis Matemático I b", "Sistemas de Representación I"],
  "Inglés I": [],

  "Análisis Matemático III": ["Análisis Matemático II"],
  "Estabilidad II": ["Estabilidad I"],
  "Probabilidad y Estadística": ["Algebra", "Análisis Matemático I b"],
  "Métodos Numéricos": ["Análisis Matemático II"],
  "Computación I": ["Algebra"],
  "Inglés II": ["Inglés I"],

  "Termodinámica": ["Física I", "Química General", "Análisis Matemático II"],
  "Computación II": ["Computación I"],
  "Sistemas de Representación II": ["Sistemas de Representación I", "Computación I"],
  "Conocimiento de Materiales": ["Química General", "Estabilidad II"],
  "Mecánica Racional": ["Análisis Matemático II"],

  "Elementos de Máquinas": ["Conocimiento de Materiales", "Mecánica Racional"],
  "Introducción a la Economía": ["Ingeniería y Sistemas Socioeconómicos", "Inglés I", "Probabilidad y Estadística"],
  "Física III": ["Mecánica Racional", "Inglés I", "Análisis Matemático III", "Probabilidad y Estadística"],
  "Electrotecnia General": ["Física II", "Análisis Matemático III", "Inglés I"],
  "Mecánica de los Fluidos": ["Análisis Matemático III", "Mecánica Racional", "Termodinámica"],

  "Máquinas y Medidas Eléctricas": ["Elementos de Máquinas", "Electrotecnia General"],
  "Electrónica I": ["Física III", "Electrotecnia General"],
  "Tecnología Mecánica": ["Elementos de Máquinas"],
  "Organización Industrial I": ["Introducción a la Economía"],

  "Investigación Operativa": ["Organización Industrial I", "Inglés II"],
  "Organización Industrial II": ["Organización Industrial I"],
  "Instalaciones Eléctricas": ["Máquinas y Medidas Eléctricas", "Inglés II"],
  "Máquinas Térmicas": ["Métodos Numéricos", "Mecánica de los Fluidos", "Elementos de Máquinas"],
  "Máquinas Hidráulicas": ["Mecánica de los Fluidos", "Elementos de Máquinas"],

  "Legislación": ["Organización Industrial II"],
  "Instalaciones Industriales": ["Máquinas Hidráulicas", "Máquinas Térmicas", "Máquinas y Medidas Eléctricas"],
  "Gestión de Calidad": ["Organización Industrial II", "Investigación Operativa"],
  "Organización Industrial III": ["Organización Industrial II"],
  "Seguridad, Higiene y Gestión Ambiental": ["Organización Industrial II"],
  "Costos Industriales": ["Organización Industrial II"],

  "Electiva 1": [],
  "Electiva 2": [],
  "Electiva 3": [],
  "Electiva 4": [],

  "Emprendedurismo y Proyecto de Inversión": [
    "Instalaciones Eléctricas", "Gestión de Calidad", "Organización Industrial III", 
    "Seguridad, Higiene y Gestión Ambiental", "Costos Industriales", "Legislación", 
    "Electiva 1", "Electiva 2", "Electiva 3", "Electiva 4"
  ],

  "Proyecto Final de Ingeniería": ["Emprendedurismo y Proyecto de Inversión"]
};

const aprobadas = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");

  for (const nombre in asignaturas) {
    const div = document.createElement("div");
    div.className = "asignatura";
    div.id = nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = nombre;

    const boton = document.createElement("button");
    boton.textContent = "Aprobar";
    boton.disabled = asignaturas[nombre].length > 0; // solo habilitado si no tiene requisitos

    boton.addEventListener("click", () => aprobarAsignatura(nombre));

    div.appendChild(titulo);
    div.appendChild(boton);
    contenedor.appendChild(div);
  }
}

function aprobarAsignatura(nombre) {
  if (aprobadas.has(nombre)) return;

  aprobadas.add(nombre);

  const div = document.getElementById(nombre);
  div.classList.add("aprobada");

  const boton = div.querySelector("button");
  boton.disabled = true;
  boton.textContent = "Aprobada";

  // Revisar qué asignaturas ahora pueden desbloquearse
  for (const siguiente in asignaturas) {
    const requisitos = asignaturas[siguiente];
    const divSig = document.getElementById(siguiente);
    const botonSig = divSig.querySelector("button");

    if (!aprobadas.has(siguiente)) {
      const todosAprobados = requisitos.every(req => aprobadas.has(req));
      if (todosAprobados) {
        botonSig.disabled = false;
      }
    }
  }
}

crearMalla();
