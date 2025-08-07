// Datos de la malla
const malla = {
  "I": [
    { nombre: "Preliminares de Matemática", abre: ["Algebra", "Análisis Matemático I a"] },
    { nombre: "Algebra", abre: ["Geometría Analítica", "Física I", "Probabilidad y Estadística", "Computación I"] },
    { nombre: "Análisis Matemático I a", abre: ["Geometría Analítica", "Análisis Matemático I b", "Física I", "Química General"] },
    { nombre: "Ingeniería y Sistemas Socioeconómicos", abre: ["Introducción a la Economía"] }
  ],
  "II": [
    { nombre: "Geometría Analítica", abre: ["Análisis Matemático II"] },
    { nombre: "Sistemas de Representación I", abre: ["Estabilidad I", "Sistemas de Representación II"] },
    { nombre: "Análisis Matemático I b", abre: ["Análisis Matemático II", "Física II", "Estabilidad I", "Probabilidad y Estadística"] },
    { nombre: "Física I", abre: ["Física II", "Estabilidad I", "Termodinámica", "Mecánica Racional"] }
  ],
  "III": [
    { nombre: "Análisis Matemático II", abre: ["Análisis Matemático III", "Métodos Numéricos", "Termodinámica", "Mecánica Racional"] },
    { nombre: "Química General", abre: ["Termodinámica", "Conocimiento de Materiales"] },
    { nombre: "Física II", abre: ["Electrotecnia General"] },
    { nombre: "Estabilidad I", abre: ["Estabilidad II"] },
    { nombre: "Inglés I", abre: ["Inglés II", "Electrotecnia General", "Elementos de Máquinas", "Física III", "Introducción a la Economía", "Mecánica de los Fluidos"] }
  ],
  "IV": [
    { nombre: "Análisis Matemático III", abre: ["Física III", "Electrotecnia General", "Mecánica de los Fluidos"] },
    { nombre: "Estabilidad II", abre: ["Conocimiento de Materiales"] },
    { nombre: "Probabilidad y Estadística", abre: ["Introducción a la Economía", "Física III", "Máquinas y Medidas Eléctricas"] },
    { nombre: "Métodos Numéricos", abre: ["Máquinas Térmicas"] },
    { nombre: "Computación I", abre: ["Computación II", "Sistemas de Representación II"] },
    { nombre: "Inglés II", abre: ["Instalaciones Eléctricas", "Investigación Operativa", "Máquinas Hidráulicas", "Máquinas Térmicas", "Organización Industrial II"] }
  ],
  "V": [
    { nombre: "Termodinámica", abre: ["Mecánica de los Fluidos"] },
    { nombre: "Computación II", abre: [] },
    { nombre: "Sistemas de Representación II", abre: [] },
    { nombre: "Conocimiento de Materiales", abre: ["Elementos de Máquinas"] },
    { nombre: "Mecánica Racional", abre: ["Elementos de Máquinas", "Física III", "Mecánica de los Fluidos"] }
  ],
  "VI": [
    { nombre: "Elementos de Máquinas", abre: ["Máquinas y Medidas Eléctricas", "Tecnología Mecánica", "Máquinas Hidráulicas", "Máquinas Térmicas"] },
    { nombre: "Introducción a la Economía", abre: ["Organización Industrial I"] },
    { nombre: "Física III", abre: ["Electrónica I"] },
    { nombre: "Electrotecnia General", abre: ["Máquinas y Medidas Eléctricas", "Electrónica I"] },
    { nombre: "Mecánica de los Fluidos", abre: ["Máquinas Térmicas", "Máquinas Hidráulicas"] }
  ],
  "VII": [
    { nombre: "Máquinas y Medidas Eléctricas", abre: ["Instalaciones Eléctricas", "Instalaciones Industriales"] },
    { nombre: "Electrónica I", abre: [] },
    { nombre: "Tecnología Mecánica", abre: [] },
    { nombre: "Organización Industrial I", abre: ["Investigación Operativa", "Organización Industrial II"] }
  ],
  "VIII": [
    { nombre: "Investigación Operativa", abre: ["Gestión de Calidad"] },
    { nombre: "Organización Industrial II", abre: ["Legislación", "Gestión de Calidad", "Organización Industrial III", "Seguridad, Higiene y Gestión Ambiental", "Costos Industriales"] },
    { nombre: "Instalaciones Eléctricas", abre: ["Emprendedurismo y Proyecto de Inversión"] },
    { nombre: "Máquinas Térmicas", abre: ["Instalaciones Industriales"] },
    { nombre: "Máquinas Hidráulicas", abre: ["Instalaciones Industriales"] }
  ],
  "IX": [
    { nombre: "Legislación", abre: ["Emprendedurismo y Proyecto de Inversión"] },
    { nombre: "Instalaciones Industriales", abre: [] },
    { nombre: "Gestión de Calidad", abre: ["Emprendedurismo y Proyecto de Inversión"] },
    { nombre: "Organización Industrial III", abre: ["Emprendedurismo y Proyecto de Inversión"] },
    { nombre: "Seguridad, Higiene y Gestión Ambiental", abre: ["Emprendedurismo y Proyecto de Inversión"] },
    { nombre: "Costos Industriales", abre: ["Emprendedurismo y Proyecto de Inversión"] }
  ],
  "X": [
    { nombre: "Electiva 1", abre: ["Emprendedurismo y Proyecto de Inversión"] },
    { nombre: "Electiva 2", abre: ["Emprendedurismo y Proyecto de Inversión"] },
    { nombre: "Electiva 3", abre: ["Emprendedurismo y Proyecto de Inversión"] },
    { nombre: "Electiva 4", abre: ["Emprendedurismo y Proyecto de Inversión"] }
  ],
  "XI": [
    { nombre: "Emprendedurismo y Proyecto de Inversión", abre: ["Proyecto Final de Ingeniería"] }
  ],
  "Final": [
    { nombre: "Proyecto Final de Ingeniería", abre: [] }
  ]
};

// Estado de cada ramo
const estadoRamos = {};

// Inicializar DOM
// Construir estadoRamos primero (toda la lógica de requisitos)
for (const [semestre, ramos] of Object.entries(malla)) {
  for (const ramo of ramos) {
    if (!estadoRamos[ramo.nombre]) {
      estadoRamos[ramo.nombre] = { aprobado: false, requisitos: [], abre: ramo.abre };
    }
    for (const destino of ramo.abre) {
      if (!estadoRamos[destino]) estadoRamos[destino] = { aprobado: false, requisitos: [], abre: [] };
      estadoRamos[destino].requisitos.push(ramo.nombre);
    }
  }
}

// Crear el DOM (con todos los ramos, ordenados por semestre)
const mallaDiv = document.getElementById("malla");

for (const [semestre, ramos] of Object.entries(malla)) {
  const semDiv = document.createElement("div");
  semDiv.className = "semestre";
  semDiv.innerHTML = `<h2>Semestre ${semestre}</h2>`;

  for (const ramo of ramos) {
    const ramoDiv = crearRamoDiv(ramo.nombre);
    semDiv.appendChild(ramoDiv);
  }

  mallaDiv.appendChild(semDiv);
}

// Crear div visual de cada ramo
function crearRamoDiv(nombre) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.id = nombre;
  div.textContent = nombre;

  const boton = document.createElement("button");
  boton.className = "boton";
  boton.textContent = "Aprobé";
  boton.onclick = () => aprobarRamo(nombre);

  div.appendChild(boton);
  return div;
}

function actualizarEstado() {
  for (const [nombre, datos] of Object.entries(estadoRamos)) {
    const div = document.getElementById(nombre);
    if (!div) continue;

    if (datos.aprobado) {
      div.classList.add("aprobado");
      div.classList.remove("activo");
    } else if (datos.requisitos.every(req => estadoRamos[req]?.aprobado)) {
      div.classList.add("activo");
    } else {
      div.classList.remove("activo");
    }
  }
}

function aprobarRamo(nombre) {
  if (!estadoRamos[nombre] || estadoRamos[nombre].aprobado) return;
  estadoRamos[nombre].aprobado = true;
  actualizarEstado();
}

actualizarEstado();

// Paso 1: Crear estadoRamos desde malla y dependencias
const malla = {
  // mismo contenido que antes...
  // (copiar aquí toda la estructura original que ya tienes)
};

const estadoRamos = {};
const ramosPorSemestre = {};

// Recolectar todos los ramos y dependencias
for (const [semestre, ramos] of Object.entries(malla)) {
  ramosPorSemestre[semestre] = [];
  for (const ramo of ramos) {
    // Crear estado del ramo si no existe
    if (!estadoRamos[ramo.nombre]) {
      estadoRamos[ramo.nombre] = { aprobado: false, requisitos: [], abre: [] };
    }
    estadoRamos[ramo.nombre].abre = ramo.abre;

    // Registrar en el semestre
    ramosPorSemestre[semestre].push(ramo.nombre);

    // Para cada dependencia, agregarle el requisito actual
    for (const destino of ramo.abre) {
      if (!estadoRamos[destino]) {
        estadoRamos[destino] = { aprobado: false, requisitos: [], abre: [] };
      }
      estadoRamos[destino].requisitos.push(ramo.nombre);
    }
  }
}

// Paso 2: Crear HTML de todos los ramos
const mallaDiv = document.getElementById("malla");

for (const [semestre, ramos] of Object.entries(ramosPorSemestre)) {
  const semDiv = document.createElement("div");
  semDiv.className = "semestre";
  semDiv.innerHTML = `<h2>Semestre ${semestre}</h2>`;

  for (const nombreRamo of ramos) {
    const ramoDiv = crearRamoDiv(nombreRamo);
    semDiv.appendChild(ramoDiv);
  }

  mallaDiv.appendChild(semDiv);
}

// Paso 3: Agregar ramos "huérfanos" que no estaban en ningún semestre
const ramosNoUbicados = Object.keys(estadoRamos).filter(nombre =>
  !Object.values(ramosPorSemestre).flat().includes(nombre)
);

if (ramosNoUbicados.length > 0) {
  const otrosDiv = document.createElement("div");
  otrosDiv.className = "semestre";
  otrosDiv.innerHTML = `<h2>Otros</h2>`;

  for (const nombre of ramosNoUbicados) {
    const ramoDiv = crearRamoDiv(nombre);
    otrosDiv.appendChild(ramoDiv);
  }

  mallaDiv.appendChild(otrosDiv);
}

// Función para crear un ramo con botón
function crearRamoDiv(nombre) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.id = nombre;
  div.textContent = nombre;

  const boton = document.createElement("button");
  boton.className = "boton";
  boton.textContent = "Aprobé";
  boton.onclick = () => aprobarRamo(nombre);

  div.appendChild(boton);
  return div;
}

// Función para marcar ramos desbloqueados/aprobados
function actualizarEstado() {
  for (const [nombre, datos] of Object.entries(estadoRamos)) {
    const div = document.getElementById(nombre);
    if (!div) continue;

    if (datos.aprobado) {
      div.classList.add("aprobado");
      div.classList.remove("activo");
    } else if (datos.requisitos.every(req => estadoRamos[req]?.aprobado)) {
      div.classList.add("activo");
    } else {
      div.classList.remove("activo");
    }
  }
}

// Acción al presionar "Aprobé"
function aprobarRamo(nombre) {
  if (!estadoRamos[nombre] || estadoRamos[nombre].aprobado) return;
  estadoRamos[nombre].aprobado = true;
  actualizarEstado();
}

actualizarEstado();
